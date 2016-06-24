(function($) {
    var ost = 0;
    $(window).scroll(function() {
      var cOst = $(window).scrollTop();
      console.log(cOst);
      if(cOst > 250 && cOst > ost) {
         $('header').addClass('default').removeClass('fixed');
      }
      else if(cOst < 250){
         $('header').addClass('fixed').removeClass('default');
      }

      ost = cOst;
    });
})(jQuery);