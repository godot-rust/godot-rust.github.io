+++
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

title = "March 2026 dev update"
authors = ["Yarwin", "Bromeon"]

[extra]
summary = "v0.5: typed dicts, non-null, enums everywhere, tool button"
tags = ["dev-update"]
+++

A quarter of a year has passed since the [2025 end-of-year][devlog-review-2025] blog post, and roughly half a year since last minor release [v0.4][devlog-sept-2026].

Now we're here to announce version **v0.5** of godot-rust! This post discusses new additions in v0.5, as well as v0.4.x improvements that landed in 2026.

[devlog-review-2025]: ../godot-rust-2025-review
[devlog-sept-2026]: ../september-2025-update


## Performance

### Safeguard levels

Briefly mentioned in the end-of-year post, godot-rust now supports three tiers of _safeguard levels_, which fine-tune safety and performance:
- **Strict** (default in Debug builds): extra guardrails to detect as many bugs as possible during development.
- **Balanced** (default in Release builds): fast, but still safe to make sure your game behaves deterministically even in case of runtime errors.
- **Disengaged**: sacrifices safety for raw speed. This is typically not needed and will result in immediate UB if you make a mistake. It exists for the 1% of extensions with hardcore performance requirements. Before disengaging safeguards, measure if it's absolutely needed and consider bringing up potential performance problems with the maintainers, so _Balanced_ level can stay reasonably fast.

You can read more about safeguard levels in our [API docs][api-safeguard-levels]. Huge thanks to beicause for doing the bulk of work on this feature! [#1278]

[api-safeguard-levels]: https://godot-rust.github.io/docs/gdext/master/godot/#safeguard-levels
[#1278]: https://github.com/godot-rust/gdext/pull/1278

### Faster callables

Thanks to lyonbeckers, Rust Callables received a significant improvement, especially affecting the very common `Callable::from_fn()` constructor. [#1331]

[#1331]: https://github.com/godot-rust/gdext/pull/1331

### Remove `Mutex` locking in `Gd`

The `Gd<T>`'s internal cell no longer uses a mutex, resulting in faster access to your objects. The mutex was unnecessary since godot-rust's threading model already ensures safety: without `experimental-threads`, bindings are only accessed from the main thread. [#1442]

This optimization speeds up working with `Gd` pointers, while maintaining the same safety guarantees – validated by Miri.

[#1442]: https://github.com/godot-rust/gdext/pull/1442


## Type system

### Typed dictionary

Thanks to Bromeon, dictionaries can now be typed! [#1502], [#1516]

```rs
// Define a Godot-exported enum.
#[derive(GodotConvert, Debug)]
#[godot(via = GString)]
enum Tile { GRASS, ROCK, WATER }

// Create the same dictionary in a single expression.
let tiles: Dictionary<Vector2i, Tile> = dict! {
   Vector2i::new(1, 2) => Tile::GRASS,
   Vector2i::new(1, 3) => Tile::WATER,
};

// Element access is now strongly typed.
let value = tiles.at(Vector2i::new(1, 3)); // type Tile.

// Dictionaries - both typed and untyped - can be iterated as well:
for (key, value) in tiles.iter_shared() {
    godot_print!("{key}: {value:?}");
}
```

This addition comes with a lot of new machinery. You can still use untyped (`Variant`) dictionaries as `VarDictionary`, and there are new expression macros [`dict!`][api-dict] and `idict!`, in addition to the existing `vdict!`. Consult also [`Dictionary`][api-dictionary] docs for detailed info.

[api-dictionary]: https://godot-rust.github.io/docs/gdext/master/godot/builtin/struct.Dictionary.html
[api-dict]: https://godot-rust.github.io/docs/gdext/master/godot/builtin/macro.dict.html

[#1502]: https://github.com/godot-rust/gdext/pull/1502
[#1516]: https://github.com/godot-rust/gdext/pull/1516

### Covariant arrays and dictionaries

In GDScript, typed arrays can be implicitly "upcast" to `Array`, which can then be used to insert elements of the wrong type – silently, without detection:

```swift
var typed: Array[int] = [1, 2, 3]
var untyped: Array = typed   # Implicit "upcast" to Array[Variant].
untyped.append("hello")      # Not detected by parser (no-op at runtime).
```

godot-rust addresses this with the new [`AnyArray`][api-anyarray] type ([#1422]).

`AnyArray` can store any array – typed or untyped – and exposes only operations that work for all element types (`len()`, `clear()`, `shuffle()`, ...). Methods that push data _into_ the array are intentionally absent.

Deref coercion lets every `&Array<T>` be used as `&AnyArray`, which means existing code passing array arguments keeps working. To upcast an owned value, use `upcast_any_array()`; to downcast, use `try_cast_array()` or `try_cast_var_array()`:

```rust
let typed: Array<i64> = array![1, 2, 3];
let any: AnyArray = typed.upcast_any_array();

// Can now be passed to engine functions that previously required VarArray.
SomeGodotClass::engine_method(&any);
```

The equivalent has been implemented for dictionaries as [`AnyDictionary`][api-anydict].

[api-anyarray]: https://godot-rust.github.io/docs/gdext/master/godot/builtin/struct.AnyArray.html
[api-anydict]: https://godot-rust.github.io/docs/gdext/master/godot/builtin/struct.AnyDictionary.html
[#1422]: https://github.com/godot-rust/gdext/pull/1422

### Required objects in engine APIs

Thanks to the GDExtension team [refining a PR over the course of 2.5 years][#86079], Godot 4.6 now has nullability (or "required-ness") annotations in the API. Object parameters and return types marked as non-null (required) now use `Gd<T>` instead of `Option<Gd<T>>`, reducing unnecessary unwrapping and improving type safety. [#1383]

```rust
// Before: had to handle Option even for methods that don't return null.
let t: Gd<Tween> = node.create_tween().unwrap();

// Now: non-null APIs return Gd<T> directly.
let t: Gd<Tween> = node.create_tween();
```

[#1383]: https://github.com/godot-rust/gdext/pull/1383
[#86079]: https://github.com/godotengine/godot/pull/86079

### Enums across the whole API

Rust enums implementing `GodotConvert` can now be used in a lot more places: `#[func]`, `#[signal]`, `#[var]`, `#[export]` as well as inside `Array` and `Dictionary` collections.

```rs
#[derive(GodotConvert, Debug, Clone)]
#[godot(via = u8)]
enum Temperature { Cold, Normal, Hot }

#[derive(GodotConvert, Debug, Clone, Var, Export, Default)]
#[godot(via = GString)]
enum UnitType { Soldier, Tank, Mech }

#[derive(GodotClass)]
#[class(init, base = Node)]
struct Factory {
    // Set in the editor UI...
    #[export]
    produced_unit_types: Array<UnitType>
}

#[godot_api]
impl Factory {
    // ...in signals...
    #[signal]
    fn unit_spawned(ty: UnitType, location: Vector2);

    // ...and in functions. No validation inside the function needed!
    #[func]
    fn control_oven(&mut self, temp: Temperature) { ... }
}
```

Thanks to LviatYi ([#1438]), engine enums are getting the same treatment and can be used with `#[var]` as well:

```rs
#[derive(GodotClass)]
#[class(init, tool, base = Node)]
struct MyClass {
    #[export]
    #[var(get = get_valign, set = set_valign)]
    vertical_alignment: PhantomVar<godot::global::VerticalAlignment>,
}
```

Thanks to Bromeon for a plethora of improvements to make it work (most importantly [#1513] among many others).

[#1513]: https://github.com/godot-rust/gdext/pull/1513
[#1438]: https://github.com/godot-rust/gdext/pull/1438

### Better `Debug` for bitfields

The `Debug` impl for bitfields is now much more useful, providing easy access to all the necessary info ([#1496]):

```rs
let flags = PropertyUsageFlags::EDITOR
   | PropertyUsageFlags::READ_ONLY
   | PropertyUsageFlags::from_ord(1 << 31); // simulate addition in future Godot

assert_eq!(
    format!("{flags:?}"),
    "PropertyUsageFlags { EDITOR | READ_ONLY | Unknown(0x80000000) }"
);
```

[#1496]: https://github.com/godot-rust/gdext/pull/1496

### Typed object duplication

We now have `Gd::duplicate_node()` and `Gd::duplicate_resource()` methods, replacing former `duplicate()`. These return `Gd<Self>`, preserving the concrete type. [#1492]

```rust
let node = Node2D::new_alloc();

// Returns Gd<Node2D>, not Gd<Node>.
let copy = node.duplicate_node();

// Custom flags via builder.
let copy = node.duplicate_node_ex()
    .flags(DuplicateFlags::SIGNALS | DuplicateFlags::GROUPS)
    .done();
```

The old `Node::duplicate()` and `Resource::duplicate()` methods are deprecated and will be removed in v0.6.

[#1492]: https://github.com/godot-rust/gdext/pull/1492

### String equality with `&str`

[#1415], [#1420]: `GString` and `StringName` now support direct equality comparison with `&str`, avoiding temporary allocations.

```rust
let gs = GString::from("hello");
assert!(gs == "hello");

let sn = StringName::from("hello");
assert!(sn == "hello");
```

[#1415]: https://github.com/godot-rust/gdext/pull/1415
[#1420]: https://github.com/godot-rust/gdext/pull/1420


## Class registration API

### Optional parameters

`#[func]` now supports default values via `#[opt(default = ...)]` parameter attributes. [#1396]

```rust
#[func]
fn method(
    &self,
    required: i32,
    #[opt(default = "str")] string: GString,
    #[opt(default = 100)] integer: i32,
) { ... }
```

Can be called from GDScript as follows:

```swift
obj.method(123)
obj.method(123, "something")
obj.method(123, "something", 456)
```

[#1396]: https://github.com/godot-rust/gdext/pull/1396

### Export tool button

If you need a clickable button in the inspector, you can now use `PhantomVar<Callable>` with the `#[export_tool_button]` attribute. This allows for rapid development of editor tooling! Many thanks to Yarwin ([#1499]).

Comes with full support for generic programming:

```rs
#[derive(GodotClass)]
#[class(init, tool, base = Node)]
struct MyStruct {
    #[export_tool_button(fn = Self::my_method, icon = "2DNodes")]
    tool_button: PhantomVar<Callable>,

    #[export_tool_button(fn = generic_fn, name = "My custom button")]
    my_other_tool_button: PhantomVar<Callable>,

    base: Base<Node>,
}

#[godot_api]
impl MyStruct {
    fn my_method(&mut self) { ... }
}

// One generic method can be used across many tool buttons.
fn generic_fn<T: GodotClass<Base = Node> + WithBaseField>(this: &mut T) {
    let node = Node::new_alloc();
    this.base_mut().add_child(&node);
}
```

[#1499]: https://github.com/godot-rust/gdext/pull/1499


## Property improvements

### `#[var(pub)]`

Previously, every `#[var]`-annotated field automatically generated Rust-accessible getters and setters. These are now omitted by default to avoid cluttering the API. [#1458]

Use `#[var(pub)]` to opt in:

```rust
// Inside struct definition:
#[var(pub)]
field: i64,

// Can now be used as: 
let val = obj.bind().get_field();
obj.bind_mut().set_field(val);
```

The old methods remain accessible until v0.6 with a deprecation warning pointing to `#[var(pub)]`.
GDScript-side access is unaffected in both cases.

[#1458]: https://github.com/godot-rust/gdext/pull/1458

### New `SimpleVar` and `Var` definitions

The `Var` trait's `get_property`/`set_property` methods have been renamed to associated functions `var_get`/`var_set`, reducing IDE completion noise on godot-rust types. [#1466]

A new `SimpleVar` marker trait provides a fast-track `Var` implementation for types that already implement `ToGodot`/`FromGodot`, reusing existing conversions instead of requiring manual impls:

[#1466]: https://github.com/godot-rust/gdext/pull/1466

```rust
impl SimpleVar for InstanceId {}
```

### Rename for `#[var]`

Thanks to lilizoey ([#1388]), `#[var]` properties can now be renamed, similarly to `#[func]` and `#[class]`.

```rust
#[derive(GodotClass)]
struct MyStruct {
    #[var(rename = my_godot_field)]
    my_rust_field: i64,
}
```

Can be accessed from GDScript as:

```swift
var field: int = my_struct.my_godot_field
```

[#1388]: https://github.com/godot-rust/gdext/pull/1388

### Shape metadata

A refactoring led to the introduction of [`GodotShape`][api-godotshape] as the central type descriptor returned from `GodotConvert::godot_shape()` ([#1513]). This gets rid of logic scattered across many traits and methods (`Var::var_hint()`, `Export::export_hint()`, `GodotType::property_info()`, ...).

[api-godotshape]: https://godot-rust.github.io/docs/gdext/master/godot/meta/shape/enum.GodotShape.html

## Engine integration

### User singletons

Rust classes can now be automatically registered as singletons, becoming accessible anywhere just like Godot built-in singletons. This can be a great help when it comes to creating custom servers or global helpers that don't need direct access to the scene tree (like logging, event bus, ...).

All you need to do is to register your class as a singleton with `#[class(singleton)]`:

```rs
#[derive(GodotClass)]
#[class(init, singleton)]
struct MySingleton {
    base: Base<Object>,
}

// Can be accessed like any other singleton from the main thread.
let val = MySingleton::singleton().bind().foo();
```

Now that your singleton is available, you will be able to access it from GDScript as well:

```swift
extends Node

func _ready() -> void:
    MySingleton.foo()
```

This has been made possible with Yarwin's efforts in [#1399]. You can read more about registering singletons in our [book][engine-singletons-book] or the trait docs for [`Singleton`][api-singleton] and [`UserSingleton`][api-user-singleton].

[#1399]: https://github.com/godot-rust/gdext/pull/1399
[engine-singletons-book]: https://godot-rust.github.io/book/recipes/engine-singleton.html
[api-singleton]: https://godot-rust.github.io/docs/gdext/master/godot/obj/trait.Singleton.html
[api-user-singleton]: https://godot-rust.github.io/docs/gdext/master/godot/obj/trait.UserSingleton.html

### Easy autoload fetching

Godot [autoloads][godot-docs-autoload] can now be fetched and cached using the higher-level convenience function [`get_autoload_by_name()`][api-autoload]. Access Godot autoloads anywhere in scope, even outside the scene tree – including calls from Callables and Objects.

To create a Rust autoload, first create a scene with your Rust Node in it and add it as an autoload in project settings.
Afterward, it can be accessed via its name and will be cached on the very first use.

```rust
#[derive(GodotClass)]
#[class(init, base = Node)]
pub struct Stage { ... }

pub fn stage() -> Gd<Stage> {
    get_autoload_by_name("StageAutoload")
}
```

Thanks to Bromeon for implementing this feature and ValorZard for testing it! [#1381]

[#1381]: https://github.com/godot-rust/gdext/pull/1381
[api-autoload]: https://godot-rust.github.io/docs/gdext/master/godot/tools/fn.get_autoload_by_name.html
[godot-docs-autoload]: https://docs.godotengine.org/en/latest/tutorials/scripting/singletons_autoload.html


## Toolchain

### Rust GDExtensions as dependencies

Other Rust extension crates can now be used as dependencies if they are compilable as `rlib`. This allows you to register GDExtension dependencies with your crate, or to compose one out of multiple modular ones. Instead of going through the painstaking process of generating the API for other Rust GDExtension plugins, they can be just included as a part of your crate.

Do not use this feature to bundle dependencies to end-users (e.g. as an asset-store plugin) unless absolutely necessary. Every class can be registered only once, and multiple plugins with the same dependencies are a recipe for headaches.

You can read more about this feature in our [API docs][api-gdextension-dependency]. At the same time, we are in exchange with Godot developers to find ways to support an official workflow to depend on other GDExtensions.

[api-gdextension-dependency]: https://godot-rust.github.io/docs/gdext/master/godot/init/trait.ExtensionLibrary.html#using-other-gdextension-libraries-as-dependencies

### Cross-compilation fix

Previously, the `godot-bindings` crate selected the platform from the host OS rather than the target, which caused cross-compilation (notably to Wasm) to pick up incorrect prebuilt artifacts. This was fixed by dispatching on the target OS instead. [#1479]

[#1479]: https://github.com/godot-rust/gdext/pull/1479

### Web exports

A lot of effort has been spent toward our goal to make WebAssembly a first-class citizen. We're not fully there yet, but _much_ closer.

Prebuilds for Wasm are now available, allowing to target web without the `api-custom` feature, and thus without `bindgen` or the entire LLVM toolchain. PgBiel made sure that web exports are being unit-tested in our CI ([#1275][wasm-unit-test-pr]) and generally helped massively with testing everything around Wasm.

More to come! Web exports still require [quite an elaborate setup][book-wasm], which needs a bit of patience ⸻ but fear not, a CLI tool to simplify the process is already on the way.

[book-wasm]: https://godot-rust.github.io/book/toolchain/export-web.html
[wasm-unit-test-pr]: https://github.com/godot-rust/gdext/pull/1275


## Other improvements

As always, this post is just the tip of the iceberg. In our [changelog], you can dive deeper into a total of 70 improvements since v0.4.5.

To upgrade existing code, consult the [v0.5 migration guide][migration-guide], which provides guidance around breaking changes and upcoming deprecations.

[changelog]: https://github.com/godot-rust/gdext/blob/master/Changelog.md#v050
[migration-guide]: https://godot-rust.github.io/book/migrate/v0.5.html


## Onward

With that, we kick off the **0.5** dev cycle!

In upcoming releases, we will put more focus on thread safety. A first move towards that goal is TitanNano's pull request in [#1524]. Moreover, we will work hard to make sure that the greater GDExtension ecosystem remains stable, healthy, useful and fun for everyone. You can find an example of such work in [godot/#113743] (thanks to Yarwin!).

Huge thanks to everyone! We wouldn't be where we are today without your involvement (be it received feedback, contributions, building the ecosystem, or simply using the library itself), and community support keeps our gears running. We believe that godot-rust is slowly achieving first-class citizen status across Godot languages and bindings: fast both in writing and execution, pleasant to use, and with solid support from top to bottom. At the same time, we are aware of some limitations and will try our best to mitigate them, even if it means fighting the great crab in person. If you have inputs on that front: contributions are welcome!

♥️ _If you like the project, you can consider supporting us via GitHub Sponsors:_  
_[Yarwin][sponsors-yarwin], [TitanNano][sponsors-titan-nano], [Bromeon][sponsors-bromeon]._

[godot/#113743]: https://github.com/godotengine/godot/pull/113743
[#1524]: https://github.com/godot-rust/gdext/pull/1524
[sponsors-bromeon]: https://github.com/sponsors/Bromeon
[sponsors-yarwin]: https://github.com/sponsors/Yarwin
[sponsors-titan-nano]: https://github.com/sponsors/TitanNano
