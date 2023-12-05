(function() {var type_impls = {
"gdnative":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-MapMut-for-LocalCellData%3CT%3E\" class=\"impl\"><a href=\"#impl-MapMut-for-LocalCellData%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"gdnative/export/user_data/trait.MapMut.html\" title=\"trait gdnative::export::user_data::MapMut\">MapMut</a> for <a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"gdnative/export/trait.NativeClass.html\" title=\"trait gdnative::export::NativeClass\">NativeClass</a>,</div></h3></section></summary><div class=\"impl-items\"><section id=\"associatedtype.Err\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Err\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"gdnative/export/user_data/trait.MapMut.html#associatedtype.Err\" class=\"associatedtype\">Err</a> = <a class=\"enum\" href=\"gdnative/export/user_data/enum.LocalCellError.html\" title=\"enum gdnative::export::user_data::LocalCellError\">LocalCellError</a></h4></section><details class=\"toggle method-toggle\" open><summary><section id=\"method.map_mut\" class=\"method trait-impl\"><a href=\"#method.map_mut\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"gdnative/export/user_data/trait.MapMut.html#tymethod.map_mut\" class=\"fn\">map_mut</a>&lt;F, U&gt;(&amp;self, op: F) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;U, &lt;<a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt; as <a class=\"trait\" href=\"gdnative/export/user_data/trait.MapMut.html\" title=\"trait gdnative::export::user_data::MapMut\">MapMut</a>&gt;::<a class=\"associatedtype\" href=\"gdnative/export/user_data/trait.MapMut.html#associatedtype.Err\" title=\"type gdnative::export::user_data::MapMut::Err\">Err</a>&gt;<div class=\"where\">where\n    F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(&amp;mut &lt;<a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt; as <a class=\"trait\" href=\"gdnative/export/user_data/trait.UserData.html\" title=\"trait gdnative::export::user_data::UserData\">UserData</a>&gt;::<a class=\"associatedtype\" href=\"gdnative/export/user_data/trait.UserData.html#associatedtype.Target\" title=\"type gdnative::export::user_data::UserData::Target\">Target</a>) -&gt; U,</div></h4></section></summary><div class='docblock'>Maps a <code>&amp;mut T</code> to <code>U</code>. Called for methods that take <code>&amp;mut self</code>. <a href=\"gdnative/export/user_data/trait.MapMut.html#tymethod.map_mut\">Read more</a></div></details></div></details>","MapMut","gdnative::export::user_data::DefaultUserData"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-LocalCellData%3CT%3E\" class=\"impl\"><a href=\"#impl-Debug-for-LocalCellData%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/fmt/struct.Error.html\" title=\"struct core::fmt::Error\">Error</a>&gt;</h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","gdnative::export::user_data::DefaultUserData"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-LocalCellData%3CT%3E\" class=\"impl\"><a href=\"#impl-Clone-for-LocalCellData%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for <a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; <a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt;</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/clone.rs.html#169\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","gdnative::export::user_data::DefaultUserData"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-UserData-for-LocalCellData%3CT%3E\" class=\"impl\"><a href=\"#impl-UserData-for-LocalCellData%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"gdnative/export/user_data/trait.UserData.html\" title=\"trait gdnative::export::user_data::UserData\">UserData</a> for <a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"gdnative/export/trait.NativeClass.html\" title=\"trait gdnative::export::NativeClass\">NativeClass</a>,</div></h3></section></summary><div class=\"impl-items\"><section id=\"associatedtype.Target\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Target\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"gdnative/export/user_data/trait.UserData.html#associatedtype.Target\" class=\"associatedtype\">Target</a> = T</h4></section><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method trait-impl\"><a href=\"#method.new\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"gdnative/export/user_data/trait.UserData.html#tymethod.new\" class=\"fn\">new</a>(val: &lt;<a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt; as <a class=\"trait\" href=\"gdnative/export/user_data/trait.UserData.html\" title=\"trait gdnative::export::user_data::UserData\">UserData</a>&gt;::<a class=\"associatedtype\" href=\"gdnative/export/user_data/trait.UserData.html#associatedtype.Target\" title=\"type gdnative::export::user_data::UserData::Target\">Target</a>) -&gt; <a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt;</h4></section></summary><div class='docblock'>Creates a new owned wrapper from a <code>NativeClass</code> instance. <a href=\"gdnative/export/user_data/trait.UserData.html#tymethod.new\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.into_user_data\" class=\"method trait-impl\"><a href=\"#method.into_user_data\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"gdnative/export/user_data/trait.UserData.html#tymethod.into_user_data\" class=\"fn\">into_user_data</a>(self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.pointer.html\">*const </a><a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/ffi/enum.c_void.html\" title=\"enum core::ffi::c_void\">c_void</a></h4></section></summary><div class='docblock'>Takes a native instance and returns an opaque pointer that can be used to recover it. <a href=\"gdnative/export/user_data/trait.UserData.html#tymethod.into_user_data\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.consume_user_data_unchecked\" class=\"method trait-impl\"><a href=\"#method.consume_user_data_unchecked\" class=\"anchor\">§</a><h4 class=\"code-header\">unsafe fn <a href=\"gdnative/export/user_data/trait.UserData.html#tymethod.consume_user_data_unchecked\" class=\"fn\">consume_user_data_unchecked</a>(ptr: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.pointer.html\">*const </a><a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/ffi/enum.c_void.html\" title=\"enum core::ffi::c_void\">c_void</a>) -&gt; <a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt;</h4></section></summary><div class='docblock'>Takes an opaque pointer produced by <code>into_user_data</code> and “consumes” it to produce the\noriginal instance, keeping the reference count. <a href=\"gdnative/export/user_data/trait.UserData.html#tymethod.consume_user_data_unchecked\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from_user_data_unchecked\" class=\"method trait-impl\"><a href=\"#method.clone_from_user_data_unchecked\" class=\"anchor\">§</a><h4 class=\"code-header\">unsafe fn <a href=\"gdnative/export/user_data/trait.UserData.html#tymethod.clone_from_user_data_unchecked\" class=\"fn\">clone_from_user_data_unchecked</a>(ptr: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.pointer.html\">*const </a><a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/ffi/enum.c_void.html\" title=\"enum core::ffi::c_void\">c_void</a>) -&gt; <a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt;</h4></section></summary><div class='docblock'>Takes an opaque pointer produced by <code>into_user_data</code> and “clones” it to produce the\noriginal instance, increasing the reference count. <a href=\"gdnative/export/user_data/trait.UserData.html#tymethod.clone_from_user_data_unchecked\">Read more</a></div></details></div></details>","UserData","gdnative::export::user_data::DefaultUserData"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Map-for-LocalCellData%3CT%3E\" class=\"impl\"><a href=\"#impl-Map-for-LocalCellData%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"gdnative/export/user_data/trait.Map.html\" title=\"trait gdnative::export::user_data::Map\">Map</a> for <a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"gdnative/export/trait.NativeClass.html\" title=\"trait gdnative::export::NativeClass\">NativeClass</a>,</div></h3></section></summary><div class=\"impl-items\"><section id=\"associatedtype.Err\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Err\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"gdnative/export/user_data/trait.Map.html#associatedtype.Err\" class=\"associatedtype\">Err</a> = <a class=\"enum\" href=\"gdnative/export/user_data/enum.LocalCellError.html\" title=\"enum gdnative::export::user_data::LocalCellError\">LocalCellError</a></h4></section><details class=\"toggle method-toggle\" open><summary><section id=\"method.map\" class=\"method trait-impl\"><a href=\"#method.map\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"gdnative/export/user_data/trait.Map.html#tymethod.map\" class=\"fn\">map</a>&lt;F, U&gt;(&amp;self, op: F) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;U, &lt;<a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt; as <a class=\"trait\" href=\"gdnative/export/user_data/trait.Map.html\" title=\"trait gdnative::export::user_data::Map\">Map</a>&gt;::<a class=\"associatedtype\" href=\"gdnative/export/user_data/trait.Map.html#associatedtype.Err\" title=\"type gdnative::export::user_data::Map::Err\">Err</a>&gt;<div class=\"where\">where\n    F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(&amp;&lt;<a class=\"struct\" href=\"gdnative/export/user_data/struct.LocalCellData.html\" title=\"struct gdnative::export::user_data::LocalCellData\">LocalCellData</a>&lt;T&gt; as <a class=\"trait\" href=\"gdnative/export/user_data/trait.UserData.html\" title=\"trait gdnative::export::user_data::UserData\">UserData</a>&gt;::<a class=\"associatedtype\" href=\"gdnative/export/user_data/trait.UserData.html#associatedtype.Target\" title=\"type gdnative::export::user_data::UserData::Target\">Target</a>) -&gt; U,</div></h4></section></summary><div class='docblock'>Maps a <code>&amp;T</code> to <code>U</code>. Called for methods that take <code>&amp;self</code>. <a href=\"gdnative/export/user_data/trait.Map.html#tymethod.map\">Read more</a></div></details></div></details>","Map","gdnative::export::user_data::DefaultUserData"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()