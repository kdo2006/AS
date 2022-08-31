$(function(){
    $('.switcher-button').on('click', function(){

        $('#color-switcher').hasClass('open-switcher') ? $('#color-switcher').removeClass('open-switcher') :  $('#color-switcher').addClass('open-switcher');
         
    });

    $('.swtich-color').on('click', function(event){

        

        $('.swtich-color').removeClass('active');

        $(this).addClass('active');

        console.log($(this).data('color'));

        $('html').attr('data-color', $(this).data('color'));

        $('.switcher-button').click();

        event.preventDefault();
    });
});


