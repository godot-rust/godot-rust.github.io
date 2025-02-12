#!/bin/bash
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

# npm install tailwindcss@^3.0.0 @tailwindcss/cli

# For upgrade to tailwind v4, see https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.0.0.

npx tailwindcss --watch -i src/css/main.css -o static/css/main.css
