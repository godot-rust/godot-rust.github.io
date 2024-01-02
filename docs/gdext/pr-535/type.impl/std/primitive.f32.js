(function() {var type_impls = {
"godot":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-RealConv-for-f32\" class=\"impl\"><a href=\"#impl-RealConv-for-f32\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"godot/builtin/trait.RealConv.html\" title=\"trait godot::builtin::RealConv\">RealConv</a> for <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.as_f32\" class=\"method trait-impl\"><a href=\"#method.as_f32\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/trait.RealConv.html#tymethod.as_f32\" class=\"fn\">as_f32</a>(self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section></summary><div class='docblock'>Cast this <a href=\"godot/builtin/type.real.html\" title=\"type godot::builtin::real\"><code>real</code></a> to an <a href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\" title=\"primitive f32\"><code>f32</code></a> using <code>as</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.as_f64\" class=\"method trait-impl\"><a href=\"#method.as_f64\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/trait.RealConv.html#tymethod.as_f64\" class=\"fn\">as_f64</a>(self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f64.html\">f64</a></h4></section></summary><div class='docblock'>Cast this <a href=\"godot/builtin/type.real.html\" title=\"type godot::builtin::real\"><code>real</code></a> to an <a href=\"https://doc.rust-lang.org/nightly/std/primitive.f64.html\" title=\"primitive f64\"><code>f64</code></a> using <code>as</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.from_f32\" class=\"method trait-impl\"><a href=\"#method.from_f32\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/trait.RealConv.html#tymethod.from_f32\" class=\"fn\">from_f32</a>(f: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section></summary><div class='docblock'>Cast an <a href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\" title=\"primitive f32\"><code>f32</code></a> to a <a href=\"godot/builtin/type.real.html\" title=\"type godot::builtin::real\"><code>real</code></a> using <code>as</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.from_f64\" class=\"method trait-impl\"><a href=\"#method.from_f64\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/trait.RealConv.html#tymethod.from_f64\" class=\"fn\">from_f64</a>(f: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f64.html\">f64</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section></summary><div class='docblock'>Cast an <a href=\"https://doc.rust-lang.org/nightly/std/primitive.f64.html\" title=\"primitive f64\"><code>f64</code></a> to a <a href=\"godot/builtin/type.real.html\" title=\"type godot::builtin::real\"><code>real</code></a> using <code>as</code>.</div></details></div></details>","RealConv","godot::builtin::real"],["<section id=\"impl-GodotType-for-f32\" class=\"impl\"><a href=\"#impl-GodotType-for-f32\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"godot/builtin/meta/trait.GodotType.html\" title=\"trait godot::builtin::meta::GodotType\">GodotType</a> for <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h3></section>","GodotType","godot::builtin::real"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-FloatExt-for-f32\" class=\"impl\"><a href=\"#impl-FloatExt-for-f32\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"godot/builtin/math/trait.FloatExt.html\" title=\"trait godot::builtin::math::FloatExt\">FloatExt</a> for <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h3></section></summary><div class=\"impl-items\"><section id=\"associatedconstant.CMP_EPSILON\" class=\"associatedconstant trait-impl\"><a href=\"#associatedconstant.CMP_EPSILON\" class=\"anchor\">§</a><h4 class=\"code-header\">const <a href=\"godot/builtin/math/trait.FloatExt.html#associatedconstant.CMP_EPSILON\" class=\"constant\">CMP_EPSILON</a>: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a> = 9.99999974E-6f32</h4></section><details class=\"toggle method-toggle\" open><summary><section id=\"method.lerp\" class=\"method trait-impl\"><a href=\"#method.lerp\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.lerp\" class=\"fn\">lerp</a>(self, to: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>, t: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section></summary><div class='docblock'>Linearly interpolates from <code>self</code> to <code>to</code> by <code>weight</code>. <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.lerp\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.is_angle_equal_approx\" class=\"method trait-impl\"><a href=\"#method.is_angle_equal_approx\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.is_angle_equal_approx\" class=\"fn\">is_angle_equal_approx</a>(self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Check if two angles are approximately equal, by comparing the distance\nbetween the points on the unit circle with 0 using <a href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html#method.approx_eq\" title=\"method f32::approx_eq\"><code>real::approx_eq</code></a>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.is_zero_approx\" class=\"method trait-impl\"><a href=\"#method.is_zero_approx\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.is_zero_approx\" class=\"fn\">is_zero_approx</a>(self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Check if <code>self</code> is within <a href=\"godot/builtin/math/trait.FloatExt.html#associatedconstant.CMP_EPSILON\" title=\"associated constant godot_core::builtin::math::float::FloatExt::CMP_EPSILON::CMP_EPSILON\"><code>Self::CMP_EPSILON</code></a> of <code>0.0</code>.</div></details><section id=\"method.fposmod\" class=\"method trait-impl\"><a href=\"#method.fposmod\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.fposmod\" class=\"fn\">fposmod</a>(self, pmod: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section><details class=\"toggle method-toggle\" open><summary><section id=\"method.snapped\" class=\"method trait-impl\"><a href=\"#method.snapped\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.snapped\" class=\"fn\">snapped</a>(self, step: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section></summary><div class='docblock'>Returns the multiple of <code>step</code> that is closest to <code>self</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.sign\" class=\"method trait-impl\"><a href=\"#method.sign\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.sign\" class=\"fn\">sign</a>(self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section></summary><div class='docblock'>Godot’s <code>sign</code> function, returns <code>0.0</code> when self is <code>0.0</code>. <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.sign\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.bezier_derivative\" class=\"method trait-impl\"><a href=\"#method.bezier_derivative\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.bezier_derivative\" class=\"fn\">bezier_derivative</a>(\n    self,\n    control_1: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>,\n    control_2: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>,\n    end: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>,\n    t: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>\n) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section></summary><div class='docblock'>Returns the derivative at the given <code>t</code> on a one-dimensional Bézier curve defined by the given\n<code>control_1</code>, <code>control_2</code>, and <code>end</code> points.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.bezier_interpolate\" class=\"method trait-impl\"><a href=\"#method.bezier_interpolate\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.bezier_interpolate\" class=\"fn\">bezier_interpolate</a>(\n    self,\n    control_1: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>,\n    control_2: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>,\n    end: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>,\n    t: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>\n) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section></summary><div class='docblock'>Returns the point at the given <code>t</code> on a one-dimensional Bézier curve defined by the given\n<code>control_1</code>, <code>control_2</code>, and <code>end</code> points.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.cubic_interpolate\" class=\"method trait-impl\"><a href=\"#method.cubic_interpolate\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.cubic_interpolate\" class=\"fn\">cubic_interpolate</a>(self, to: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>, pre: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>, post: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>, weight: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section></summary><div class='docblock'>Cubic interpolates between two values by the factor defined in <code>weight</code> with <code>pre</code> and <code>post</code> values.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.cubic_interpolate_in_time\" class=\"method trait-impl\"><a href=\"#method.cubic_interpolate_in_time\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.cubic_interpolate_in_time\" class=\"fn\">cubic_interpolate_in_time</a>(\n    self,\n    to: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>,\n    pre: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>,\n    post: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>,\n    weight: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>,\n    to_t: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>,\n    pre_t: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>,\n    post_t: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>\n) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section></summary><div class='docblock'>Cubic interpolates between two values by the factor defined in <code>weight</code> with <code>pre</code> and <code>post</code> values.\nIt can perform smoother interpolation than <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.cubic_interpolate\" title=\"method godot::builtin::math::FloatExt::cubic_interpolate\"><code>cubic_interpolate</code></a> by the time values.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.lerp_angle\" class=\"method trait-impl\"><a href=\"#method.lerp_angle\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.lerp_angle\" class=\"fn\">lerp_angle</a>(self, to: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>, weight: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section></summary><div class='docblock'>Linearly interpolates between two angles (in radians) by a <code>weight</code> value\nbetween 0.0 and 1.0. <a href=\"godot/builtin/math/trait.FloatExt.html#tymethod.lerp_angle\">Read more</a></div></details></div></details>","FloatExt","godot::builtin::real"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Export-for-f32\" class=\"impl\"><a href=\"#impl-Export-for-f32\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"godot/prelude/trait.Export.html\" title=\"trait godot::prelude::Export\">Export</a> for <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.default_export_info\" class=\"method trait-impl\"><a href=\"#method.default_export_info\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/prelude/trait.Export.html#tymethod.default_export_info\" class=\"fn\">default_export_info</a>() -&gt; <a class=\"struct\" href=\"godot/bind/property/struct.PropertyHintInfo.html\" title=\"struct godot::bind::property::PropertyHintInfo\">PropertyHintInfo</a></h4></section></summary><div class='docblock'>The export info to use for an exported field of this type, if no other export info is specified.</div></details></div></details>","Export","godot::builtin::real"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Property-for-f32\" class=\"impl\"><a href=\"#impl-Property-for-f32\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"godot/prelude/trait.Property.html\" title=\"trait godot::prelude::Property\">Property</a> for <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h3></section></summary><div class=\"impl-items\"><section id=\"associatedtype.Intermediate\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Intermediate\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"godot/prelude/trait.Property.html#associatedtype.Intermediate\" class=\"associatedtype\">Intermediate</a> = <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section><section id=\"method.get_property\" class=\"method trait-impl\"><a href=\"#method.get_property\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/prelude/trait.Property.html#tymethod.get_property\" class=\"fn\">get_property</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section><section id=\"method.set_property\" class=\"method trait-impl\"><a href=\"#method.set_property\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/prelude/trait.Property.html#tymethod.set_property\" class=\"fn\">set_property</a>(&amp;mut self, value: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>)</h4></section><section id=\"method.property_hint\" class=\"method trait-impl\"><a href=\"#method.property_hint\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/prelude/trait.Property.html#method.property_hint\" class=\"fn\">property_hint</a>() -&gt; <a class=\"struct\" href=\"godot/bind/property/struct.PropertyHintInfo.html\" title=\"struct godot::bind::property::PropertyHintInfo\">PropertyHintInfo</a></h4></section></div></details>","Property","godot::builtin::real"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-GodotConvert-for-f32\" class=\"impl\"><a href=\"#impl-GodotConvert-for-f32\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"godot/builtin/meta/trait.GodotConvert.html\" title=\"trait godot::builtin::meta::GodotConvert\">GodotConvert</a> for <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle\" open><summary><section id=\"associatedtype.Via\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Via\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"godot/builtin/meta/trait.GodotConvert.html#associatedtype.Via\" class=\"associatedtype\">Via</a> = <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h4></section></summary><div class='docblock'>The type through which <code>Self</code> is represented in Godot.</div></details></div></details>","GodotConvert","godot::builtin::real"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-FromGodot-for-f32\" class=\"impl\"><a href=\"#impl-FromGodot-for-f32\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"godot/builtin/meta/trait.FromGodot.html\" title=\"trait godot::builtin::meta::FromGodot\">FromGodot</a> for <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.try_from_godot\" class=\"method trait-impl\"><a href=\"#method.try_from_godot\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/meta/trait.FromGodot.html#tymethod.try_from_godot\" class=\"fn\">try_from_godot</a>(via: &lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a> as <a class=\"trait\" href=\"godot/builtin/meta/trait.GodotConvert.html\" title=\"trait godot::builtin::meta::GodotConvert\">GodotConvert</a>&gt;::<a class=\"associatedtype\" href=\"godot/builtin/meta/trait.GodotConvert.html#associatedtype.Via\" title=\"type godot::builtin::meta::GodotConvert::Via\">Via</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>, <a class=\"struct\" href=\"godot/builtin/meta/struct.ConvertError.html\" title=\"struct godot::builtin::meta::ConvertError\">ConvertError</a>&gt;</h4></section></summary><div class='docblock'>Performs the conversion.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.from_godot\" class=\"method trait-impl\"><a href=\"#method.from_godot\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/meta/trait.FromGodot.html#method.from_godot\" class=\"fn\">from_godot</a>(via: Self::<a class=\"associatedtype\" href=\"godot/builtin/meta/trait.GodotConvert.html#associatedtype.Via\" title=\"type godot::builtin::meta::GodotConvert::Via\">Via</a>) -&gt; Self</h4></section></summary><div class='docblock'>⚠️ Performs the conversion. <a href=\"godot/builtin/meta/trait.FromGodot.html#method.from_godot\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.try_from_variant\" class=\"method trait-impl\"><a href=\"#method.try_from_variant\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/meta/trait.FromGodot.html#method.try_from_variant\" class=\"fn\">try_from_variant</a>(variant: &amp;<a class=\"struct\" href=\"godot/builtin/struct.Variant.html\" title=\"struct godot::builtin::Variant\">Variant</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;Self, <a class=\"struct\" href=\"godot/builtin/meta/struct.ConvertError.html\" title=\"struct godot::builtin::meta::ConvertError\">ConvertError</a>&gt;</h4></section></summary><div class='docblock'>Performs the conversion from a <a href=\"godot/builtin/struct.Variant.html\" title=\"struct godot::builtin::Variant\"><code>Variant</code></a>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.from_variant\" class=\"method trait-impl\"><a href=\"#method.from_variant\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/meta/trait.FromGodot.html#method.from_variant\" class=\"fn\">from_variant</a>(variant: &amp;<a class=\"struct\" href=\"godot/builtin/struct.Variant.html\" title=\"struct godot::builtin::Variant\">Variant</a>) -&gt; Self</h4></section></summary><div class='docblock'>⚠️ Performs the conversion from a <a href=\"godot/builtin/struct.Variant.html\" title=\"struct godot::builtin::Variant\"><code>Variant</code></a>. <a href=\"godot/builtin/meta/trait.FromGodot.html#method.from_variant\">Read more</a></div></details></div></details>","FromGodot","godot::builtin::real"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-TypeStringHint-for-f32\" class=\"impl\"><a href=\"#impl-TypeStringHint-for-f32\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"godot/prelude/trait.TypeStringHint.html\" title=\"trait godot::prelude::TypeStringHint\">TypeStringHint</a> for <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.type_string\" class=\"method trait-impl\"><a href=\"#method.type_string\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/prelude/trait.TypeStringHint.html#tymethod.type_string\" class=\"fn\">type_string</a>() -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a></h4></section></summary><div class='docblock'>Returns the representation of this type as a type string. <a href=\"godot/prelude/trait.TypeStringHint.html#tymethod.type_string\">Read more</a></div></details></div></details>","TypeStringHint","godot::builtin::real"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-ToGodot-for-f32\" class=\"impl\"><a href=\"#impl-ToGodot-for-f32\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"godot/builtin/meta/trait.ToGodot.html\" title=\"trait godot::builtin::meta::ToGodot\">ToGodot</a> for <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.to_godot\" class=\"method trait-impl\"><a href=\"#method.to_godot\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/meta/trait.ToGodot.html#tymethod.to_godot\" class=\"fn\">to_godot</a>(&amp;self) -&gt; &lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a> as <a class=\"trait\" href=\"godot/builtin/meta/trait.GodotConvert.html\" title=\"trait godot::builtin::meta::GodotConvert\">GodotConvert</a>&gt;::<a class=\"associatedtype\" href=\"godot/builtin/meta/trait.GodotConvert.html#associatedtype.Via\" title=\"type godot::builtin::meta::GodotConvert::Via\">Via</a></h4></section></summary><div class='docblock'>Converts this type to the Godot type by reference, usually by cloning.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.into_godot\" class=\"method trait-impl\"><a href=\"#method.into_godot\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/meta/trait.ToGodot.html#method.into_godot\" class=\"fn\">into_godot</a>(self) -&gt; Self::<a class=\"associatedtype\" href=\"godot/builtin/meta/trait.GodotConvert.html#associatedtype.Via\" title=\"type godot::builtin::meta::GodotConvert::Via\">Via</a></h4></section></summary><div class='docblock'>Converts this type to the Godot type. <a href=\"godot/builtin/meta/trait.ToGodot.html#method.into_godot\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.to_variant\" class=\"method trait-impl\"><a href=\"#method.to_variant\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/meta/trait.ToGodot.html#method.to_variant\" class=\"fn\">to_variant</a>(&amp;self) -&gt; <a class=\"struct\" href=\"godot/builtin/struct.Variant.html\" title=\"struct godot::builtin::Variant\">Variant</a></h4></section></summary><div class='docblock'>Converts this type to a <a href=\"godot/builtin/struct.Variant.html\" title=\"struct godot::builtin::Variant\">Variant</a>.</div></details></div></details>","ToGodot","godot::builtin::real"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-ApproxEq-for-f32\" class=\"impl\"><a href=\"#impl-ApproxEq-for-f32\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"godot/builtin/math/trait.ApproxEq.html\" title=\"trait godot::builtin::math::ApproxEq\">ApproxEq</a> for <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a></h3></section></summary><div class=\"impl-items\"><section id=\"method.approx_eq\" class=\"method trait-impl\"><a href=\"#method.approx_eq\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"godot/builtin/math/trait.ApproxEq.html#tymethod.approx_eq\" class=\"fn\">approx_eq</a>(&amp;self, other: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f32.html\">f32</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></div></details>","ApproxEq","godot::builtin::real"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()