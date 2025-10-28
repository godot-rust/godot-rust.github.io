+++
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

title = "0.5 dev update WIP"
authors = ["Bromeon", "godot-rust contributors"]

[extra]
summary = "v0.5 WIP"
tags = ["dev-update"]
+++

This is WIP for **0.5** update! 

Existence of this PR doesn't mean that we want to release 0.5 anytime soon – it just makes documenting changes easier and less taxing.


# Performance

## The Paranoid, The Balanced and Very Unsafe

Godot-rust now supports three tiers that differ in the amount of runtime checks and validations that are performed:

### 🛡️ **Strict**

Default for dev builds. Performs lots of additional, sometimes expensive checks, but allows to detect many bugs during development.

- Gd::bind/bind_mut() provides extensive diagnostics to locate runtime borrow errors.
- Array safe conversion checks (for types like Array<i8>).
- RTTI checks on object access (protect against type mismatch edge cases).
- Geometric invariants (e.g. normalized quaternions).
- Access to engine APIs outside valid scope.

### ⚖️ Balanced

Default for release builds. Performs basic validity and invariant checks, reasonably fast. 
Within this level you should not be able to encounter undefined behavior (UB) in safe Rust code. 
Invariant violations may however cause panics and logic errors.

- Object liveness checks.
- Gd::bind/bind_mut() cause panics on borrow errors.

### ☣️ Disengaged

Disables most checks, sacrificing safety for raw speed. 
This renders a large part of the godot-rust API `unsafe` without polluting the code; you opt in via `unsafe impl ExtensionLibrary`.

Before using this, measure to ensure you truly need the last bit of performance (balanced should be fast enough for most cases; if not, consider bringing it up). 
Also test your code thoroughly using the other levels first. Undefined behavior and crashes arising from using this level are your full responsibility. 
When reporting a bug, make sure you can reproduce it under the balanced level.

- Unchecked object access -> instant UB if an object is dead.
- Gd::bind/bind_mut() are unchecked -> UB if mutable aliasing occurs.

### Cargo features

You can downgrade 1 level in each `dev` (Debug) and `release` Cargo profiles, with following features:

- `safeguards-dev-balanced`: for `dev`, use ⚖️ **balanced** instead of the default strict level.
- `safeguards-release-disengaged`: for `release`, use ☣️ **disengaged** instead of the default balanced level.

Thanks to @beicause for making bulk work for this feature! [#1278]

[#1278]: https://github.com/godot-rust/gdext/pull/1278

## Faster calls for Callables

Thanks to @lyonbeckers Rust Callables received significant improvement – making calling `Callable::from_fn` twice as fast as it was in `0.4`!

[#1331]: https://github.com/godot-rust/gdext/pull/1331

## Simple API to cache and fetch Autoloads

Godot [autoloads][godot-docs-autoload] can be now fetched and cached using higher-level convenience function – `get_autoload_by_name`.
Thanks to it Godot autoloads can be easily accessed anywhere in the scope, even outside the scene tree – including calls from Callables and Objects.

To create rust autoload firstly create a scene with your rust Node in it and add it as an autoload in project settings.
Afterward it can be accessed via its name and will be cached on the very first use.

```rust
pub fn stage() -> Gd<Stage> {
    get_autoload_by_name("StageAutoload")
}

#[derive(GodotClass)]
#[class(init, base = Node)]
pub struct Stage {
    #[var]
    level: Option<Gd<Level>>,
}
```

Thanks to @bromeon for implementing this feature and @ValorZard for testing it! ([#1381])


[#1381]: https://github.com/godot-rust/gdext/pull/1381

## Improvements for macro-generated signatures

Multiple improvements for macro-generated signatures has been implemented:

- Docs for signals are now being preserved, allowing to inspect them in IDEs ([#1353]).
- Docs in `#[godot_api(secondary)]` blocks are now properly preserved and registered ([#1355]).
- Compile errors caused by wrong signature in `InterfaceTraits` now properly point to user code ([#1370], [#1373], [#1382]).

[#1353]: https://github.com/godot-rust/gdext/pull/1353
[#1355]: https://github.com/godot-rust/gdext/pull/1355
[#1370]: https://github.com/godot-rust/gdext/pull/1370
[#1373]: https://github.com/godot-rust/gdext/pull/1373
[#1382]: https://github.com/godot-rust/gdext/pull/1382

[godot-docs-autoload]: https://docs.godotengine.org/en/latest/tutorials/scripting/singletons_autoload.html