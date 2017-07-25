/* global CherryProjectsTinyMCE, tinymce */
(function( $ ) {
	var prefix = CherryProjectsTinyMCE.prefix,
		button = CherryProjectsTinyMCE.button,
		shortcodes = JSON.parse( CherryProjectsTinyMCE.shortcodes );

	tinymce.PluginManager.add( button, function( editor ) {
		var menu = [];

		$.each( shortcodes, function( key, value ) {
			var item = {};

			item.text    = value.title;
			item.onclick = function() {

				var selfClosed = ( 'object' === typeof value.body ) ? false : true,
					shortcode  = prefix + key;

				if ( ! selfClosed ) {
					editor.windowManager.open({
						title: value.title,
						icon: value.icon,
						body: value.body,
						minWidth: 600,
						onsubmit: function( e ) {
							var attr = e.data,
								prop;

							for ( prop in attr ) {
								if ( attr[ prop ] ) {
									shortcode += ' ' + prop + '="' + attr[ prop ] + '"';
								}
							}

							editor.selection.setContent( '[' + shortcode + ']' );
						}
					});

				} else {
					editor.selection.setContent( '[' + shortcode + ']' );
				}
			};

			menu.push( item );
		});

		editor.addButton( button, {
			title: CherryProjectsTinyMCE.title,
			type: 'menubutton',
			icon: 'icon dashicons-before dashicons-portfolio',
			menu: menu
		} );
	});

})( jQuery );
