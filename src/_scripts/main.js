// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import {} from '../_modules/menu/menu';

$(() => {
  $('.side-menu').FixedMenu().CurrentTarget();

  function onChange(self, child, regexp, replace = '', checkbox = false) {
    const txt = self.attr('data-class-name');
    const selector = self.closest('article').find('pre').find(child);
    const type = child === 'code' ? 'html' : 'text';
    const code = selector[type]();

    replace = checkbox === true
        ? (code.match(regexp) ? code.replace(regexp, '') : `${code.substr(0,code.length-1)}${txt}"`)
        : (replace || txt);

    replace = checkbox !== true
        ? code.replace(regexp, replace)
        : replace;

    selector[type](replace);
  }

  $('.acc-width-opt input[type=radio],.tabs-width-opt input[type=radio],.modalbox-width-opt input[type=radio],.slider-width-opt input[type=radio]').on('change', function() {
    const self = $(this);

    const regexp = /(--full-width|--fixed-width|--wide-short|--wide|--full-size|--fixed-size)/g;
    onChange(self, 'code', regexp);

    self.closest('article').find('.accordion, .tabs, .slider').toggleClass((index, element) => {
      let elementArray = element.split(' ');
      return `${elementArray[0]}--full-width ${elementArray[0]}--fixed-width`
    });

    self.closest('article').find('.modal__dialog')
        .removeClass('modal__dialog--full-size modal__dialog--fixed-size modal__dialog--wide modal__dialog--wide-short')
        .addClass(`modal__dialog${self.attr('data-class-name')}`);
  });

  $('.acc-type-opt input[type=radio]').on('change', function() {
    const self = $(this);
    const txt = self.attr('data-class-name');
    const regexp = /<span class="hljs-attr">type<\/span>=<span class="hljs-string">(["'])(?:(?=(\\?))\2.)*?\1<\/span>/;
    const replace = `<span class="hljs-attr">type</span>=<span class="hljs-string">"${txt}"</span>`;

    onChange(self, 'code', regexp, replace);

    self.closest('article').find('.accordion :input').each((index, element) => $(element).attr('type', txt));
  });

  $('.slider-pills-position-opt input[type=radio]').on('change', function() {
    const self = $(this);
    const txt = self.attr('data-class-name');
    const regexp = /(bottom|top|left|right)/;

    onChange(self, '.hljs-tag:eq(36)', regexp, '');

    self.closest('article').find('.slider__pills').removeClass('slider__pills--bottom slider__pills--top slider__pills--left slider__pills--right').addClass(`slider__pills--${txt}`);
  });

  $('.acc-theme-opt input[type=checkbox], .tabs-theme-opt input[type=checkbox], .slider-theme-opt input[type=checkbox]').on('change', function() {
    const self = $(this);
    const txt = self.attr('data-class-name');
    const regexp = /(accordion--blue|tabs--blue|slider--blue)/;

    onChange(self, '.hljs-tag:first .hljs-string', regexp, '', true);

    self.closest('article').find('.accordion, .tabs, .slider').toggleClass((index, element) => {
      let elementArray = element.split(' ');
      return `${elementArray[0]}${txt.replace(elementArray[0], '')}`;
    });
  });

  $('.modalbox-theme-opt input[type=checkbox]').on('change', function() {
    const self = $(this);
    const txt = self.attr('data-class-name');
    const regexp = /modal__dialog--blue/;

    onChange(self, '.hljs-tag:eq(5) .hljs-string', regexp, '', true);

    self.closest('article').find('.modal__dialog').toggleClass(txt);
  });
});