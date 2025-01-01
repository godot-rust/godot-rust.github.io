#!/bin/bash
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

set -e

op="$1"
repo="$2"
num="$3"
longSha="$4"
date="$5"

# Race conditions are partially mitigated by checking against timestamp (when pulling newer commits), as well as the "CI mutex"
# that protects a "critical section" of the workflow.
#
# However, it's still possible to encounter bugs: a PR reopen event is followed by a close event (and close finishes first, as it
# does not generate docs). The close event succeeds "stale" (as PR was still closed, i.e. no docs).
# Reopen later succeeds _despite being older_ -> inconsistent state (PR closed, but docs online).
# This can be mitigated by always committing (no abort on stale).


PRE="Docs | $repo/$num |"
echo "$PRE start COMMIT operation."

if [[ "$repo" == "gdnative" ]]; then
    echo "$PRE INFO: 'gdnative' no longer deployed. Aborting."
    echo "SKIP_WEBSITE_DEPLOY=true" >> "$GITHUB_ENV"
    exit 0
fi

git config user.name "Godot-Rust Automation"
git config user.email "GodotRust@users.noreply.github.com"

if [[ "$num" == "master" ]]; then
	dir="$repo/master"
	mdFile="$repo-master"
else
	dir="$repo/pr-$num"
	mdFile="$repo-$num"
fi

# No need to git-add last-changed.txt here, it's done in 2nd commit below

# Stage changes (don't quote wildcards!)
if [[ "$op" == "put" ]]; then
    git add website-docs-md/"$mdFile"*.md
    git add "docs/$repo/index.html" # redirect; requires master to have run first
    git add "docs/$dir" 2>/dev/null
else
    # If above files are not marked for deletion (or already staged), warn
    if [[ -z "$(git status --porcelain "website-docs-md/$mdFile.md")" ]] \
    || [[ -z "$(git status --porcelain "docs/$dir")" ]]; then
        # We still have to update the timestamp so that other jobs know that this deletion happened now
        # (so an older PR reopen doesn't overwrite this close).
        echo "::warning::Branch is already deleted; only update timestamp."
#        echo "SKIP_WEBSITE_DEPLOY=true" >> "$GITHUB_ENV"
#        exit 0
    else
        git add -u website-docs-md/"$mdFile"*.md
        git add -u "docs/$dir" 2>/dev/null
    fi
fi

# Time of event that triggered this workflow
myTimestamp=$(date -d "$date" +%s)
echo "$PRE local timestamp: $myTimestamp."

# Use www.github.com and not github.com, because the latter creates back-references in the pull requests,
# polluting the comment history. For commits it's fine, because there are no back-references.
# See https://github.com/orgs/community/discussions/23123#discussioncomment-3239240
echo "$PRE commit..."
if [[ "$op" == "delete" ]]; then
    # allow-empty: if branch is already deleted, don't abort
    what="$repo PR #$num"
    body="

        Pull request: https://www.github.com/godot-rust/$repo/pull/$num
        Triggered at: $date
        "

    git commit -m "Remove ${what}${body}" || {
        git commit --allow-empty -m "Remove $what (unchanged)${body}"

#            echo "::warning::Nothing to commit, branch is already deleted; abort."
#            echo "SKIP_WEBSITE_DEPLOY=true" >> "$GITHUB_ENV"
#            exit 0
      }
else
    shortSha=$(git rev-parse --short "$longSha")
    if [[ "$num" == "master" ]]; then
        what="$repo master"
        body="

            Commit:       https://www.github.com/godot-rust/$repo/commit/$longSha
            Triggered at: $date
            "

        git commit -m "$PUT_STATUS $what (\`$shortSha\`)${body}" || {
            git commit --allow-empty -m "$PUT_STATUS $what (\`$shortSha\`, unchanged){$body}"
        }
    else
        what="$repo PR #$num"
        body="

            Pull request: https://www.github.com/godot-rust/$repo/pull/$num
            Commit:       https://www.github.com/godot-rust/$repo/pull/$num/commits/$longSha
            Triggered at: $date
            "

        git commit -m "$PUT_STATUS $what (\`$shortSha\`)${body}" || {
            git commit --allow-empty -m "$PUT_STATUS $what (\`$shortSha\`, unchanged){$body}"
        }
    fi
fi


echo "----------------------------------------"
echo "$PRE local log:"
git log -n4
echo "========================================"

echo "$PRE fetch upstream, in case other workflows have changes in the meantime..."
git fetch

# Read upstream timestamp, if file available
echo "$PRE check if upstream has information about timestamp..."
git restore --source origin/doc-output "last-changed.txt" || true # don't fail if no upstream yet
if [[ -f "website-docs-md/$mdFile.md" ]]; then
    # From the line that contains "$timestamp:$repo/$num.", extract the timestamp
    echo "$PRE read upstream timestamp..."
    upstreamTimestamp=$( (grep ":$repo/$num." last-changed.txt || echo "0") | sed -E 's/^([^:]+):.*$/\1/')
    echo "$PRE upstream timestamp: $upstreamTimestamp."
else
    echo "$PRE no upstream file with timestamp available."
    upstreamTimestamp=0 # older than every timestamp
fi

# Reset file fetched for upstream timestamp (don't fail if not yet created)
git restore "last-changed.txt" || true

# If upstream timestamp is newer, abort (> because upstream could be == this commit, if nothing is pulled)
if [[ "$upstreamTimestamp" -gt "$myTimestamp" ]]; then
    echo "::warning::Upstream timestamp is newer; current run has outdated info and is aborted."
    # set env var to indicate that this run is outdated
    echo "SKIP_WEBSITE_DEPLOY=true" >> "$GITHUB_ENV"
    exit 0
fi

# Arriving here means local changes are newer than upstream, and since we're in a critical section (ci-mutex-docs),
# no other changes can arrive during this very code. So we can overwrite upstream changes with local ones, _for the given PR/master branch_.

# Note:
# * doc-output          = changes by this commit = theirs (we're on other branch)
# * upstream-doc-output = changes by other jobs  = ours

# If available, merge changes from other jobs that have pushed in the meantime
if git ls-remote --exit-code --heads origin doc-output >/dev/null 2>&1; then
    # We need more than just `git pull -X ours`, since it's possible that:
    #   1. at the time when cargo doc starts ("Generate/sync docs" step), the upstream branch does not exist yet
    #   2. after that and now, the branch is created by another workflow (this is not yet part of critical section)
    # So in that case, the histories of upstream and local branches are disjoint, meaning we cannot merge. Thus cherry-pick.
    echo "$PRE checkout remote branch..."
    git diff --exit-code --quiet || {
        echo "::error::Unstaged changes before switch:"
        git status
        exit 1
    }
    git diff --staged --exit-code --quiet || { echo "::error::Uncommitted changes before switch:"; git status; exit 1; }
    git switch -t -c upstream-doc-output origin/doc-output
    echo "----------------------------------------"
    echo "$PRE upstream log:"
    git log -n4
    echo "========================================"

    echo "$PRE merge local changes into remote ones..."

    git merge doc-output -m "Consolidate intermediate changes" --no-commit || {
        # Note: logic is the same as if merge succeeds
        echo "::warning::Merge failed; resolve conflicts..."
        echo "----------------------------------------"
        echo "$PRE Contents of last-changed.txt:"
        cat last-changed.txt
        echo "========================================"
    }

    # We cannot merge the last-changed.txt file with Git, because line-based overwrites may be incorrect.
    # Instead, get the upstream changes (which are newer as per timestamp check) and just re-apply local timestamp, always.
    git restore last-changed.txt
    bash documentation/update-last-changed.sh "$repo" "$num" "$date"
    git add last-changed.txt

    # Manually resolve conflicts.
    #
    # Note: `-X theirs` only checks for modifications inside a file, and fails if there is a whole-file conflict
    # (e.g. if the upstream changes have modifications, but the local ones delete the docs). Not used here, but good to know.
    if git cat-file -e doc-output:website-docs-md/"$mdFile".md; then
        # File exists locally. Effectively repeat `merge -X theirs` for files besides last-changed.txt.
        echo "$PRE Docs present in local changes; merge using them."
        git restore --source doc-output website-docs-md/"$mdFile*".md docs/"$dir"
        echo "$PRE restored 2. <<<"
        git add website-docs-md/"$mdFile*".md docs/"$dir"

    elif [[ -f "website-docs-md/$mdFile.md" ]]; then
        # Files deleted in local changes, but present in upstream. Delete them.
        echo "$PRE Docs absent in local changes; delete them."
        rm -rf website-docs-md/"$mdFile*".md docs/"$dir"
        echo "$PRE removed. <<<"
        git add -u website-docs-md/"$mdFile*".md docs/"$dir"
    fi

#    git merge -X ours doc-output  || {
#        echo "::warning::No upstream branch; cherry-pick instead of pull."
#        git merge --abort || true
#        git cherry-pick doc-output
#    }

    echo "$PRE commit merge..."
    git commit -m "Integrate $what" || true # don't fail if our branch is ahead (nothing to merge)
    echo "----------------------------------------"
    echo "$PRE log after merge:"
    git log -n4
    echo "========================================"
else
    echo "$PRE no remote exists for branch yet; no pull needed."

    bash documentation/update-last-changed.sh "$repo" "$num" "$date"
    git add last-changed.txt
    git commit -m "Initial setup"
fi

echo "$PRE push to 'doc-output' branch..."
git push origin HEAD:doc-output

echo "$PRE COMMIT operation completed."
