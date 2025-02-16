+++
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

title = "Rust bindings for Godot game engine"
description = "godot-rust"
template = "home.html"
+++

The **godot-rust** library provides [Rust][rust] language bindings for the [Godot game engine][godot].

Rust is an alternative to GDScript, with different trade-offs for users.
While GDScript enables fast prototyping and short feedback cycles, games of larger scale may
benefit from a stronger type system, a rich library ecosystem and native performance.

The Rust bindings focus on safety, despite interacting with the engine over FFI.
Many APIs are designed to catch errors at compile time, while others offer runtime checks to prevent undefined behavior.

You can use godot-rust to build games, editor plugins or other applications within the Godot ecosystem.
We use Godot's GDExtension API and provide binary compatibility down to Godot 4.1.
For Godot 3, there is also the [gdnative] crate, which isn't actively developed anymore.


## Getting started

To get familiar with godot-rust, you can use any of the following resources:

**Book**: read tutorials and step-by-step guides.  
**API Docs**: a reference to look up specific symbols.  
**GitHub**: follow latest development or contribute to the project.


[godot]: https://godotengine.org
[rust]: https://www.rust-lang.org
[gdnative]: https://github.com/godot-rust/gdnative
