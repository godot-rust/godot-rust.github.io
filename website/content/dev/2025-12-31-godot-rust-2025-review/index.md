+++
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

title = "2025 in Review:~A growing ecosystem"
authors = ["Bromeon"]

[extra]
summary = "A retrospective on godot-rust in the year 2025."
tags = ["retrospective", "dev-update", "2025"]
+++

After the years [2023][dev-review-2023] and [2024][dev-review-2024], 2025 is the third full year of **godot-rust** for Godot 4, and the second year on [crates.io][godot-rust-crate].


## Yearly highlights

Like the years before, 2025 has come with large-scale improvements to the user experience. We'll have a short recap of important milestones here, whereas details can be found in the respective devlog entries:

- [May 2025 update][dev-may]
- [September 2025 update][dev-september]
- [GitHub Changelog][godot-rust-changelog]

### Type-safe signals

The year started with a game-changer: [type-safe signals][book-signals]. Signals are a core part of the Godot engine, ranging from node lifecycles to UI on-click events. While godot-rust supported signals since its early days, they were only accessible over dynamic APIs.

We now allow this:

```rs
#[signal]
fn damage_taken(amount: i32);

// Connect the signal to a closure:
self.signals()
    .damage_taken()
    .connect_self(|this, damage: i32| { /* update health etc. */ });
    
// Emit the signal:
self.signals().damage_taken().emit(123);
```

And it doesn't end there -- there are many ways to connect signals to the own or other objects, from inside a class or with just a `Gd` pointer.

This is one of the places where Rust is significantly safer than GDScript: argument types are checked at compile time, so you can always be sure that emitters and receivers are compatible, even across refactorings.

### Async/await

Another big milestone was the integration of Rust future-based `async` infrastructure with Godot signal dispatching. This can be used to wait for signals, such as the above `damage_taken` example, or timers expiring:

```rs
let timer: Gd<Timer> = ...;
godot::task::spawn(async move {
    godot_print!("Wait for timer to expire...");
    timer.signals().timeout().to_future().await;
    godot_print!("Expired.");
});
```

### Export groups

Yarwin contributed [export groups][github-export-groups-pr], a long-requested feature to organize exported properties into collapsible sections in the Godot editor:

![car-export-groups.png](../september-2025-update/car-export-groups.png)

### Class dispatching

It is now possible to use `match`-like syntax for auto-downcasting to a variety of different subclasses. Very useful for input handling, for example:

```rs
let simple_dispatch: i32 = match_class!(event, {
    button @ InputEventMouseButton => 1,
    motion @ InputEventMouseMotion => 2,
    key @ InputEventKey => 3,
    _ => 0,  // Fallback.
});
```

### Singletons and autoloads

Registering a class as a singleton is now as simple as adding `singleton` to the `#[class]` attribute:

```rs
#[derive(GodotClass)]
#[class(init, singleton)]
struct TheOne { ... }

// later:
let singleton: Gd<TheOne> = TheOne::singleton();
```

In addition to singletons, you can now easily access autoloads using `get_autoload_by_name::<T>("name")`.

### Quality-of-life improvements

This is the section that would always be too long, so here are some random picks:

- Registration and fields:
  - `OnEditor<T>` for fields expected to be set in the Godot editor UI, with auto-deref on access.
  - `PhantomVar<T>` fields for synthetic properties without a backing field.
  - Inferred export ranges: `#[export] field: i8` automatically sets export range `-128..127`.
  - `#[init(load = "path/to/Resource")]` for field-based resource init.
  - Virtual methods on `Gd<Self>`, preventing auto-borrowing: `#[func(gd_self)]`.
  - `process(delta: f32)` support for 32-bit floats.
- Interaction with the engine:
  - Type-safe deferred calls: `self.run_deferred(|this| this.do_something_later())`.
  - Generic packed arrays with `PackedArray<T>`.
  - Advanced argument passing (by-value/by-ref), using `AsArg` as core trait for implicit conversions.
  - Variant slices: `vslice![1, "hello", vector]`.
  - Negative indexing with `SignedRange` arguments.
  - Awareness of final (non-inheritable) classes in Godot.

### Safeguard levels

godot-rust now offers three configurations, selectable via Cargo features: _strict_, _balanced_ and _disengaged_ safeguards.

These determine how aggressively godot-rust validates against runtime errors such as dead objects or threading violations. As such, they provide a configurable trade-off between safety and performance. It can often make sense to use maximum safety during development, while reducing overhead in production builds.

### WebAssembly support

WebAssembly has made an important step forward, with [the book page][book-wasm] now thoroughly explaining the (rather involved) setup process. There is currently an [open pull request][github-wasm-pr] to integrate Wasm builds into CI. This one still needs review, but will mark a massive milestone towards a more stable Wasm experience.

Overall, the Web target is in a usable state right now, also shown by various web games built with godot-rust (see below). However, there is more polish needed to smooth out the experience.

### Demo projects repository

We split off [demo-projects] from the main repository. As of today, it features hot reloading and 3 example games: Dodge the Creeps (2D), Squash the Creeps (3D), Network Pong.

## End of an era: gdnative

The Godot 3 bindings for Rust, [gdnative][github-gdnative], haven't seen much activity lately -- last opened issue or pull request was 1.5 years ago, and there haven't been any help requests in a similary long time. 

De-facto already not actively maintained anymore, we now officially sunset the gdnative project. The repo and book remain still available, as do the crates.io releases of course, but we don't plan on spending active development resources on it anymore. 

This was an exciting journey, with lots of learnings, and we are still impressed by the various mechanisms that were pioneered many years ago. Huge thanks to everyone who made this happen, especially chitoyuu who has maintained gdnative for a long time!

## Games using godot-rust

In 2024, we established an [Ecosystem page][book-ecosystem] in the godot-rust book. This one featured a variety of third-party integrations, such as [Rapier physics][godot-rapier], [Rust scripts][godot-rust-script], [procedural terrain][stag-toolkit] among others.

Now we extended this with a [Games page][book-games], showcasing projects built with godot-rust. Many cool games are in development or already released. Here's a teaser:

<div class="image-grid-2x2">
  <figure><img src="ayrton-voxel.png" alt="Ayrton Voxel game"></figure>
  <figure><img src="allyon-battlecry.png" alt="Allyon: Battlecry"></figure>
  <figure><img src="gleba.png" alt="Gleba"></figure>
  <figure><img src="law-of-entropy.png" alt="Law of Entropy"></figure>
</div>
<style>
  .image-grid-2x2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    width: 100%;
  }
  .image-grid-2x2 figure {
    margin: 0;
  }
  .image-grid-2x2 img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>

<br>
We hope for many more installments to come! Games can truly push the boundaries of godot-rust and thus improve the experience for everyone. Don't hesitate to present your project in the <tt>#showcase</tt> channel on our Discord!

## Outlook

Last year, we set the following goals:

* **Signals:** now fully implemented, the API turned out even nicer than initially anticipated (we didn't expect Rust's type system to be that flexible).
* **Threading model:** Not much progress on implementation side, but there is now a more [consolidated overview][github-threads] of the challenges, with many GitHub issues discussing potential solutions. What is needed now is a proof-of-concept to explore those in practice.
* **WebAssembly:** The basics are in place, with several games being built for the web. Setup process can be improved, and CI integration would provide a baseline quality. 
* **Project setup tooling:** This topic hasn't seen much activity, but some third-party integrations have emerged.

### 2026 goals

Out of the above, a more streamlined **WebAssembly experience** is going to be a top priority for the coming year.

We also plan to get back to **threading**, which is notoriously difficult given Godot's vague guarantees around thread-safety. Traditionally, this has kept us from committing to a specific model. However, it might be time to start with an approach that -- even if imperfect -- can be iteratively improved over time.

Another feature that has seen more demand recently is the **builder API**. This would allow registering classes, methods, properties and more using a fluent API rather than proc-macro attributes. Main use cases are more dynamic scenarios (conditional registrations) as well as complex setups that currently hit the limits of proc-macros.

There are also **book improvements** to elaborate common pitfalls. In particular, borrowing semantics in godot-rust (`bind`, `base_mut` etc.) are a continuous source of confusion, which can be mitigated by both tailored APIs and better documentation.


### The road to v0.5

In the near term, version 0.5 of godot-rust is [currently in active development][github-milestone-v0.5]. Since release v0.4.5, a lot has already been implemented, for example:

- `AnyArray`, solving covariance between Godot's `Array` and `Array[T]`.
- Using enums in `#[var]` and `#[func]` position.
- Direct comparisons `GString == &str` and `StringName == &str`.
- Reworked `#[var(get, set)]` API.

### GitHub stats

Compared to last year, here are again some stats for the [GitHub project][godot-rust-github]:

| Statistic                    | 2023  | 2024  | 2025  |
|------------------------------|-------|-------|-------|
| Commits                      | 1,239 | 2,137 | 3,010 |
| Contributors                 | 55    | 83    | 107   |
| Stars                        | 2,050 | 3,255 | 4,281 |
| Forks                        | 131   | 212   | 270   |
| Issues Closed (as Completed) | 139   | 266   | 404   |
| Issues Open                  | 91    | 95    | 81    |
| Pull Requests Merged         | 262   | 517   | 802   |
| Pull Requests Open           | 2     | 5     | 4     |

Thanks a lot to everyone who made 2025 another great year for godot-rust. Special thanks to Yarvin for innovation on many fronts (60 pull requests!) -- and to the countless users who have contributed a game, plugin or library to the ecosystem. It's truly amazing to see what the community has achieved together!

**We wish everyone a Happy New Year!**


[#18]: https://github.com/godot-rust/gdext/issues/18
[#2]: https://github.com/godot-rust/gdext/issues/2
[#470]: https://github.com/godot-rust/gdext/issues/470
[#498]: https://github.com/godot-rust/gdext/issues/498
[#4]: https://github.com/godot-rust/gdext/issues/4
[#501]: https://github.com/godot-rust/gdext/pull/501
[book-ecosystem]: https://godot-rust.github.io/book/ecosystem
[book-games]: https://godot-rust.github.io/book/ecosystem/games.html
[book-signals]: https://godot-rust.github.io/book/register/signals.html
[book-wasm]: https://godot-rust.github.io/book/toolchain/export-web.html
[demo-projects]: https://github.com/godot-rust/demo-projects
[dev-may]: ../may-2025-update
[dev-review-2023]: ../godot-rust-2023-review
[dev-review-2024]: ../godot-rust-2024-review
[dev-september]: ../september-2025-update
[github-export-groups-pr]: https://github.com/godot-rust/gdext/pull/1214
[github-gdnative]: https://github.com/godot-rust/gdnative/
[github-milestone-v0.5]: https://github.com/godot-rust/gdext/milestone/8?closed=1
[github-threads]: https://github.com/godot-rust/gdext/issues?q=state%3Aopen%20label%3A%22c%3A%20threads%22
[github-wasm-pr]: https://github.com/godot-rust/gdext/pull/1275
[godot-rapier]: https://github.com/appsinacup/godot-rapier-physics
[godot-rust-changelog]: https://github.com/godot-rust/gdext/blob/master/Changelog.md
[godot-rust-crate]: https://crates.io/crates/godot
[godot-rust-github]: https://github.com/godot-rust/gdext
[godot-rust-script]: https://github.com/TitanNano/godot-rust-script
[stag-toolkit]: https://github.com/arocull/stag-toolkit
