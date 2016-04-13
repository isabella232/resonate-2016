var Editor = function ( string ) {

	var delay;
	var onChangeCallback;

	var codemirror = CodeMirror( document.body, {
		value: string,
		lineNumbers: true,
		matchBrackets: true,
		indentWithTabs: true,
		tabSize: 4,
		indentUnit: 4,
		mode: "text/x-glsl"
	} );
	codemirror.setOption( 'theme', 'monokai' );
	codemirror.on( 'change', function () {

		if ( onChangeCallback ) {

			clearTimeout( delay );
			delay = setTimeout( function () {

				onChangeCallback( codemirror.getValue() );

			}, 300 );

		}

	} );

	var dom = codemirror.getWrapperElement();
	dom.style.position = 'absolute';

	return {
		dom: dom,
		onChange: function ( callback ) {

			onChangeCallback = callback;

		}
	};

};
