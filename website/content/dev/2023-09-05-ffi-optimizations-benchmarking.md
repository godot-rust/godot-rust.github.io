+++
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

title = "FFI optimizations and benchmarking"
authors = ["Bromeon"]

[extra]
summary = "How caching enabled up to 40x speedup for some Godot API calls."
tags = ["performance", "benchmark"]
+++

The first entry in the godot-rust devlog touches a topic that is often in the spotlight of game development: performance.


## Background on FFI calls

As many of you know, gdext (the Rust binding for Godot 4) uses a mechanism called **FFI** -- [Foreign Function Interface][ffi] -- to communicate with its host application, the Godot C++ engine. Godot provides the Rust library with C function pointers that can be used to fetch _more_ function pointers, and eventually give access to the full engine functionality. So every time you access a Godot API, an **FFI call** is made through one of these pointers. 

A widespread misconception is that FFI calls are extremely slow and thus to be avoided at all costs. This is wrong, FFI calls behave for the most part like _indirect calls_ (e.g. through `dyn Trait` or `fn()` function pointers). In many cases, this overhead is negligible compared to actual logic being performed.

However, gdext needs to do more work around the actual call. Let's look at a concrete example of a Godot API, [`Node3D::set_position(position)`][node3d-setposition]. There are several steps involved:

1. Construct `StringName` instances for class "Node3D" and method "set_position".
2. Fetch the function pointer from Godot which maps to this class/method pair.
3. Translate arguments (here `position`) to their FFI representation.
4. Call FFI through the function pointer.
5. Convert any return value from FFI to Rust representation (not applicable here).

Step 1 is very expensive, because at the moment, the only way to construct a `StringName` is through `GodotString`. Even if you have a literal available (such as `"set_position"`), you still need to go through dynamic `GodotString` allocation and deallocation, as well as `StringName` construction. To make matters worse, due to an oversight in pointer passing, Godot 4.1 creates unnecessary copies for many arguments.

> I opened two pull requests in Godot to address both issues: [#78580] to allow fast `StringName` construction and [#80075] to avoid extra copies.

Step 2 incurs an FFI call + lookup on Godot side, so it's reasonably fast. However it's unnecessary to re-fetch this function pointer every single time a call is made.

Steps 3-5 are inevitable. By having a Rust representation which matches the FFI one, we can save unnecessary conversions, but that's about it regarding optimization potential.


## Starting to optimize

The most promising optimization is to avoid re-fetching FFI function pointers on every single call (here, the one mapping to `Node3D::set_position` on Godot side). This not only avoids the fetch itself, but also the very slow construction of `StringName`.

There are two ways to do this:
* Pre-fetch function pointers of _all_ Godot methods at loading time.
    * A function pointer is immediately available when called, no further logic needed. No mutation after initialization.
    * Thousands of function pointers are loaded that are never used. Loading also takes time.
* Fetch function pointers lazily, on first use.
    * Saves the loading effort for functions that are never called.
    * Requires hidden state as `static` + synchronization such as `OnceLock`, because the lazy function pointer is _written_ upon calling.
    * Either possible as 1 global hashmap (-> extra lookup time) or 1 `static` variable per function (-> thousands of globals with implicit state).

We decided to go for pre-fetching _everything_, because it's the fastest at call time and it has a very nice side effect: all functions requested by gdext are checked to be available on startup. In the lazy approach, we may only learn that a method is unavailable once it is called (this can happen in a version mismatch, for example). And indeed, this [revealed a bug in Godot][#80852] regarding unavailable functions.

The initial loading also turned out to be quite fast even in debug builds. Of course, this design choice may be revisited as we get user feedback, but it's already a nice improvement over the status quo!


## The other side of the coin

As mentioned above, speed is a trade-off. Before checking the benefits, let's discuss the cost:
1. Due to the extra generated code (for tables holding thousands of function pointers), gdext takes longer to compile.
   * Fortunately, this affects only initial build times, not incremental compilation.
   * Nevertheless, this is a big priority and there are already some plans to address compile times.
2. If you track development versions of Godot, it's possible that some functions cannot be loaded.
   * As functions are now loaded unconditionally, a single failure blocks Godot startup.
   * If this turns out to be a problem, we can skip such functions. For now, it helps detect Godot bugs.
3. There is initial loading time associated with pre-fetching.
   * Despite loading tens of thousands of methods, this is surprisingly fast.
     On a few years old laptop, it takes less than 20ms in release mode to load 10k+ methods.
     > _Server level: loaded 10 classes and 924 methods in 0.0020867s._  
       _Scene level: loaded 745 classes and 9756 methods in 0.0177936s._
   * In a Godot editor build + gdext debug mode, loading is only slightly slower:
     > _Server level: loaded 10 classes and 924 methods in 0.0040269s._  
       _Scene level: loaded 745 classes and 9756 methods in 0.0296661s._  
       _Editor level: loaded 50 classes and 306 methods in 0.0010417s._

## Benchmarking

The cached-function-pointers optimization brings up a central question:

> How do we know we actually improved things, and by how much?

In the past, individual users measured specific scenarios, but for the most part, performance was guesswork. However, runtime behavior is not always intuitive, and it's tempting to fall victim to premature optimization (such as avoiding `if` statements that are near-free with branch prediction).

As an initiative toward a more scientific approach, I added the `#[bench]` infrastructure to gdext. Similar to `#[itest]`, it is now possible to define individual benchmarks, running a function repeatedly and measuring its execution times. Unlike integration tests, benchmarks must return a value, which is then fed into [`std::hint::black_box`][std-blackbox] to prevent rustc from optimizing it away. At the end, select histogram metrics are displayed. For now, minimum and median were chosen, as we're interested in fast runs without outliers on the upper end of the spectrum (caused by OS scheduling etc.).

A deliberate choice was to stay minimalistic and avoid full-blown benchmarking frameworks like criterion, hyperfine or glassbench. The main objective is a rough overview of performance characteristics -- for more expressivity, those need to be put into context of actual use cases like games, anyway. The goal is also not to make _everything_ as fast as possible; speed is often a trade-off and rarely invoked code paths won't benefit from optimization .

## Results

The benchmarks were run on Windows, under `cargo build --release` and the `template_release` configuration for Godot 4.1.1. 10x as many warmup and test runs were executed compared to gdext default configuration (2k and 5k, respectively).

Three categories are covered: builtins (e.g. `GodotString`, `StringName`), classes (e.g. `Node3D`, `RefCounted`) and utilities (e.g. `powf`, `allocate_rid`). The original code can be seen [on GitHub][code-benchmarks]. Note that the absolute numbers are not important, as they depend on the machine used.

The two scenarios are **I** (before the caching) and **II** (after the caching). The results are summarized in the following table:

| Benchmark                   |   min I | median I |  min II | median II | speedup min | speedup median |
|:----------------------------|--------:|---------:|--------:|----------:|------------:|---------------:|
| builtin_string_ctor (1)     | 0.123µs |  0.135µs | 0.123μs |   0.133μs |        1.0x |           1.0x |
| builtin_stringname_ctor (1) | 0.265µs |  0.321µs | 0.255μs |   0.308μs |        1.0x |           1.0x |
| builtin_rust_call (2)       | 0.005µs |  0.005µs | 0.004μs |   0.004μs |        1.3x |           1.3x |
| builtin_ffi_call (2, 5)     | 0.248µs |  0.293µs | 0.009μs |   0.010μs |       27.6x |          29.3x |
| class_node_life (3)         | 2.492µs |  2.812µs | 1.744μs |   2.048μs |        1.4x |           1.4x |
| class_refcounted_life (4)   | 1.880µs |  2.260µs | 0.692μs |   0.736μs |        2.7x |           3.1x |
| class_user_refc_life (4)    | 2.180µs |  2.516µs | 0.868μs |   1.000μs |        2.5x |           2.5x |
| class_singleton_access      | 0.207µs |  0.244µs | 0.208μs |   0.231μs |        1.0x |           1.1x |
| utilities_allocate_rid (5)  | 0.257µs |  0.288µs | 0.006μs |   0.007μs |       42.8x |          41.1x |
| utilities_rust_call (2)     | 0.027µs |  0.028µs | 0.027μs |   0.028μs |        1.0x |           1.0x |
| utilities_ffi_call (2)      | 0.256µs |  0.286µs | 0.030μs |   0.032μs |        8.5x |           8.9x |


Several observations can be made. The numbers in the list correspond to the ones in parentheses above:
1. Construction/destruction of `GodotString` and `StringName` remains unchanged.
    * Likely, this duration is dominated by the string allocation and other business logic on Godot side, not the FFI overhead. 
2. Rust calls to builtins (`Rect2i::contains_point`) and utilities (`f64::powf`) are unchanged. These are not going through FFI and are thus unaffected by caching.
    * The 1.3x factor is subject to high error, as each run has very small duration (5 and 4 nanoseconds).
    * Before caching, FFI roundtrips were _significantly_ slower than pure Rust calls (0.248/0.005 = 49.6x, 0.256/0.027 = 9.5x).
    * After caching, the difference becomes much less noticeable (0.009/0.004 = 2.3x, 0.03/0.027 = 1.1x). Also here, small numbers might require closer analysis.
3. Construction/destruction of `Gd<Node3D>` is around 40% faster (1.4x).
    * Involves calls to `Node3D::new_alloc()`, `free()`, `instance_id()`.
4. Construction/destruction of `Gd<RefCounted>` and `Gd<UserRefCounted>` is 2.5-3x faster.
   * In addition to create/destroy calls, we need `RefCounted::reference()`/`unreference()` here.
5. In some cases, caching leads to extreme performance improvements.
   * `utilities_allocate_rid` calls `allocate_rid()` which is quite fast on its own, so FFI was very noticeable (42.8x speedup).
   * `builtin_ffi_call` calls `Rect2i::has_point()`, which also very cheap on Godot side (27.6x speedup).

In conclusion, caching mostly benefits Godot functions that are very short to execute -- they suffered from significant overhead in the past. Furthermore, results also show that **FFI is fast**. We should embrace FFI calls where they make sense, not try to avoid them.

[godot-doc-stringname]: https://docs.godotengine.org/en/stable/classes/class_stringname.html#description
[node3d-setposition]: https://godot-rust.github.io/docs/gdext/master/godot/engine/struct.Node3D.html#method.set_position
[std-blackbox]: https://doc.rust-lang.org/std/hint/fn.black_box.html
[ffi]: https://doc.rust-lang.org/nomicon/ffi.html
[#78580]: https://github.com/godotengine/godot/pull/78580
[#80075]: https://github.com/godotengine/godot/pull/80075
[#80852]: https://github.com/godotengine/godot/pull/80852
[code-benchmarks]: https://github.com/godot-rust/gdext/blob/2dbfd6c1ed5669083d9d923bbbd084827772ac79/itest/rust/src/benchmarks/mod.rs