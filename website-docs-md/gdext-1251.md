+++
title = "#1251"
date = 2025-07-26

[extra]
repo = "gdext"
docs_rel_url = "gdext/pr-1251/godot"
pr_url = "https://github.com/godot-rust/gdext/pull/1251"
pr_author = "Yarwin"
sort_key = 2025-07-26
date_time = 2025-07-26T07:45:22Z
commit_sha = "b3d14d518d3d81af42662d0c92e7a3452c292c0f"
+++

Fix `is_main_thread` being gated behind `#[cfg(not(wasm_nothreads))]` despite being necessary to build wasm nothread.
