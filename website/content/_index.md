+++
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

title = "Rust bindings for Godot game engine"
description = "godot-rust"
template = "home.html"
+++

The **godot-rust** project provides bindings for the [Godot game engine][godot] to the [Rust language][rust].

Rust is an alternative to GDScript, with different trade-offs for users.
While GDScript enables fast prototyping and short feedback cycles, games of larger scale may
benefit from a stronger type system, a rich library ecosystem and native performance.

The Rust bindings focus on safety, despite interacting with the engine over FFI.
Many APIs are designed to catch errors at compile time, while others offer runtime checks to prevent undefined behavior.

We provide bindings for the two major Godot versions:

* **gdnative** - Godot 3 bindings, integrating via GDNative C interface.
* **gdext** - Godot 4 bindings, integrating via GDExtension C interface.


## Getting started

To learn either library, you can use any of the following resources:

**Book**: read tutorials and step-by-step guides.  
**API Docs**: a reference to look up specific symbols.  
**GitHub**: clone the repo and check out examples.


[godot]: https://godotengine.org
[rust]: https://www.rust-lang.org
