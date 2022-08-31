// This is Used For Load

function loading(elem)
{
    
    var slider = document.querySelector('.loading_slider'),
        preloader = document.querySelector('.preloader');

    var w = 0;

    var scrollerwidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = scrollerwidth + "px";
    document.querySelector('.angus-header').style.width = "calc(100% - "+scrollerwidth+"px)";

    

    var event = new CustomEvent('angusLoaded');

    var t = setInterval(function(){
        w += 10;
        slider.style.width = w + '%';

        if(w === 100)
        {
            slider.classList.add("hide");
            preloader.classList.add("loaded");

            setTimeout(function(){
                preloader.classList.add("hide");
                document.body.removeAttribute("style");
                document.querySelector('.angus-header').removeAttribute("style");
                elem.dispatchEvent(event);
            },1300);

            clearInterval(t);
        }
    },50);
}


window.addEventListener("load", function(event)
{
    window.scrollTo(0,0);
    loading( document.body );

    
});
