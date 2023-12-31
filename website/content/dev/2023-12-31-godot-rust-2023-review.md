+++
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

title = "2023 in Review:~Establishing Rust as a Godot 4 language"
authors = ["Bromeon"]

[extra]
summary = "A retrospective on the achievements of the godot-rust community in 2023."
tags = ["retrospective", "dev-update", "2023"]
+++

2023 was a crucial year for the **godot-rust** project. Not only did Rust gain traction as a language in the Godot ecosystem, but we also saw the release of Godot 4.0 and with it an important milestone towards production-readiness.

This article serves as a retrospective on the past year and highlights the achievements of the godot-rust community.


## Where it started

2022 was a year of extensive tinkering in a small setting, accompanied by highly appreciated input from [cuddlefishie][user-cuddlefishie], [chitoyuu][user-chitoyuu] and [Waridley][user-waridley], who were already involved with the **gdnative** library (the Rust bindings for Godot 3).
In November 2022, I open-sourced **gdext** as the experimental Godot 4 bindings.

While the library was able to run the dodge-the-creeps example, a lot of central features were missing at the time. Arrays and dictionaries were not implemented, and neither were property exports. The project featured the absolute minimum to run the example. There were loads of bugs and safety issues. Nevertheless, 2022 resulted in a working prototype and an open-source foundation for the community to build upon.

January and February 2023 marked the point where several early adopters joined and contributed missing builtins: [arrays][#85], [packed arrays][#91], [dictionaries][#92], [vectors][#71], [quaternions][#68], [matrices][#124] and [colors][#123]. We also cultivated [issue #24][#24] as a central point for an up-to-date overview of the implemented features. Furthermore, [utility functions][#61], property exports ([#45], [#177]) and a [GDScript test runner][#103] were implemented. Most of the contributions at the time came from [ttencate][user-ttencate], [mhoff12358][user-mhoff12358] and [lilizoey][user-lilizoey] (who has also helped maintain the library since). Thanks a lot for jumping into the cold water!


## Godot 4.0 and the road to stability

After years of ambitious work, Godot developers [released major version 4.0][godot-4.0] on March 1st, effectively turning Godot 4 from an in-dev prototype into a tangible release. According to official plans, it would take 1-2 minor versions to get a lot of the initial work ironed out (due to new user feedback), but the foundation was definitely there.

For binding maintainers, 4.0 was a great relief as well, since it meant that we'd now have official versions to target and that breaking changes would not occur every other week anymore -- as was the case during Godot 4 alpha and beta stages.

However, the GDExtension API was not fully ready at the time; its design didn't allow for long-term binary backward compatibility. This was fixed for Godot 4.1, in large parts due to the great efforts of [dsnopek][user-dsnopek] and the [GDExtension team][godot-gdextension-team], who came up with thorough proposals toward stability and extensibility.

The significance of backward compatibility from 4.1 onwards cannot be overstated: it meant that users developing an extension in 4.1 can still run it with Godot 4.9. What sounds like a "nice-to-have" is absolutely essential for building an ecosystem: if you want to combine a handful GDExtension plugins (e.g. some written in C++, some in Swift, some in Rust), it's very likely that they target different Godot versions and are maintained with varying activity. Not having compatibility would force you to recompile every single plugin for the Godot version you target.


## Features upon features

Spring and summer were defined by a continued mapping of GDExtension APIs to Rust.  
Some noteworthy highlights:

1. [Virtual function traits][#136] extended virtual methods far beyond the hardcoded `ready()`, `process()` and `physics_process()`. A dedicated trait for each class allowed to very specifically select which functionality to override.
1. [Default parameters][#322] allowed to optionally provide arguments to engine APIs. Since Rust doesn't natively offer default parameters, we use the builder pattern.
   * Example: `object.connect_ex(signal, callable).flags(flags).done()`
1. Improved code generation for engine API.
   * [Native structures][#272] 
   * [Constants][#219]
   * [Bitfields][#524]
1. Extended builtin support and integration of Godot data structures with Rust idioms.
   * [`Callable`][#231]
   * [`GodotString::chars_checked()`][#161] to access UTF-32 characters.
   * [`PackedArray::as_slice()`][#307] to access elements via slice.
1. Registration of Rust symbols.
   * [`#[derive(FromVariant, ToVariant)]`][#246] swiftly maps user types to and from `Variant`.
   * [User-defined constants][#321]
   * [User-defined enums][#371]
   * [Notification API][#223]: type-safe rather than integer constants.
   * [Export parameters][#309]: GDScript's `@export_range` etc.
   * [`OnReady<T>`][#534] to enable late initialization of properties.
1. [Hot reloading][#437] was one of the most anticipated Godot 4.2 features. Its integration into gdext marked a tremendous improvement for dev cycles, no longer needing to restart the editor.
1. Higher-level abstractions: in cases where a "raw" Godot API is prone to memory/type unsafety or other errors, higher-level interfaces can provide a nicer user experience. Examples include:
   * [Script extensions][#492], allowing the user to implement `GDExtensionScriptInstance`.
   * [The `GFile` struct][#473], which wraps `FileAccess` and integrates it with Rust's `std::io` traits.
   * `load::<T>(file_path)` to load Godot resources from the `res://` filesystem.
   * `get_node_as::<T>(node_path)` to get a node, given a path and type.
   * `InstanceId` as a non-null object ID.
   * `godot_print!` that prints to the Godot console and works like `println!`.
1. Support for more build configurations.
   * [Double-precision builds][#149] enabled using Godot's `precision=double` build flag.
   * [An early approach to threading][#212] opened the door to further discussion on `Sync` types.
   * [The `serde` feature][#237] enabled serialization with the `serde` crate (later extended in [#508]).



## WebAssembly support

Initial support for Web exports has been added in pull request [#493]. While still experimental, this addition is a proof-of-concept that Rust can be used for Godot web games and marks a huge step forward in our platform support. There is also a [tutorial in the book][book-wasm] explaining the setup.

Thanks a lot to [zecozephyr][user-zecozephyr], [Esption][user-esption] and [PgBiel][user-pgbiel] for their great collaboration towards this achievement.


## Large-scale refactors and FFI hell

Now that the shiny parts are out of the way, let's descend into the mines.

The library underwent _a lot_ of bugfixes and refactorings during 2023, many of which are related to the interaction with the GDExtension C API via FFI. These are typically not witnessed immediately, but contribute to an overall more robust and streamlined experience. FFI with Godot is a topic of significant complexity, especially because there are so many different integration points, all of which work in subtly different ways.[^gdextension-dimensions]

It would be too much to list all the changes, but here is a sample of larger refactorings:

1. [`ToGodot`/`FromGodot` traits][#421] unified two previously competing marshalling mechanisms into a single API. This reduces the burden for users to make their types interoperate with Godot, while at the same time benefiting from optimizations (FFI ptrcalls) where possible.
1. [Lazy function pointers][#387] significantly reduce both runtime overhead to perform FFI calls and the amount of code that needs to be compiled in `godot-core`. An extended discussion of the improvements is available in the blog post _[FFI Optimizations and Benchmarking][devlog-ffi]_.
1. [Pointer call refactoring][#204] changed the way how values are passed to and from Godot, fixing several use-after-free bugs. 

A more detailed insight can be obtained by looking at [merged pull requests with the `ub` label][prs-ub] (15 at the time of writing). These include fixes related to undefined behavior, and thus improved robustness of the library. Almost all of them are covered by regression tests, ensuring that we won't encounter them again in the future.


## Tooling and infrastructure

The godot-rust project involves much more than just code. We have strived to improve the contribution experience for newcomers, providing short and helpful feedback loops. Efforts that have gone into infrastructure span different areas:

1. [Ever-increasing CI coverage][#38] boosts confidence that new contributions are held to a high standard and that existing functionality keeps working. Cargo's toolchain lets us run unit tests, clippy and rustfmt. Additionally, we built a custom integration test suite that runs gdext code against multiple versions of Godot in CI. A minimalist local version of these checks additionally exists as the `check.sh` script.
1. [Address and leak sanitizers][#325] are tools from the C++ ecosystem, but equally useful in Rust. We cannot generally use `miri` due to FFI; however, address sanitizers can detect undefined behavior such as use-after-free or out-of-bound access. Leak sanitizers can detect memory leaks.
1. [Prebuilt artifacts][#211] shrink the dependency tree to around 30% of its previous size, avoiding heavy crates like `bindgen` and `syn`. By pre-compiling `bindgen` artifacts for different platforms, initial builds are sped up considerably and an external LLVM installation is no longer needed. This in turn benefits CI times, further improving integration cycles.
1. [The book][github-book] provides tutorials to get started with gdext and is also maintained on GitHub.  
   It was split from the [gdnative book][github-gdnative-book] for clarity.
1. [The website][github-website] was fundamentally rewritten with a fresh look. It links to all the relevant places, hosts API docs and this devlog.
1. [Automated doc generation in PRs][#259] runs `cargo doc` for every single pull request opened, publishes the results to a temporary page on our website, and lets a bot comment on the PR with a link to the docs. This allows both contributors and reviewers to see how the resulting API looks.
1. [Custom formatting][#303] replaces the annoyingly slow `rustfmt` for generated code, while still preserving human readability.
1. [GitHub merge queues][#337] are the successor to the `bors` bot. They enforce that checks are always run against latest `master`, independent of any other changes that have landed since a branch was opened.

See also [list of merged tooling-related PRs][prs-tooling] (54 at the time of writing). While these only include pull requests on the main repo, they give a good insight into all the smaller tweaks behind the scenes.

The [gdnative][github-gdnative] library continues to be maintained -- it is mostly feature-complete and lays a focus on stability and minimizing breaking changes. There is likely going to be a Godot 3.6 LTS release in the coming year. Thanks to [chitoyuu][user-chitoyuu] for ongoing work on the gdnative front!


## Outlook

In numbers, the [GitHub project for gdext][github-gdext] today has:
* 1239 commits, by 55 contributors
* 2050 stars and 131 forks
* 139 issues closed as completed, 91 open
* 262 pull requests merged, 2 open

2023 was a year of great progress for godot-rust. What started as a small proof-of-concept, has matured a lot in terms of features and robustness. This would not have been remotely possible without the help of the generous open-source community. Thanks a lot to everyone for the countless hours spent -- whether it's [as a contributor][github-contributors] navigating through FFI mineshafts in search of light, helping others on Discord, or simply trying out the library and providing feedback -- every effort is highly appreciated!

For the coming year, the focus lies on making the core systems even more stable, as well as promoting an ergonomic, pragmatic gamedev workflow. There will likely still be some breaking changes to unify the overall experience, but we try to work with deprecations to ease migrations.

Some of the larger things planned for 2024 are:
* [Re-entrant calls for object references][#501] (in progress).
* [Publish to crates.io.][#2]
* [Better threading support.][#18]
* [Builder API for registration.][#4]
* Initial support for [Android][#470] and [iOS][#498] -- would however need some volunteers (also due to separate devices/toolchains).

The majority of the scaffolding and infrastructure is now there, so future work can focus more directly on innovation. With that and a growing user base, 2024 looks very exciting! 

A Happy New Year to everyone!

<br>

---

### Footnotes

[^gdextension-dimensions]:  
GDExtension offers different dimensions to interop with Godot, all of which need to be honored for safe FFI:
* Calls to engine: builtin methods, class methods, utility functions.
* Callbacks from engine: virtual functions, separate callbacks for `to_string`, `notification`, etc.
* Calling convention: _varcall_ vs. _ptrcall_.
* Memory management: value semantics, manually managed, ref-counted, copy-on-write.

[#508]: https://github.com/godot-rust/gdext/pull/508
[#437]: https://github.com/godot-rust/gdext/pull/437
[#237]: https://github.com/godot-rust/gdext/pull/237
[#103]: https://github.com/godot-rust/gdext/pull/103
[#123]: https://github.com/godot-rust/gdext/pull/123
[#124]: https://github.com/godot-rust/gdext/pull/124
[#136]: https://github.com/godot-rust/gdext/pull/136
[#149]: https://github.com/godot-rust/gdext/pull/149
[#161]: https://github.com/godot-rust/gdext/pull/161
[#177]: https://github.com/godot-rust/gdext/pull/177
[#18]: https://github.com/godot-rust/gdext/issues/18
[#204]: https://github.com/godot-rust/gdext/pull/204
[#211]: https://github.com/godot-rust/gdext/pull/211
[#212]: https://github.com/godot-rust/gdext/pull/212
[#219]: https://github.com/godot-rust/gdext/pull/219
[#223]: https://github.com/godot-rust/gdext/pull/223
[#231]: https://github.com/godot-rust/gdext/pull/231
[#246]: https://github.com/godot-rust/gdext/pull/246
[#24]: https://github.com/godot-rust/gdext/issues/24
[#259]: https://github.com/godot-rust/gdext/pull/259
[#272]: https://github.com/godot-rust/gdext/pull/272
[#2]: https://github.com/godot-rust/gdext/issues/2
[#303]: https://github.com/godot-rust/gdext/pull/303
[#307]: https://github.com/godot-rust/gdext/pull/307
[#309]: https://github.com/godot-rust/gdext/pull/309
[#321]: https://github.com/godot-rust/gdext/pull/321
[#322]: https://github.com/godot-rust/gdext/pull/322
[#325]: https://github.com/godot-rust/gdext/pull/325
[#337]: https://github.com/godot-rust/gdext/pull/337
[#371]: https://github.com/godot-rust/gdext/pull/371
[#387]: https://github.com/godot-rust/gdext/pull/387
[#38]: https://github.com/godot-rust/gdext/issues/38
[#421]: https://github.com/godot-rust/gdext/pull/421
[#45]: https://github.com/godot-rust/gdext/pull/45
[#470]: https://github.com/godot-rust/gdext/issues/470
[#473]: https://github.com/godot-rust/gdext/pull/473
[#492]: https://github.com/godot-rust/gdext/pull/492
[#493]: https://github.com/godot-rust/gdext/pull/493
[#498]: https://github.com/godot-rust/gdext/issues/498
[#4]: https://github.com/godot-rust/gdext/issues/4
[#501]: https://github.com/godot-rust/gdext/pull/501
[#524]: https://github.com/godot-rust/gdext/pull/524
[#534]: https://github.com/godot-rust/gdext/pull/534
[#61]: https://github.com/godot-rust/gdext/pull/61
[#68]: https://github.com/godot-rust/gdext/pull/68
[#71]: https://github.com/godot-rust/gdext/pull/71
[#85]: https://github.com/godot-rust/gdext/pull/85
[#91]: https://github.com/godot-rust/gdext/pull/91
[#92]: https://github.com/godot-rust/gdext/pull/92
[book-wasm]: https://godot-rust.github.io/book/toolchain/export-web.html
[devlog-ffi]: https://godot-rust.github.io/dev/ffi-optimizations-benchmarking
[github-book]: https://github.com/godot-rust/book
[github-contributors]: https://github.com/godot-rust/gdext/graphs/contributors
[github-gdext]: https://github.com/godot-rust/gdext
[github-gdnative]: https://github.com/godot-rust/gdnative
[github-gdnative-book]: https://github.com/godot-rust/gdnative-book
[github-website]: https://github.com/godot-rust/godot-rust.github.io
[godot-4.0]: https://godotengine.org/article/godot-4-0-sets-sail
[godot-gdextension-team]:  https://godotengine.org/teams
[prs-tooling]: https://github.com/godot-rust/gdext/pulls?q=is%3Apr+is%3Amerged+label%3A%22c%3A+tooling%22+sort%3Acreated-asc+
[prs-ub]: https://github.com/godot-rust/gdext/pulls?q=label%3Aub+is%3Amerged+sort%3Acreated-asc
[user-chitoyuu]: https://github.com/chitoyuu
[user-cuddlefishie]: https://github.com/cuddlefishie
[user-dsnopek]: https://github.com/dsnopek
[user-esption]: https://github.com/Esption
[user-lilizoey]: https://github.com/lilizoey
[user-mhoff12358]: https://github.com/mhoff12358
[user-pgbiel]: https://github.com/PgBiel
[user-ttencate]: https://github.com/ttencate
[user-waridley]: https://github.com/Waridley
[user-zecozephyr]: https://github.com/zecozephyr
