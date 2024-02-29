+++
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

title = "February 2024 dev update"
authors = ["Bromeon"]

[extra]
summary = "Re-entrancy, virtual script methods, HSV colors, function call diagnostics..."
tags = ["dev-update"]
+++

Two months have passed since the last update, and it's time to share some progress in gdext. The highlights are split into ergonomic improvements and new features, but in some cases the line is blurry. 


## Ergonomic improvements

### Re-entrant calls with `base()` and `base_mut()`

2024 started with a massive improvement: the ability to avoid double-borrow errors in many situations, in PR [#501].
To understand the significance behind this, let's look at this example:

```rust
#[godot_api]
impl INode for MyClass {
    fn ready(&mut self) {
        let child = Node::new_alloc();
        self.base.add_child(child.upcast());
    }

    fn on_notification(&mut self, what: NodeNotification) {}
}
```

Adding a child will trigger a `NodeNotification::ChildOrderChanged` to be emitted. This calls `on_notification` inside `ready()`, during the `add_child` call.

In most languages, such code is not problematic, but Rust is very strict about borrowing. Since we already hold an exclusive reference `&mut self` in `ready()`, we cannot get another one for the receiver of `on_notification()` -- the `&mut self` signature requests one. The call goes via Godot, so the Rust compiler cannot know that `add_child()` indirectly calls `on_notification()`.

Internally, we used `RefCell` with dynamic borrowing, which then caused a double-borrow error at runtime. There is no easy way around it; several approaches were considered:
- Changing signature of all methods from `&mut self` to `&self`. Shared references can coexist, but they force interior mutability onto the user, which is very inconvenient if it has to be done _for all classes_.
- Using a `this: Gd<Self>` receiver, which is explicitly bound with `Gd::bind()` or `Gd::bind_mut()`. This may solve some issues, but won't work if both methods need mutable access to `Self`. This would come with workarounds such as deferring changes.
- Using `unsafe` -- while it might work in typical cases, it's very easy to accidentally introduce UB by aliasing mutable references. It also defeats a lot of Rust's guarantees.

Fortunately, lilizoey came up with a great solution: a custom cell type in place of `RefCell`, which allowed to "reborrow" `self` as long as the previous exclusive reference is unreachable. This follows the semantics of Rust's own reborrowing when calling functions:

```rust
fn f(i: &mut i32) {
    // Here, we have an exclusive reference to the integer.
    g(i)
}

fn g(i: &mut i32) {
    // Here, we _also_ have an exclusive reference to _same_ integer.
    // Even though both technically coexist, they don't alias in the Rust
    // sense, as the one in f() is not accessible from here.
}
```
This principle was generalized to calls across the FFI boundary. The resulting code is well-covered by `miri` tests for safety.

For user code, the main thing that changes is that instead of `self.base`, one needs to use `self.base()` and `self.base_mut()`. In the above example, it thus becomes possible to have `on_notification()` running while `ready()` is still active! All the magic happens behind the scenes.


### Explicitly disabled constructors

Since the absence of `#[class(init)]` could mean either "no default constructor" or "manually defined `init`", this regularly led to problems. Users forgot to specify this attribute, which disabled some Godot functionality (e.g. instantiation as nodes or hot reloading).

A new API has been added in [#593], which adds the `#[class(no_init)]` key to opt out of default constructors:

```rust
#[derive(GodotClass)]
#[class(no_init, base=Node)]
struct MyClass {
    ...
}
```

The GDScript expression `MyClass.new()` will now fail with a descriptive error message. Classes must declare either of `#[class(init)]`, `#[class(no_init)]` or a manual `init()` constructor, otherwise the code will not compile.


### No more `#[base]` attribute

```rust
#[derive(GodotClass)]
pub struct Hud {
    #[base]
    base: Base<RefCounted>,
}
```

can now be written as:

```rust
#[derive(GodotClass)]
pub struct Hud {
    base: Base<RefCounted>,
}
```

See [#577] for details.


### `ToGodot` and `FromGodot` derive improvements

Derive implementations for `GodotConvert`, `ToGodot` and `FromGodot` are undergoing an incremental rewrite, so far primarily in [#595] and [#599]. As a recap, these traits are primarily used for argument and return value passing in `#[func]` functions, but also affect related traits like `Var` (to implement `#[var]` properties). In other words, this part of the API determines how Rust values are mapped to GDScript and back.

`#[derive(GodotConvert)]` implements now both `ToGodot` and `FromGodot` by default, and the attribute `#[godot]` can be used to customize conversion:

```rust
// Implement ToGodot + FromGodot for MyOwnVector2, by just using the inner type.
#[derive(GodotConvert)]
#[godot(transparent)]
struct MyOwnVector2(Vector2);

// Implement ToGodot + FromGodot for MyEnum, by representing values as i64 integers.
#[derive(GodotConvert)]
#[godot(via = i64)]
enum MyEnum { A, B, C } // mapped as 0, 1, 2

// The same as above, but mapping values as strings.
#[derive(GodotConvert)]
#[godot(via = GString)]
enum MyEnum { A, B, C } // mapped as "A", "B", "C"
```

This rewrite is still ongoing, we plan to add more customization in `#[godot]`. However, it is explicitly _not_ a goal to reinvent a serde-like serialization mechanism with extreme proc-macro customization; if that is desired, we could think about improving our existing serde interop.


### Function call diagnostics

In Godot, certain functions have official fail states, meaning the GDExtension API can signal when an invocation fails. For example, `Object::call()` is such a function. It can fail when the specified method does not exist, the passed arguments cannot be mapped to the declared parameters, or the target panics (if it's a Rust function).

So far, it was not possible to catch such errors. gdext would simply print an error message, but even panics from Rust were swallowed. This was necessary because panics are not permitted to cross the FFI boundary; GDScript wouldn't know what to begin with it. However, when calling from Rust, we can now do better.

Since today, we can invoke dynamic calls in two ways:

```rust
let node: Gd<Node> = ...;

// Panicking call -- this panics since get_position() does not take any arguments.
let v: Variant = node.call("get_position", &[123.to_variant()]);

// Result-based: get Err(CallError) instead of panic. Allows to react to error.
let v: Result<Variant, CallError> = node.try_call("get_position", &[123.to_variant()]);
if let Err(e) = v {
    // e (CallError) contains the error message and an API to
    // retrieve the affected class/method.
    godot_print!("Error: {e}");
}
```

This not only brings Godot errors to Rust, but also fixes a few cases that previously ran into UB (e.g. [#604], if argument types mismatched).


## New Godot features

### HSV Colors and named constants

In [#605], StatisMike added a new class [`ColorHsv`] which extends a lot of `Color`'s RGB functionality to the HSV color space. It operates directly on HSVA and provides a highly efficient and easy way to directly affect hue, saturation and value. The two types can be seamlessly converted:

```rust
let mut color = ColorHsv::from_hsv(0.8, 0.6, 0.25);

// Rotate hue on the "wheel" by 90° (0.25 units of a full circle).
color.h += 0.25; // h is now 1.05.

// Normalize to 0..1 range by wrapping (alternative: clamping).
color = normalized_wrapped_h(); // h is now 0.05.

// Convert back to RGB.
let rgb: Color = color.to_rgb();
```

Furthermore, fpdotmonkey added color constants in [#601]. It's now possible to access values like `Color::LIGHT_STEEL_BLUE`, also in `const` contexts.


### Virtual script functions

Pull request [#606] adds support for script-based polymorphism via virtual methods.

If you have a Rust method `greet`, you can now declare it as virtual:

```rust
#[godot_api]
impl MyClass {
    #[func(virtual)]
    fn greet(&self) -> GString {
        "Rust".into()
    }
}
```

Then, you can attach a script to an instance of `MyClass` and override this method. This works for all sorts of scripts, but most common is GDScript:

```js
extends MyClass

func _greet() -> String:
    return "GDScript"
```

Calling `self.greet()` in Rust will now directly return either `"Rust"` (if no script is attached) or `"GDScript"` (if a script is attached).


### Native tool classes

So far, `#[class(tool)]` could be used to emulate "tool classes". This was a gdext-specific mechanism which disabled lifecycle callbacks like `ready()` or `process()` in the editor. This feature has been implemented far before Godot support due to popular demand (see [#70]).

With the upcoming Godot 4.3, Godot offers native support for "runtime classes" (upstream [#82552][godot-82552]). Runtime classes are the opposite of tool classes, i.e. classes whose code only runs after launching the game, not in the editor.

We conditionally switch our implementation to use Godot's native feature starting from API level 4.3 (PR [#619]). This should come with small benefits like placeholder classes. Behavior might thus slightly change; as the feature is new, it could also come with initial bugs.


### Translation macros

Godot offers the `Object` methods `tr()` and `tr_n()`, which can be used to translate strings. While they were already exposed via the `Object` API, they are rather cumbersome to use from Rust.

In PR [#596], vortexofdoom added two macros that make usage more idiomatic:

```rust
// Simple translation:
tr!("{a} is a {b}"); // with interpolation
tr!(context; "{a} is a {b}"); // with translation context

// Pluralized translation:
tr_n!(n; "{0} is a {1}", "{0}s are {1}s", a, b);
//       ^ singular      ^ plural
//    ^ cardinality (decides if singular or plural is used)
```


## Bugfixes and tooling improvements

2024 has come with dozens of changes not mentioned here, which include bugfixes, documentation improvements, and other small features. To get an exhaustive list, check the [recently merged GitHub pull requests][github-prs]. 



[#501]: https://github.com/godot-rust/gdext/pull/501
[#577]: https://github.com/godot-rust/gdext/pull/577
[#593]: https://github.com/godot-rust/gdext/pull/593
[#595]: https://github.com/godot-rust/gdext/pull/595
[#596]: https://github.com/godot-rust/gdext/pull/596
[#599]: https://github.com/godot-rust/gdext/pull/599
[#601]: https://github.com/godot-rust/gdext/pull/601
[#604]: https://github.com/godot-rust/gdext/pull/604
[#605]: https://github.com/godot-rust/gdext/pull/605
[#606]: https://github.com/godot-rust/gdext/pull/606
[#619]: https://github.com/godot-rust/gdext/pull/619
[#70]: https://github.com/godot-rust/gdext/issues/70
[`ColorHsv`]: https://godot-rust.github.io/docs/gdext/master/godot/builtin/struct.ColorHsv.html
[github-prs]: https://github.com/godot-rust/gdext/pulls?q=is%3Apr+is%3Amerged+sort%3Aupdated-desc
[godot-82552]: https://github.com/godotengine/godot/pull/82554
