// Ross JS

(function($){

    // ## the dom is in place, but everything is not necessarily loaded (i.e. images) ## //
    $(document).ready(function(){


        /* =======================================================================
        ## Execute Functions on Load and Resize
        =========================================================================*/
        $(window).on("load resize", function(e) {
            position_dropdown_menu();
            position_second_dropdown_menu();
            mapResizer();
        });

        $(window).on( "load", function(e) {
            populateGridHeader();
        });

        /* =======================================================================
        ## Mobile Navigation
        =========================================================================*/


        /*Toggle hamburger menu*/
        var $hamburger = $('.hamburger');
        $hamburger.click( function() {
            $(this).toggleClass('is-active');
        });

        /*Turn regular hamburger into fancy hamburger*/
        $hamburger.click( function() {
            $('.mobile-navigation').slideToggle(200);
        });

        /*Insert hamburger into WP menu*/
        // var fancy_hamburger = '<button class="dl-trigger dl-active">Open Menu</button>';
        // $('#dl-menu').prepend(fancy_hamburger);

        /*Add submenu class*/
        $submenus = $('.sub-menu');
        $submenus.addClass('dl-submenu');

        $(function() {
            $( '#dl-menu' ).dlmenu({
                animationClasses : { classin : 'dl-animate-in-2', classout : 'dl-animate-out-2' }
            });
        });




        /* =======================================================================
        ## Navigation Menu Desktop
        =========================================================================*/

        /*position 1st sub menu with left padding*/
        function position_dropdown_menu() {
            var left_offset = $('#menu-item-20').offset().left;
            var left_padding_adjust = 8;
            var $first_dropdown = $('#main-menu > li > ul.sub-menu');
            $first_dropdown.css('padding-left',left_offset-left_padding_adjust);
        }
        /*position 2nd sub menu with left padding*/
        function position_second_dropdown_menu() {
            var left_offset = $('#menu-item-125').offset().left;
            var left_padding_adjust = -10;
            var $second_dropdown = $('#main-menu > li > ul.sub-menu > li > ul');
            $second_dropdown.css('padding-left',left_offset-left_padding_adjust);
        }


        /* ### Toggle Second Level Menu Items on Hover ### */
        /* =============================================== */

        /*select immediate li children of #main-menu, i.e. first level elements*/
        var $first_level = $('#main-menu > li');

        $first_level.hover(
            /*on hover of first level element*/
            function() {
                /*Display the submenu of the primary item with a sliding motion.*/
                $(this).children('.sub-menu').stop( true, true ).slideDown(120);
                /*Hides other first level submenus immediately*/
                $(this).siblings('li').children('.sub-menu').hide();
                /*The stop method stops the previous animation and clears the queue, in this case the hover out function of hiding the menu*/
            },
                /*once mouse leaves first level element*/
                function() {
                /*Hide the submenu with a sliding motion after a delay of 650ms*/
                $(this).children('.sub-menu').stop( true, true ).delay(650).slideUp(300);
                /*The stop method stops the previous animation and clears the queue, in this case the hover in function of displaying the submenu*/
            }
        );

        /* ### Toggle third level elements on hover ### */
        /* ============================================ */

        /*select second level menu items*/
        var $second_level = $('#main-menu > li > ul > li');

        $second_level.hover(
            /*on hover of second level menu item*/
            function() {
                /*Display the submenu of the second level item with a sliding motion*/
                $(this).children('.sub-menu').stop( true, true ).slideDown(120);
                /*Positioning of 3rd level drop down menu to be in line with second level dropdown*/
                position_second_dropdown_menu();
            }, function() {
                /*Hide the submenu with a sliding motion after a delay of 650ms*/
                $(this).children('.sub-menu').delay(600).slideUp(100);
            }
        );


        /*remove .form-control from search form*/
        var $search_box_input = $('.search-box input');
        $search_box_input.removeClass('form-control');
        $search_box_input.attr('placeholder','Search..');


        /*Add magnifying glass inside input field*/
        var magnifying_glass_html = '<i class="fa fa-search" aria-hidden="true"></i>';
        $('.search-box').append(magnifying_glass_html);


        /*Contact details toggle*/
        var $contact_menu_item = $('.menu-item-25');
        var $contact_dropdown = $('#contact-dropdown');

        $contact_menu_item.click( function() {
            $contact_dropdown.slideToggle();
        });


        $(document).click(function(e) {
            $contact_dropdown.slideUp();
        });

        $contact_menu_item.click( function(e) {
            e.stopPropagation();
        });


        // Toggle Mobile Search Magnifying Glass
        var $mobileMagnifyingGlass = $( '#mobileMagnifyingGlass' );
        var $mobileSearchBox = $( '#mobileSearchBox' );
        var $closeMobileCross = $( '#closeMobileCross' );

        $mobileMagnifyingGlass.click( function() {
            $mobileSearchBox.slideToggle();
        });
        $closeMobileCross.click( function() {
           $mobileSearchBox.slideToggle();
        });






        /* =======================================================================
        ### Front Page
        ========================================================================*/


        /*Download project image*/

        var $downloadButtonHome = $('#download-home-image');

        /*Get active slide image link*/
        function get_active_slide_link_home() {
            var $downloadButtonHome = $('#download-home-image');
            var $activeSliderContainer = $( "#home-carousel .owl-item.active > .home-slide" );
            var imageUrl = $activeSliderContainer.css( 'background-image' ).replace('url(','').replace(')','').replace(/\"/gi, "");
            var fileNameIndex = imageUrl.lastIndexOf("/") + 1;
            var fileName = imageUrl.substr( fileNameIndex );
            $downloadButtonHome.children("a").attr( 'href', imageUrl );
            $downloadButtonHome.children("a").attr( 'download', fileName );
        }

        $downloadButtonHome.click( function() {
            get_active_slide_link_home();
        });



        /* =======================================================================
        ### Project Grid Page
        ========================================================================*/


        /*Change Heading Depending on Filtering
        * --------------------------------------*/

        /* ### Function gets the value of a given parameter in the query string ### */
        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };


        /* ### Convert to Title Case Function ### */
        function toTitleCase(str)
        {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }

        /* ### Populate Header Function ### */
        function populateGridHeader() {

            /*Add the country to below the header*/
            var slug = getUrlParameter('fwp_region'); // store the value of the fwp_region key in the variable slug
            var region = getUrlParameter('fwp_region'); // store the value of the fwp_region key in the variable region
            if(region) {
                // convert the slug to uppercase string with a space instead of a dash
                region = region.replace(/-/g,' ');
                region = toTitleCase(region);
            }
            if( region === "Usa" ) {
                region = "USA";
            }

            /*if region is defined then populate the page title*/
            if( region ) {
                $('#grid-h1-title #grid-country').html( "- " + region);
            }


            /* display city/location dropdown once clicked on region/country dropdown depending on what is selected in region drop down*/
            var location_selector = "#" + slug;
            $('.location-dropdown').css('display','none');
            $(location_selector).css('display','block');


            /*display clear filters button*/
            $clear_filters_btn.css( 'display', 'block' );

        }

        /*clear filters button*/
        var $clear_filters_btn = $( '#clear-filters' );

        /*When click on region dropdown box*/
        $('#region-dropdown').click( function() {

            populateGridHeader();

        });

        /*Clear filters button*/

        $clear_filters_btn.click( function() {

            // hide location dropdown
            $('.location-dropdown').css('display','none');

            // clear sub heading region / country text
            $('#grid-country').html( " &nbsp; " );

            // hide clear filters button
            $clear_filters_btn.hide();
        });


        /*populate region / country*/

        /*When click on city/location dropdown box*/
/*        $('.location-dropdown').click( function() {
            var region = getUrlParameter('fwp_region');
            var location_parameter = 'fwp_location_' + region;
            location_parameter = location_parameter.replace('-','_');
            var location = getUrlParameter( location_parameter );

            if(region) {
                region = region.replace(/-/g,' ');
                region = toTitleCase(region);
            }
            if( region === "Usa" ) {
                region = "USA";
            }

            if(location) {
                location = location.replace('-',' ');
                location = toTitleCase(location);
            }

            if(region) {
                $('#grid-country').html(region);
            }

            if(location) {
                $('#grid-city').html(location);
                $('#comma').html(',');
            }


        });*/




        /*hover effects on grid item*/
        var $grid_item = $('.grid-item-bg-div');
        $grid_item.hover(
            function() {
                $(this).children('.white-bottom-accent').show(300);
                // $(this).children('.grid-item-content').show(300);
            }, function() {
                $(this).children('.white-bottom-accent').hide(300);
                // $(this).children('.grid-item-content').hide(300);
            }
        );




        /* =======================================================================
        ## Single Project Page
        =========================================================================*/

        /*Download project image*/

        var $downloadButton = $('#download-project-image');

        /*Get active slide image link*/
        function get_active_slide_link() {
            var $downloadButton = $('#download-project-image');
            var $activeSliderContainer = $( "#project-carousel .owl-item.active > .project-slide" );
            var imageUrl = $activeSliderContainer.css( 'background-image' ).replace('url(','').replace(')','').replace(/\"/gi, "");
            var fileNameIndex = imageUrl.lastIndexOf("/") + 1;
            var fileName = imageUrl.substr( fileNameIndex );
            $downloadButton.children("a").attr( 'href', imageUrl );
            $downloadButton.children("a").attr( 'download', fileName );
        }

        $downloadButton.click( function() {
            get_active_slide_link();
        });





        /* =======================================================================
        ## Careers Page
        =========================================================================*/


        /*Job Accordion*/
        var $job_details = $('.job-details');
        var $job_description = $('.job-description');
        var $plus = $('.fa-plus');
        var $minus = $('.fa-minus');

        $plus.click( function() {
            $(this).closest($job_details).next($job_description).slideToggle();
            $(this).closest($job_details).addClass('expanded');
            $(this).hide();
            $(this).next($minus).show();
        });

        $minus.click( function() {
            $(this).closest($job_details).next($job_description).slideToggle();
            $(this).closest($job_details).removeClass('expanded');
            $(this).hide();
            $(this).prev($plus).show();
        });


        // Media Page: Magazine

        /*magazine info popup*/
        var $media_block = $('.media-block');
        $media_block.click( function() {
            $media_block.not(this).find('.media-popup').each( function() {
                $(this).hide();
            });
            $(this).find('.media-popup').fadeToggle();
        });



        /* =======================================================================
        ## Map Page - Projects by Location. page-projects-by-location.php
        =========================================================================*/

        // Stretch the map
        function mapResizer() {
            var mapPageId = document.querySelector( '.page-id-421' );
            if( mapPageId ) {
                var mapContainer = document.getElementById('cyMapContainer');
                var mapHeight = mapContainer.clientHeight + 'px';
                var mapInnerContainer = document.getElementById('map1');
                mapInnerContainer.style.height = mapHeight;
            }
        }

        // Close Map Key
        $('.close-key').click( function() {
            $('.map-key').hide();
        })



    });

    // ## everything is loaded (images, scripts, etc.) ## //
    $(window).load(function(){


        /* =======================================================================
        ## Single Projects Page
        =========================================================================*/

        /*Add down arrow to carousel*/
        var down_arrow = "<div class='down-arrow'><a href='#project-content'><img src='../../wp-content/themes/saota/img/down-arrow.png' alt='down-arrow'/></a></div>";
        $('#project-carousel').append(down_arrow);

        var down_arrow_career = "<div class='down-arrow'><a href='#careers-and-jobs'><img src='../../wp-content/themes/saota/img/down-arrow.png' alt='down-arrow'/></a></div>";
        $('#career-carousel').append(down_arrow_career);


        /*Add accent to thumbnail*/


        var $owl = $('#project-carousel');
        var $thumb = $('.project-thumbs-nav-strip a');
        /*add accent to first child*/
        $('.project-thumbs-nav-strip a:first-child').addClass( "active" );
        $owl.owlCarousel();
        // Listen to owl events:
        $owl.on('changed.owl.carousel', function(event) {
            var url = window.location.href;
            var slide_number = url[url.length -1];

            $thumb.each( function() {
                var thumbnail = $(this).attr( "href" );
                var thumbnail_number = thumbnail[thumbnail.length -1];
                if( thumbnail_number == slide_number) {
                    $(this).addClass( "active" );
                } else {
                    $(this).removeClass( "active" );
                }
            });


        });


        /*Center position thumbnails if they are narrower than the screen*/
        function center_thumbs() {

            var $thumbnail_container = $('#project-carousel-thumbs .owl-stage');
            var thumbs_width = $thumbnail_container.width();
            var browser_width = $(window).width();

            /*only execute on single project page*/
            if( $('body').is('.single-project') ) {

                /*check if thumbs are narrower than browser and therefore if they need to be centred*/
                if( thumbs_width < browser_width ) {
                    var move_right = ( .5*browser_width ) - ( .5*thumbs_width );
                    $thumbnail_container.css( 'left', move_right );
                } else {
                    $thumbnail_container.css( 'left', 0 );
                }
            }

        }
        center_thumbs();
        $(window).on("load resize", function(e) {
            center_thumbs();
        });
        /*---------------------------------------------------------------*/





        // Smooth scroll links from https://css-tricks.com/snippets/jquery/smooth-scrolling/
        // Select all links with hashes
        $('a[href*="#"]')
        // Remove links that don't actually link to anything
            .not('[href="#"]')
            .not('[href="#0"]')
            .click(function(event) {
                    // On-page links
                    if (
                        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                        &&
                        location.hostname == this.hostname
                    ) {
                        // Figure out element to scroll to
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        // Does a scroll target exist?
                        if (target.length) {
                            // Only prevent default if animation is actually gonna happen
                            event.preventDefault();
                            $('html, body').animate({
                                scrollTop: target.offset().top - 51
                            }, 1000, function() {
                                // Callback after animation
                                // Must change focus!
                                var $target = $(target);
                                $target.focus();
                                if ($target.is(":focus")) { // Checking if the target was focused
                                    return false;
                                } else {
                                    $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                                    $target.focus(); // Set focus again
                                }
                            });
                        }
                    }
                }
            );
        /*End smooth scroll links code*/


        /* =======================================================================
        ## Map Page - Projects by Location. page-projects-by-location.php
        =========================================================================*/

        // Add in dot title
        function dotLabels() {

            var $dotDiv = $('.gmnoprint');
            $dotDiv.splice(-4,4);
            // console.log( $dotDiv );
            var dotCounter = 0;
            $dotDiv.each( function() {
                dotCounter ++;
                var $img = $(this).find('img');
                var imgSrc = $img.attr('src');

                var n = imgSrc.lastIndexOf('/');
                var i = imgSrc.lastIndexOf('.');
                var city = imgSrc.substring(n + 1, i);

                cityName = city.replace(/-/g,' ');

                var cityHTML = '<div class="city-label" id="' + city + '">' + cityName + '</div>';

                $(this).append( cityHTML );

            });


            // make hollow dot title unclickable

            var hollowDots = [
                'Abu Dhabi',
                'Yerevan',
                'Gold Coast',
                'Melbourne',
                'Perth',
                'Holetown',
                'Brasschaat',
                'Ouagadougou',
                'Paget Parish',
                'Sao Paulo',
                'Cat Cays',
                'Yaounde',
                'Paphos',
                'Munich',
                'Casa de Campo',
                'Benahavis',
                'Mougins Village',
                'Annecy',
                'Paris',
                'Ascot',
                'Takoradi',
                'Patras',
                'Triopetra',
                'Mumbai',
                'South Delhi',
                'New Delhi',
                'Khopoli',
                'Panipat',
                'Trino',
                'Kingston',
                'Male Atoll',
                'Guanajuato',
                'San Luis Potosi',
                'Benguera Island',
                'Abuja',
                'Nelson',
                'Muscat',
                'Islamabad',
                'Herdade',
                'Leiria',
                'Algarve',
                'Sochi',
                'Kigali',
                'Jeddah',
                'Mahe',
                'Ile Aurore, Mahe',
                'Praslin Island',
                'Lome',
                'Phuket',
                'Cesme',
                'Agua Dulce',
                'Aspen',
                'Boca Raton',
                'Bridgehampton',
                'Boston',
                'Durham',
                'Elka Park',
                'Houston',
                'Sausalito',
                'Kansas City',
                'Las Vegas',
                'Palm Beach',
                'Paradise Valley',
                'Pacific Palisades',
                'Rutherford',
                'San Francisco',
                'San Ramon',
                'Southampton',
                'Topanga',
                'Saint Croix',
                'Zimbali',
                'Pietermaritzburg',
                'Stanford',
                'Vanderbijlpark',
                'Lusaka'
                ];


            var i;
            for (i = 0; i < hollowDots.length; i++) {

                var city = hollowDots[i].toLowerCase().replace(/ /g,'-');
                var cityId = '#' + city;

                $( cityId ).click( function(e) {
                    /*Prevent default click action and bubbling*/
                    e.preventDefault();
                    e.stopPropagation();
                });

                $( cityId ).css( 'cursor', 'default' );

                /*Make cursor a pointer*/
                var $dotImg = $( cityId ).parent('.gmnoprint');
                $dotImg.css('cursor','default');

                $dotImg.click( function(e) {

                    e.preventDefault();
                    e.stopPropagation();

                    /*hide infowindow popup arrows*/
                    $('.gm-style-iw').prev('div').hide();
                });

            }


        }


        // use setTimeout() to execute
        setTimeout(dotLabels, 1250);








    });

})(jQuery);



/*This jQuery event gets triggered when FacetWP finishes refreshing.
It’s triggered after a user interacts with a facet or pagination control.
This event is useful for modifying facet output after being rendered.*/

(function($) {
    $(document).on('facetwp-loaded', function() {
        // Scroll to the top of the page after the page is refreshed
        $('html, body').animate({ scrollTop: 0 }, 500);


        /*hover effects on grid item*/
        var $grid_item = $('.grid-item-bg-div');
        $grid_item.hover(
            function() {
                $(this).children('.white-bottom-accent').show(300);
                $(this).children('.grid-item-content').show(300);
            }, function() {
                $(this).children('.white-bottom-accent').hide(300);
                $(this).children('.grid-item-content').hide(300);
            }
        );


    });
})(jQuery);
