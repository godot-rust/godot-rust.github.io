searchState.loadedDescShard("godot", 8, "Godot enumerator name: <code>KEY_UNDERSCORE</code>\nGodot enumerator name: <code>KEY_UNKNOWN</code>\nGodot enumerator name: <code>KEY_LOCATION_UNSPECIFIED</code>\nGodot enumerator name: <code>KEY_UP</code>\nGodot enumerator name: …\nGodot enumerator name: <code>KEY_V</code>\nGodot enumerator name: <code>METHOD_FLAG_VARARG</code>\nGodot enumerator name: <code>METHOD_FLAG_VIRTUAL</code>\nGodot enumerator name: <code>KEY_VOLUMEDOWN</code>\nGodot enumerator name: <code>KEY_VOLUMEMUTE</code>\nGodot enumerator name: <code>KEY_VOLUMEUP</code>\nGodot enumerator name: <code>KEY_W</code>\nGodot enumerator name: <code>MOUSE_BUTTON_WHEEL_DOWN</code>\nGodot enumerator name: <code>MOUSE_BUTTON_WHEEL_LEFT</code>\nGodot enumerator name: <code>MOUSE_BUTTON_WHEEL_RIGHT</code>\nGodot enumerator name: <code>MOUSE_BUTTON_WHEEL_UP</code>\nGodot enumerator name: <code>KEY_X</code>\nGodot enumerator name: <code>JOY_BUTTON_X</code>\nGodot enumerator name: <code>MOUSE_BUTTON_XBUTTON1</code>\nGodot enumerator name: <code>MOUSE_BUTTON_XBUTTON2</code>\nGodot enumerator name: <code>KEY_Y</code>\nGodot enumerator name: <code>JOY_BUTTON_Y</code>\nGodot enumerator name: <code>KEY_YEN</code>\nGodot enumerator name: <code>KEY_Z</code>\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nPushes an error message to Godot’s built-in debugger and …\nPrints to the Godot console.\nPrints to the Godot console. Supports BBCode, color and …\nLogs a script error to Godot’s built-in debugger and to …\nPushes a warning message to Godot’s built-in debugger …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nRuns the extension with full functionality in editor.\nFirst level loaded by Godot. Builtin types are available, …\nFourth level loaded by Godot, only in the editor. All …\nDetermines if and how an extension’s code is run in the …\nDefines the entry point for a GDExtension Rust library.\nProvides meta-information about the library and the Godot …\nStage of the Godot initialization process.\nThird level loaded by Godot. Most classes are available.\nSecond level loaded by Godot. Only server classes and …\nOnly runs <code>#[class(tool)]</code> classes in the editor.\nFor a string <code>&quot;4.x&quot;</code>, returns <code>true</code> if the current Godot …\nDetermines if and how an extension’s code is run in the …\nReturns the argument unchanged.\nReturns the argument unchanged.\nProc-macro attribute to be used in combination with the …\nVersion of the Godot engine which loaded gdext via …\nVersion of the Godot engine which loaded gdext via …\nGodot version against which gdext was compiled.\nGodot version against which gdext was compiled, as …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nDetermines the initialization level at which the extension …\nCustom logic when a certain init-level of Godot is …\nCustom logic when a certain init-level of Godot is loaded.\nWhether to enable hot reloading of this library. Return …\nFor a string <code>&quot;4.x&quot;</code>, returns <code>true</code> if the current Godot …\nMarker trait to identify types that can be stored in …\nName of a class registered with Godot.\nDefines the canonical conversion from Godot for a type.\nIndicates that a type can be passed to/from Godot, either …\nType that is directly representable in the engine.\nDescribes a method in Godot.\nDescribes a property in Godot.\nDefines the canonical conversion to Godot for a type.\nThe type through which <code>Self</code> is represented in Godot.\nWhich class this property is.\nErrors in the gdext library.\nProperly frees a <code>sys::GDExtensionMethodInfo</code> created by …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\n⚠️ Converts the Godot representation to this type.\n⚠️ Performs the conversion from a <code>Variant</code>.\nHow the property is meant to be edited. See also …\nExtra information passed to Godot for this property, what …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nConverts this type to the Godot type.\nConsumes self and turns it into a …\nConstruct a new ASCII class name.\nCreate a new <code>PropertyInfo</code> representing an exported …\nCreate a new <code>PropertyInfo</code> representing a group in Godot.\nCreate a new <code>PropertyInfo</code> representing a subgroup in Godot.\nCreate a new <code>PropertyInfo</code> representing a property named …\nThe name of this property in Godot.\nConverts to the FFI type. Keep this object allocated while …\nReturns an owned or borrowed <code>str</code>.\nConverts this type to the Godot type by reference, usually …\nConverts the class name to a <code>GString</code>.\nConverts the class name to a <code>StringName</code>.\nConverts this type to a Variant.\nConverts the Godot representation to this type, returning …\nPerforms the conversion from a <code>Variant</code>, returning <code>Err</code> on …\nHow this property should be used. See <code>PropertyUsageFlags</code> …\nWhich type this property has.\nChange the <code>hint</code> and <code>hint_string</code> to be the given <code>hint_info</code>.\nError capable of representing failed function calls.\nRepresents errors that can occur when converting values …\nError that can occur while using <code>gdext</code> IO utilities.\nReturns the rust-error that caused this error, if one …\nName of the class/builtin whose method failed. <strong>Not</strong> the …\nCreate a custom error, without any description.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nConverts error into generic error type. It is useful to …\nName of the function or method that failed.\nConstruct with a user-defined message.\nReturns a reference of the value that failed to convert, …\nCreate a new custom error wrapping an <code>Error</code>.\nCreate a new custom error wrapping an <code>Error</code> and the value …\nObjects that can be passed as arguments to Godot engine …\nRestricted version of <code>Gd</code>, to hold the base instance inside …\nThe immediate superclass of <code>T</code>. This is always a Godot …\nMutable/exclusive reference guard for a <code>Base</code> pointer.\nShared reference guard for a <code>Base</code> pointer.\nLibrary-implemented trait to check bounds on <code>GodotClass</code> …\nWhether this class is a core Godot class provided by the …\nNumber of <strong>distinct</strong> enumerators in the enum.\nAuto-implemented for all engine-provided bitfields.\nAuto-implemented for all engine-provided enums.\nSmart pointer to objects owned by the Godot engine.\nMutably/exclusively bound reference guard for a <code>Gd</code> smart …\nImmutably/shared bound reference guard for a <code>Gd</code> smart …\nMakes <code>T</code> eligible to be managed by Godot and stored in <code>Gd&lt;T&gt;</code>…\nInitialization level, during which this class should be …\nTrait for enums that can be used as indices in arrays.\nNon-strict inheritance relationship in the Godot class …\nRepresents a non-zero instance ID.\nDefines the memory strategy of the static type.\nExtension trait for all manually managed classes.\nExtension trait for all reference-counted classes.\nType representing the absence of a base class, at the root …\nErgonomic late-initialization container with <code>ready()</code> …\nTrait that is automatically implemented for user classes …\nReturns a shared reference suitable for calling engine …\nReturns a reference to the <code>Base</code> stored by this object.\nReturns a mutable reference suitable for calling engine …\nHands out a guard for a shared borrow, through which the …\nHands out a guard for an exclusive borrow, through which …\nDifferent ways how bounds of a <code>GodotClass</code> can be checked.\nReturns a callable referencing a method from this object …\nCapability traits, providing dedicated functionalities for …\n⚠️ <strong>Downcast:</strong> convert into a smart pointer to a derived …\nThe name of the class, under which it is registered in …\nCreates a default-constructed <code>T</code> inside a smart pointer.\nReturns a shared reference to the value.\nReturns an exclusive reference to the value.\n⚠️ Returns whether two <code>Gd</code> pointers point to the same …\nDestroy the manually-managed Godot object.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nVariant of <code>OnReady::new()</code>, allowing access to <code>Base</code> when …\n⚠️ Constructs an instance ID from a non-zero integer, …\nCreates a <code>Gd&lt;T&gt;</code> using a function that constructs a <code>T</code> from …\n⚠️ Looks up the given instance ID and returns the …\nMoves a user-created object into this smart pointer, …\n⚠️ Hashes this object based on its instance ID.\nReturns whether <code>Self</code> inherits from <code>U</code>.\nRuns manual initialization.\n⚠️ Returns the instance ID of this object (panics when …\nReturns the last known, possibly invalid instance ID of …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nChecks if this smart pointer points to a live object (read …\nReturns if the obj being referred-to is inheriting …\nLeave uninitialized, expects manual initialization during …\nSchedule automatic initialization before <code>ready()</code>.\nReturn a new, manually-managed <code>Gd</code> containing a …\nReturn a new, ref-counted <code>Gd</code> containing a …\nVariant of <code>OnReady::new()</code>, fetching the node located at …\nRepresents <code>null</code> when passing an object argument to Godot.\nOrdinal value of the enumerator, as specified in Godot. …\nOrdinal value of the bit flag, as specified in Godot.\nFunctionality related to script instances (Rust code that …\nReturns the <code>Gd</code> pointer containing this object.\nConverts the enumerator to <code>usize</code>, which can be used as an …\n<strong>Downcast:</strong> try to convert into a smart pointer to a derived …\nConstructs an instance ID from an integer, or <code>None</code> if the …\nLooks up the given instance ID and returns the associated …\nMakes sure that <code>self</code> does not share references with other …\n<strong>Upcast:</strong> convert into a smart pointer to a base class. …\n<strong>Upcast exclusive-ref:</strong> access this object as an exclusive …\n<strong>Upcast shared-ref:</strong> access this object as a shared …\nExpresses that a class is declared by the Godot engine.\nExpresses that a class is declared by the user.\nTrait that specifies who declares a given <code>GodotClass</code>.\nNo memory management, user responsible for not leaking. …\nMemory managed through Godot reference counter (always …\nSpecifies the memory strategy of the static type.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nImplements <code>Bounds</code> for a user-defined class.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nTrait for all classes that are default-constructible from …\nAuto-implemented for <code>#[godot_api] impl MyClass</code> blocks\nAuto-implemented for …\nMutable/exclusive reference guard for a <code>Base</code> pointer.\nShared reference guard for a <code>Base</code> pointer.\nImplement custom scripts that can be attached to objects …\nMutable/exclusive reference guard for a <code>T</code> where <code>T</code> …\nReturns a shared reference suitable for calling engine …\nReturns a mutable reference suitable for calling engine …\nMethod invoker for Godot’s virtual dispatch system. The …\nName of the new class the script implements.\nCreates a new  from a type that implements <code>ScriptInstance</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nLets the engine get a reference to the <code>ScriptLanguage</code> this …\nA list of all the methods a script exposes to the engine.\nProperty getter for Godot’s virtual dispatch system.\nA list of all the properties a script exposes to the …\nA dump of all property names and values that are exposed …\nLets the engine fetch the type of a particular property.\nLets the engine get a reference to the script this …\nValidation function for the engine to verify if the script …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nIdentifies the script instance as a placeholder. If this …\nCallback from the engine when the reference count of the …\nCallback from the engine when the reference count of the …\nThe engine may call this function if it failed to get a …\nThe engine may call this function if …\nProperty setter for Godot’s virtual dispatch system.\nString representation of the script instance.\nABGR channel order. Reverse of the default RGBA order.\nARGB channel order. More compatible with DirectX.\nAxis-aligned bounding box in 3D space.\nGodot’s <code>Array</code> type.\nGodot class <code>AudioStreamPlayer.</code>\nGodot enumerator name: <code>SIDE_BOTTOM</code>\nRestricted version of <code>Gd</code>, to hold the base instance inside …\nThe immediate superclass of <code>T</code>. This is always a Godot …\nA 3x3 matrix, typically used as an orthogonal basis for …\nA <code>Callable</code> represents a function in Godot.\nGodot class <code>Camera2D.</code>\nGodot class <code>Camera3D.</code>\nColor built-in type, in floating-point RGBA format.\nDefines how individual color channels are laid out in …\nHSVA floating-number Color representation.\nRepresents errors that can occur when converting values …\nFirst level loaded by Godot. Builtin types are available, …\nGodot’s <code>Dictionary</code> type.\nFourth level loaded by Godot, only in the editor. All …\nThis enum is exhaustive; you should not expect future …\nTrait implemented for types that can be used as <code>#[export]</code> …\nDerive macro for <code>Export</code> on enums.\nDefines the entry point for a GDExtension Rust library.\nDefines the canonical conversion from Godot for a type.\nOpen a file for reading or writing.\nGodot’s reference counted string type.\nSmart pointer to objects owned by the Godot engine.\nMutably/exclusively bound reference guard for a <code>Gd</code> smart …\nImmutably/shared bound reference guard for a <code>Gd</code> smart …\nMakes <code>T</code> eligible to be managed by Godot and stored in <code>Gd&lt;T&gt;</code>…\nDerive macro for <code>GodotClass</code> on structs.\nIndicates that a type can be passed to/from Godot, either …\nDerive macro for <code>GodotConvert</code> on structs.\nVirtual methods for class <code>AudioStreamPlayer</code>.\nVirtual methods for class <code>Camera2D</code>.\nVirtual methods for class <code>Camera3D</code>.\nInitialization level, during which this class should be …\nVirtual methods for class <code>Node</code>.\nVirtual methods for class <code>Node2D</code>.\nVirtual methods for class <code>Node3D</code>.\nVirtual methods for class <code>Object</code>.\nVirtual methods for class <code>PackedScene</code>.\nVirtual methods for class <code>RefCounted</code>.\nVirtual methods for class <code>Resource</code>.\nVirtual methods for class <code>SceneTree</code>.\nNon-strict inheritance relationship in the Godot class …\nStage of the Godot initialization process.\nGodot class <code>Input.</code>\nRepresents a non-zero instance ID.\nAn invalid RID will never refer to a resource. Internally …\nError that can occur while using <code>gdext</code> IO utilities.\nGodot enumerator name: <code>SIDE_LEFT</code>\nGodot class <code>Node.</code>\nGodot class <code>Node2D.</code>\nGodot class <code>Node3D.</code>\nA pre-parsed scene tree path.\nGodot class <code>Object.</code>\nErgonomic late-initialization container with <code>ready()</code> …\nImplements Godot’s <code>PackedByteArray</code> type, which is a …\nImplements Godot’s <code>PackedColorArray</code> type, which is a …\nImplements Godot’s <code>PackedFloat32Array</code> type, which is a …\nImplements Godot’s <code>PackedFloat64Array</code> type, which is a …\nImplements Godot’s <code>PackedInt32Array</code> type, which is a …\nImplements Godot’s <code>PackedInt64Array</code> type, which is a …\nGodot class <code>PackedScene.</code>\nImplements Godot’s <code>PackedStringArray</code> type, which is a …\nImplements Godot’s <code>PackedVector2Array</code> type, which is a …\nImplements Godot’s <code>PackedVector3Array</code> type, which is a …\nImplements Godot’s <code>PackedVector4Array</code> type, which is a …\n3D plane in Hessian normal form.\nA 4x4 matrix used for 3D projective transformations.\nThe eye to create a projection for, when creating a …\nA projection’s clipping plane.\nUnit quaternion to represent 3D rotations.\nRGBA channel order. Godot’s default.\nGodot enumerator name: <code>SIDE_RIGHT</code>\nConvenience conversion between <code>real</code> and <code>f32</code>/<code>f64</code>.\n2D axis-aligned bounding box.\n2D axis-aligned integer bounding box.\nGodot class <code>RefCounted.</code>\nGodot class <code>Resource.</code>\nA RID (“resource ID”) is an opaque handle that refers …\nRepresents a custom callable object defined in Rust.\nThird level loaded by Godot. Most classes are available.\nGodot class <code>SceneTree.</code>\nSecond level loaded by Godot. Only server classes and …\nThis enum is exhaustive; you should not expect future …\nA <code>Signal</code> represents a signal of an Object instance in …\nA string optimized for unique names.\nGodot enumerator name: <code>SIDE_TOP</code>\nDefines the canonical conversion to Godot for a type.\nAffine 2D transform (2x3 matrix).\nAffine 3D transform (3x4 matrix).\nMarks types that are registered via “type string hint” …\nA valid RID may refer to some resource, but is not …\nTrait implemented for types that can be used as <code>#[var]</code> …\nDerive macro for <code>Var</code> on enums.\nGodot variant type, able to store a variety of different …\nA Godot <code>Array</code> without an assigned type.\nGodot enum name: <code>Variant.Operator</code>.\nGodot enum name: <code>Variant.Type</code>.\nVector used for 2D math using floating point coordinates.\nEnumerates the axes in a <code>Vector2</code>.\nVector used for 2D math using integer coordinates.\nVector used for 3D math using floating point coordinates.\nEnumerates the axes in a <code>Vector3</code>.\nVector used for 3D math using integer coordinates.\nVector used for 4D math using floating point coordinates.\nEnumerates the axes in a <code>Vector4</code>.\nVector used for 4D math using integer coordinates.\nThe type through which <code>Self</code> is represented in Godot.\nThe W axis.\nThe X axis.\nThe X axis.\nThe X axis.\nGodot enumerator name: <code>EULER_ORDER_XYZ</code>\nGodot enumerator name: <code>EULER_ORDER_XZY</code>\nThe Y axis.\nThe Y axis.\nThe Y axis.\nGodot enumerator name: <code>EULER_ORDER_YXZ</code>\nGodot enumerator name: <code>EULER_ORDER_YZX</code>\nThe Z axis.\nThe Z axis.\nGodot enumerator name: <code>EULER_ORDER_ZXY</code>\nGodot enumerator name: <code>EULER_ORDER_ZYX</code>\nThe color’s alpha component. A value of 0 means that the …\nThe first basis vector.\nConstructs <code>Array</code> literals, similar to Rust’s standard …\nCast this <code>real</code> to an <code>f32</code> using <code>as</code>.\nCast this <code>real</code> to an <code>f64</code> using <code>as</code>.\nThe color’s blue component.\nThe second basis vector.\nThe basis is a matrix containing 3 vectors as its columns. …\nThe name of the class, under which it is registered in …\nThe columns of the projection matrix.\nDistance between the plane and the origin point.\nThe export info to use for an exported field of this type, …\nConstructs <code>Dictionary</code> literals, close to Godot’s own …\nDetermines if and how an extension’s code is run in the …\nCast an <code>f32</code> to a <code>real</code> using <code>as</code>.\nCast an <code>f64</code> to a <code>real</code> using <code>as</code>.\n⚠️ Converts the Godot representation to this type.\n⚠️ Performs the conversion from a <code>Variant</code>.\nThe color’s green component.\nProc-macro attribute to be used in combination with the …\nCalled whenever <code>get()</code> is called or Godot gets the value of …\nCalled whenever <code>get()</code> is called or Godot gets the value of …\nCalled whenever <code>get()</code> is called or Godot gets the value of …\nCalled whenever <code>get()</code> is called or Godot gets the value of …\nCalled whenever <code>get()</code> is called or Godot gets the value of …\nCalled whenever <code>get()</code> is called or Godot gets the value of …\nCalled whenever <code>get()</code> is called or Godot gets the value of …\nCalled whenever <code>get()</code> is called or Godot gets the value of …\nCalled whenever <code>get()</code> is called or Godot gets the value of …\nCalled whenever <code>get()</code> is called or Godot gets the value of …\nCalled whenever <code>get()</code> is called or Godot gets the value of …\nCalled whenever Godot <code>get_property_list()</code> is called, the …\nCalled whenever Godot <code>get_property_list()</code> is called, the …\nCalled whenever Godot <code>get_property_list()</code> is called, the …\nCalled whenever Godot <code>get_property_list()</code> is called, the …\nCalled whenever Godot <code>get_property_list()</code> is called, the …\nCalled whenever Godot <code>get_property_list()</code> is called, the …\nCalled whenever Godot <code>get_property_list()</code> is called, the …\nCalled whenever Godot <code>get_property_list()</code> is called, the …\nCalled whenever Godot <code>get_property_list()</code> is called, the …\nCalled whenever Godot <code>get_property_list()</code> is called, the …\nCalled whenever Godot <code>get_property_list()</code> is called, the …\nProc-macro attribute to be used with <code>impl</code> blocks of …\nPushes an error message to Godot’s built-in debugger and …\nPrints to the Godot console.\nPrints to the Godot console. Supports BBCode, color and …\nLogs a script error to Godot’s built-in debugger and to …\nPushes a warning message to Godot’s built-in debugger …\nReturns whether <code>Self</code> inherits from <code>U</code>.\nGodot constructor, accepting an injected <code>base</code> object.\nGodot constructor, accepting an injected <code>base</code> object.\nGodot constructor, accepting an injected <code>base</code> object.\nGodot constructor, accepting an injected <code>base</code> object.\nGodot constructor, accepting an injected <code>base</code> object.\nGodot constructor, accepting an injected <code>base</code> object.\nGodot constructor, accepting an injected <code>base</code> object.\nGodot constructor, accepting an injected <code>base</code> object.\nGodot constructor, accepting an injected <code>base</code> object.\nGodot constructor, accepting an injected <code>base</code> object.\nGodot constructor, accepting an injected <code>base</code> object.\nConverts this type to the Godot type.\nInvokes the callable with the given arguments as <code>Variant</code> …\n⚠️ Loads a resource from the filesystem located at <code>path</code>…\nDetermines the initialization level at which the extension …\nNormal vector pointing away from the plane.\nCustom logic when a certain init-level of Godot is …\nCustom logic when a certain init-level of Godot is loaded.\nCalled when the object receives a Godot notification.\nCalled when the object receives a Godot notification.\nCalled when the object receives a Godot notification.\nCalled when the object receives a Godot notification.\nCalled when the object receives a Godot notification.\nCalled when the object receives a Godot notification.\nCalled when the object receives a Godot notification.\nCalled when the object receives a Godot notification.\nCalled when the object receives a Godot notification.\nCalled when the object receives a Godot notification.\nCalled when the object receives a Godot notification.\nThe origin of the transform. The coordinate space defined …\nThe new origin of the transformed coordinate system.\nWhether to enable hot reloading of this library. Return …\nThe position of the rectangle.\nCalled by Godot to tell if a property has a custom revert …\nCalled by Godot to tell if a property has a custom revert …\nCalled by Godot to tell if a property has a custom revert …\nCalled by Godot to tell if a property has a custom revert …\nCalled by Godot to tell if a property has a custom revert …\nCalled by Godot to tell if a property has a custom revert …\nCalled by Godot to tell if a property has a custom revert …\nCalled by Godot to tell if a property has a custom revert …\nCalled by Godot to tell if a property has a custom revert …\nCalled by Godot to tell if a property has a custom revert …\nCalled by Godot to tell if a property has a custom revert …\nThe color’s red component.\nFloating point type used for many structs and functions in …\nA macro to coerce float-literals into the <code>real</code> type.\nRe-export of <code>std::f32::consts</code> or <code>std::f64::consts</code>, …\nArray of reals.\nThe rows of the matrix. These are <em>not</em> the basis vectors.\n⚠️ Saves a <code>Resource</code>-inheriting object into the file …\nCalled whenever Godot <code>set()</code> is called or Godot sets the …\nCalled whenever Godot <code>set()</code> is called or Godot sets the …\nCalled whenever Godot <code>set()</code> is called or Godot sets the …\nCalled whenever Godot <code>set()</code> is called or Godot sets the …\nCalled whenever Godot <code>set()</code> is called or Godot sets the …\nCalled whenever Godot <code>set()</code> is called or Godot sets the …\nCalled whenever Godot <code>set()</code> is called or Godot sets the …\nCalled whenever Godot <code>set()</code> is called or Godot sets the …\nCalled whenever Godot <code>set()</code> is called or Godot sets the …\nCalled whenever Godot <code>set()</code> is called or Godot sets the …\nCalled whenever Godot <code>set()</code> is called or Godot sets the …\nThe size of the rectangle.\nAccess vector components in different order.\nConverts this type to the Godot type by reference, usually …\nString representation of the Godot instance.\nString representation of the Godot instance.\nString representation of the Godot instance.\nString representation of the Godot instance.\nString representation of the Godot instance.\nString representation of the Godot instance.\nString representation of the Godot instance.\nString representation of the Godot instance.\nString representation of the Godot instance.\nString representation of the Godot instance.\nString representation of the Godot instance.\nConverts this type to a Variant.\nConverts the Godot representation to this type, returning …\nPerforms the conversion from a <code>Variant</code>, returning <code>Err</code> on …\nLoads a resource from the filesystem located at <code>path</code>.\nSaves a <code>Resource</code>-inheriting object into the file located …\nReturns the representation of this type as a type string.\nConstructs <code>VariantArray</code> literals, similar to Rust’s …\nThe vector’s W component.\nThe vector’s W component.\nThe vector’s X component.\nThe vector’s X component.\nThe vector’s X component.\nThe vector’s X component.\nThe vector’s X component.\nThe vector’s X component.\nThe vector’s Y component.\nThe vector’s Y component.\nThe vector’s Y component.\nThe vector’s Y component.\nThe vector’s Y component.\nThe vector’s Y component.\nThe vector’s Z component.\nThe vector’s Z component.\nThe vector’s Z component.\nThe vector’s Z component.\nEuler’s number (e)\nThe Euler-Mascheroni constant (γ)\n1/π\n1/sqrt(2)\n1/sqrt(2π)\n1/sqrt(3)\n1/sqrt(π)\n2/π\n2/sqrt(π)\nπ/2\nπ/3\nπ/4\nπ/6\nπ/8\nln(10)\nln(2)\nlog10(2)\nlog10(e)\nlog2(10)\nlog2(e)\nThe golden ratio (φ)\nArchimedes’ constant (π)\nsqrt(2)\nsqrt(3)\nThe full circle constant (τ)\nDerive macro for <code>Export</code> on enums.\nDerive macro for <code>GodotClass</code> on structs.\nDerive macro for <code>GodotConvert</code> on structs.\nDerive macro for <code>Var</code> on enums.\nProc-macro attribute to be used with <code>impl</code> blocks of …\nRegistration support for property types.\nTrait implemented for types that can be used as <code>#[export]</code> …\nInfo needed by Godot, for how to export a type to the …\nMarks types that are registered via “type string hint” …\nTrait implemented for types that can be used as <code>#[var]</code> …\nThe export info to use for an exported field of this type, …\nFunctions used to translate user-provided arguments into …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the representation of this type as a type string.\nCreate a new <code>PropertyHintInfo</code> with a property hint of …\nEquivalent to <code>@export_enum</code> in Godot.\nEquivalent to <code>@export_file</code> in Godot.\nEquivalent to <code>@export_flags</code> in Godot.\nEquivalent to <code>@export_global_file</code> in Godot.\nMark an exported numerical value to use the editor’s …\nOpen a file for reading or writing.\nChecks if the file cursor has read past the end of the …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nRetrieve inner pointer to the <code>FileAccess</code>.\nCheck endianness of current file access.\nGet file length in bytes.\n⚠️ Loads a resource from the filesystem located at <code>path</code>…\nCalculates the MD5 checksum of the file at the given path.\nGet last modified time as a Unix timestamp.\nOpen a file.\nOpen a compressed file.\nOpen a file encrypted by byte key.\nOpen a file encrypted by password.\nGet path of the opened file.\nGet absolute path of the opened file.\nReturns the current cursor position.\nReads the whole file as UTF-8 <code>GString</code>.\nReads the next line of the file in delimiter-separated …\nReads the next 4 bytes from file as <code>f32</code>.\nReads the next 8 bytes from file as <code>f64</code>.\nReads the next line of the file as <code>GString</code>.\nReads a Pascal string (length-prefixed) from the current …\nReads the next 4 or 8 bytes from file as <code>real</code>, depending …\nReads the next 2 bytes from the file as <code>u16</code>.\nReads the next 4 bytes from the file as <code>u32</code>.\nReads the next 8 bytes from the file as <code>u64</code>.\nReads the next byte from the file as <code>u8</code>.\nReads the next <code>Variant</code> value from file.\n⚠️ Saves a <code>Resource</code>-inheriting object into the file …\nSet true to use big-endian, false to use little-endian.\nCalculates the SHA-256 checksum of the file at the given …\nA convenience macro for using the <code>Object::tr()</code> and …\nA convenience macro for using the <code>Object::tr_n()</code> and …\nCreates new <code>GFile</code> from a <code>FileAccess</code> pointer with a …\nLoads a resource from the filesystem located at <code>path</code>.\nSaves a <code>Resource</code>-inheriting object into the file located …\nWrite <code>PackedStringArray</code> to the file as delimited line.\nWrites <code>f32</code> as the 32 bits in the file.\nWrites <code>f64</code> as the 64 bits in the file.\nWrites string to the file.\nWrite string to the file as a line.\nWrites string to the file as Pascal String.\nWrites a <code>real</code> (<code>f32</code> or <code>f64</code>) as the next 4 or 8 bytes in the …\nWrites <code>u16</code> as the next 2 bytes in the file.\nWrites <code>u32</code> as the next 4 bytes in the file.\nWrites <code>u64</code> as the next 8 bytes in the file.\nWrites <code>u8</code> as the next byte in the file.\nWrite <code>Variant</code> to the file.")