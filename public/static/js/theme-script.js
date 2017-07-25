(function($){
	"use strict";

	CherryJsCore.utilites.namespace('theme_script');
	CherryJsCore.theme_script = {
		init: function () {
			var self = this;

			// Document ready event check
			if( CherryJsCore.status.is_ready ){
				self.document_ready_render( self );
			}else{
				CherryJsCore.variable.$document.on( 'ready', self.document_ready_render( self ) );
			}

			// Windows load event check
			if( CherryJsCore.status.on_load ){
				self.window_load_render( self );
			}else{
				CherryJsCore.variable.$window.on( 'load', self.window_load_render( self ) );
			}
		},

		document_ready_render: function ( self ) {
			var self = self;

			self.smart_slider_init( self );
			self.swiper_carousel_init( self );
			self.post_formats_custom_init( self );
			self.navbar_init( self );
			self.subscribe_init( self );
			self.main_menu( self, $( '.main-navigation' ) );
			self.to_top_init( self );
			self.top_search( self );
			self.typography_scripts( self );
		},

		window_load_render: function ( self ) {
			var self = self;
			self.page_preloader_init( self );
		},

		getTransitionEnd: function() {
			var styles = Object.keys( document.body.style ),
				transition = 'transitionend',
				transitions = {
					'transition': 'transitionend',
					'OTransition': 'oTransitionEnd',
					'MozTransition': 'transitionend',
					'WebkitTansition': 'webkitTransitionEnd'
				};

			Object.keys( transitions ).forEach( function( key ) {
				if ( -1 < styles.indexOf( key ) ) {
					transition = transitions[ key ];
				}
			} );

			return transition;
		},

		debounce: function( callback, threshold ) {
			var _timeout;

			return function _debounced( $jqEvent ) {
				function _delayed() {
					callback();
					timeout = null;
				}

				if ( _timeout ) {
					clearTimeout( _timeout );
				}

				_timeout = setTimeout( _delayed, threshold );
			};
		},

		smart_slider_init: function( self ) {
			$( '.mezmerize-smartslider' ).each( function() {
				var slider = $(this),
					sliderId = slider.data('id'),
					sliderWidth = slider.data('width'),
					sliderHeight = slider.data('height'),
					sliderOrientation = slider.data('orientation'),
					slideDistance = slider.data('slide-distance'),
					slideDuration = slider.data('slide-duration'),
					sliderFade = slider.data('slide-fade'),
					sliderNavigation = slider.data('navigation'),
					sliderFadeNavigation = slider.data('fade-navigation'),
					sliderPagination = slider.data('pagination'),
					sliderAutoplay = slider.data('autoplay'),
					sliderAutoplayDelay = slider.data('autoplay-delay'),
					sliderFullScreen = slider.data('fullscreen'),
					sliderShuffle = slider.data('shuffle'),
					sliderLoop = slider.data('loop'),
					sliderThumbnailsArrows = slider.data('thumbnails-arrows'),
					sliderThumbnailsPosition = slider.data('thumbnails-position'),
					sliderThumbnailsWidth = slider.data('thumbnails-width'),
					sliderThumbnailsHeight = slider.data('thumbnails-height'),
					sliderVisibleSize = slider.data('visible-size'),
					sliderForceSize = slider.data('force-size');

				if ( $('.smart-slider__items', '#' + sliderId ).length > 0 ) {
					$( '#' + sliderId ).sliderPro( {
						width: sliderWidth,
						height: sliderHeight,
						visibleSize: sliderVisibleSize,
						forceSize: sliderForceSize,
						orientation: sliderOrientation,
						slideDistance: slideDistance,
						slideAnimationDuration: slideDuration,
						fade: sliderFade,
						arrows: sliderNavigation,
						fadeArrows: sliderFadeNavigation,
						buttons: sliderPagination,
						autoplay: sliderAutoplay,
						autoplayDelay: sliderAutoplayDelay,
						fullScreen: sliderFullScreen,
						shuffle: sliderShuffle,
						loop: sliderLoop,
						waitForLayers: false,
						thumbnailArrows: sliderThumbnailsArrows,
						thumbnailsPosition: sliderThumbnailsPosition,
						thumbnailWidth: sliderThumbnailsWidth,
						thumbnailHeight: sliderThumbnailsHeight,
						init: function() {
							$( this ).resize();
						},
						sliderResize: function( event ) {

							var thisSlider = $( '#' + sliderId ),
								slides = $( '.sp-slide', thisSlider );

								slides.each( function() {

									if ( $( '.sp-title', this ).width() > $( this ).width() ) {
										$( this ).addClass( 'text-wrapped' );
									}

								} );
						},
						breakpoints: {
							992: {
								height: parseFloat( sliderHeight ) * 0.75,
							},
							768: {
								height: parseFloat( sliderHeight ) * 0.5
							}
						}
					} );
				}
			});//each end
		},

		swiper_carousel_init: function ( self ) {

			// Enable swiper carousels
			jQuery('.mezmerize-carousel').each( function() {
				var swiper = null,
					uniqId = jQuery(this).data('uniq-id'),
					slidesPerView = parseFloat( jQuery(this).data('slides-per-view') ),
					slidesPerGroup = parseFloat( jQuery(this).data('slides-per-group') ),
					slidesPerColumn = parseFloat( jQuery(this).data('slides-per-column') ),
					spaceBetweenSlides = parseFloat( jQuery(this).data('space-between-slides') ),
					durationSpeed = parseFloat( jQuery(this).data('duration-speed') ),
					swiperLoop = jQuery(this).data('swiper-loop'),
					freeMode = jQuery(this).data('free-mode'),
					grabCursor = jQuery(this).data('grab-cursor'),
					mouseWheel = jQuery(this).data('mouse-wheel'),
					breakpointsSettings = {
						1200: {
							slidesPerView: Math.floor( slidesPerView * 0.75 ),
							spaceBetween: Math.floor( spaceBetweenSlides * 0.75 )
						},
						992: {
							slidesPerView: Math.floor( slidesPerView * 0.5 ),
							spaceBetween: Math.floor( spaceBetweenSlides * 0.5 )
						},
						769: {
							slidesPerView: ( 0 !== Math.floor( slidesPerView * 0.25 ) ) ? Math.floor( slidesPerView * 0.25 ) : 1
						},
					};

					if ( 1 == slidesPerView ) {
						breakpointsSettings = {}
					}

				var swiper = new Swiper( '#' + uniqId, {
						slidesPerView: slidesPerView,
						slidesPerGroup: slidesPerGroup,
						slidesPerColumn: slidesPerColumn,
						spaceBetween: spaceBetweenSlides,
						speed: durationSpeed,
						loop: swiperLoop,
						freeMode: freeMode,
						grabCursor: grabCursor,
						mousewheelControl: mouseWheel,
						paginationClickable: true,
						nextButton: '#' + uniqId + '-next',
						prevButton: '#' + uniqId + '-prev',
						pagination: '#' + uniqId + '-pagination',
						onInit: function(){
							$( '#' + uniqId + '-next' ).css({ 'display': 'block' });
							$( '#' + uniqId + '-prev' ).css({ 'display': 'block' });
						},
						breakpoints: breakpointsSettings
					}
				);
			});
		},

		post_formats_custom_init: function ( self ) {
			CherryJsCore.variable.$document.on( 'cherry-post-formats-custom-init', function( event ) {

				if ( 'slider' !== event.object ) {
					return;
				}

				var uniqId = '#' + event.item.attr( 'id' ),
					swiper = new Swiper( uniqId, {
						pagination: uniqId + ' .swiper-pagination',
						paginationClickable: true,
						nextButton: uniqId + ' .swiper-button-next',
						prevButton: uniqId + ' .swiper-button-prev',
						spaceBetween: 30,
						onInit: function(){
							$( uniqId + ' .swiper-button-next' ).css({ 'display': 'block' });
							$( uniqId + ' .swiper-button-prev' ).css({ 'display': 'block' });
						},
					} );

				event.item.data( 'initalized', true );
			});

			var items = [];

			$('.mini-gallery .post-thumbnail__link').on('click', function(event) {
				event.preventDefault();

				$(this).parents('.mini-gallery').find('.post-gallery__slides > a[href]').each(function() {
					items.push({
						src: $(this).attr('href'),
						type: 'image'
					});
				});

				$.magnificPopup.open({
					items: items,
					gallery: {
						enabled: true
					}
				});
			});
		},

		navbar_init: function ( self ) {

			$( window ).load( function() {

				var $navbar = $('.main-navigation');

				if ( ! $.isFunction( jQuery.fn.stickUp ) || ! $navbar.length ) {
					return !1;
				}

				$navbar.stickUp({
					correctionSelector: '#wpadminbar',
					listenSelector: '.listenSelector',
					pseudo: true,
					active: true
				});
				CherryJsCore.variable.$document.trigger( 'scroll.stickUp' );

			});
		},

		subscribe_init: function( self ) {
			CherryJsCore.variable.$document.on( 'click', '.subscribe-block__submit', function( event ){

				event.preventDefault();

				var $this       = $(this),
					form       = $this.parents( 'form' ),
					nonce      = form.find( 'input[name="mezmerize_subscribe"]' ).val(),
					mail_input = form.find( 'input[name="subscribe-mail"]' ),
					mail       = mail_input.val(),
					error      = form.find( '.subscribe-block__error' ),
					success    = form.find( '.subscribe-block__success' ),
					hidden     = 'hidden';

				if ( '' == mail ) {
					mail_input.addClass( 'error' );
					return !1;
				}

				if ( $this.hasClass( 'processing' ) ) {
					return !1;
				}

				$this.addClass( 'processing' );
				error.empty();

				if ( ! error.hasClass( hidden ) ) {
					error.addClass( hidden );
				}

				if ( ! success.hasClass( hidden ) ) {
					success.addClass( hidden );
				}

				$.ajax({
					url: mezmerize.ajaxurl,
					type: 'post',
					dataType: 'json',
					data: {
						action: 'mezmerize_subscribe',
						mail: mail,
						nonce: nonce
					},
					error: function() {
						$this.removeClass( 'processing' );
					}
				}).done( function( response ) {

					$this.removeClass( 'processing' );

					if ( true === response.success ) {
						success.removeClass( hidden );
						mail_input.val('');
						return 1;
					}

					error.removeClass( hidden ).html( response.data.message );
					return !1;

				});

			})
		},

		main_menu: function ( self, $mainNavigation  ) {

			var transitionend = CherryJsCore.theme_script.getTransitionEnd(),
				duration_timeout,
				init,
				moreMenuContent = '&middot;&middot;&middot;',
				imgurl = '',
				srcset = '',
				hasimg = false,
				hasicon = false,
				hasprop = Object.prototype.hasOwnProperty,
				$menuToggle = $( '.menu-toggle', $mainNavigation ),
				liWithChildren = 'li.menu-item-has-children, li.page_item_has_children',
				$body = $( 'body' ),
				$parentNode,
				menuItem,
				subMenu,
				index = -1,
				
				$windowHeight,
				$fullHeight = 0,
				$diffHeight = 0;

			if ( hasprop.call( window, 'mezmerize' ) &&
				 hasprop.call( window.mezmerize, 'more_button_options' ) &&
				 hasprop.call( window.mezmerize.more_button_options, 'more_button_type' ) ) {
				switch( window.mezmerize.more_button_options.more_button_type ) {
					case 'image':
						imgurl = window.mezmerize.more_button_options.more_button_image_url;
						if ( window.mezmerize.more_button_options.retina_more_button_image_url ) {
							srcset = ' srcset="' + window.mezmerize.more_button_options.retina_more_button_image_url + ' 2x"';
						}
						moreMenuContent = '<img src="' + imgurl + '"' + srcset + ' alt="' + moreMenuContent + '">';
						hasimg = true;
					break;
					case 'icon':
						moreMenuContent = '<i class="fa ' + window.mezmerize.more_button_options.more_button_icon + '"></i>';
						hasicon = true;
					break;
					case 'text':
					default:
						moreMenuContent = window.mezmerize.more_button_options.more_button_text || moreMenuContent;
						hasimg = false;
						hasicon = false;
					break;
				}
			}

			$mainNavigation.superGuacamole( {
				threshold: 768, // Minimal menu width, when this plugin activates
				minChildren: 3, // Minimal visible children count
				childrenFilter: '.menu-item', // Child elements selector
				menuTitle: moreMenuContent, // Menu title
				menuUrl: '#',
				templates: {
					menu: '<li id="%5$s" class="%1$s' + ( hasimg ? ' super-guacamole__menu-with-image' : '' ) +
						  ( hasicon ? ' super-guacamole__menu-with-icon' : '' ) + '"><a href="%2$s">%3$s</a><ul class="sub-menu">%4$s</ul></li>',
					child_wrap: '<ul class="%1$s">%2$s</ul>',
					child: '<li id="%5$s" class="%1$s"><a href="%2$s">%3$s</a><ul class="sub-menu">%4$s</ul></li>'
				}
			} );

			function hideSubMenu( menuItem ) {
				subMenu = menuItem.children('.sub-menu');

				menuItem
					.removeData( 'index' )
					.removeClass( 'menu-hover' );
			}

			function handleMenuItemHover( $event ) {
				menuItem = $( $event.target ).parents( '.menu-item' );
				subMenu = menuItem.children( '.sub-menu' ).first();

				if ( ! menuItem.hasClass( 'menu-item-has-children' ) ) {
					menuItem = $event.target.tagName === 'LI' ?
						$( $event.target ) :
						$( $event.target ).parents().filter( '.menu-item' );
				}

				switch( $event.type ) {
					case 'mouseenter':
					case 'mouseover':
						menuItem.addClass( 'menu-hover' );
						if ( 0 < subMenu.length ) {
							var maxWidth = $body.outerWidth( true ),
								subMenuOffset = subMenu.offset().left + subMenu.outerWidth( true );
							if ( maxWidth <= subMenuOffset ) {
								subMenu.addClass( 'left-side' );
								subMenu.find( '.sub-menu' ).addClass( 'left-side' );
							} else if ( 0 > subMenu.offset().left ) {
								subMenu.removeClass( 'left-side' );
								subMenu.find( '.sub-menu' ).removeClass( 'left-side' );
							}
						}
					break;
					case 'mouseleave':
						hideSubMenu( menuItem );
					break;
				}
			}

			CherryJsCore.variable.$window.on( 'orientationchange resize', function() {
				$mainNavigation.find( '.menu-item' ).removeClass( 'menu-hover' );
				$mainNavigation.find( '.sub-menu.left-side' ).removeClass( 'left-side' );
				$mainNavigation.find( '.sub-menu.animate' ).removeClass( 'animate' );
			} );

			$mainNavigation.on( 'mouseenter mouseover mouseleave', '.menu-item', handleMenuItemHover );
			$mainNavigation.on( 'mouseover', '.menu-item', function( $event ) {
				$( $event.target ).parents( '.menu-item' ).children( '.sub-menu' ).first().addClass( 'animate' );
			} );

			function doubleClickMenu( $jqEvent ) {
				$parentNode = $( this );
				
				var menuIndex = $parentNode.index();

				if ( menuIndex !== parseInt( $parentNode.data( 'index' ), 10 ) ) {
					$jqEvent.preventDefault();
				}

				$parentNode.data( 'index', menuIndex );
			}

			// Check if touch events supported
			if ( 'ontouchend' in window ) {

				// Attach event listener for double click
				$( liWithChildren, $mainNavigation )
					.on( 'click', doubleClickMenu );

				// Reset index on touchend event
				CherryJsCore.variable.$document.on( 'touchend', function( $jqEvent ) {
					$parentNode = $( $jqEvent.target ).parents().filter( '.menu-item' );

					if ( $parentNode.hasClass( 'menu-hover' ) === false ) {
						hideSubMenu( $parentNode );

						index = $parentNode.data( 'index' );

						if ( index ) {
							$parentNode.data( 'index', parseInt( index, 10 ) - 1 );
						}
					}
				} );
			}

			$menuToggle.on( 'click', function(){
				$mainNavigation.toggleClass( 'toggled' );
			});

			/* Mobile menu toggles */
			$mainNavigation.find('li.menu-item-has-children').each(function(){
				var $this = $(this),
					$thisSubMenu = $this.find('> ul.sub-menu'),
					$thisLink = $this.find('> .mobile-sublink');

				$thisLink.on('click', function(event){
					event.preventDefault();
					$thisLink.toggleClass('active');
					$thisSubMenu.toggleClass('active');
				})
			})

			/**
			 * Full height submenus & menu vertical center 
			 * at vertical header layout
			 * @access private
			 */
			if ( $('.header-layout-vertical')[0] ) {
				makePanelsFullHeight( '.main-navigation', '.site-header.vertical' );

				makePanelsFullHeight( '.social-list--header', '.top-panel__wrap' );
			}

			function makePanelsFullHeight( element, parent ) {
				var $this = $(element),
					$thisHeight,
					$thisMainVerticalParent = $this.parents( parent ).children(),
					$thisMainVerticalParentHeight;

				$(window).on( 'resize.sub-menu-height', function() {
					// Init values
					if ( $(window).width() > 1199 ) {
						$windowHeight = Math.round( $(window).height() );
						$thisHeight = 0;
						$thisMainVerticalParentHeight = 0;
						$fullHeight = 0;
						$diffHeight = 0;

						$this.css( {
							'padding-top': 0,
							'padding-bottom': 0,
						} )
					
						if ( $('body').hasClass('admin-bar') ) {
							$windowHeight = $windowHeight - 32;
						}

						// Get this height & main parent height
						$thisHeight = Math.round( $this.height() );

						$thisMainVerticalParent.each(function(){
							$thisMainVerticalParentHeight += Math.round( $(this).innerHeight() );
						})

						// Get space height
						$diffHeight = $windowHeight - $thisMainVerticalParentHeight;

						if ( $diffHeight > 60 ) {
							// Add top & bottom paddings at element
							$this.css( {
								'padding-top': $diffHeight / 2,
								'padding-bottom': $diffHeight / 2,
							} )
						} else {
							$this.css( {
								'padding-top': 30,
								'padding-bottom': 30,
							} )
						}
					}

				} ).trigger( 'resize.sub-menu-height' );
			}

		},

		page_preloader_init: function ( self ) {
			if ( $( '.page-preloader-cover' )[0] ) {
				$( '.page-preloader-cover' ).delay( 500 ).fadeTo( 500, 0, function() {
					$( this ).remove();
				});
			}
		},

		to_top_init: function ( self ) {
			if ( $.isFunction( jQuery.fn.UItoTop ) ) {
				$().UItoTop({
					text: mezmerize.labels.totop_button,
					scrollSpeed: 600
				});
			}
		},

		top_search: function ( self ) {
			if( $('.top-panel__search')[0] ) {
				var search_form_wrap = $('.top-panel__search .search-form_wrap'),
					search_form_input = search_form_wrap.find('.search-form__field'),
					search_form_open_btn = search_form_wrap.find('.open-btn-link'),
					search_form_close_btn = search_form_wrap.find('.close-btn-link');

				search_form_wrap.click(function(event){
					event.stopPropagation();
				});

				search_form_open_btn.on('click', function(event){
					if ( ! search_form_wrap.hasClass('active') ) {

						event.preventDefault();
						search_form_wrap.addClass('active');
						search_form_wrap.parents('.mobile-block').addClass('active');

						setTimeout ( function() {
							search_form_input.focus();
						}, 350);
					}
				});
				search_form_close_btn.on('click', function(event){
					if ( search_form_wrap.hasClass('active') ) {

						event.preventDefault();
						search_form_wrap.removeClass('active');
						search_form_wrap.parents('.mobile-block').removeClass('active');
					}
				});

				$('html').click(function() {
					if ( search_form_wrap.hasClass('active') ) {
						
						search_form_wrap.removeClass('active');
						search_form_wrap.parents('.mobile-block').removeClass('active');
					}
				});

			}
		},

		typography_scripts: function ( self ) {
			if ( $('body.page.position-fullwidth, body.single.position-fullwidth') ) {
				var $content = $('.entry-content'),
					$children = $content.children();

				$children.each( function() {
					if ( $(this).has('img.alignnone.size-full')[0] ) {
						$(this).addClass('image-full-block');
					}
					if ( $(this).has('iframe')[0] ) {
						$(this).addClass('iframe-full-block');
					}
				} )
			}
		},
	}
	CherryJsCore.theme_script.init();
}(jQuery));
