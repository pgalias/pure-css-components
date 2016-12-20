'use strict';

import {} from '../_modules/menu/menu';
import onChange from './onchange';

$(() => {
  $('.side-menu').FixedMenu().CurrentTarget();

  const check = 'input[type=checkbox]';
  const radio = 'input[type=radio]';
  const widthOpt = '-width-opt';
  const themeOpt = '-theme-opt';

  $(`.acc${widthOpt} ${radio},.tabs${widthOpt} ${radio},.modalbox${widthOpt} ${radio},.slider${widthOpt} ${radio},.ddm-position-opt ${radio}`).on('change', function() {
    const self = $(this);

    const regexp = /(--full-width|--fixed-width|--wide-short|--wide|--full-size|--fixed-size|--down|--up|--left|--right)/g;
    onChange(self, 'code', regexp);

    const article = self.closest('article');

    article.find('.accordion, .tabs, .slider').toggleClass((index, element) => {
      let elementArray = element.split(' ');
      return `${elementArray[0]}--full-width ${elementArray[0]}--fixed-width`;
    });
    article.find('.modal__dialog')
        .removeClass('modal__dialog--full-size modal__dialog--fixed-size modal__dialog--wide modal__dialog--wide-short')
        .addClass(`modal__dialog${self.attr('data-class-name')}`);

    article.find('.first-dd')
        .removeClass('dropdown--down dropdown--up dropdown--left dropdown--right')
        .addClass(`dropdown${self.attr('data-class-name')}`);
  });

  $(`.acc-type-opt ${radio}`).on('change', function() {
    const self = $(this);
    const txt = self.attr('data-class-name');
    const regexp = /<span class="hljs-attr">type<\/span>=<span class="hljs-string">(["'])(?:(?=(\\?))\2.)*?\1<\/span>/;
    const replace = `<span class="hljs-attr">type</span>=<span class="hljs-string">"${txt}"</span>`;

    onChange(self, 'code', regexp, replace);

    self.closest('article').find('.accordion :input').each((index, element) => $(element).attr('type', txt));
  });

  $(`.slider-pills-position-opt ${radio}`).on('change', function() {
    const self = $(this);
    const txt = self.attr('data-class-name');
    const regexp = /(bottom|top|left|right)/;

    onChange(self, '.hljs-tag:eq(36)', regexp, '');

    self.closest('article').find('.slider__pills').removeClass('slider__pills--bottom slider__pills--top slider__pills--left slider__pills--right').addClass(`slider__pills--${txt}`);
  });

  $(`.acc${themeOpt} ${check}, .tabs${themeOpt} ${check}, .slider${themeOpt} ${check}, .ddm${themeOpt} ${check}, .modalbox${themeOpt} ${check}`).on('change', function() {
    const self = $(this);
    const txt = self.attr('data-class-name');
    const regexp = /(accordion--blue|tabs--blue|slider--blue|dropdown--blue|modal__dialog--blue)/;
    const child = self.attr('name').match('modalbox') ? '.hljs-tag:eq(5) .hljs-string' : '.hljs-tag:first .hljs-string';

    onChange(self, child, regexp, '', true);

    self.closest('article').find('.accordion, .tabs, .slider, .first-dd, .modal__dialog').toggleClass(txt);
  });

  $(`.slider-finite-opt ${check}`).on('change', function() {
    const self = $(this);
    const txt = self.attr('data-class-name');
    const regexp = /\sslider--finite/;
    const child = '.hljs-tag:first .hljs-string';

    onChange(self, child, regexp, '', true);

    self.closest('article').find('.slider').toggleClass(txt);
  });

  const url = 'https://api.github.com/repos/pgalias/pure-css-components/';
  const spanVersion = $('span.version');
  const pckageDwn = $('a.package-dwn');

  $.ajax(`${url}tags`)
      .done(function(data) {
        if (spanVersion.length === 1) {
          spanVersion.text(data[0].name);
          console.log('dupa');
        }
      });
  $.ajax(`${url}releases`)
      .done(function(data) {
        if (pckageDwn.length === 1) {
          pckageDwn.attr('href', data[0].zipball_url);
        }
      });
});