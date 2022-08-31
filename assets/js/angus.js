/*---------------------------------------------------------------------------------------
* Template Name      :  Angus - Personal Responsive HTML Portfolio Template              |
* Author             :  Narek Sukiasyan                                                  |
* Version            :  1.0.0                                                            |
* Created            :  March 2021                                                       |
* Updated            :  March 2021                                                       |
* File Description   :  Main JS file of the template                                    |
*----------------------------------------------------------------------------------------
*/


$(function(){

    "use strict";

    var ANGUS = ANGUS || {};
    // Init Function
    ANGUS.init = function(){
        this.header = $('.angus-header');
        this.headerOpened = false;
        this.navtoggler = $('.angus-toggler');
        this.services = $('.services-carousel');
        this.testimonials = $('.testimonials-list');
        this.bloglist = $('.blog-list');
        this.input = $('.formcontrol');
        this.nav = $('.nav');
        this.Animated = false;
        this.sections = [];
        this.portfolio_slider = $('.portfolio-slider');

        this.splitText = $('.split-animation');
        this.returntotop = $('#return-to-top');

        this.portfolioSingle = $('.portfolio-single');

        this.particle = $('#particlebackground');

        
        this.events();
        this.owlcarouselInit();
        this.particleBackground();
    }


    //Events Trigger
    ANGUS.events = function(){
        this.navtoggler.bind("click", {self:this}, this.navToggler);
        this.input.bind('focus', {self:this}, this.formFocused);
        this.input.bind('blur', {self:this}, this.formFocused);
        $('a[href^="#"]:not([href="#"]').bind('click', {self:this}, this.toSection);
        
        this.portfolio();

        this.splitAnimation();
    };

    // Particle js
    ANGUS.particleBackground = function(){
        if(this.particle.length != 0)
        {
            var config = this.particle.data('config');
            particlesJS.load('particlebackground', config);
        }
    }

    //Portfolio Popup magnificPopup
    ANGUS.portfolio = function(){

        $('.portfolio-image').magnificPopup({
            type:"image",
            closeOnContentClick: true,
            gallery:{
                enabled: true,
                navigateByImgClick:true,
                preload:[0,1]
            }
        });

        $('.portfolio-iframe').magnificPopup({
            type: "iframe",
            closeBtnInside: false,
            iframe: {
                markup: '<div class="mfp-iframe-scaler">'+
                          '<div class="mfp-close"></div>'+
                          '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                        '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
              
                        id: 'v=',
              
                        src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                         index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                    },
              
                srcAction: 'iframe_src',
            }
            
        });

        
    }

    //Splitting Text and add aos settings
    ANGUS.splitAnimation = function(){
        this.splitText.each(function(){
            var $element = $(this);
            var elements = '';
            var text = $(this).text().trim();
            var isAOS = $(this).data('aos-animation') != undefined ? true : false;
            if(isAOS)
            {
                var animation = $(this).data('aos-animation') ? $(this).data('aos-animation') : 'fade-up';
            }


            
            var delay = 0;

            for(var i = 0; i < text.length; i++)
            {
                var char = text[i];
                var args = text[i];
                if(text[i] === " "){
                    char = '&nbsp;';
                    args = 'space';
                }
                
                elements += '<span data-char="'+args+'"';
                if(isAOS)
                {
                    elements += 'data-aos="'+animation+'" data-aos-delay="'+delay+'"';
                }
                
                elements += '>'+char+'</span>';
                delay+=50;
            }


            $(this).html(elements);

            var index = 0;
            
        });
    }

    // Navigation Button Toggler
    ANGUS.navToggler = function(event){
        var self = event.data.self;
        var opened = $(this).hasClass('pressed') ? true : false;
        var nav = $(this).parent().find('.nav-area');

        nav.css({'height':'auto'});
        var iHeight = nav.height();

        if(opened)
        {
            if(!self.Animated){
                self.Animated = true;
                $(this).removeClass('pressed');
                nav.animate({height: 0},{
                    duaration: 500,
                    complete: function(){ 
                        nav.hide();
                        nav.removeAttr('style');
                        self.Animated = false;
                        self.headerOpened = false;
                        self.headerScroll();
                    }
                });
            }
        }else{
            if(!self.Animated){
                self.Animated = true;
                $(this).addClass('pressed');
                nav.css({
                    'height' : 0
                });
                nav.show();
                nav.animate({height: iHeight},{
                    duaration: 500,
                    complete: function(){
                        self.Animated = false;
                        nav.removeAttr('style');
                        nav.show();
                        self.headerOpened = true;
                        self.headerScroll();
                    }
                })
            }
        }
    }

    //OWL Carousel Init
    ANGUS.owlcarouselInit = function(){
        this.services.owlCarousel({
            
            dots: false,
            margin: 80,
            responsive: {
                0: {
                    items: 1,
                },
                770: {
                    items: 2,
                },
                1200: {
                    items: 3,
                }
            }

        });

        this.testimonials.owlCarousel({
            margin: 80,
            responsive: {
                0: {
                    items: 1, 
                },
                770: {
                    items: 2
                }
            },
            dots: true
        });

        this.bloglist.owlCarousel({
            margin: 80,
            responsive: {
                0: {
                    items: 1
                },
                770: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            },
            dots: false,
            nav: true
        });

        this.portfolio_slider.owlCarousel({
            responsive: {
                0: {
                    items: 1
                },
                770: {
                    items: 1,
                    stagePadding: 0,
                },
                1200: {
                    items: 1,
                    stagePadding: 300,
                },
                1600: {
                    items: 1,
                    stagePadding: 400,
                }
            },
            dots: false,
            onDragged: this.portfolio_slide,
            onInitialized: this.portfolio_slide
        });

        
    }

    // Slider Portfolio 
    ANGUS.portfolio_slide = function(event){
        var index = event.item.index != null ? event.item.index : 0;
        

        if(this.portfolioSlideIndex === index) return;
        

        var animation = "fade-up";

        

        $('.portfolio-slider').find('.owl-stage > .owl-item h2.split-animation > span').removeAttr('style').removeClass('animate').removeClass('aos-animate');
        $('.portfolio-slider').find('.owl-stage > .owl-item .tps-desc > div').removeAttr('style').removeClass('animate').removeClass('aos-animate');
        $('.portfolio-slider').find('.owl-stage > .owl-item h2.split-animation').removeAttr('style').removeClass('animate').removeClass('aos-animate');

        var $span = $('.portfolio-slider').find('.owl-stage > .owl-item:eq('+index+') h2.split-animation > span');
        var $h2 = $('.portfolio-slider').find('.owl-stage > .owl-item:eq('+index+') h2.split-animation');
        var $desc = $('.portfolio-slider').find('.owl-stage > .owl-item:eq('+index+') .tps-desc > div');

        var delay = 0;

        var descDelay = 1000;

        $h2.addClass('animate');

        $span.each(function(){
            
            if( index === 0 )
            {
                if( $(this).is('[data-aos]') )
                {
                    $(this).addClass('aos-animate');
                }else{
                    $(this).attr('data-aos', animation);
                    $(this).attr('data-aos-delay', delay);
                }
            }
            else
            {
                $(this).css({
                    'transition-delay' : delay / 1000 + 's'
                });
                $(this).addClass('animate'); 
            }

            delay += 50;
        });

        $desc.each(function(){

            
            if( index === 0 )
            {   

                if( $(this).is('[data-aos]') )
                {
                    $(this).addClass('aos-animate');
                }else{
                    $(this).attr('data-aos', animation);
                    $(this).attr('data-aos-delay', descDelay);
                }
                
            }
            else 
            {
                $(this).css({
                    'transition-delay' : descDelay / 1000 + 's'
                });
                $(this).addClass('animate');
            }

            descDelay += 50;
        });
        
        
        AOS.refresh();
        

        this.portfolioSlideIndex = index;

        
    };

   
    //Form Settings
    ANGUS.formFocused = function(){
        var form_control = $(this).parent();
        var isFocused = form_control.hasClass('form-focused') ? true : false;
        if(isFocused)
        {
            if($(this).val() === "" || $(this).val() === undefined)
            {
                form_control.removeClass('form-focused');
            }
            
        }
        else{
            form_control.addClass('form-focused');
        }
    };

    // Header in Window scroll
    ANGUS.headerScroll = function(){
        
        if(this.header.hasClass('none_transparent')) return;

        if(this.headerOpened)
        {
            this.header.removeClass('transparent_header');
            return;
        }

        if(window.innerWidth > 768 && this.headerOpened && $(window).scrollTop() < parseInt(window.innerHeight * 0.12))
        {
            this.header.addClass('transparent_header');
            return;
        }

        if( $(window).scrollTop() < parseInt(window.innerHeight * 0.12) ) {

            this.header.addClass('transparent_header');
            
        }else{

            this.header.removeClass('transparent_header');

        }
    };

    // Scrol to Section function
    ANGUS.toSection = function(){
        
        var $anchor = $(this);
        var offset = parseInt($('body').data('offset'));
        $('html, body').stop().animate({
            scrollTop: ( $($anchor.attr('href')).offset().top ) - ( offset - 1 )
        }, 1000, 'easeInOutQuart');
        event.preventDefault();
    }

    // Finding sections for scrollspy
    ANGUS.findSections = function(){
        var elements = [];
        
        $('a[href^="#"]:not([href="#"]').each(function(){
            var hash = $(this).attr('href');
            if($( hash ).length > 0)
            {
                var offset = $('body').data('offset') ? $('body').data('offset') : 0;
                var element = $( hash );
                var link = $(this);
                var top = Math.floor(element.offset().top) - offset;
                var bottom = top + Math.floor(element.outerHeight());
                elements.push({element: element, link: link, hash : hash, top: top, bottom: bottom});
            }
        });
            
        this.sections = elements;
       
    }

    //Scrollspy function
    ANGUS.scrollspy = function(){
        var position = $(window).scrollTop();
        var finded = false;
        for(var i = 0; i < this.sections.length; i++)
        {
            

            if(this.sections[i].top <= position && this.sections[i].bottom > position)
            {

                this.nav.find("li").removeClass('active');

                this.nav.find('a[href^="'+this.sections[i].link.attr('href')+'"]').parent().addClass('active');

                finded = true;

            }
        }

        if(!finded)
        {
            this.nav.find("li").removeClass('active'); 
        }
    }

    //Scroll to Top button
    ANGUS.scrollTopButton = function(w){
        if(w.scrollTop() >= 350) {
            $('#return-to-top').fadeIn(200);
        } else {
            $('#return-to-top').fadeOut(200);
        }
    }

    

    $(document).ready(function(){
        ANGUS.init();
        ANGUS.headerScroll();
        

        $('body').on("angusLoaded", function(){

            ANGUS.findSections();
            ANGUS.scrollspy();
        
            AOS.init({
                duration: 1000,
                once: true,
                offset: 60
            });

        });

        

        
        

        $(window).on('scroll', function(){
            ANGUS.headerScroll();
            ANGUS.scrollspy();
            ANGUS.scrollTopButton($(this));
            

        });

        $(window).resize(function(){
            ANGUS.headerScroll();
            ANGUS.findSections();
            ANGUS.scrollspy();
            ANGUS.owlcarouselInit();
        });

    });

    

    

});