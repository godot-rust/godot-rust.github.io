#!/bin/bash
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

set -e

repo="$1"
num="$2"
#date="$3"

PRE="Docs | $repo/$num |"
echo "$PRE start DELETE operation."

#grep -v "$repo $num" deployed.txt > deployed-tmp.txt
#mv deployed-tmp.txt deployed.txt

# Allow deletion of 'gdnative' master, since it's phased out.
if [[ "$num" == "master" && "$repo" != "gdnative" ]]; then
	echo "::error::Cannot delete docs for master branch."
	exit 1
fi

echo "$PRE before:"
tree -L 3

dir="$repo/pr-$num"
echo "$PRE remove doc directory..."
rm -rf "docs/$dir"

echo "$PRE remove markdown page..."
# wildcard to remove variants like -redirect; don't quote it!
rm -f website-docs-md/"$repo-$num"*.md

echo "$PRE after:"
tree -L 3

#bash documentation/update-last-changed.sh "$repo" "$num" "$date"

echo "$PRE DELETE operation completed."
