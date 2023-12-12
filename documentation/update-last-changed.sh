#!/bin/bash
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

# shellcheck disable=SC2002

set -e

repo="$1"
num="$2"
date="$3"

PRE="Docs | $repo/$num |"

# Update last-updated list
timestamp=$(date -d "$date" +%s)

echo "$PRE update last-changed list..."
echo "----------------------------------------"
echo "$PRE last-changed before:"
cat last-changed.txt || echo "(file not yet available)"
echo "========================================"

# Remove previous line for that branch (if available). Include '.' to avoid matching "gdext/123" in "gdext/1".
(cat last-changed.txt || echo "") | grep -v "$repo/$num." > tmp.txt
mv tmp.txt last-changed.txt

echo "$timestamp:$repo/$num." >> last-changed.txt
cat last-changed.txt | sort -r > tmp.txt
mv tmp.txt last-changed.txt

echo "----------------------------------------"
echo "$PRE last-changed after:"
cat last-changed.txt
echo "========================================"
