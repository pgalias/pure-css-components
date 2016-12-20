(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

jQuery.fn.extend({
  FixedMenu: function FixedMenu() {
    return this.each(function (index, el) {
      var $el = $(el);
      var position = $el.offset().top;
      var screenWidth = screen.width;
      var laptopBreakpoint = 992;

      var onScroll = function onScroll() {
        var scrollTop = $(window).scrollTop();
        $el.toggleClass('fixed', scrollTop >= position && screenWidth >= laptopBreakpoint);
      };

      $(window).on('scroll', onScroll);
    });
  },
  CurrentTarget: function CurrentTarget() {
    return this.each(function (index, el) {
      var $el = $(el);
      var screenWidth = screen.width;
      var laptopBreakpoint = 992;

      var onScroll = function onScroll() {
        var scrollTop = $(window).scrollTop();
        $el.find('a').each(function () {
          var current = $(this);
          var parent = current.parent();
          var refEl = $(current.attr('href'));

          parent.toggleClass('current', refEl.position().top <= scrollTop && refEl.position().top + refEl.height() > scrollTop && screenWidth >= laptopBreakpoint);
        });
      };

      $(window).on('scroll', onScroll);
    });
  }
});

},{}],2:[function(require,module,exports){
'use strict';

require('../_modules/menu/menu');

var _onchange = require('./onchange');

var _onchange2 = _interopRequireDefault(_onchange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
  $('.side-menu').FixedMenu().CurrentTarget();

  var check = 'input[type=checkbox]';
  var radio = 'input[type=radio]';
  var widthOpt = '-width-opt';
  var themeOpt = '-theme-opt';

  $('.acc' + widthOpt + ' ' + radio + ',.tabs' + widthOpt + ' ' + radio + ',.modalbox' + widthOpt + ' ' + radio + ',.slider' + widthOpt + ' ' + radio + ',.ddm-position-opt ' + radio).on('change', function () {
    var self = $(this);

    var regexp = /(--full-width|--fixed-width|--wide-short|--wide|--full-size|--fixed-size|--down|--up|--left|--right)/g;
    (0, _onchange2.default)(self, 'code', regexp);

    var article = self.closest('article');

    article.find('.accordion, .tabs, .slider').toggleClass(function (index, element) {
      var elementArray = element.split(' ');
      return elementArray[0] + '--full-width ' + elementArray[0] + '--fixed-width';
    });
    article.find('.modal__dialog').removeClass('modal__dialog--full-size modal__dialog--fixed-size modal__dialog--wide modal__dialog--wide-short').addClass('modal__dialog' + self.attr('data-class-name'));

    article.find('.first-dd').removeClass('dropdown--down dropdown--up dropdown--left dropdown--right').addClass('dropdown' + self.attr('data-class-name'));
  });

  $('.acc-type-opt ' + radio).on('change', function () {
    var self = $(this);
    var txt = self.attr('data-class-name');
    var regexp = /<span class="hljs-attr">type<\/span>=<span class="hljs-string">(["'])(?:(?=(\\?))\2.)*?\1<\/span>/;
    var replace = '<span class="hljs-attr">type</span>=<span class="hljs-string">"' + txt + '"</span>';

    (0, _onchange2.default)(self, 'code', regexp, replace);

    self.closest('article').find('.accordion :input').each(function (index, element) {
      return $(element).attr('type', txt);
    });
  });

  $('.slider-pills-position-opt ' + radio).on('change', function () {
    var self = $(this);
    var txt = self.attr('data-class-name');
    var regexp = /(bottom|top|left|right)/;

    (0, _onchange2.default)(self, '.hljs-tag:eq(36)', regexp, '');

    self.closest('article').find('.slider__pills').removeClass('slider__pills--bottom slider__pills--top slider__pills--left slider__pills--right').addClass('slider__pills--' + txt);
  });

  $('.acc' + themeOpt + ' ' + check + ', .tabs' + themeOpt + ' ' + check + ', .slider' + themeOpt + ' ' + check + ', .ddm' + themeOpt + ' ' + check + ', .modalbox' + themeOpt + ' ' + check).on('change', function () {
    var self = $(this);
    var txt = self.attr('data-class-name');
    var regexp = /(accordion--blue|tabs--blue|slider--blue|dropdown--blue|modal__dialog--blue)/;
    var child = self.attr('name').match('modalbox') ? '.hljs-tag:eq(5) .hljs-string' : '.hljs-tag:first .hljs-string';

    (0, _onchange2.default)(self, child, regexp, '', true);

    self.closest('article').find('.accordion, .tabs, .slider, .first-dd, .modal__dialog').toggleClass(txt);
  });

  var url = 'https://api.github.com/repos/pgalias/pure-css-components/';
  var spanVersion = $('span.version');
  var pckageDwn = $('a.package-dwn');

  $.ajax(url + 'tags').done(function (data) {
    if (spanVersion.length === 1) {
      spanVersion.text(data[0].name);
      console.log('dupa');
    }
  });
  $.ajax(url + 'releases').done(function (data) {
    if (pckageDwn.length === 1) {
      pckageDwn.attr('href', data[0].zipball_url);
    }
  });
});

},{"../_modules/menu/menu":1,"./onchange":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onChange;
function onChange(self, child, regexp) {
  var replace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var checkbox = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  var txt = self.attr('data-class-name');
  var selector = self.closest('article').find('pre').find(child);
  var type = child === 'code' ? 'html' : 'text';
  var code = selector[type]();

  replace = checkbox === true ? code.match(regexp) ? code.replace(regexp, '') : '' + code.substr(0, code.length - 1) + txt + '"' : replace || txt;

  replace = checkbox !== true ? code.replace(regexp, replace) : replace;

  selector[type](replace);
}
module.exports = exports['default'];

},{}]},{},[2])


//# sourceMappingURL=main.js.map
