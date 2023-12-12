#!/bin/bash
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

set -e

#op="$1"
repo="$2"
num="$3"
longSha="$4"
date="$5"
prAuthor="$6"
prTitle="$7"

PRE="Docs | $repo/$num |"
echo "$PRE start WRITE_MD operation"

if [[ "$repo" == "gdnative" ]]; then
    mainCrate="gdnative"
elif [[ "$repo" == "gdext" ]]; then
    mainCrate="godot"
else
    echo "Invalid repo '$repo'; abort."
    exit 1
fi

onlyDate="${date:0:10}"
#timestamp=$(date -d "$date" +%s)

if [ "$num" == "master" ]; then
    title="master"
    subdir="master"
    sortKey="9999-01-01"
    prUrl="https://github.com/godot-rust/$repo"
else
    title="#$num"
    subdir="pr-$num"
    # take only the date part of ISO string
    sortKey="${onlyDate:0:10}"
    prUrl="https://github.com/godot-rust/$repo/pull/$num"
fi

mkdir -p website-docs-md
directUrl="$repo/$subdir/$mainCrate"
parentUrl="$repo/$subdir"
buttonFile="website-docs-md/$repo-$num.md"
#redirectFile="website-docs-md/$repo-$num-redirect.md"

# Write docsUrl for later use
echo "DOCS_FULL_URL=https://godot-rust.github.io/docs/$parentUrl" >> "$GITHUB_ENV"

# Write "synthetic" page which is not its own page, but represents the data for the button
cat > "$buttonFile" <<- HEREDOC
+++
title = "$title"
date = $onlyDate

[extra]
repo = "$repo"
docs_rel_url = "$directUrl"
pr_url = "$prUrl"
pr_author = "$prAuthor"
sort_key = $sortKey
date_time = $date
commit_sha = "$longSha"
+++

$prTitle
HEREDOC

echo "$PRE Wrote button page to $buttonFile:"
echo "----------------------------------------"
cat "$buttonFile"
echo "========================================"
echo ""

# Disabled, because it didn't work and verbatim .html file was much easier.
#
# Write actual page, which serves as a static redirect from /docs/{repo}/{num} to /docs/{repo}/{num}/{mainCrate}
# See https://www.getzola.org/documentation/content/page/#front-matter
#
# Note: the `path` key only works if the file is in /content, not /content/docs.
# This is too complicated, easier to just manually dump a HTML during deployment; thus disabled for now.
#cat > "$redirectFile" <<- HEREDOC
#+++
#title = "Redirect to API docs of $repo/$num"
#template = "redirect-to-crate.html"
##path = "$repo/docs/$subdir"
#path = "dok/$subdir"
#
#[extra]
#crate = "$mainCrate"
#+++
#HEREDOC

#echo "$PRE Wrote redirect page to $redirectFile:"
#echo "----------------------------------------"
#cat "$redirectFile"
#echo "========================================"

echo "$PRE WRITE_MD operation completed."
