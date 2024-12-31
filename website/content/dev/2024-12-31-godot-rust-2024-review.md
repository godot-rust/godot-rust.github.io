+++
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

title = "2024: A new crate joins the Rust gamedev ecosystem"
authors = ["Bromeon"]

[extra]
summary = "A retrospective on godot-rust in the year 2024."
tags = ["retrospective", "dev-update", "2024"]
+++

2024 marks the year where **godot-rust** became accessible to a wide range of users. On one hand, this was possible due to our [release on crates.io][godot-rust-crate], on the other, a lot of people started to build projects around godot-rust. Last, several crucial improvements in the library itself significantly lowered the entry burden, and many more are planned.

Last year, we had a similar post [summarizing the achievements of the year 2023][dev-update-2023], which went into lots of technical details. Since we now have more regular devlog entries -- like the [major update last month][dev-november] -- this post will be rather high-level. 


## Easy crate setup

As mentioned, an important milestone was the crates.io release in June 2024. In the meantime, 6 versions have been released! The published crate has the advantage to be more explicit regarding compatibility with SemVer, and allow deterministic builds. 

In our case, there's the additional dimension of _Godot version_ which needs to be taken into account. While games may target the latest engine release, editor plugins can reach a wider target audience if they're compatible with older releases. For godot-rust, a crate feature like `api-4-1` makes this very easy to configure.



## Library highlights

On the technical side, a huge amount of improvements have landed in 2024. This article is too big to cover all the details, but the following places provide a very good overview:

- [June 2024 update][dev-june]
- [November 2024 update][dev-november]
- [GitHub Changelog][godot-rust-changelog]

The initial crate release came with a big cleanup of the module structure -- some symbols were all over the place. Now, modules follow Godot's own categorization much more closely: `global` (global-scope enums and functions), `builtin` (built-in types), `classes` (classes) or `register` for user-registered types, etc.

**Script instances** have been fleshed out a lot. Those allow Rust code to be used as scripts that can be attached to nodes, like GDScript or C#. While there is still work to do, a lot of the foundations are laid out, which even made it possible [for third-party libraries][godot-rust-script] to build on this. Special shout-out to TitanNano for doing the majority of the work in this domain. 

**Ergonomic argument passing** streamlined the way how arguments are passed to Godot APIs. Instead of `add_child(&scene.clone().upcast())` or `set_name("name".into())`, you can now use `add_child(&node)` and `set_name("name")`.

On the proc-macro side, there is `#[init(node = "path/to/Node")]`, which allows to directly initialize nodes type-safely with a given path. The attribute `#[rpc]` mimics Godot's `@rpc` configuration.

**Editor docs** allow Rust-defined classes to expose documentation, which can be looked up in the editor browser. RustDoc Markdown code is automatically converted to Godot's own docs format.

Several hot paths have been optimized (pass-by-ref, cached object pointers, `ClassName` simplification, panic hooks). Also, investigations have shown that there's quite a bit of room for further performance improvements, especially in Release mode. Special thanks to Dragos (Ughuu) for pushing the limits here.


## Built-in APIs

Built-in types have been neglected for quite a while, which is especially sad given their central role in Godot. Exactly two weeks ago, a handful of people from the godot-rust community sat together in a mini-hackaton, with the goal to bring built-ins up to speed with Godot.

Several hours of effort resulted in an incredible outcome -- the following types now have feature parity with their Godot equivalents:

- `Vector2i` ([#978](https://github.com/godot-rust/gdext/pull/978))
- `Projection` ([#983](https://github.com/godot-rust/gdext/pull/983))
- `Callable` ([#979](https://github.com/godot-rust/gdext/pull/979))
- `Quaternion` ([#981](https://github.com/godot-rust/gdext/pull/981))
- `GString` ([#980](https://github.com/godot-rust/gdext/pull/980))
- `StringName` ([#980](https://github.com/godot-rust/gdext/pull/980))
- `NodePath` ([#982](https://github.com/godot-rust/gdext/pull/982))
- `PackedByteArray` ([#994](https://github.com/godot-rust/gdext/pull/994))

Much appreciation for the participants fpdotmonkey, sylbeth and lilizoey!

Just today, we released crate version [0.2.2][godot-rust-crate], which brings all these improvements to crates.io. 


## Ecosystem

The crate release had another effect. While skimming the Discord server, I noticed that a tremendous number of user projects has been built around godot-rust in the meantime, many of them actively developed. Ranging from games to extension libraries, editor plugins and other integrations, there is a **huge** amount of creativity bundled in a relatively small community.

To make sure these efforts don't go to waste, there is now an [Ecosystem page in the book][book-ecosystem]. This is an early version, and I'm sure I've missed a few. But it should help users discover other projects, and is intended to be updated over time!

To give a random sample of 3rd-party projects, some WIP and some production-ready:

- Not one, but _two_ integrations with Rapier physics
- Coroutine support that allows GDScript-style `yield`
- Unit tests for godot-rust projects
- A game boy emulator for Godot, written in Rust
- A transpiler from GDScript to Rust
- Sandboxing for Rust code

This should give you enough reasons to check out that page!


## Outlook

One year ago, we set the following goals:

* [Re-entrant calls for object references][#501].
* [Publish to crates.io.][#2]
* [Better threading support.][#18]
* [Builder API for registration.][#4]
* Initial support for [Android][#470] and [iOS][#498].

Re-entrant calls and crates.io have definitely been achieved. Android/iOS has seen multiple users in the meantime, so they're in a usable state, however documentation and CI could get some more love. Threading unfortunately proved much harder than anticipated, but at least 2024 has brought some great proposals to light, which we hopefully can tackle soon. For Builder API, we overestimated how much of a priority it would be -- it looks like most users are happy with the proc-macro one, and many ask for more macro features.

On the other hand, multiple achievements weren't originally planned and are mentioned in above's _Library highlights_ section. For next year, some
important breakthroughs would be:

* **A threading model** (still) -- we should probably not aim for the perfect one, but rather a decent, pragmatic API that allows to get things done.
* **WebAssembly** -- while in a working state, Wasm presents quite a high bar for newcomers. Documentation, CI and tools to assist setup would help here.
* **Setup tools** -- speaking of which, configuring godot-rust projects has come up a few times. Some automation would relieve users from mundane tasks and give them more time to build great games. Examples are creating a fresh project template, syncing `.gdextension` or `.cargo/config.toml` files.
* **Signals** -- one of the last big bastions in terms of ergonomics. Making `#[signal]` more useful will empower users to work with signals in a way that's on par, or -- in case of type-safety -- even beyond GDScript.


### GitHub stats

Compared to last year, here are again some stats for the [GitHub project][godot-rust-github]:

| Statistic                    | 2023  | 2024  |
|------------------------------|-------|-------|
| Commits                      | 1,239 | 2,137 |
| Contributors                 | 55    | 83    |
| Stars                        | 2,050 | 3,255 |
| Forks                        | 131   | 212   |
| Issues Closed (as Completed) | 139   | 266   |
| Issues Open                  | 91    | 95    |
| Pull Requests Merged         | 262   | 517   |
| Pull Requests Open           | 2     | 5     |

Overall, there's a steady, healthy growth to the project -- but one metric seems particularly interesting (and surprising).
The number of open issues has barely increased, despite godot-rust now being used in many more projects!

It seems that tackling the challenges is definitely feasible, which gives a very optimistic outlook into the new year!

This has only been possible thanks to the relentless efforts of the amazing community, be it helping other users, contributing to the library or simply building great things. Massive thanks to everyone being a part in the journey.

**A Happy New Year and great start into 2025!**


[#18]: https://github.com/godot-rust/gdext/issues/18
[#2]: https://github.com/godot-rust/gdext/issues/2
[#470]: https://github.com/godot-rust/gdext/issues/470
[#498]: https://github.com/godot-rust/gdext/issues/498
[#4]: https://github.com/godot-rust/gdext/issues/4
[#501]: https://github.com/godot-rust/gdext/pull/501
[book-ecosystem]: https://godot-rust.github.io/book/ecosystem
[dev-june]: ../june-2024-update
[dev-november]: ../november-2024-update
[dev-update-2023]: ../godot-rust-2023-review
[godot-rust-changelog]: https://github.com/godot-rust/gdext/blob/master/Changelog.md
[godot-rust-crate]: https://crates.io/crates/godot
[godot-rust-github]: https://github.com/godot-rust/gdext
[godot-rust-script]: https://github.com/titannano/godot-rust-script
