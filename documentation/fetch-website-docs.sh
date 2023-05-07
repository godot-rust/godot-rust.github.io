#!/bin/bash
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

repo="$1"
num="$2"

set -e

PRE="Docs | $repo/$num |"
echo "$PRE start FETCH_WEBSITE_DOCS operation"

echo "$PRE before:"
tree -L 3

git fetch
git switch gh-pages-prepared

echo "$PRE after switch:"
tree -L 3

# This whole ceremony is to retain other Zola-generated files inside docs/, but not Zola-generated gdnative-master, gdext-321, ... directories.
# Note that the directories with '-' come from /content generation, which is not needed in the deployed page (just for button customization).
rm -rf docs/gdext-* docs/gdnative-*

echo "$PRE after delete:"
tree -L 3

# Also include redirect index.html
git restore --source origin/doc-output docs/gdext || {
    echo "::warning::$PRE No upstream docs/gdext to restore"
}
git restore --source origin/doc-output docs/gdnative || {
    echo "::warning::$PRE No upstream docs/gdnative to restore"
}

echo "$PRE after restore:"
tree -L 3

git add docs 1>/dev/null

git config user.name "Godot-Rust Automation"
git config user.email "GodotRust@users.noreply.github.com"

#git commit -m "Move docs into subtree" --quiet
git commit -m "Move docs into subtree"
git push --force origin gh-pages-prepared:gh-pages
git push origin --delete gh-pages-prepared

echo "$PRE FETCH_WEBSITE_DOCS operation completed."
