+++
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

title = "September 2025 dev update"
authors = ["Yarwin", "Bromeon"]

[extra]
summary = "v0.4 and recent developments"
tags = ["dev-update"]
+++

We just released godot-rust **v0.4**!

With it, we'd also like to highlight some of the major features and improvements since our last [dev update in May 2025][may-dev-update],
both during the 0.3 cycle and the 0.4.0 release.


## Properties and exports

The `register` module saw various improvements regarding properties and exports:

### Export groups and subgroups 

Thanks to Yarwin, properties can now be grouped to organize them neatly in the Inspector dock, [just like in GDScript][gdscript-export-groups] ([#1214], [#1261]).

`#[export_group]` and `#[export_subgroup]` are the Rust equivalents of GDScript's `@export_group` and `@export_subgroup` annotations. 

Something unconventional is that they affect multiple following fields, not just one field. We considered alternatives (repetition or struct splitting), but come at the cost of fast gamedev iteration, and many Godot users are already familiar with this pattern.

![car-export-groups.png][car-export-groups-img]

[car-export-groups-img]: car-export-groups.png


<details>
<summary><i>Expand to see code...</i></summary>

```rust
#[derive(GodotClass)]
#[class(init, base=Node)]
struct MyNode {
    #[export_group(name = "Racer Properties")]
    #[export]
    nickname: GString,
    #[export]
    age: i64,

    #[export_group(name = "Car Properties")]
    #[export_subgroup(name = "Car prints", prefix = "car_")]
    #[export]
    car_label: GString,
    #[export]
    car_number: i64,

    #[export_subgroup(name = "Wheels/Front", prefix = "front_wheel")]
    #[export]
    front_wheel_strength: i64,
    #[export]
    front_wheel_mobility: i64,
    
    #[export_subgroup(name = "Wheels/Rear", prefix = "rear_wheel_")]
    #[export]
    rear_wheel_strength: i64,
    #[export]
    rear_wheel_mobility: i64,

    #[export_subgroup(name = "Wheels", prefix = "wheel_")]
    #[export]
    wheel_material: OnEditor<Gd<PhysicsMaterial>>,
    #[export]
    other_car_properties: GString,

    // Use empty group name to break out from the group:
    #[export_group(name = "")]
    #[export]
    ungrouped_field: GString,
}
```
</details>

### Phantom properties

The [`PhantomVar<T>`][api-phantomvar] field type enables ZST (zero-sized type) properties without backing fields, for dynamic properties that are computed on-the-fly or stored elsewhere. Thanks to ttencate for adding this in [#1261]!

```rust
#[derive(GodotClass)]
#[class(init, base=Node)]
struct MyNode {
    #[var(get = get_computed_value)]
    computed_value: PhantomVar<i32>, // zero bytes
}

#[godot_api]
impl INode for MyNode {
    #[func]
    fn get_computed_value(&self) -> i32 { ... }
}
```

### Numeric export limits

For integer exports, a reasonable range is automatically inferred. Additionally, `#[export(range)]` literals are validated against field types at compile time ([#1320]).

```rust
#[export(range = (0.0, 255.0))] // no longer compiles (float)
int_property: i8,

#[export(range = (0, 128))] // doesn't compile either (out of range)
int_property: i8,

#[export] // infers from i8 that range = (-128, 127)
int_property: i32,
```

[#1214]: https://github.com/godot-rust/gdext/pull/1214
[#1261]: https://github.com/godot-rust/gdext/pull/1261
[#1320]: https://github.com/godot-rust/gdext/pull/1320

[api-phantomvar]: https://godot-rust.github.io/docs/gdext/master/godot/obj/struct.PhantomVar.html
[gdscript-export-groups]: https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_exports.html#grouping-exports

## Easier callables

Several parts were improved on the `Callable` front:

### Type-safe deferred calls

[`run_deferred()`][api-gd-rundeferred] and [`run_deferred_gd()`][api-gd-rundeferredgd] act as a type-safe `call_deferred()` alternative, allowing deferred method calls based on closures. This eliminates string-based method names and runtime errors. Thanks to goatfryed for the design and implementation ([#1204], [#1327], [#1332])!

```rust
// Old way (string-based, error-prone):
node.call_deferred("set_position", &[pos.to_variant()]);

// New way (type-safe):
node.run_deferred_gd(|obj| obj.set_position(pos));
```

### Type-safe return types

Modern callable constructors like [`from_fn()`][api-callable-fromfn] support any return type implementing `ToGodot`, eliminating manual `Variant` conversion boilerplate ([#1346]).

```rust
// in 0.3 (and deprecated in 0.4):
let callable = Callable::from_local_fn("unit", |args| {
    do_sth(args);
    Ok(Variant::nil())
});

// new in 0.4:
let callable = Callable::from_fn("unit", |args| {
    do_sth(args);
});
```

[#1204]: https://github.com/godot-rust/gdext/pull/1204
[#1223]: https://github.com/godot-rust/gdext/pull/1223
[#1327]: https://github.com/godot-rust/gdext/pull/1327
[#1332]: https://github.com/godot-rust/gdext/pull/1332
[#1344]: https://github.com/godot-rust/gdext/pull/1344
[#1346]: https://github.com/godot-rust/gdext/pull/1346

[api-gd-rundeferred]: https://godot-rust.github.io/docs/gdext/master/godot/obj/struct.Gd.html#method.run_deferred
[api-gd-rundeferredgd]: https://godot-rust.github.io/docs/gdext/master/godot/obj/struct.Gd.html#method.run_deferred_gd
[api-callable-fromfn]: https://godot-rust.github.io/docs/gdext/master/godot/builtin/struct.Callable.html#method.from_fn
[`Gd::linked_callable()`]: https://godot-rust.github.io/docs/gdext/master/godot/obj/struct.Gd.html#method.linked_callable

## Signal enhancements

Since the introduction of signals in v0.3, several convenience APIs have been added.

Signals now offer disconnection ([#1198]):
```rust
let handle = self.signals().my_signal().connect(...);
// Later that day:
handle.disconnect();
```

Thanks to Yarwin's work on `linked_callable()`, signals connected to a receiver object are automatically disconnected when the receiver is freed ([#1223]):

```rust
let obj: Gd<MyClass> = ...;
let handle = self.signals().my_signal().connect_other(&obj, ...);

obj.free(); // Auto-disconnects the signal.
```

User ogapo enabled conversion to untyped signals for better Godot interop, with [`TypedSignal::to_untyped()`][api-typedsignal-tountyped] ([#1288]):

```rust
let typed = self.signals().my_typed_signal();
let untyped: Signal = typed.to_untyped();
```

[#1198]: https://github.com/godot-rust/gdext/pull/1198
[#1223]: https://github.com/godot-rust/gdext/pull/1223
[#1288]: https://github.com/godot-rust/gdext/pull/1288

[api-typedsignal-tountyped]: https://godot-rust.github.io/docs/gdext/master/godot/register/struct.TypedSignal.html#method.to_untyped

## Ergonomics and developer experience

In good tradition, godot-rust has shipped a truckload of little tools to make everyday development more enjoyable.

### Class dispatching

No more tedious `try_cast()` cascades for explicit dynamic dispatch. The [`match_class!`][api-matchclass] macro allows dynamic class matching, similar to Rust's `match` keyword ([#1225]).

Thanks to sylbeth's work, the macro supports mutable bindings ([#1242]), optional fallback branches ([#1246]), and discard patterns ([#1252]):

```rust
let simple_dispatch: i32 = match_class!(event, {
    button @ InputEventMouseButton => 1,
    motion @ InputEventMouseMotion => 2,
    action @ InputEventAction => 3,
    _ => 0,  // Fallback.
});
```

### Generic packed arrays

Generic [`PackedArray<T>`][api-packedarray] abstracts over all specific packed array types, enabling code reuse across different array variants ([#1291]):

```rust
fn format_packed_array<T>(array: &PackedArray<T>) -> String
where T: PackedArrayElement {
    // ...
}
```

### Variant slices

The [`vslice!`][api-vslice] macro provides a concise way to create `&[Variant]` slices from heterogeneous values ([#1191]):

```rust
// Old way:
let args = &[1.to_variant(), "hello".to_variant(), vector.to_variant()];

// New way:
let args = vslice![1, "hello", vector];
```

This comes in handy for dynamic/reflection APIs like `Object::call()`.

### Engine API type safety

Arrays and dictionaries now offer runtime type introspection via [`ElementType`][api-elementtype] ([#1304]).

Lots of engine APIs have been made more type-safe; check out [#1315] to get an idea of the scope. In particular, many "intly-typed" method parameters have been replaced with enums or bitfields, no longer leaving you the guesswork of what values are expected.

```rust
let s: Variant = obj.get_script();
// now:
let s: Option<Gd<Script>> = obj.get_script();

obj.connect_ex(...).flags(ConnectFlags::DEFERRED as u32).done();
// now:
obj.connect_flags(..., ConnectFlags::DEFERRED);
```

### Negative indexing

The [`SignedRange`][api-signedrange] type provides negative indexing for arrays and strings ([#1300]).

### Enum and bitfield introspection

Programmatic access to all enum and bitfield values enables runtime introspection of Godot's type system ([#1232]).

```rust
// Access all enum constants.
let constants = MyEnum::all_constants();
let values = MyEnum::values(); // Distinct values only.

for (name, value) in constants {
    add_dropdown_option(name, value);
}
```

[#1191]: https://github.com/godot-rust/gdext/pull/1191
[#1225]: https://github.com/godot-rust/gdext/pull/1225
[#1232]: https://github.com/godot-rust/gdext/pull/1232
[#1242]: https://github.com/godot-rust/gdext/pull/1242
[#1246]: https://github.com/godot-rust/gdext/pull/1246
[#1252]: https://github.com/godot-rust/gdext/pull/1252
[#1291]: https://github.com/godot-rust/gdext/pull/1291
[#1300]: https://github.com/godot-rust/gdext/pull/1300
[#1304]: https://github.com/godot-rust/gdext/pull/1304
[#1315]: https://github.com/godot-rust/gdext/pull/1315

[api-matchclass]: https://godot-rust.github.io/docs/gdext/master/godot/classes/macro.match_class.html
[api-vslice]: https://godot-rust.github.io/docs/gdext/master/godot/builtin/macro.vslice.html
[api-packedarray]: https://godot-rust.github.io/docs/gdext/master/godot/builtin/struct.PackedArray.html
[api-signedrange]: https://godot-rust.github.io/docs/gdext/master/godot/meta/trait.SignedRange.html
[api-elementtype]: https://godot-rust.github.io/docs/gdext/master/godot/meta/enum.ElementType.html

## Object lifecycle and initialization

Object initialization and lifecycle management was extended to provide better parity with Godot APIs.

### Base pointer access

So far, it has not been possible to do much with the base object during `init()` method. There was a half-broken `to_gd()` method. This
has been improved with [`Base::to_init_gd()`][api-base-toinitgd]. What seems easy is actually quite a hack due to the way how Godot treats
ref-counted objects during initialization ([#1273]).

### Virtual methods on `Gd<Self>`

Thanks to the great pull request by Yarwin, `#[func(gd_self)]` can now be used with various lifecycle methods. Using `Gd<T>` instead of `&T`/`&mut T` gives precise control over when the given instance is bound ([#1282]):

```rust
#[func(gd_self)]
fn ready(this: Gd<Self>) {
    this.signals().call_me_back_maybe().emit(&this);
}
```

### Post-initialization notification

The [`POSTINITIALIZE`][api-postinitialize] notification is now emitted after `init()` completes, providing a hook for setup that requires a fully initialized object. Thanks to beicause for this addition in [#1211]!

### Generic singleton access

The [`Singleton`][api-singleton] trait enables generic programming with singletons while maintaining backward compatibility with existing `singleton()` methods ([#1325]).

[#1211]: https://github.com/godot-rust/gdext/pull/1211
[#1273]: https://github.com/godot-rust/gdext/pull/1273
[#1282]: https://github.com/godot-rust/gdext/pull/1282
[#1325]: https://github.com/godot-rust/gdext/pull/1325

[api-base-toinitgd]: https://godot-rust.github.io/docs/gdext/master/godot/obj/struct.Base.html#method.to_init_gd
[api-singleton]: https://godot-rust.github.io/docs/gdext/master/godot/obj/trait.Singleton.html
[api-postinitialize]: https://godot-rust.github.io/docs/gdext/master/godot/classes/notify/enum.NodeNotification.html#variant.POSTINITIALIZE

## Advanced argument passing and type conversion

The argument passing system received a comprehensive overhaul with the new `ToGodot::Pass` design, automatic [`AsArg`][api-asarg] implementations, and unified object argument handling. For detailed migration information, see the [v0.4 migration guide][migration-guide].

The system now uses explicit `ByValue` or `ByRef` passing modes, eliminates the need for manual `AsArg` implementations, and supports optional object parameters through `AsArg<Option<DynGd>>` ([#1285], [#1308], [#1310], [#1314], [#1323]).

[#1285]: https://github.com/godot-rust/gdext/pull/1285
[#1308]: https://github.com/godot-rust/gdext/pull/1308
[#1310]: https://github.com/godot-rust/gdext/pull/1310
[#1314]: https://github.com/godot-rust/gdext/pull/1314
[#1323]: https://github.com/godot-rust/gdext/pull/1323

[api-asarg]: https://godot-rust.github.io/docs/gdext/master/godot/meta/trait.AsArg.html

## Outlook

For upgrading existing code, consult the [v0.4 migration guide][migration-guide]. For a complete list of changes including bugfixes and internal improvements, see the [changelog in the repository][changelog].

Version 0.4 is yet another milestone in godot-rust's journey, with major improvements to the developer experience. This wouldn't be possible without the many contributions from the community, whether as code, feedback or [building projects with godot-rust][ecosystem].

The 0.4 cycle will put a focus on more control and performance. An example of that is beicause's work in [#1278] to give the user to trade off performance for safety across different runtime profiles. Other performance PRs are already open, too!

[#1278]: https://github.com/godot-rust/gdext/pull/1278
[may-dev-update]: ../may-2025-update
[migration-guide]: https://godot-rust.github.io/book/migrate/v0.4.html
[changelog]: https://github.com/godot-rust/gdext/blob/master/Changelog.md
[ecosystem]: https://godot-rust.github.io/book/ecosystem/
