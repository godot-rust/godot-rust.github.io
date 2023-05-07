# Website and API Docs infrastructure

Contains the source files for https://godot-rust.github.io and the CI infrastructure to generate real-time documentation from latest commits. This CI is based on GitHub Actions and offers the following workflow:
* Supports `gdnative` and `gdext` repos.
* Triggered via push to master and pull requests.
* Runs `cargo doc` for the respective branch.
* Creates an overview page with all active docs.
* Deploys generated docs to the website.

The website is built with [Zola], a static site generator implemented in Rust. We use a custom theme inspired by [Blow], together with [Tailwind CSS] for styling.

[Zola]: https://www.getzola.org
[Blow]: https://www.getzola.org/themes/blow
[Tailwind CSS]: https://tailwindcss.com
