#!/bin/bash
# Copyright (c) godot-rust; Bromeon and contributors.
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

set -e

repo="$1"
num="$2"
#date=$3

SD_VERSION="1.0.0"

# Find main crate name
case $repo in
	"gdnative")
		mainCrate="gdnative"
		features="--features async,serde,inventory"
		;;
	"gdext")
		mainCrate="godot"
		# Could add experimental-threads in the future, but for now it's unstable and possibly more confusing.
		features="--features experimental-godot-api"
		;;
	*)
		echo "Invalid repo '$repo'; abort."
		exit 1
		;;
esac

PRE="Docs | $repo/$num |"
echo "$PRE start PUT operation (crate '$mainCrate')."

if [[ "$num" == "master" ]]; then
	gitRef="master"
	dir="$repo/master"
	prettyNum="Latest master"
else
	gitRef="pull/$num/head"
	dir="$repo/pr-$num"
	prettyNum="Pull Request #$num"
fi

# Checkout PR branch
if [[ -d "$dir" ]]; then
    # Note: this doesn't happen in CI, maybe locally
	echo "$PRE already deployed, update..."
else
	echo "$PRE initial deployment, create..."
	git clone "https://github.com/godot-rust/$repo.git" --depth 1 --no-checkout cloned
fi

# Update to latest commit
cd cloned
git fetch origin "$gitRef"

git reset --hard FETCH_HEAD --quiet
echo "----------------------------------------"
git log -n 1
echo "========================================"


# For gdext, add feature/cfg annotations in docs. This needs nightly rustdoc + custom preprocessing.
# Replace #[cfg(...)] with #[doc(cfg(...))], a nightly feature: https://doc.rust-lang.org/unstable-book/language-features/doc-cfg.html
# Potential alternative: https://docs.rs/doc-cfg/latest/doc_cfg
#
# TODO currently, this uses gdext master without custom-godot, so latest 4.x features (of the in-dev version) are not available.
# We cannot just pretend we are on 4.x, because code will not compile with the default C/JSON headers. We would need custom-godot
# and a running engine, which is a bit overkill.
if [[ "$repo" == "gdext" ]]; then
  # Install sd (modern sed). No point in waiting for eternal `cargo install` if we can fetch a prebuilt binary in 1s.
  echo "$PRE install sd (modern sed)..."
  curl -L https://github.com/chmln/sd/releases/download/v${SD_VERSION}/sd-v${SD_VERSION}-x86_64-unknown-linux-musl.tar.gz -o archive.tar.gz
  mkdir -p tools
  tar -zxvf archive.tar.gz -C tools --strip-components=1

  echo "$PRE preprocess docs..."

  # Patch Cargo.toml to pull from nightly prebuilt artifacts.
  # This allows to use JSON and C headers from the in-development Godot 4.x engine, enabling latest #[cfg(since_api = "4.x")] features for docs.
  cat >> "Cargo.toml" <<- HEREDOC
[patch."https://github.com/godot-rust/godot4-prebuilt"]
godot4-prebuilt = { git = "https://github.com//godot-rust/godot4-prebuilt", branch = "nightly" }
HEREDOC

  # Enable feature in each lib.rs file.
  # Note: first command uses sed because it's easier, and only handful of files.
  find . -type f -name "lib.rs" -exec sed -i '1s/^/#![feature(doc_cfg)]\n/' {} +

  # Then do the actual replacements.
  find . \(               \
    -path "./godot" -o    \
    -path "./godot-*" \)  \
  -type f -name '*.rs' | while read -r file; do

      # Replace #[cfg(...)] with #[doc(cfg(...))]. Do not insert a newline, in case the #[cfg] is commented-out.
      # shellcheck disable=SC2016
      ./tools/sd '(\#\[(cfg\(.+?\))\])\s*([A-Za-z]|#\[)' '$1 #[doc($2)]\n$3' "$file"
      #                               ^^^^^^^^^^^^^^^^^ require that #[cfg] is followed by an identifier or a #[ attribute start.
      # This avoids some usages of function-local #[cfg]s, although by far not all. Others generate warnings, which is fine.

  done
fi

# Build docs
echo "$PRE build Rust docs of crate '$mainCrate' ($features)..."
up=".."
# shellcheck disable=SC2086
export RUSTFLAGS="-A unused_imports -A dead_code -A unexpected_cfgs"
cargo +nightly doc -p $mainCrate $features --no-deps --target-dir $up/target
#mkdir -p "$up/target/doc"
cd $up

# Write HTML redirect page (dir = "$repo/pr-$num" or "$repo/master")
htmlFile="target/doc/index.html"
repoHtmlFile="repo-index.html"
redirectUrl="/docs/$dir/$mainCrate"

echo "$PRE write HTML branch redirect: /docs/$dir -> $redirectUrl"

# Note: cache control not reliable through meta. The below redirection may remain cached in browsers.
# Alternatively, use JS. Also, consider https://github.com/rust-lang/cargo/issues/739 in the future.
cat > "$htmlFile" <<- HEREDOC
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=$redirectUrl" />
  </head>
</html>
HEREDOC

# If this is master, also put one in /docs/$repo, which also links to the master page
if [[ "$num" == "master" ]]; then
    echo "$PRE write HTML repo redirect:   /docs/$repo -> $redirectUrl"
    cat > "$repoHtmlFile" <<- HEREDOC
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=/docs/$repo/master/$mainCrate" />
  </head>
</html>
HEREDOC
fi

# Recognize min crate version, replace with current PR/master version
libVersion=$(grep -Po '^version = "\K[^"]*' "cloned/$mainCrate/Cargo.toml")
echo "$PRE detected crate: $mainCrate v$libVersion."
find "target/doc/$mainCrate" -name .html -o -type f -print0 | xargs -0 sed -i 's/'"Version $libVersion"'/'"$prettyNum"'/g'

# Copy docs
echo "$PRE deploy docs for #$num..."

if [[ -d "docs/$dir" ]]; then
    echo "$PRE docs already exist, update..."
    echo "PUT_STATUS=Update" >> "$GITHUB_ENV"
    rm -rf "docs/$dir"
else
    echo "$PRE docs are new, create..."
    echo "PUT_STATUS=Create" >> "$GITHUB_ENV"
fi

mkdir -p "docs/$dir"
mv target/doc/* "docs/$dir"
if [[ "$num" == "master" ]]; then
    mv $repoHtmlFile "docs/$repo/index.html"
fi

echo "$PRE PUT operation completed."
