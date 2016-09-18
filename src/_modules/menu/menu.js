'use strict';

jQuery.fn.extend({
  FixedMenu: function() {
    return this.each(function(index, el) {
      const $el = $(el);
      const position = $el.offset().top;
      const screenWidth = screen.width;
      const laptopBreakpoint = 992;

      let onScroll = () => {
        const scrollTop = $(window).scrollTop();
        $el.toggleClass('fixed', scrollTop >= position && screenWidth >= laptopBreakpoint);
      };

      $(window).on('scroll', onScroll);
    });
  },
  CurrentTarget: function() {
    return this.each(function(index, el) {
      const $el = $(el);
      const screenWidth = screen.width;
      const laptopBreakpoint = 992;

      let onScroll = () => {
        const scrollTop = $(window).scrollTop();
        $el.find('a').each(function() {
          const current = $(this);
          const parent = current.parent();
          const refEl = $(current.attr('href'));

          parent.toggleClass('current', refEl.position().top <= scrollTop && refEl.position().top + refEl.height() > scrollTop && screenWidth >= laptopBreakpoint);
        });
      };

      $(window).on('scroll', onScroll);
    });
  }
});


