/*!
 * @license Giraffe
 * @version 2.1.0
 * Copyright (c) 2013 Genesys Telecommunications Laboratories
 * All rights reserved.
 */

define('giraffe/namespace', [], function () {
  'use strict';
  return {
    using: function (e) {
      var t = [].slice.call(e, 1),
        n = {};
      return {
        add: function (e) {
          return (n[e] = t.shift()), this;
        },
        get: function () {
          return n;
        },
      };
    },
  };
}),
  define('giraffe/classes/audioplayback', [], function () {
    'use strict';
    function e(e) {
      var t = new $.Deferred(),
        n = t.promise(),
        r = new window.Audio(e);
      r.addEventListener(
        'ended',
        function () {
          t.resolve();
        },
        !0,
      ),
        r.play(),
        (n.abort = function () {
          r.pause(), (r.src = '');
        }),
        (this.promise = function () {
          return n;
        });
    }
    return e;
  }),
  define('giraffe/classes/context', ['jquery'], function (e) {
    'use strict';
    function t() {
      var t = !0,
        n = [],
        r = [];
      (this.bind = function (r) {
        if (!t) throw 'You cannot bind new promises to an invalid context';
        var i = {
            promise: r,
          },
          s = e.Deferred();
        n.push(i),
          r
            .always(function () {
              i.guard && i.guard.promise && i.guard.promise.abort && i.guard.promise.abort(), n.splice(n.indexOf(i), 1);
            })
            .done(function () {
              t && s.resolve.apply(s, arguments);
            })
            .fail(function () {
              t && s.reject.apply(s, arguments);
            })
            .progress(function () {
              t && s.notify.apply(s, arguments);
            });
        var o = s.promise();
        return (
          (o.guard = function (e) {
            return (
              (i.guard = {
                callback: e,
              }),
              this
            );
          }),
          o
        );
      }),
        (this.getGuardedPromise = function () {
          var e;
          return (
            n.some(function (t) {
              if (t.guard) return (e = t);
            }),
            e ||
              r.some(function (t) {
                return (e = t.getGuardedPromise());
              }),
            e
          );
        }),
        (this.invalidate = function (i) {
          if (!t) return e.when();
          i = i || e.Deferred();
          var s = this,
            o = this.getGuardedPromise();
          return (
            o
              ? ((o.guard.promise = o.guard.callback()),
                o.guard.promise
                  .done(function () {
                    delete o.guard, s.invalidate(i);
                  })
                  .fail(function () {
                    delete o.guard.promise, i.reject();
                  }))
              : (r.forEach(function (e) {
                  e.invalidate();
                }),
                (t = !1),
                n.forEach(function (e) {
                  e.promise.abort && e.promise.abort();
                }),
                (n = []),
                (r = []),
                i.resolve()),
            i.promise()
          );
        }),
        (this.chain = function (e) {
          r.push(e);
        });
    }
    return (
      (e.fn.ctx = function (e) {
        e = e || {};
        var n = this.first();
        if (!n.length) return null;
        var r = n.data('context');
        return (
          r ||
            (n.data('context', (r = new t())),
            e.parent ? e.parent.chain(r) : n.trigger('contextchain', r),
            n.on('contextchain', function (e, t) {
              e.stopPropagation(), r.chain(t);
            })),
          r
        );
      }),
      t
    );
  }),
  define('giraffe/utils', ['exports'], function (e) {
    'use strict';
    (e.format = function (e) {
      var t = arguments;
      return String(e).replace(/\{(?:(\d+)|(\w+))\}/g, function (e, n, r) {
        return r && t[1] ? t[1][r] : t[n];
      });
    }),
      (e.formatNumber = function (e, t) {
        var n = e.toFixed(t.nd).split(/\.|,/);
        if (t.dg) {
          var r = n[0],
            i = [],
            s;
          for (s = 0, e = r.length % t.ng || t.ng; s < r.length; s += e, e = t.ng) i.push(r.substr(s, e));
          n[0] = i.join(t.dg);
        }
        return n.join(t.dd);
      }),
      (e.formatDate = function (e, t) {
        return t.replace(/\{([^}:]+)(?::(\d+))?\}/g, function (t, n, r) {
          var i = e['get' + n];
          if (i) {
            var s = (i.call(e) + (/Month$/.test(n) ? 1 : 0)).toString();
            return r && r > s.length ? new Array.prototype.constructor(r - s.length + 1).join('0') + s : s;
          }
          return t;
        });
      }),
      (e.parseGMTDate = function (e) {
        var t = this.parseIsoDate(e),
          n = new Date().getTimezoneOffset();
        return new Date(t.getTime() + n * 60 * 1e3);
      }),
      (e.parseIsoDate = function (e) {
        var t = /^(\d{4})-(\d\d)-(\d\d)(T|\s)(\d\d):(\d\d):(\d\d)(?:\.(\d{1,3}))?Z?$/.exec(e);
        return t
          ? (t.shift(), t.splice(3, 1), (t[1] -= 1), (t[6] = t[6] || 0), new Date(Date.UTC.apply(null, t)))
          : new Date(NaN);
      }),
      (e.parseIsoDateComponent = function (e) {
        var t = /(\d{4})-(\d\d)-(\d\d)/.exec(e);
        return t.shift(), (t[1] -= 1), new Date(Date.UTC.apply(null, t));
      }),
      (e.parseDateComponent = function (e) {
        var t = /(\d{4})-(\d\d)-(\d\d)/.exec(e);
        return t.shift(), (t[1] -= 1), new Date(t[0], t[1], t[2]);
      }),
      (e.tokenize = function (e, t, n) {
        var r;
        if (!(t instanceof RegExp)) return (r = e.split(t)), n.apply(null, r);
        r = t.exec(e);
        if (r) return r.shift(), n.apply(null, r);
      }),
      (e.resolvePath = function (e, t) {
        return this.normalizePath(e + ' /../' + t);
      }),
      (e.normalizePath = function (e) {
        var t = e.split('/'),
          n = [];
        return (
          t.forEach(function (e) {
            switch (e) {
              case '.':
                break;
              case '..':
                n.pop();
                break;
              default:
                n.push(e);
            }
          }),
          n.join('/')
        );
      }),
      (e.resolve = function (e, t) {
        return e instanceof Function ? e.apply(t, Array.prototype.slice.call(arguments, 1)) : e;
      }),
      (e.resolveArray = function (e) {
        return (e = this.resolve.apply(this, arguments)), e instanceof Array ? e : typeof e != 'undefined' ? [e] : [];
      }),
      (e.resolvePromise = function (e) {
        return (e = this.resolve.apply(this, arguments)), e && e.promise instanceof Function ? e : $.when(e);
      }),
      (e.toHash = function (e, t) {
        var n =
            t instanceof Function
              ? t
              : function (e) {
                  return e[t];
                },
          r = {};
        return (
          e.forEach(function (e) {
            r[n(e)] = e;
          }),
          r
        );
      }),
      (e.toArray = function (e) {
        var t = [];
        return (
          $.each(e, function () {
            t.push(this);
          }),
          t
        );
      }),
      (e.escapeHtml = function (e) {
        return e
          ? e.replace(/[&<>'"]/g, function (e, t, n) {
              if (e === '&') {
                var r = n.substring(t, t + 6);
                if (/&(amp|lt|gt|apos|quot);/.test(r)) return e;
              }
              return (
                '&' +
                {
                  '&': 'amp',
                  '<': 'lt',
                  '>': 'gt',
                  "'": 'apos',
                  '"': 'quot',
                }[e] +
                ';'
              );
            })
          : '';
      }),
      (e.unescapeHtml = function (e) {
        var t = document.createElement('div');
        t.innerHTML = e;
        var n = t.childNodes.length === 0 ? '' : t.childNodes[0].nodeValue;
        return t.removeChild(t.firstChild), n;
      }),
      (e.async = function (t, n, r) {
        var i = $.Deferred();
        return (
          window.setTimeout(function () {
            e.entangle(i, e.resolvePromise(t, n));
          }, r || 1),
          i.promise()
        );
      }),
      (e.entangle = function (e, t) {
        t.done(e.resolve.bind(e)).fail(e.reject.bind(e));
      }),
      (e.stringifyCyclic = function (e) {
        var t = [];
        return JSON.stringify(
          e,
          function (e, n) {
            if (typeof n == 'object') {
              if (t.indexOf(n) >= 0) return String({});
              t.push(n);
            }
            return n;
          },
          4,
        );
      }),
      (e.getIEVersion = function () {
        if (/Microsoft Internet Explorer/i.test(navigator.appName)) {
          var e = new RegExp('MSIE (\\d+)\\.', 'i'),
            t = e.exec(navigator.appVersion);
          if (t && t.length > 1) return parseInt(t[1], 10);
        }
        return !1;
      }),
      (e.getFFVersion = function () {
        var e = new RegExp('Firefox\\/(\\d+).0$', 'i'),
          t = e.exec(navigator.userAgent);
        return t && t.length > 1 ? parseInt(t[1], 10) : !1;
      }),
      (e.isIE = function () {
        return /Microsoft Internet Explorer/i.test(navigator.appName);
      }),
      (e.isIE8 = function () {
        return this.isIEX(8);
      }),
      (e.isIEX = function (e) {
        var t = new RegExp('MSIE ' + e + '\\.', 'i');
        return /Microsoft Internet Explorer/i.test(navigator.appName) && t.test(navigator.appVersion);
      }),
      (e.isFF30 = function () {
        return this.isFFX(30);
      }),
      (e.isFFX = function (e) {
        var t = new RegExp('Firefox\\/' + e + '.0$', 'i');
        return t.test(navigator.userAgent);
      });
  }),
  define('giraffe/classes/logger', ['jquery', '../utils'], function (e, t) {
    'use strict';
    function i(e) {
      this.module = e;
    }
    var n = {
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        off: 0,
      },
      r = '{FullYear}-{Month:2}-{Date:2} {Hours:2}:{Minutes:2}:{Seconds:2}.{Milliseconds:3}';
    return (
      (i.prototype = {
        level: 'info',
        write: (function (e) {
          return e && e.log
            ? function (n, i, s) {
                s = t.format('{1} [{2}] {3}', t.formatDate(new Date(), r), i, s);
                var o = e[n] || e.log;
                o.call ? o.call(e, s) : o(s);
              }
            : function () {};
        })(window.console),
      }),
      e.each(n, function (e, r) {
        r &&
          (i.prototype[e] = (function (r) {
            return function () {
              return r <= n[this.level] && this.write(e, this.module, t.format.apply(null, arguments)), this;
            };
          })(r));
      }),
      i
    );
  }),
  define('giraffe/classes/progress', [], function () {
    'use strict';
    function e(e) {
      function o() {
        t.notify(s / r), i < r && ((s += (i + 1 - s) / 2), window.setTimeout(o, 40));
      }
      var t = e.deferred,
        n = e.interval || 40,
        r = e.milestones,
        i = 0,
        s = 0;
      (this.start = function () {
        o();
      }),
        (this.advance = function () {
          s = ++i;
        });
    }
    return e;
  }),
  define('giraffe/classes/timer', [], function () {
    'use strict';
    function e(e) {
      function s() {
        n = window.setTimeout(function () {
          n && (t.multiFire ? (r.notify(), s()) : (t.negative ? r.reject() : r.resolve(), (n = 0)));
        }, t.delay);
      }
      var t =
          e instanceof Object
            ? e
            : {
                delay: e,
              },
        n,
        r = new $.Deferred(),
        i = r.promise();
      s(),
        (i.abort = function () {
          n && (window.clearTimeout(n), (n = 0));
        }),
        (this.promise = function () {
          return i;
        }),
        (this.reset = function () {
          n && window.clearTimeout(n), s();
        });
    }
    return e;
  }),
  define(
    'giraffe/classes/all',
    ['../namespace', './audioplayback', './context', './logger', './progress', './timer'],
    function (e) {
      'use strict';
      return e.using(arguments).add('AudioPlayback').add('Context').add('Logger').add('Progress').add('Timer').get();
    },
  ),
  define('giraffe/widgets/widget', ['underscore', 'backbone'], function (e, t) {
    'use strict';
    var n = {};
    return (n.Widget = t.View.extend(
      {
        initialize: function () {
          (this.name = this.options.name),
            (this.parent = this.options.parent),
            (this.size = {
              width: this.options.width,
              height: this.options.height,
            });
        },
        render: function () {
          return (
            this.$el.addClass('g-widget').data('widget', this),
            (this.visible = !0),
            this.options.cssClass && this.$el.addClass(this.options.cssClass),
            this.options.cssStyle && this.$el.css(this.options.cssStyle),
            this.options.padding && this.$el.addClass('g-widget-padding'),
            this.size.width && this.$el.outerWidth(this.size.width),
            this.size.height && this.$el.outerHeight(this.size.height),
            this.options.data && this.$el.data(this.options.data),
            this.options.hidden && this.hide(),
            this
          );
        },
        setSize: function (e, t) {
          typeof e == 'object'
            ? (this.size = e)
            : (this.size = {
                width: e,
                height: t,
              }),
            this.$el.outerWidth(this.size.width).outerHeight(this.size.height);
        },
        setWidth: function (e) {
          (this.size.width = e), this.$el.outerWidth(this.size.width);
        },
        setHeight: function (e) {
          (this.size.height = e), this.$el.outerHeight(this.size.height);
        },
        getSize: function () {
          return {
            width: this.size.width || this.$el.outerWidth(),
            height: this.size.height || this.$el.outerHeight(),
          };
        },
        setPosition: function (e, t) {
          var n =
            typeof e == 'object'
              ? e
              : {
                  x: e,
                  y: t,
                };
          this.$el.css({
            left: n.x,
            top: n.y,
          });
        },
        getPosition: function () {
          var e = this.$el.position();
          return {
            x: e.left,
            y: e.top,
          };
        },
        hide: function () {
          return this.$el.hide(), (this.visible = !1), this.$el.trigger('hidden'), this;
        },
        show: function () {
          return this.$el.show(), (this.visible = !0), this.$el.trigger('shown'), this;
        },
        setVisible: function (e) {
          e ? this.show() : this.hide();
        },
        destroy: function () {
          this.remove();
        },
        on_: function (e, t) {
          var n = this;
          return (
            this.$el.on(e, function () {
              t.apply(n, [].slice.call(arguments, 1));
            }),
            this
          );
        },
      },
      {
        as: function (e) {
          var t = this;
          return {
            extend: function (r, i) {
              return (n[e] = t.extend(r, i));
            },
          };
        },
        get: function (e) {
          return n[e];
        },
        create: function (e) {
          var t = e && e.type ? n[e.type] : n.Widget;
          return t ? new t(e) : null;
        },
      },
    ));
  }),
  define('giraffe/nls/str', {
    titles: {
      BROWSE: 'Browse',
      CANCEL: 'Cancel',
      CLEAR: 'Clear',
      CLOSE: 'Close',
      DATE_PLACEHOLDER: 'YYYY-MM-DD',
      MOVE_DOWN: 'Move Down',
      MOVE_UP: 'Move Up',
      OK: 'OK',
      PREVIOUS: 'Previous',
      NEXT: 'Next',
      REMOVE: 'Remove',
      TIME_PLACEHOLDER_SHORT: 'hh:mm',
      TIME_PLACEHOLDER_LONG: 'hh:mm:ss',
      TODAY: 'Today',
      WEEK_SHORT: 'Wk',
      DAY_MIN_NAMES: {
        SU: 'S',
        MO: 'M',
        TU: 'T',
        WE: 'W',
        TH: 'T',
        FR: 'F',
        SA: 'S',
      },
      DAY_NAMES: {
        SUNDAY: 'Sunday',
        MONDAY: 'Monday',
        TUESDAY: 'Tuesday',
        WEDNESDAY: 'Wednesday',
        THURSDAY: 'Thursday',
        FRIDAY: 'Friday',
        SATURDAY: 'Saturday',
      },
      DAY_SHORT_NAMES: {
        SUN: 'Sun',
        MON: 'Mon',
        TUE: 'Tue',
        WED: 'Wed',
        THU: 'Thu',
        FRI: 'Fri',
        SAT: 'Sat',
      },
      MONTH_NAMES: {
        JANUARY: 'January',
        FEBRUARY: 'February',
        MARCH: 'March',
        APRIL: 'April',
        MAY: 'May',
        JUNE: 'June',
        JULY: 'July',
        AUGUST: 'August',
        SEPTEMBER: 'September',
        OCTOBER: 'October',
        NOVEMBER: 'November',
        DECEMBER: 'December',
      },
      MONTH_SHORT_NAMES: {
        JAN: 'Jan',
        FEB: 'Feb',
        MAR: 'Mar',
        APR: 'Apr',
        MAY: 'May',
        JUN: 'Jun',
        JUL: 'Jul',
        AUG: 'Aug',
        SEP: 'Sep',
        OCT: 'Oct',
        NOV: 'Nov',
        DEC: 'Dec',
      },
    },
    messages: {
      COULD_NOT_FETCH_ITEMS: 'Could not fetch items.',
      INVALID_VALUE: 'Invalid value.',
      MUST_BE_VALID_X_FILE_TYPE: 'Must be valid {1} file type.',
      THIS_FIELD_IS_MANDATORY: 'This field is mandatory.',
      VALIDATION_FAILED_PLEASE_CORRECT: 'Validation failed. Please correct the errors below.',
      VALUE_LONGER_THAN_X_CHARS: 'The value cannot be longer than {1} characters.',
      VALUE_SHORTER_THAN_X_CHARS: 'The value cannot be shorter than {1} characters.',
      VALUE_MUST_BE_BETWEEN_X_MIN_Y_MAX: 'The value must be between {min} and {max} inclusive.',
      VALUE_MUST_BE_INTEGER: 'The value must be an integer.',
      VALUE_MUST_BE_NUMBER: 'The value must be a number.',
      VALUE_MUST_BE_VALID_DATE_ISO: 'The value must be a valid date in yyyy-mm-dd format.',
      VALUE_MUST_BE_VALID_STRING: 'The value must be a valid string.',
      VALUE_MUST_BE_VALID_TIME_HHMM: 'The value must be a valid time in hh:mm format.',
      VALUE_MUST_BE_VALID_TIME_HHMMSS: 'The value must be a valid time in hh:mm:ss format.',
      VALUE_MUST_NO_CTRL_CHAR: 'The value must not contain any control characters.',
    },
    prompts: {
      MANDATORY: 'Mandatory',
      NO_ITEMS: 'No items',
      DRAG_TO_ADD_REMOVE_RANGES: 'Drag to add or remove ranges',
    },
    cultures: {
      right_to_left_language: !1,
    },
  }),
  define('giraffe/widgets/field/validation', ['jquery', '../../utils', '../../nls/str'], function (e, t, n) {
    'use strict';
    var r = {
      custom: {
        fn: function (e, t) {
          return t.call(this, e);
        },
        message: function () {
          return n.messages.INVALID_VALUE;
        },
      },
      minLength: {
        fn: function (e, t) {
          return e.length >= t;
        },
        message: function () {
          return n.messages.VALUE_SHORTER_THAN_X_CHARS;
        },
      },
      maxLength: {
        fn: function (e, t) {
          return e.length <= t;
        },
        message: function () {
          return n.messages.VALUE_LONGER_THAN_X_CHARS;
        },
      },
      numeric: {
        fn: e.isNumeric,
        message: function () {
          return n.messages.VALUE_MUST_BE_NUMBER;
        },
      },
      integer: {
        fn: function (t) {
          return e.isNumeric(t) && ~~t === parseFloat(t);
        },
        message: function () {
          return n.messages.VALUE_MUST_BE_INTEGER;
        },
      },
      range: {
        fn: function (e, t) {
          return t.hasOwnProperty('min') && e < t.min ? !1 : t.hasOwnProperty('max') && e > t.max ? !1 : !0;
        },
        message: function () {
          return n.messages.VALUE_MUST_BE_BETWEEN_X_MIN_Y_MAX;
        },
      },
      regExp: {
        fn: function (e, t) {
          return t.test(e);
        },
        message: function () {
          return n.messages.INVALID_VALUE;
        },
      },
      time_short: {
        fn: function (e) {
          return t.tokenize(e, /^(\d\d):(\d\d)$/, function (e, t) {
            return e < 24 && t < 60;
          });
        },
        message: function () {
          return n.messages.VALUE_MUST_BE_VALID_TIME_HHMM;
        },
      },
      time_long: {
        fn: function (e) {
          return t.tokenize(e, /^(\d\d):(\d\d):(\d\d)$/, function (e, t, n) {
            return e < 24 && t < 60 && n < 60;
          });
        },
        message: function () {
          return n.messages.VALUE_MUST_BE_VALID_TIME_HHMMSS;
        },
      },
      date: {
        fn: function (e) {
          return /^\d{4}-\d\d-\d\d$/.test(e) && !isNaN(t.parseDateComponent(e));
        },
        message: function () {
          return n.messages.VALUE_MUST_BE_VALID_DATE_ISO;
        },
      },
      entityName: {
        fn: function (e) {
          return /^[^\n\t\r]*$/.test(e);
        },
        message: function () {
          return n.messages.VALUE_MUST_NO_CTRL_CHAR;
        },
      },
      fileName: {
        validSuffix: [],
        fn: function (t, n) {
          this.validSuffix = n.validSuffix;
          if (typeof t == 'string') return e.inArray(t.split('.')[1], n.validSuffix) !== -1;
        },
        message: function () {
          return t.format(n.messages.MUST_BE_VALID_X_FILE_TYPE, this.validSuffix.join(', '));
        },
      },
      safeString: {
        fn: function (e) {
          return !/<(.|\n)*?>/.test(e);
        },
        message: function () {
          return n.messages.VALUE_MUST_BE_VALID_STRING;
        },
      },
    };
    return (r.time = r.time_short), r;
  }),
  define(
    'giraffe/widgets/field',
    ['jquery', 'underscore', '../utils', './widget', './field/validation', '../nls/str'],
    function (e, t, n, r, i, s) {
      'use strict';
      return r.extend({
        initialize: function () {
          r.prototype.initialize.call(this),
            (this.id = this.options.id || 'g-field-' + t.uniqueId()),
            (this.valid = !0),
            (this.enabled = !0),
            (this.mandatory = this.options.mandatory),
            (this.isRTL = s.cultures && s.cultures.right_to_left_language);
        },
        render: function () {
          var e = this;
          return (
            r.prototype.render.call(this),
            this.$el.removeAttr('id'),
            this.$el.addClass('g-field'),
            this.mandatory && this.$el.addClass('g-field-mandatory'),
            this.options.noFit || this.$el.addClass('g-field-fit'),
            this.options.labelOptions &&
              this.options.labelOptions.align === 'horizontal' &&
              this.$el.addClass('g-field-horizontal-align'),
            this._watchChange(),
            e.options.disabled &&
              n.async(function () {
                e.setEnabled(!1);
              }, this),
            this
          );
        },
        _watchChange: function () {
          var e = this;
          this.$el.change(function () {
            e.triggerChange();
          });
        },
        _checkMandatory: function () {
          this.mandatory && !this.isSet() ? this.setValid(!1, s.messages.THIS_FIELD_IS_MANDATORY) : this.setValid(!0);
        },
        validate: function () {
          var t = this,
            r = this._getInput();
          this._checkMandatory(),
            this.valid &&
              r &&
              this.options.validation &&
              e.each(this.options.validation, function (e, s) {
                if (!s) return;
                var o = i[e];
                if (!o) throw 'Unknown validation type ' + e;
                if (!o.fn.call(t, r, s.fn || s[e] || s))
                  return t.setValid(!1, n.format(n.resolve(s.message || o.message, t), s)), !1;
              });
          if (this.valid && this.options.customValidate) return this.options.customValidate.call(this);
          var s = e.Deferred();
          return this.valid ? s.resolve() : s.reject(), s.promise();
        },
        triggerChange: function () {
          var e = this.getValue();
          this.options.onChange && this.options.onChange.call(this, e), this.$el.trigger('fieldchange', [this, e]);
        },
        setValid: function (e, t) {
          return (
            (this.valid = e),
            t && (this.latestMessage = t),
            this.$el.toggleClass('g-field-invalid', !e),
            this.$el
              .find('.g-field-error')
              .text((!e && (t || this.latestMessage)) || '')
              .toggle(!e),
            this
          );
        },
        setEnabled: function (e) {
          return (
            (this.enabled = e),
            this.$el.toggleClass('g-field-disabled', !e),
            this.$input && (e ? this.$input.removeAttr('disabled') : this.$input.attr('disabled', 'disabled')),
            this
          );
        },
        setMandatory: function (e) {
          (this.mandatory = e), this.$el.toggleClass('g-field-mandatory', e);
        },
        isSet: function () {
          return !!this._getInput();
        },
        getValue: function () {
          return this._getInput();
        },
        setValue: function (e) {
          return this._setInput(e), this;
        },
      });
    },
  ),
  define('text!giraffe/widgets/textfield/widget.html', [], function () {
    return '<% if (label || labelOptions && labelOptions.align === "horizontal") { %>\r\n<div class="g-field-label<% if (info) { %> g-field-label-with-info<% } %>" title="<%- label %>" <% if (isRTL) { %>dir="rtl"<% } %>>\r\n    <label for="<%- id %>">\r\n        <%- label %>\r\n    </label>\r\n    <% if (label) { %><span class="g-field-mandatory-indicator" title="<%= str.prompts.MANDATORY %>">*</span><% } %>\r\n    <% if (label && info) { %><span class="g-field-info-wrap"><span class="g-field-info ui-icon icon-info" title="<%- info %>"></span></span><% } %>\r\n    <% if (!labelOptions || labelOptions.align !== "horizontal") { %>\r\n    <div class="ui-helper-clearfix"></div>\r\n    <% } %>\r\n</div>\r\n<% } %>\r\n<div class="g-textfield-wrap<% if (icon) { print(" g-textfield-with-icon"); } %>">\r\n    <% if (icon) { %><div class="g-textfield-icon"><div class="ui-icon <%- icon %>"></div></div><% } %>\r\n    <% if (multiLine) { %>\r\n    <textarea rows="<%- rows %>"\r\n    <% } else { %>\r\n    <input type="<%= password ? "password" : "text" %>"\r\n    <% } %>\r\n        id="<%- id %>" class="g-field-input ui-widget-content"\r\n        <% if (name) { %>name="<%- name %>"<% } %>\r\n        <% if (placeholder) { %>placeholder="<%- placeholder %>"<% } %>\r\n        <% if (autoComplete) { %> autocomplete="<%- autoComplete %>"<% } %>\r\n        <% if (mandatory) { %>aria-required="true"<% } %>\r\n    <% if (multiLine) { %>\r\n        ></textarea>\r\n    <% } else { %>\r\n        />\r\n    <% } %>\r\n    <% if (buttons.length) { %>\r\n    <div class="g-textfield-actions"><!-- removes whitespace between buttons\r\n    <% buttons.forEach(function (button) { %>\r\n        --><button class="g-button g-button-transparent g-textfield-action g-textfield-action-<%- button.name %>"><%- button.label %></button><!--\r\n    <% }) %>\r\n    --></div>\r\n    <% } %>\r\n</div>\r\n<div class="g-field-error ui-state-error-text ui-helper-hidden" aria-live="rude"></div>';
  }),
  define(
    'giraffe/widgets/textfield',
    ['underscore', './field', '../utils', 'text!./textfield/widget.html', '../nls/str'],
    function (_, Field, utils, template, str) {
      'use strict';
      template = _.template(template);
      var nativePlaceholder = (function () {
        return eval('"placeholder" in document.createElement("input")');
      })();
      return Field.as('TextField').extend({
        options: _.defaults(
          {
            rows: 3,
            changeDelay: 250,
            trim: !0,
          },
          Field.prototype.options,
        ),
        render: function () {
          Field.prototype.render.call(this),
            this.$el.addClass('g-field-fittable g-textfield').html(
              template({
                id: this.id,
                name: this.name,
                isRTL: this.isRTL,
                label: this.options.label,
                labelOptions: this.options.labelOptions,
                mandatory: this.options.mandatory,
                info: this.options.info,
                password: this.options.password,
                multiLine: this.options.multiLine,
                rows: this.options.rows,
                placeholder: this.options.placeholder,
                autoComplete: this.options.autoComplete,
                icon: this.options.icon,
                buttons: utils.resolveArray(this.options.buttons, this),
                str: str,
              }),
            );
          var e = this;
          this.$el.on('keypress', function (e) {
            e.which === 13 && e.stopPropagation();
          }),
            (this.$input = this.$el
              .find('.g-field-input')
              .focus(function () {
                e.$el.addClass('g-textfield-focus').trigger('fieldfocus', e),
                  e.options.password
                    ? ((this.selectionStart = 0), (this.selectionEnd = this.value.length))
                    : (this.selectionStart = this.selectionEnd = this.value.length);
              })
              .blur(function () {
                e.$el.removeClass('g-textfield-focus');
              })),
            this.options.multiLine
              ? this.$el.addClass('g-field-multiline')
              : this.options.password && this.$el.addClass('g-field-password');
          if (this.options.buttons && this.options.buttons.length) {
            this.$el.addClass('g-textfield-with-actions'), (this.buttons = {});
            var t = this.$el.find('.g-textfield-actions');
            this.options.buttons.forEach(function (n) {
              var r = t.find('.g-textfield-action-' + n.name).button(
                $.extend(
                  {
                    icons: {
                      primary: n.icon,
                    },
                    text: !1,
                  },
                  n,
                ),
              );
              (e.buttons[n.name] = r), n.onClick && r.click(n.onClick);
            });
          }
          return !nativePlaceholder && $.fn.placeholder && this.$input.placeholder(), this;
        },
        _getInput: function () {
          var e = this.$input.val();
          return this.options.trim && (e = e.trim()), e;
        },
        _setInput: function (e) {
          this.$input.val(e), (this.prevInput = e);
        },
        _watchChange: function () {
          var e = this;
          delete this.prevInput,
            this.$el.keyup(function () {
              e._handleKeyUp();
            }),
            this.$el.on('paste', function () {
              window.setTimeout(e._handleKeyUp.bind(e), 0);
            });
        },
        _handleKeyUp: function () {
          var e = this,
            t = this._getInput();
          if (t === this.prevInput) return;
          (this.prevInput = t),
            this.changeTimeout && window.clearTimeout(this.changeTimeout),
            (this.changeTimeout = window.setTimeout(function () {
              delete e.changeTimeout, e.triggerChange();
            }, this.options.changeDelay));
        },
        setEnabled: function (e) {
          return (
            this.$el.find('.g-textfield-action').button(e ? 'enable' : 'disable'),
            Field.prototype.setEnabled.call(this, e)
          );
        },
        focus: function () {
          this.$input.focus();
        },
      });
    },
  ),
  define('giraffe/widgets/autocomplete', ['jquery', 'underscore', './textfield', '../nls/str'], function (e, t, n, r) {
    'use strict';
    return n.as('AutoComplete').extend({
      render: function () {
        var t = this;
        n.prototype.render.call(this),
          (this.$relation = e('<div></div>').addClass('g-field-relation').appendTo(this.$el).hide()),
          this.$el.addClass('g-field-autocomplete');
        var r = this.$el.find('.g-textfield-wrap');
        r.addClass('g-field-autocomplete-clear'),
          this.$input.on('input', function () {
            this.value
              ? r.addClass('g-field-autocomplete-clear-visible')
              : r.removeClass('g-field-autocomplete-clear-visible');
          }),
          r.on('click', function (n) {
            var r = e(n.target),
              i = r.parent();
            e(this).hasClass('g-field-autocomplete-clear-visible') &&
              i &&
              i.hasClass('g-textfield-action-clear') &&
              (e(this).removeClass('g-field-autocomplete-clear-visible'), t.$input.val(''));
          });
        var i = "<span class='ui-autocomplete-term'>%s</span>";
        return (
          this.$input.autocomplete({
            source: function (e, n) {
              t._getItems()
                .done(function (r) {
                  var i = [],
                    s = t.options.caseSensitive ? e.term : e.term.toLowerCase();
                  r.forEach(function (e) {
                    if (t.options.itemFilter && !t.options.itemFilter(e)) return;
                    var n = t.options.caseSensitive ? e.name : e.name.toLowerCase();
                    n.indexOf(s) !== -1 &&
                      i.push({
                        value: e.name,
                        item: e,
                      });
                  }),
                    n(i);
                })
                .fail(function () {
                  n();
                });
            },
            select: function (e, n) {
              (t.value = n.item.item), t.setValid(!0);
            },
            open: function (t, n) {
              var r = e(this).data('ui-autocomplete'),
                s = i.replace('%s', '$1');
              r.menu.element.find('a').each(function () {
                var t = e(this),
                  n = r.term.split(' ').join('|');
                t.html(t.text().replace(new RegExp('(' + n + ')', 'gi'), s));
              });
            },
          }),
          (this.$input.data('ui-autocomplete')._resizeMenu = function () {
            this.menu.element.outerWidth(t.$el.width());
          }),
          this
        );
      },
      _handleKeyUp: function () {
        delete this.value, n.prototype._handleKeyUp.call(this);
      },
      validate: function () {
        if (this.value && this.value.id) return e.when();
        if (!this.mandatory && !this._getInput()) return this.setValid(!0), e.when();
        var t = this;
        return n.prototype.validate.call(this).pipe(function () {
          return t._getItems().pipe(
            function (n) {
              var i = t._getInput(),
                s = e.Deferred(),
                o = !1;
              return (
                e.each(n, function () {
                  var e = this,
                    n = t.options.caseSensitive ? i === e.name : i.toLowerCase() === e.name.toLowerCase();
                  if (n) return t._setInput(e.name), t.setValid(!0), (t.value = e), s.resolve(), (o = !0), !1;
                }),
                o ||
                  (t.options.allowCustom
                    ? (t.setValid(!0), (t.value = i), s.resolve())
                    : (t.setValid(!1, r.messages.INVALID_VALUE), delete t.value, s.reject())),
                s.promise()
              );
            },
            function () {
              delete t.value;
            },
          );
        });
      },
      _getItems: function () {
        if (this.items) return e.when(this.items).promise();
        var t = this;
        return (
          this._setPending(),
          this.options
            .readItems()
            .always(function () {
              t._clearPending();
            })
            .done(function (e) {
              t.items = e;
            })
            .fail(function () {
              t.setValid(!1, r.messages.COULD_NOT_FETCH_ITEMS);
            })
        );
      },
      setValue: function (e) {
        this.value = e;
        var t;
        return e && (e.name ? (t = e.name) : this.options.allowCustom && (t = e)), this._setInput(t), this;
      },
      getValue: function () {
        return this.value;
      },
      showRelation: function () {},
      hideRelation: function () {},
      _setPending: function () {
        this.$input.addClass('g-spinner g-spinner-padded g-spinner-16').css({
          backgroundPosition: '100% 50%',
        });
      },
      _clearPending: function () {
        this.$input.removeClass('g-spinner g-spinner-padded g-spinner-16');
      },
    });
  }),
  define('giraffe/widgets/button', ['underscore', './widget'], function (e, t) {
    'use strict';
    return t.as('Button').extend({
      options: {
        tagName: 'button',
      },
      render: function () {
        t.prototype.render.call(this),
          this.$el.addClass('g-button').button({
            label: this.options.label,
            icons: this.options.icons,
            text: this.options.text,
            align: this.options.align,
          }),
          (this.options.alternative || this.options.highlight) &&
            this.$el.addClass('g-button-alternative').find('.ui-icon').addClass('g-icon-alternative'),
          this.options.transparent && this.$el.addClass('g-button-transparent'),
          this.options.tooltip && this.$el.attr('title', this.options.tooltip),
          this.options.align && this.$el.addClass('g-button-align-' + this.options.align);
        var e = this;
        return (
          this.$el.on('click', function (t) {
            e.options.onClick && e.options.onClick.call(e, t);
          }),
          e.setEnabled(!e.options.disabled),
          this
        );
      },
      enable: function () {
        this.$el.button('enable');
      },
      disable: function () {
        this.$el.button('disable').removeClass('ui-state-hover');
      },
      setEnabled: function (e) {
        e ? this.enable() : this.disable();
      },
      setLabel: function (e) {
        this.$el.button('option', 'label', e);
      },
      setTooltip: function (e) {
        this.$el.attr('title', e);
      },
    });
  }),
  define('giraffe/layouts/base', ['jquery', 'backbone'], function (e, t) {
    'use strict';
    function n(t, n) {
      (this.container = t),
        (this.options = e.extend(!0, {}, n)),
        this.container.$el.addClass('g-layout'),
        this._updateArea();
    }
    return (
      e.extend(n.prototype, {
        _updateArea: function () {
          var e = this.container.getContentSize();
          this.area = {
            x: 0,
            y: 0,
            width: e.width,
            height: e.height,
          };
        },
        layoutWidget: function (e) {
          e.$el.css({
            position: 'relative',
          });
        },
        refresh: function () {
          this._updateArea(), this.container.items.forEach(this.layoutWidget, this);
        },
      }),
      (n.extend = t.View.extend),
      n
    );
  }),
  define('giraffe/layouts/border', ['./base'], function (e) {
    'use strict';
    return e.extend({
      constructor: function () {
        e.prototype.constructor.apply(this, arguments), this.container.$el.addClass('g-layout-border');
      },
      layoutWidget: function (e) {
        if (!e.visible) return;
        var t = this.area,
          n = e.getSize(),
          r = n.width,
          i = n.height,
          s = e.options.placement || 'center',
          o = e.$el;
        r > t.width && (r = t.width),
          i > t.height && (i = t.height),
          o.css({
            position: 'absolute',
          });
        switch (s) {
          case 'top':
            o.addClass('g-layout-placement-top'),
              e.setSize(t.width, i),
              (t.height -= i),
              e.setPosition(t.x, t.y),
              (t.y += i);
            break;
          case 'right':
            o.addClass('g-layout-placement-right'),
              e.setSize(r, t.height),
              (t.width -= r),
              e.setPosition(t.x + t.width, t.y);
            break;
          case 'bottom':
            o.addClass('g-layout-placement-bottom'),
              e.setSize(t.width, i),
              (t.height -= i),
              e.setPosition(t.x, t.y + t.height);
            break;
          case 'left':
            o.addClass('g-layout-placement-left'),
              e.setSize(r, t.height),
              (t.width -= r),
              e.setPosition(t.x, t.y),
              (t.x += r);
            break;
          case 'center':
            o.addClass('g-layout-placement-center'),
              e.setSize(t.width, t.height),
              e.setPosition(t.x, t.y),
              (t.width = 0),
              (t.height = 0);
            break;
          default:
            throw 'Invalid placement: ' + e.options.placement;
        }
      },
    });
  }),
  define('giraffe/layouts/card', ['./base'], function (e) {
    'use strict';
    return e.extend({
      constructor: function () {
        e.prototype.constructor.apply(this, arguments), this.container.$el.addClass('g-layout-card');
      },
      layoutWidget: function (e) {
        if (!e.visible) return;
        e.$el.css({
          position: 'absolute',
        }),
          e.setSize(this.area.width, this.area.height),
          e.setPosition(this.area.x, this.area.y);
      },
    });
  }),
  define('giraffe/layouts/center', ['./base'], function (e) {
    'use strict';
    return e.extend({
      constructor: function () {
        e.prototype.constructor.apply(this, arguments), this.container.$el.addClass('g-layout-center');
      },
      layoutWidget: function (e) {
        if (!e.visible) return;
        var t = this.area,
          n = e.getSize(),
          r = n.width,
          i = n.height,
          s = e.options.placement || 'both',
          o = e.$el,
          u = {},
          a = 0,
          f = 0;
        o.css({
          position: 'absolute',
        }),
          s.split(' ').forEach(function (e) {
            u[e] = !0;
          }),
          u.both && (u.horizontal = u.vertical = !0),
          u.horizontal && (o.addClass('g-layout-placement-horizontal'), (a = (t.width - r) >> 1)),
          u.vertical && (o.addClass('g-layout-placement-vertical'), (f = (t.height - i) >> 1)),
          isNaN(this.options.minX) || (a = Math.max(a, this.options.minX)),
          isNaN(this.options.minY) || (f = Math.max(f, this.options.minY)),
          e.setPosition(a, f);
      },
    });
  }),
  define('giraffe/layouts/all', ['../namespace', './base', './border', './card', './center'], function (e) {
    'use strict';
    return e.using(arguments).add('free').add('border').add('card').add('center').get();
  }),
  define(
    'giraffe/widgets/container',
    ['jquery', 'underscore', './widget', '../utils', '../layouts/base', '../layouts/all'],
    function (e, t, n, r, i, s) {
      'use strict';
      return n.as('Container').extend(
        {
          options: t.defaults(
            {
              itemClass: 'g-container-item',
              contentPadding: !1,
              contentScroll: 'auto',
            },
            n.prototype.options,
          ),
          initialize: function () {
            n.prototype.initialize.call(this), (this.items = []);
          },
          render: function () {
            n.prototype.render.call(this),
              this.$el.addClass('g-container'),
              (this.$containerEl = this.$containerEl || this.$el),
              this.options.contentPadding && this.$containerEl.addClass('g-widget-padding');
            var o = r.resolve(this.options.layout, this);
            if (o && !(o instanceof i)) {
              var u = s[o];
              if (!u) throw 'Unknown layout: ' + o;
              o = new u(this, this.options.layoutOptions);
            }
            return (
              (this.layout = o),
              this.append(this.options.content),
              this.options.contentScroll && this.$containerEl.css('overflow', this.options.contentScroll),
              this.options.autoLayout &&
                ((this._layoutCallback = t.debounce(this.refreshLayout, 250).bind(this)),
                e(window).on(this.options.autoLayoutEvents || 'resize focus scroll', this._layoutCallback),
                r.async(this._layoutCallback)),
              this
            );
          },
          _refreshLayout: function () {
            this.layout && this.layout.refresh();
          },
          refreshLayout: function () {
            this.updating || this._refreshLayout();
          },
          setSize: function () {
            n.prototype.setSize.apply(this, arguments), this.updating || this._refreshLayout();
          },
          setWidth: function () {
            n.prototype.setWidth.apply(this, arguments), this.updating || this._refreshLayout();
          },
          setHeight: function () {
            n.prototype.setHeight.apply(this, arguments), this.updating || this._refreshLayout();
          },
          getContentSize: function () {
            return {
              width: this.$containerEl.innerWidth(),
              height: this.$containerEl.innerHeight(),
            };
          },
          _onAppend: function (e) {},
          _onRemove: function (e) {},
          insert: function (t, i) {
            if (!t) return;
            return (
              r.resolveArray(t, this).forEach(function (t) {
                if (!t) return;
                var r, s, o;
                t instanceof n
                  ? ((r = t), e.extend(r.options, this.options.itemOptions))
                  : ((s = e.extend(
                      {
                        type: this.options.defaultType,
                      },
                      this.options.itemOptions,
                      t,
                    )),
                    (r = n.create(s)));
                if (!r) {
                  if (s.optional) return;
                  throw 'Unknown widget type: ' + s.type;
                }
                (r.parent = this),
                  typeof i != 'undefined'
                    ? ((o = i), this.items.splice(i, 0, r), this.$containerEl.children().eq(i).before(r.$el))
                    : ((o = this.items.length), this.items.push(r), this.$containerEl.append(r.$el)),
                  r.name && !e.isNumeric(r.name) && (this.items[r.name] = r),
                  r.$el.addClass(this.options.itemClass),
                  r.render(),
                  this._onAppend(r, o);
              }, this),
              this.$containerEl
                .children()
                .not(':hidden')
                .removeClass(this.options.itemClass + '-first' + ' ' + this.options.itemClass + '-last')
                .first()
                .addClass(this.options.itemClass + '-first')
                .end()
                .last()
                .addClass(this.options.itemClass + '-last'),
              this.refreshLayout(),
              this
            );
          },
          append: function (e) {
            return this.insert(e);
          },
          prepend: function (e) {
            return this.insert(e, 0);
          },
          removeOne: function (e) {
            return (e = e || 0), this._remove(e, 1);
          },
          removeAll: function (e) {
            return (e = e || 0), this._remove(e, this.items.length - e);
          },
          _remove: function (t, n) {
            return (
              this.items.splice(t, n).forEach(function (t) {
                delete t.parent,
                  t.name && !e.isNumeric(t.name) && delete this.items[t.name],
                  this._onRemove(t),
                  t && t.destroy && t.destroy();
              }, this),
              this.updating || this._refreshLayout(),
              this
            );
          },
          destroy: function () {
            this.options.autoLayout &&
              e(window).off(this.options.autoLayoutEvents || 'resize focus scroll', this._layoutCallback),
              this.removeAll(),
              n.prototype.destroy.call(this);
          },
          beginContentUpdate: function () {
            this.updating = !0;
          },
          endContentUpdate: function () {
            this.updating && (delete this.updating, this._refreshLayout());
          },
          find: function (e) {
            function t(n) {
              var r;
              return (
                n.some(function (n) {
                  return n.name === e ? (r = n) : n.items && (r = t(n.items)), r;
                }),
                r
              );
            }
            return t(this.items);
          },
        },
        {
          LayoutManager: i,
        },
      );
    },
  ),
  define('giraffe/widgets/html', ['jquery', './widget', '../utils'], function (e, t, n) {
    'use strict';
    return t.as('Html').extend({
      render: function () {
        return (
          t.prototype.render.call(this),
          this.$el.addClass('g-html'),
          this.$el.html(n.resolve(this.options.html, this)),
          this
        );
      },
    });
  }),
  define('giraffe/widgets/buttonbar', ['underscore', '../utils', './container', './html'], function (e, t, n, r) {
    'use strict';
    return n.as('ButtonBar').extend({
      options: e.defaults(
        {
          defaultType: 'Button',
          align: 'right',
          itemClass: 'g-buttonbar-item',
          contentScroll: 'visible',
        },
        n.prototype.options,
      ),
      initialize: function () {
        this.options.content &&
          (this.options.content = t.resolveArray(this.options.content).map(function (e) {
            return e && e.type === 'Separator'
              ? new r({
                  cssClass: 'g-buttonbar-separator-container',
                  html: "<div class='g-buttonbar-separator'></div>",
                })
              : e;
          })),
          n.prototype.initialize.call(this);
      },
      render: function () {
        return (
          n.prototype.render.call(this), this.$el.addClass('g-buttonbar g-buttonbar-align-' + this.options.align), this
        );
      },
    });
  }),
  define('text!giraffe/widgets/checkbox/widget.html', [], function () {
    return '<div>\r\n	<span class="g-checkbox-img" tabindex="0"></span>\r\n    <input <% if (name) { %>name="<%- name %>"<% } %> id="<%- id %>" type="checkbox"\r\n        value="<%- id %>-value" class="g-field-input"/>\r\n        <% if (label) { %><label for="<%- id %>"><%- label %><% } %>\r\n    	<span class="g-field-info-wrap"><span class="g-field-info-inline ui-icon icon-info"></span></span>\r\n    	<% if (label) print("</label>"); %>\r\n</div>\r\n<div class="g-field-error ui-state-error-text ui-helper-hidden" aria-live="rude"></div>';
  }),
  define(
    'giraffe/widgets/checkbox',
    ['underscore', './field', '../utils', 'text!./checkbox/widget.html', '../nls/str'],
    function (e, t, n, r, i) {
      'use strict';
      return (
        (r = e.template(r)),
        t.as('Checkbox').extend({
          options: e.defaults(
            {
              noFit: !0,
            },
            t.prototype.options,
          ),
          render: function () {
            t.prototype.render.call(this),
              this.$el.addClass('g-field-checkbox').html(
                r({
                  id: this.id,
                  label: this.options.label,
                  name: this.name,
                  str: i,
                }),
              );
            var e = this;
            return (
              (this.$input = this.$el
                .find('.g-field-input')
                .focus(function () {
                  e.$el.addClass('g-checkbox-focused');
                })
                .blur(function () {
                  e.$el.removeClass('g-checkbox-focused');
                })
                .click(function () {
                  e.enabled && ($(this).focus(), e.$el.toggleClass('g-checkbox-checked'));
                })),
              this.$el.find('.g-checkbox-img').click(function () {
                e.$input.trigger('click');
              }),
              this.$el.find('.g-field-error').hide(),
              this.setInfo(this.options.info),
              this
            );
          },
          _noMandatory: !0,
          _setInput: function (e) {
            return this.$el.toggleClass('g-checkbox-checked', !!e), this.$input.val([e && this.id + '-value']), this;
          },
          _getInput: function () {
            return !!this.$input.filter(':checked').length;
          },
          validate: function () {
            return this.setValid(!0), $.when();
          },
          isSet: function () {
            return !0;
          },
          setInfo: function (e) {
            this.$el.find('.g-field-info-inline').attr('title', e || ''),
              this.$el.find('.g-field-info-wrap').toggle(!!e);
          },
          _watchChange: function () {
            var e = this;
            n.isIE8()
              ? this.$el.click(function () {
                  e.triggerChange();
                })
              : this.$el.change(function () {
                  e.triggerChange();
                });
          },
        })
      );
    },
  ),
  define('giraffe/widgets/choicefield', ['./field', '../utils'], function (e, t) {
    'use strict';
    return e.extend({
      _checkChoices: function () {
        t.resolvePromise(this.options.choices, this).done(this.setChoices.bind(this));
      },
      _normalizeChoices: function (e) {
        var n = t.resolveArray(e, this).slice(0),
          r = this;
        return (
          this.options.sort &&
            n.sort(
              typeof this.options.sort == 'function'
                ? this.options.sort
                : function (e, t) {
                    return e.label.localeCompare(t.label);
                  },
            ),
          n.forEach(function (e, t) {
            e.id || (e.id = r.id + '-' + t);
          }),
          n
        );
      },
      setValue: function (t) {
        return (this.value = t), e.prototype.setValue.call(this, t);
      },
      setChoices: function (e) {
        this._setChoices(this._normalizeChoices(e)), this.value && this.setValue(this.value);
      },
    });
  }),
  define('text!giraffe/widgets/checkboxgroup/widget.html', [], function () {
    return '<fieldset <% if (mandatory) { %>aria-required="true"<% } %> >\r\n    <% if (label) { %>\r\n    <div class="g-field-label<% if (info) { %> g-field-label-with-info<% } %>" title="<%- label %>">\r\n        <legend>\r\n            <%- label %>\r\n        </legend>\r\n        <span class="g-field-mandatory-indicator" title="<%= str.prompts.MANDATORY %>">*</span>\r\n        <% if (info) { %><span class="g-field-info-wrap"><span class="g-field-info ui-icon icon-info" title="<%- info %>"></span></span><% } %>\r\n    </div>\r\n    <% } %>\r\n    <div class= "g-field-checkboxgroup-choices">\r\n    </div>\r\n</fieldset>\r\n<div class="g-field-error ui-state-error-text ui-helper-hidden" aria-live="rude"></div>';
  }),
  define('text!giraffe/widgets/checkboxgroup/choice.html', [], function () {
    return '<% _.each(choices, function(value) { %>\r\n<div>\r\n    <span class="g-checkbox-img" tabindex="0"></span>\r\n    <input id="<%- value.id %>" type="checkbox" value="<%- value.value %>"\r\n       class="g-field-input"/>\r\n    <label for="<%- value.id %>"><%- value.label %>\r\n    	<% if (placement === "vertical" && value.info) { %><span class="g-choice-info-wrap ui-state-default"><span class="g-choice-info ui-icon icon-info" title="<%- value.info %>"></span></span><% } %>\r\n    </label>\r\n    <% if (placement === "horizontal" && value.info) { %><span class="g-choice-info-wrap ui-state-default"><span class="g-choice-info ui-icon icon-info" title="<%- value.info %>"></span></span><% } %>\r\n</div>\r\n<% }); %>';
  }),
  define(
    'giraffe/widgets/checkboxgroup',
    [
      'underscore',
      'jquery',
      '../utils',
      './choicefield',
      'text!./checkboxgroup/widget.html',
      'text!./checkboxgroup/choice.html',
      '../nls/str',
    ],
    function (e, t, n, r, i, s, o) {
      'use strict';
      return (
        (i = e.template(i)),
        (s = e.template(s)),
        r.as('CheckboxGroup').extend({
          render: function () {
            return (
              r.prototype.render.call(this),
              (this.value = this.options.value),
              this.$el.addClass('g-field-checkboxgroup').html(
                i({
                  id: this.id,
                  name: this.name,
                  label: this.options.label,
                  mandatory: this.options.mandatory,
                  info: this.options.info,
                  str: o,
                }),
              ),
              this.options.horizontal && this.$el.addClass('g-field-checkboxgroup-horizontal'),
              this._checkChoices(),
              this
            );
          },
          _noMandatory: !0,
          _setInput: function (e) {
            (e = e || []),
              this.$input.each(function () {
                var n = t(this);
                ~e.indexOf(n.attr('value'))
                  ? (n.parent().addClass('g-checkbox-checked'), n.attr('checked', 'checked'))
                  : (n.parent().removeClass('g-checkbox-checked'), n.removeAttr('checked'));
              });
          },
          _getInput: function () {
            return this.$input
              .filter(':checked')
              .map(function () {
                return this.value;
              })
              .get();
          },
          isSet: function () {
            var e = this._getInput();
            return e && e.length;
          },
          _setChoices: function (e) {
            var n = this.$el.find('.g-field-checkboxgroup-choices').empty();
            n.html(
              s({
                choices: e,
                placement: this.options.horizontal ? 'horizontal' : 'vertical',
              }),
            );
            var r = this;
            (this.$input = this.$el
              .find('.g-field-input')
              .focus(function () {
                t(this).parent().addClass('g-checkbox-focused');
              })
              .blur(function () {
                t(this).parent().removeClass('g-checkbox-focused');
              })
              .click(function () {
                r.enabled && t(this).focus().parent().toggleClass('g-checkbox-checked');
              })),
              this.$el.find('.g-checkbox-img').click(function () {
                t(this).parent().find('input').trigger('click');
              });
            var i = this.$el.find('.g-choice-info-wrap');
            i.css({
              border: '1px solid transparent',
            }),
              this.options.horizontal &&
                (this.$el.find('.g-choice-info.ui-icon').css({
                  'vertical-align': 'top',
                }),
                i.css({
                  'vertical-align': 'middle',
                }));
          },
        })
      );
    },
  ),
  define('text!giraffe/widgets/collection/widget.html', [], function () {
    return '<% if (label) { %>\r\n<div class="g-field-label<% if (info) { %> g-field-label-with-info<% } %>" title="<%- label %>" <% if (typeof isRTL !== "undefined" && isRTL === true) { %>dir="rtl"<% } %>>\r\n    <label for="<%- id %>">\r\n        <%- label %>\r\n    </label>\r\n    <span class="g-field-mandatory-indicator" title="<%= str.prompts.MANDATORY %>">*</span>\r\n    <% if (info) { %><span class="g-field-info-wrap"><span class="g-field-info ui-icon icon-info" title="<%- info %>"></span></span><% } %>\r\n</div>\r\n<% } %>\r\n<div id="<%- id %>" class="g-collection-border ui-widget-content ui-corner-all" tabindex="0">\r\n	<div class="g-collection-container">\r\n		<div class="g-collection-placeholder"><%= str.prompts.NO_ITEMS %></div>\r\n		<div class="g-collection-item-actions"><!--\r\n			--><button class="g-collection-item-action g-collection-item-action-up"><%= str.titles.MOVE_UP %></button><!--\r\n			--><button class="g-collection-item-action g-collection-item-action-down"><%= str.titles.MOVE_DOWN %></button><!--\r\n			--><button class="g-collection-item-action g-collection-item-action-remove"><%= str.titles.REMOVE %></button><!--\r\n		--></div>\r\n	</div>\r\n</div>\r\n<% if (buttons.length) { %>\r\n<div class="g-collection-actions"><!-- removes whitespace between buttons\r\n    <% _.each(buttons, function(value) { %>\r\n        --><button class="g-button g-button-transparent g-collection-action g-collection-action-<%- value.name %>"><%- value.label %></button><!--\r\n    <% }); %>\r\n--></div>\r\n<% } %>\r\n<div class="g-field-error ui-state-error-text ui-helper-hidden" aria-live="rude"></div>';
  }),
  define('text!giraffe/widgets/collection/item.html', [], function () {
    return '<div class="g-collection-item<% if (itemClass) { %> <%- itemClass %> <% } %><% if (mandatory) { %> g-collection-item-mandatory <% } %>" title="<%- display %>" data-id="<%- id %>">\r\n<% if (html) { %>\r\n	<%= html %>\r\n<% } else { %>\r\n	<%- display %>\r\n<% } %>\r\n</div>';
  }),
  define(
    'giraffe/widgets/collection',
    [
      'underscore',
      'jquery',
      './field',
      '../utils',
      'text!./collection/widget.html',
      'text!./collection/item.html',
      '../nls/str',
    ],
    function (e, t, n, r, i, s, o) {
      'use strict';
      return (
        (i = e.template(i)),
        (s = e.template(s)),
        n.as('Collection').extend({
          options: e.defaults(
            {
              maxHeight: 110,
            },
            n.prototype.options,
          ),
          render: function () {
            n.prototype.render.call(this),
              this.$el.addClass('g-field g-field-collection g-field-fit').html(
                i({
                  id: this.id,
                  label: this.options.label,
                  mandatory: this.options.mandatory,
                  info: this.options.info,
                  buttons: r.resolveArray(this.options.buttons, this),
                  isRTL: this.isRTL,
                  str: o,
                }),
              ),
              (this.elements = {
                $border: this.$el.find('.g-collection-border'),
                $container: this.$el.find('.g-collection-container'),
                $placeholder: this.$el.find('.g-collection-placeholder'),
                $itemActions: this.$el.find('.g-collection-item-actions'),
              });
            var e = this;
            this.elements.$border.focus(function () {
              e.$el.trigger('fieldfocus', e);
            }),
              (this.items = []),
              (this.disabled = !1);
            var s = !1;
            this.elements.$border.click(function () {
              e.disabled || t(this).focus();
            });
            var u = this.elements.$container;
            this.options.sortable &&
              (u = u.sortable({
                axis: 'y',
                containment: 'parent',
                tolerance: 'pointer',
                cursor: 'n-resize',
                helper: 'clone',
                start: function () {
                  e.elements.$itemActions.hide(), e.elements.$border.focus(), (s = !0);
                },
                stop: function () {
                  s = !1;
                },
                update: function () {
                  e.triggerChange();
                },
              })),
              this.options.selectable && u.click(this._handleItemClick.bind(this));
            var a;
            u.mouseover(function (n) {
              var r = t(n.target).closest('.g-collection-item');
              if (s || !r.length || e.$el.hasClass('g-field-disabled')) return;
              e.elements.$itemActions
                .find('.g-collection-item-action-up:ui-button')
                .button('option', 'disabled', !r.prev('.g-collection-item').length)
                .end()
                .find('.g-collection-item-action-down:ui-button')
                .button('option', 'disabled', !r.next('.g-collection-item').length)
                .end()
                .find('.g-collection-item-action-remove:ui-button')
                .button('option', 'disabled', r.hasClass('g-collection-item-mandatory'))
                .end(),
                e.elements.$itemActions.data('itemElem', r).show().position({
                  my: 'right-1 center+1',
                  at: 'right',
                  of: r,
                  collision: 'none',
                }),
                r.is(a) ||
                  (a && a.css('padding-right', '0px'), r.css('padding-right', e.elements.$itemActions.width() + 'px')),
                (a = r);
            }).mouseleave(function (t) {
              e.elements.$itemActions.hide(), a && (a.css('padding-right', '0px'), (a = undefined));
            });
            var f;
            this.options.sortable
              ? (f = this.elements.$itemActions
                  .find('.g-collection-item-action-up')
                  .button({
                    icons: {
                      primary: 'icon-arrow-up',
                    },
                    text: !1,
                  })
                  .click(function () {
                    var t = e.elements.$itemActions.hide().data('itemElem');
                    t.insertBefore(t.prev('.g-collection-item')), e.triggerChange();
                  })
                  .end()
                  .find('.g-collection-item-action-down')
                  .button({
                    icons: {
                      primary: 'icon-arrow-down',
                    },
                    text: !1,
                  })
                  .click(function () {
                    var t = e.elements.$itemActions.hide().data('itemElem');
                    t.insertAfter(t.next('.g-collection-item')), e.triggerChange();
                  })
                  .end())
              : ((f = this.elements.$itemActions),
                f.find('.g-collection-item-action-up, .g-collection-item-action-down').hide()),
              f
                .find('.g-collection-item-action-remove')
                .button({
                  icons: {
                    primary: 'icon-cross',
                  },
                  text: !1,
                })
                .click(function () {
                  var n = e.elements.$itemActions.hide().data('itemElem'),
                    r = n.data('id').toString(),
                    i;
                  t.each(e.items, function (t) {
                    if (String(this.id) === r) return (i = this), e.items.splice(t, 1), !1;
                  }),
                    e._removeItemElem(n),
                    e.$el.trigger('collectionremove', i),
                    e.triggerChange();
                }),
              this.elements.$itemActions.hide();
            if (this.options.buttons && this.options.buttons.length) {
              this.elements.$border.addClass('g-collection-with-actions'), (this.buttons = {});
              var l = this.$el.find('.g-collection-actions');
              this.options.buttons.forEach(function (n) {
                var r = l.find('.g-collection-action-' + n.name).button(
                  t.extend(
                    {
                      icons: {
                        primary: n.icon,
                      },
                      text: !1,
                      disabled: e.options.disableButtonsOnRender,
                    },
                    n,
                  ),
                );
                (e.buttons[n.name] = r), n.onClick && r.click(n.onClick);
              });
            }
            return (
              this.options.maxHeight &&
                this.$el.find('.g-collection-container').css({
                  overflowY: 'auto',
                  maxHeight: this.options.maxHeight + 'px',
                }),
              this
            );
          },
          _clear: function () {
            this.elements.$container.find('.g-collection-item').remove(),
              (this.items = []),
              this.elements.$placeholder.show();
          },
          _getDisplayName: function (e) {
            return e.label || e.name;
          },
          _renderItems: function (e) {
            var n = this,
              i = [];
            return (
              e.forEach(function (e) {
                i.push(
                  t(
                    s({
                      display: n._getDisplayName(e),
                      id: e.id,
                      html: n.options.formatter && n.options.formatter(e),
                      itemClass: r.resolve(n.options.itemClass, e),
                      mandatory: e.mandatory,
                    }),
                  ),
                );
              }),
              (i = t(i)),
              this.options.onRenderItems && this.options.onRenderItems(i),
              i
            );
          },
          _addItems: function (e) {
            var t = this;
            if (!e.length) return;
            this.elements.$placeholder.hide(),
              (this.items = this.items.concat(e)),
              this._renderItems(e).appendTo(this.elements.$container),
              this.elements.$container.find('.g-collection-item:first').addClass('g-collection-item-first');
          },
          _refreshItem: function (e) {
            var n = this.elements.$container.find('.g-collection-item').filter(function () {
              return t(this).data('id') === e.id;
            });
            n.replaceWith(
              this._renderItems([e])
                .toggleClass('g-collection-item-first', n.hasClass('g-collection-item-first'))
                .toggleClass('g-collection-item-selected', n.hasClass('g-collection-item-selected'))[0],
            );
          },
          _removeItemElem: function (e) {
            e.remove(), this.elements.$container.find('.g-collection-item').length || this.elements.$placeholder.show();
          },
          exists: function (e) {
            var n;
            return (
              t.each(this.items, function (t) {
                if (this.id === e.id) return (n = !0), !1;
              }),
              n
            );
          },
          _removeItem: function (e) {
            var n = this,
              r;
            return (
              t.each(this.items, function (t) {
                if (this.id === e.id) return n.items.splice(t, 1), (r = !0), !1;
              }),
              this.elements.$container.find('.g-collection-item').each(function () {
                var r = t(this);
                if (r.data('id') === e.id) return n._removeItemElem(r), !1;
              }),
              r
            );
          },
          _handleItemClick: function (e) {
            var n = t(e.target).closest('.g-collection-item'),
              r;
            n.length > 0 && ((r = n.data('id')), this.setSelection(r));
          },
          _setInput: function (e) {
            var t = this;
            return (
              this._clear(),
              e && e.length && t._addItems(e),
              this.options.disableButtonsOnRender &&
                this.options.buttons &&
                this.options.buttons.length &&
                this.options.buttons.forEach(function (e) {
                  t.buttons[e.name].button(e.disabled ? 'disable' : 'enable');
                }),
              this
            );
          },
          _getInput: function () {
            var e = this,
              n = r.toHash(this.items, 'id');
            return (
              (this.items = this.$el
                .find('.g-collection-item')
                .map(function () {
                  return t(this).data('id');
                })
                .get()
                .map(function (e) {
                  return n[e];
                })),
              this.items
            );
          },
          isSet: function () {
            return !!this._getInput().length;
          },
          blur: function () {
            this.elements.$container.find('.g-collection-item-selected').removeClass('g-collection-item-selected');
          },
          setSelection: function (e) {
            e
              ? (this.$el.find('.g-collection-item-selected').removeClass('g-collection-item-selected'),
                this.$el
                  .find('.g-collection-item')
                  .filter(function () {
                    return t(this).data('id') === e;
                  })
                  .addClass('g-collection-item-selected'))
              : this.$el.find('.g-collection-item-selected').removeClass('g-collection-item-selected');
            if (this.options.onSelectionChange) {
              var n;
              if (e) {
                var r = this;
                t.each(this.items, function (t, r) {
                  if (String(r.id) === String(e)) return (n = r), !1;
                });
              }
              this.options.onSelectionChange(n);
            }
          },
          add: function (e) {
            this._addItems([e]), this.triggerChange();
          },
          addAll: function (e) {
            var t = this;
            this._clear(), this._addItems(e), this.triggerChange();
          },
          removeItem: function (e) {
            this._removeItem(e), this.triggerChange();
          },
          removeAll: function () {
            this._clear(), this.triggerChange();
          },
          update: function (e) {
            var n = this;
            t.each(this.items, function (t) {
              if (this.id === e.id) return n.items.splice(t, 1, e), !1;
            }),
              this._refreshItem(e),
              this.triggerChange();
          },
          setEnabled: function (e) {
            return (
              (this.disabled = !e),
              this.$el.find('.g-collection-action').button(e ? 'enable' : 'disable'),
              this.options.sortable && this.elements.$container.sortable(e ? 'enable' : 'disable'),
              e ? this.elements.$border.attr('tabindex', 0) : this.elements.$border.removeAttr('tabindex'),
              n.prototype.setEnabled.call(this, e)
            );
          },
        })
      );
    },
  ),
  define('text!giraffe/widgets/combobox/widget.html', [], function () {
    return '<% if (label || labelOptions && labelOptions.align === "horizontal") { %>\r\n<div class="g-field-label<% if (info) { %> g-field-label-with-info<% } %>" title="<%- label %>" <% if (typeof isRTL !== "undefined" && isRTL === true) { %>dir="rtl"<% } %>>\r\n    <label for="<%- id %>">\r\n       <%- label %>\r\n    </label>\r\n    <% if (label) { %><span class="g-field-mandatory-indicator" title="<%= str.prompts.MANDATORY %>">*</span><% } %>\r\n     <% if (label && info) { %><span class="g-field-info-wrap"><span class="g-field-info ui-icon icon-info" title="<%- info %>"></span></span><% } %>\r\n</div>\r\n<% } %>\r\n<div  class="g-combobox-wrap g-collection-border icon-dropdown-arrow<% if (hideArrow) { %>-hidden<% } %>" style="position:relative">\r\n	<select\r\n        <% if (typeof isRTL !== "undefined" && isRTL === true) { %> dir="rtl" <% } %>\r\n        id="<%- id %>" class="g-field-input ui-widget-content <% if (typeof isRTL !== "undefined" && isRTL === true) { %>g-field-combobox-rtl<% } %>"\r\n        <% if (name) { %>name="<%- name %>"<% } %>\r\n        <% if (mandatory) { %>aria-required="true"<% } %> >\r\n        <% if (allowEmpty) { %>\r\n            <option class="g-field-combobox-option-empty" value=""><%- emptyTitle %></option>\r\n        <% } %>\r\n	</select>\r\n</div>\r\n<div class="g-field-error ui-state-error-text ui-helper-hidden" aria-live="rude"></div>';
  }),
  define('text!giraffe/widgets/combobox/choice.html', [], function () {
    return '<option value="<%- value %>">\r\n<% if (typeof needsRTLMark !== "undefined" && needsRTLMark === true) { %>\r\n	<% print(new Array(6).join("&nbsp;")); %>\r\n	<%- label %>\r\n	<% if (typeof indent !== "undefined") print(new Array(indent * 5).join("&nbsp;")); %>\r\n<% } else { %>\r\n	<% if (typeof indent !== "undefined") print(new Array(indent * 5).join("&nbsp;")); %>\r\n	<%- label %>\r\n	<% print(new Array(6).join("&nbsp;")); %>\r\n<% } %>\r\n</option>';
  }),
  define(
    'giraffe/widgets/combobox',
    [
      'underscore',
      './choicefield',
      '../utils',
      'text!./combobox/widget.html',
      'text!./combobox/choice.html',
      '../nls/str',
    ],
    function (e, t, n, r, i, s) {
      'use strict';
      return (
        (r = e.template(r)),
        (i = e.template(i)),
        t.as('ComboBox').extend({
          options: e.defaults(
            {
              allowEmpty: !0,
              emptyTitle: '',
            },
            t.prototype.options,
          ),
          render: function () {
            t.prototype.render.call(this);
            var e = this.options.choices && this.options.choices[0] ? this.options.choices[0].value : undefined,
              i = n.getIEVersion(),
              o = n.getFFVersion();
            this.value = this.options.value || (this.options.allowEmpty ? this.options.emptyTitle : e);
            var u = this.isRTL;
            this.options.keepLTR === !0 && (u = !1),
              this.$el.addClass('g-field-combobox g-field-fit').html(
                r({
                  id: this.id,
                  label: this.options.label,
                  labelOptions: this.options.labelOptions,
                  name: this.name,
                  mandatory: this.options.mandatory,
                  info: this.options.info,
                  allowEmpty: this.options.allowEmpty,
                  emptyTitle: this.options.emptyTitle,
                  isRTL: u,
                  str: s,
                  hideArrow: (i !== !1 && i < 11) || (o !== !1 && o < 35),
                }),
              );
            var a = this;
            return (
              (this.$input = this.$el.find('.g-field-input').focus(function () {
                a.$el.trigger('fieldfocus', a);
              })),
              this._checkChoices(),
              this
            );
          },
          _setInput: function (e) {
            this.$input.val(e);
          },
          _getInput: function () {
            return this.$input.val();
          },
          _setChoices: function (e) {
            this.$input.find('option').not('.g-field-combobox-option-empty').remove(),
              e.forEach(function (e) {
                this.$input.append(i(e));
              }, this);
          },
        })
      );
    },
  ),
  define('giraffe/widgets/datefield', ['jquery', 'underscore', './textfield', '../nls/str'], function (e, t, n, r) {
    'use strict';
    var i = {
        icon: 'icon-calendar-generic',
        dateFormat: e.datepicker.ISO_8601,
        locale: {
          getStartOfWeek: function () {
            return 1;
          },
        },
      },
      s = [
        'JANUARY',
        'FEBRUARY',
        'MARCH',
        'APRIL',
        'MAY',
        'JUNE',
        'JULY',
        'AUGUST',
        'SEPTEMBER',
        'OCTOBER',
        'NOVEMBER',
        'DECEMBER',
      ],
      o = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      u = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
      a = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      f = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    return n.as('DateField').extend(
      {
        options: t.defaults(i, n.prototype.defaults),
        render: function () {
          var t = this;
          return (
            (this.options = e.extend(
              {
                buttons: [
                  {
                    name: 'clear',
                    label: r.titles.CLEAR,
                    icon: 'icon-cross',
                    onClick: function () {
                      t.setValue(), t.triggerChange();
                    },
                  },
                ],
                placeholder: r.titles.DATE_PLACEHOLDER,
              },
              this.options,
              {
                validation: e.extend(
                  {
                    date: !0,
                  },
                  this.options.validation,
                ),
              },
            )),
            n.prototype.render.call(this),
            this.$el.addClass('g-field-datefield'),
            this.$input.datepicker({
              closeText: r.titles.CLOSE,
              prevText: r.titles.PREVIOUS,
              nextText: r.titles.NEXT,
              currentText: r.titles.TODAY,
              monthNames: s.map(function (e) {
                return r.titles.MONTH_NAMES[e];
              }),
              monthNamesShort: s.map(function (e) {
                return r.titles.MONTH_NAMES[e];
              }),
              dayNames: u.map(function (e) {
                return r.titles.DAY_NAMES[e];
              }),
              dayNamesShort: a.map(function (e) {
                return r.titles.DAY_SHORT_NAMES[e];
              }),
              dayNamesMin: f.map(function (e) {
                return r.titles.DAY_MIN_NAMES[e];
              }),
              weekHeader: r.titles.WEEK_SHORT,
              dateFormat: this.options.dateFormat,
              changeMonth: !0,
              changeYear: !0,
              selectOtherMonths: !0,
              showOtherMonths: !0,
              gotoCurrent: !0,
              firstDay: this.options.locale.getStartOfWeek(),
              onSelect: function () {
                t.$el.trigger('fieldchange', [t, t.getValue()]);
              },
              beforeShow: function () {
                var e = t.$input.datepicker('option', 'firstDay'),
                  n = t.options.locale.getStartOfWeek();
                e !== n && (t.$input.datepicker('option', 'firstDay', n), t.$input.datepicker('refresh'));
              },
            }),
            this
          );
        },
        setMax: function (t) {
          var n = e.datepicker.parseDate(this.options.dateFormat, t);
          this.$input.datepicker('option', 'maxDate', n);
        },
        setMin: function (t) {
          var n = e.datepicker.parseDate(this.options.dateFormat, t);
          this.$input.datepicker('option', 'minDate', n);
        },
        getValue: function () {
          var e = this._getInput();
          if (e.length) return e;
        },
      },
      {
        defaults: i,
      },
    );
  }),
  define('text!giraffe/widgets/message/widget.html', [], function () {
    return '<div class="g-message-icon ui-icon icon-24 g-icon-alternative"></div>\r\n<div class="g-message-text"></div>\r\n<div class="g-message-close ui-icon icon-16 icon-closelarge g-icon-alternative"></div>';
  }),
  define('giraffe/widgets/message', ['underscore', './widget', 'text!./message/widget.html'], function (e, t, n) {
    'use strict';
    var r = {
        info: 'icon-check-circle',
        alert: 'icon-alert-circle',
        error: 'icon-stop-circle',
      },
      i = {
        info: {
          closable: !0,
          visibleDur: 3e3,
          fadeDur: 1e3,
          autoHide: !0,
          abortHideOnHover: !1,
        },
        alert: {
          closable: !0,
          autoHide: !1,
        },
        error: {
          closable: !0,
          autoHide: !1,
        },
      };
    return t.as('Message').extend({
      options: e.defaults(
        {
          autoFocus: !0,
        },
        t.prototype.options,
      ),
      render: function () {
        var r = this;
        return (
          t.prototype.render.call(this),
          this.$el.addClass('g-message').toggleClass('g-message-closable', !!this.options.closable).html(e.template(n)),
          this.options.info
            ? this.showInfo(this.options.info, !0)
            : this.options.alert
            ? this.showAlert(this.options.alert, !0)
            : this.options.error
            ? this.showError(this.options.error, !0)
            : this.hide(!0),
          this.$el.find('.g-message-close').click(function () {
            r.hide();
          }),
          this
        );
      },
      _autoHide: function (e) {
        var t = this;
        this.$el
          .animate(
            {
              _: 0,
            },
            (e && e.visibleDur) || 4e3,
          )
          .fadeTo((e && e.fadeDur) || 4e3, 0, function () {
            t.hide(!0);
          });
      },
      _abortAutoHide: function () {
        this.$el.stop(!0).fadeTo(250, 1);
      },
      _show: function (e) {
        var t = this,
          n = e.autoHide !== undefined ? e.autoHide : this.options.autoHide,
          i = e.abortHideOnHover !== undefined ? e.abortHideOnHover : this.options.abortHideOnHover,
          s = e.closable !== undefined ? e.closable : this.options.closable;
        this.$el.toggleClass('g-message-closable', !!s),
          this.$el.stop(!0).css({
            opacity: 1,
          }),
          n &&
            i &&
            this.$el.on('mouseenter', this._abortAutoHide.bind(this)).on('mouseleave', this._autoHide.bind(this)),
          e.type &&
            this.$el
              .removeClass('g-message-info g-message-alert g-message-error')
              .addClass('g-message-' + e.type)
              .find('.g-message-icon')
              .removeClass('icon-check-circle icon-alert-circle icon-stop-circle')
              .addClass(r[e.type]),
          e.text && this.$el.find('.g-message-text').text(e.text),
          (this.visible = !0),
          e.noAnim ? this.$el.show() : this.$el.show('blind', 250),
          this.options.autoFocus &&
            this.$el.scrollParent().animate(
              {
                scrollTop: 0,
              },
              250,
            ),
          n && this._autoHide(e);
      },
      show: function (e) {
        var t =
          typeof e == 'object'
            ? e
            : {
                noAnim: e,
              };
        this._show($.extend({}, i[t.type || 'info'], t));
      },
      hide: function (e) {
        (this.visible = !1),
          this.$el.stop(!0).off('mouseenter mouseleave'),
          e ? this.$el.hide() : this.$el.hide('blind', 250);
      },
      _showType: function (e, t) {
        this._show(
          $.extend(
            {
              type: e,
            },
            t,
          ),
        );
      },
      showInfo: function (e, t) {
        return (
          this._showType(
            'info',
            $.extend(
              {
                text: e,
                noAnim: t,
              },
              i.info,
            ),
          ),
          this
        );
      },
      showAlert: function (e, t) {
        return (
          this._showType(
            'alert',
            $.extend(
              {
                text: e,
                noAnim: t,
              },
              i.alert,
            ),
          ),
          this
        );
      },
      showError: function (e, t) {
        return (
          this._showType(
            'error',
            $.extend(
              {
                text: e,
                noAnim: t,
              },
              i.error,
            ),
          ),
          this
        );
      },
    });
  }),
  define('text!giraffe/widgets/panel/widget.html', [], function () {
    return '<div class="g-panel-header ui-widget-header">\r\n	<div class="g-panel-buttonbar"></div>\r\n	<div class="g-panel-titlebar">\r\n	<% if (icon) { %>\r\n	    <div class="g-panel-icon <%- icon %>"></div>\r\n	<% } %>\r\n	    <div class="g-panel-title" title="<%- title %>"><h5><%- title %></h5></div>\r\n	</div>\r\n</div>\r\n<div class="g-panel-message"></div>\r\n<div class="g-panel-body">\r\n    <div class="g-panel-content-header"></div>\r\n    <div class="g-panel-content"></div>\r\n    <div class="g-panel-content-footer"></div>\r\n</div>';
  }),
  define(
    'giraffe/widgets/panel',
    ['jquery', 'underscore', './container', './message', './buttonbar', 'text!./panel/widget.html', '../nls/str'],
    function (e, t, n, r, i, s, o) {
      'use strict';
      return (
        (s = t.template(s)),
        n.as('Panel').extend({
          options: t.defaults(
            {
              contentPadding: !0,
            },
            n.prototype.options,
          ),
          render: function () {
            var t = this;
            (this.title = this.options.title),
              this.$el.addClass('g-panel').html(
                s({
                  icon: this.options.icon,
                  title: this.options.title,
                }),
              ),
              (this.message = new r(
                e.extend({}, this.options.message, {
                  el: this.$el.find('.g-panel-message'),
                  parent: this,
                  autoFocus: !1,
                }),
              )),
              this.message.render(),
              (this.$containerEl = this.$el.find('.g-panel-content')),
              (this.$headerEl = this.$el.find('.g-panel-content-header')),
              (this.header = new n({
                content: this.options.headerContent,
                el: this.$headerEl,
                parent: this,
                itemClass: 'g-panel-header-item',
                contentScroll: 'visible',
              })),
              this.header.render(),
              (this.$footerEl = this.$el.find('.g-panel-content-footer')),
              (this.footer = new n({
                content: this.options.footerContent,
                el: this.$footerEl,
                parent: this,
                itemClass: 'g-panel-footer-item',
                contentScroll: 'visible',
              })),
              this.footer.render();
            var u = [];
            return (
              this.options.buttons && (u = u.concat(this.options.buttons)),
              this.options.closable &&
                u.push({
                  name: 'closeButton',
                  tooltip: o.titles.CLOSE,
                  icons: {
                    primary: 'icon-closelarge',
                  },
                  onClick: function () {
                    t.options.onCloseClick
                      ? t.options.onCloseClick(t, function () {
                          t.close();
                        })
                      : t.close();
                  },
                }),
              u.length &&
                ((this.buttonBar = new i({
                  el: this.$el.find('.g-panel-buttonbar'),
                  parent: this,
                  content: u,
                  itemOptions: {
                    transparent: !0,
                  },
                })),
                this.buttonBar.render()),
              n.prototype.render.call(this),
              this
            );
          },
          setTitle: function (e) {
            (this.title = e),
              this.$el.find('.g-panel-title h5').text(this.title || ''),
              this.$el.find('.g-panel-title').attr('title', this.title || '');
          },
          setSize: function () {
            n.prototype.setSize.apply(this, arguments);
            var t = this.$el.height();
            this.$el
              .children(':visible')
              .not('.g-panel-body')
              .each(function (n, r) {
                t -= e(r).outerHeight();
              }),
              this.$el
                .find('.g-panel-body')
                .children(':visible')
                .not('.g-panel-content')
                .not('.antiscroll-scrollbar')
                .each(function (n, r) {
                  t -= e(r).outerHeight();
                }),
              this.$el.find('.g-panel-body').outerWidth(this.$el.width()),
              this.$containerEl.outerHeight(t).outerWidth(this.$el.find('.g-panel-body').innerWidth());
          },
          close: function () {
            this.destroy(), this.options.onClose && this.options.onClose.call(this);
          },
        })
      );
    },
  ),
  define('giraffe/widgets/dialog', ['jquery', 'underscore', '../utils', './panel'], function (e, t, n, r) {
    'use strict';
    return r.as('Dialog').extend({
      options: t.defaults(
        {
          width: 400,
          closable: !0,
        },
        r.prototype.options,
      ),
      initialize: function () {
        (this.lastFocusedElement = document.activeElement), r.prototype.initialize.call(this);
        var e = this;
        (this.options.onHashChange =
          (this.options.onHashChange && this.options.onHashChange.bind(this)) ||
          function () {
            e.onHashChange();
          }),
          window.onhashchange !== undefined &&
            (window.addEventListener
              ? window.addEventListener('hashchange', this.options.onHashChange, !1)
              : window.attachEvent !== undefined && window.attachEvent('onhashchange', this.options.onHashChange));
      },
      render: function () {
        r.prototype.render.call(this);
        var i = this;
        this.$el.addClass('g-dialog').attr('tabindex', '-1'),
          this.$el.draggable({
            handle: '.g-panel-header',
            containment: 'window',
          }),
          this.$el.find('.g-panel-header').on('mousedown', function () {
            i.$el.focus();
          });
        if (this.options.modal) {
          var s = e('body').find('.ui-widget-overlay');
          s.length
            ? ((this.$overlay = s),
              (this.oldIndex = this.$overlay.css('z-index')),
              this.$overlay.css('z-index', parseInt(this.oldIndex, 10) + 100))
            : (this.$overlay = e("<div class='ui-widget-overlay'/>")
                .appendTo(e('body'))
                .css('z-index', '1001')
                .css('position', 'fixed')
                .on('mousedown', function () {
                  i.$el.focus();
                })),
            this.$el.css('z-index', parseInt(this.$overlay.css('z-index'), 10) + 1);
        }
        return (
          this.$el.appendTo(e('body')).on('keyup', function (t) {
            t.which === e.ui.keyCode.ESCAPE && i.close();
          }),
          (this.$panelBody = this.$el.find('.g-panel-body')),
          this.$panelBody.append('<div class="g-container-item g-widget g-spinner g-spinner-32"></div>'),
          (this._rendered = !0),
          (this._onWindowResize = t.debounce(
            function () {
              this.$el.is(':visible') && this.show();
            }.bind(this),
            250,
          )),
          e(window).on('resize', this._onWindowResize),
          n.async(this._onWindowResize),
          this
        );
      },
      show: function () {
        return (
          this._rendered || this.render(),
          this.$el.position({
            collision: 'fit',
            of: window,
          }),
          this.focus(),
          r.prototype.show.call(this)
        );
      },
      focus: function () {
        this.$el.focus();
      },
      close: function () {
        this.oldIndex ? this.$overlay.css('z-index', this.oldIndex) : this.$overlay && this.$overlay.remove(),
          this.lastFocusedElement && this.lastFocusedElement.focus(),
          r.prototype.close.call(this);
      },
      clearPending: function () {
        if (!this.pending) return;
        this.$panelBody.removeClass('g-dialog-pending'), (this.pending = !1);
      },
      setPending: function () {
        if (this.pending) return;
        this.$panelBody.addClass('g-dialog-pending'), (this.pending = !0);
      },
      onHashChange: function () {
        this.close();
      },
      destroy: function () {
        e(window).off('resize', this._onWindowResize),
          window.onhashchange !== undefined &&
            (window.removeEventListener !== undefined
              ? window.removeEventListener('hashchange', this.options.onHashChange, !1)
              : window.detachEvent !== undefined && window.detachEvent('onhashchange', this.options.onHashChange)),
          r.prototype.destroy.call(this);
      },
    });
  }),
  define('text!giraffe/widgets/form/widget.html', [], function () {
    return '<div class="g-form-message"></div>\r\n<div class="g-form-content"></div>\r\n<div class="g-form-buttonbar"></div>';
  }),
  define(
    'giraffe/widgets/form',
    [
      'jquery',
      'underscore',
      '../utils',
      './container',
      './message',
      './buttonbar',
      'text!./form/widget.html',
      '../nls/str',
    ],
    function (e, t, n, r, i, s, o, u) {
      'use strict';
      o = t.template(o);
      var a = {},
        f = {};
      return r.as('Form').extend({
        options: t.defaults(
          {
            defaultType: 'TextField',
            itemClass: 'g-form-item',
            contentScroll: 'hidden',
          },
          r.prototype.options,
        ),
        render: function () {
          this.$el.addClass('g-form').html(o());
          var e = n.resolve(this.options.message, this),
            t = this.$el.find('.g-form-message');
          e
            ? ((this.message = e), t.hide())
            : e !== !1 &&
              (this.message = new i({
                el: t,
                parent: this,
              }).render());
          var u = n.resolve(this.options.buttons),
            a = this.$el.find('.g-form-buttonbar');
          return (
            u
              ? ((this.buttonBar = new s({
                  el: a,
                  parent: this,
                  content: u,
                  contentPadding: this.options.contentPadding,
                }).render()),
                (this._toolbar = this.buttonBar))
              : a.hide(),
            (this.$containerEl = this.$el.find('.g-form-content')),
            r.prototype.render.call(this),
            this.$containerEl.on(
              'fieldchange',
              function (e, t) {
                this._toggleDirty(!0),
                  this._fieldChanged(t),
                  this.options.onFieldChange && this.options.onFieldChange(t);
              }.bind(this),
            ),
            this._checkButtons(),
            this
          );
        },
        _toggleFields: function (e) {
          this.items.forEach(function (t) {
            t.setEnabled && t.$el.is('.g-field') && t.setEnabled(e && !t.options.disabled);
          });
        },
        _toggleButtons: function (e) {
          if (!this.buttonBar) return;
          this.buttonBar.items.forEach(function (t) {
            t.$el.is('.g-button') && t.setEnabled(e);
          }),
            e && this._checkButtons();
        },
        _checkButtons: function () {
          if (!this.buttonBar) return;
          this.buttonBar.items.forEach(function (e) {
            e.$el.is('.g-button') && e.options.enableOnDirty === !0 && e.setEnabled(this._dirty);
          }, this);
        },
        _toggleDirty: function (e) {
          (this._dirty = e), this._checkButtons();
        },
        _fieldChanged: function (t, n) {
          var r = this.$el
            .find('.g-field')
            .map(function () {
              return e(this).data('widget');
            })
            .get();
          (f = {}),
            (a = {}),
            r
              .filter(function (e) {
                return e.name;
              })
              .forEach(function (e) {
                f[e.name] = !1;
              }),
            this._fieldChangedOnce(t, n);
        },
        _fieldChangedOnce: function (e, t) {
          var r = this;
          if (!!f[e.name]) return;
          (f[e.name] = !0),
            t
              ? Object.keys(a).length > 0
                ? r._checkDownstreamDependenciesOnce(e, t)
                : r._checkDownstreamDependencies(e, t)
              : n.resolvePromise(e.validate, e).always(function () {
                  Object.keys(a).length > 0
                    ? r._checkDownstreamDependenciesOnce(e, t)
                    : r._checkDownstreamDependencies(e, t);
                });
        },
        _checkDownstreamDependencies: function (t, n) {
          var r = this.$el
            .find('.g-field')
            .map(function () {
              return e(this).data('widget');
            })
            .get();
          (a = {}),
            (f = {}),
            r
              .filter(function (e) {
                return e.name;
              })
              .forEach(function (e) {
                a[e.name] = !1;
              }),
            this._checkDownstreamDependenciesOnce(t, n);
        },
        _checkDownstreamDependenciesOnce: function (t, r) {
          if (!t.name) return;
          if (!!a[t.name]) return;
          a[t.name] = !0;
          var i = this.$el
              .find('.g-field')
              .map(function () {
                return e(this).data('widget');
              })
              .get(),
            s = n.toHash(
              i.filter(function (e) {
                return e.name;
              }),
              'name',
            ),
            o = i
              .filter(function (e) {
                return e.options.dependency;
              })
              .map(function (t) {
                var r = t.options.dependency,
                  i = e.extend({}, r);
                return (
                  delete i.fields,
                  delete i.onDependencyChange,
                  {
                    field: t,
                    upstreamFields: n.resolveArray(r.fields, t),
                    properties: i,
                    onDependencyChange: r.onDependencyChange,
                  }
                );
              })
              .filter(function (e) {
                return ~e.upstreamFields.indexOf(t.name);
              });
          o.forEach(function (i) {
            var o = i.upstreamFields.map(function (e) {
                return s[e];
              }, this),
              u = this;
            e.each(i.properties, function (e, t) {
              if (r && e === 'valid') return;
              var s = 'set' + e.charAt(0).toUpperCase() + e.substr(1),
                a = i.field[s],
                f;
              if (!a) throw "Field doesn't support method " + s;
              typeof t == 'object' && ((f = t.args), t.message && (f = [t.message]), (t = t.fn)),
                (f = n.resolveArray(f, i.field)),
                n.resolvePromise(t.apply(i.field, o)).done(function (t) {
                  f.unshift(t), a.apply(i.field, f), e === 'value' && u._fieldChangedOnce(i.field, r);
                });
            }),
              i.onDependencyChange && i.onDependencyChange(t.name, t.getValue());
          }, this);
        },
        _onAppend: function (e, t) {
          r.prototype._onAppend.apply(this, arguments);
          if (!e.$el.is('.g-field')) return;
          e.options.indent && e.$el.addClass('g-form-item-indent g-form-item-indent-' + e.options.indent);
          if (this.options.binding) {
            var n = this.options.binding.model,
              i = e.options.binding || e.options.__binding;
            typeof i == 'string' &&
              (i = {
                prop: i,
              });
            if (i && n) {
              var s;
              i.get ? (s = i.get(n)) : i.prop && (s = n.get(i.prop)), e.setValue(s), e.setValid(!0);
            }
          }
        },
        appendExtra: function (e) {
          r.prototype.append.call(this, e);
        },
        validate: function () {
          this.message && this.message.hide(!0);
          var t = this,
            n = this.items
              .filter(function (e) {
                return e.validate && e.visible && e.$el.is('.g-field');
              })
              .map(function (e) {
                return e.validate();
              });
          return e.when.apply(e, n).then(null, function () {
            return (
              (!t.options.onFail || !t.options.onFail()) &&
                t.message &&
                t.message.showError(u.messages.VALIDATION_FAILED_PLEASE_CORRECT),
              e.Deferred().reject(u.messages.VALIDATION_FAILED_PLEASE_CORRECT)
            );
          });
        },
        disable: function () {
          return this._toggleFields(!1), this._toggleButtons(!1), this;
        },
        enable: function () {
          return this._toggleFields(!0), this._toggleButtons(!0), this;
        },
        setPending: function () {
          return (
            this.disable(),
            this.$el.addClass('g-spinner g-spinner-padded g-spinner-16').css({
              backgroundPosition: '100% 0',
            }),
            this
          );
        },
        clearPending: function () {
          return this.enable(), this.$el.removeClass('g-spinner g-spinner-padded g-spinner-16'), this;
        },
      });
    },
  ),
  define('text!giraffe/widgets/dialogue/contenttitle.html', [], function () {
    return '<% if (icon && (!titleSize || titleSize === "large")) {%>\r\n<div class="g-dialogue-content-title-icon">\r\n    <span class="<%= icon %>"></span>\r\n</div>\r\n<% } %>\r\n<div class="g-dialogue-content-title-text">\r\n    <span class=\'g-dialogue-content-title-text-<% if (titleSize) { %><%- titleSize %><% } else { %>large<% } %>\'>\r\n        <%- title %>\r\n    </span>\r\n</div>';
  }),
  define(
    'giraffe/widgets/dialogue',
    [
      'jquery',
      'underscore',
      '../utils',
      './dialog',
      './buttonbar',
      './form',
      './field',
      './html',
      'text!./dialogue/contenttitle.html',
      '../nls/str',
    ],
    function (e, t, n, r, i, s, o, u, a, f) {
      'use strict';
      return r.extend({
        options: t.defaults(
          {
            width: 328,
            closable: !0,
            cssClass: 'g-dialogue',
          },
          r.prototype.options,
        ),
        initialize: function () {
          r.prototype.initialize.call(this);
          if (this.options.titleIcon)
            switch (this.options.titleIcon) {
              case 'info':
                this.titleIcon = 'fonticon icon-alert-info gax-widget-icon-green';
                break;
              case 'warning':
                this.titleIcon = 'fonticon icon-alert-triangle gax-widget-icon-orange';
                break;
              case 'error':
                this.titleIcon = 'fonticon icon-alert-octo gax-widget-icon-red';
                break;
              default:
            }
        },
        render: function () {
          return (
            r.prototype.render.call(this),
            this.append(this._getContentTitle()),
            this.append(this._getContent()),
            this.append(this._getFooterButtons()),
            (this._rendered = !0),
            this.$containerEl.find('button').bind('mouseenter', function () {
              var t = e(this),
                n = t.find('span');
              n.length && (n = n[0]),
                n && n.offsetWidth < n.scrollWidth && !t.attr('title') && t.attr('title', n.textContent);
            }),
            this
          );
        },
        _getContentTitle: function () {
          var e = new u({
            cssClass: 'g-dialogue-content-title',
            name: 'contenttitle',
            html: t.template(a, {
              title: this.options.contentTitle,
              titleSize: this.options.contentTitleSize,
              icon: this.titleIcon || this.options.icon,
            }),
          });
          return e;
        },
        _getFormContent: function (e, t, r) {
          var i = this,
            u = [];
          return (
            n.resolveArray(e).forEach(function (e) {
              e instanceof o
                ? u.push(e)
                : (e.placeHolder === undefined && (e.placeHolder = e.label),
                  e.tenantId === undefined && (e.tenantId = i.options.tenantId),
                  u.push(e));
            }),
            (this.formContent = new s({
              cssClass: 'g-dialogue-content-body',
              contentPadding: !0,
              content: u,
              name: t,
              onFieldChange: r,
            })),
            this.formContent
          );
        },
        _getTextContent: function (e) {
          return (
            (this.textContent = new u({
              cssClass: 'g-dialogue-content-body',
              name: 'textcontent',
              html: t.template("<div class='g-dialogue-content-text'><%- text %></div>", {
                text: e,
              }),
            })),
            this.textContent
          );
        },
        _getContent: function () {
          if (this.options.fields) {
            var e, t;
            this.options.form && ((e = this.options.form.name), (t = this.options.form.onFieldChange)),
              (this.dialogContent = this._getFormContent(this.options.fields, e, t));
          } else this.options.text && (this.dialogContent = this._getTextContent(this.options.text));
          return this.dialogContent;
        },
        _getFooterButtonSpecs: function () {
          var e = this;
          return [
            {
              type: 'Button',
              name: 'ok',
              alternative: !0,
              label: f.titles.OK,
              tooltip: f.titles.OK,
              onClick: function () {
                e.options.onConfirm
                  ? e.options.onConfirm(
                      'ok',
                      e,
                      function () {
                        e.close('ok');
                      },
                      function (e) {},
                    )
                  : e.close();
              },
            },
            {
              type: 'Button',
              name: 'cancel',
              label: f.titles.CANCEL,
              tooltip: f.titles.CANCEL,
              onClick: function () {
                e.options.onDecline
                  ? e.options.onDecline(
                      'cancel',
                      e,
                      function () {
                        e.close('cancel');
                      },
                      function (e) {},
                    )
                  : e.close();
              },
            },
          ];
        },
        _getFooterButtons: function () {
          return (
            (this.dialogButtonBar = new i({
              contentPadding: !0,
              align: 'center',
              content: this._getFooterButtonSpecs(),
            })),
            this.dialogButtonBar
          );
        },
      });
    },
  ),
  define('text!giraffe/widgets/filefield/widget.html', [], function () {
    return '<% if (label) { %>\r\n<div class="g-field-label<% if (info) { %> g-field-label-with-info<% } %>" title="<%- label %>">\r\n    <label for="<%- id %>">\r\n        <%- label %>\r\n    </label>\r\n    <span class="g-field-mandatory-indicator" title="<%= str.prompts.MANDATORY %>">*</span>\r\n    <% if (info) { %><span class="g-field-info-wrap"><span class="g-field-info ui-icon icon-info" title="<%- info %>"></span></span><% } %>\r\n</div>\r\n<% } %>\r\n<div>\r\n    <% if (!noFormWrap) { %>\r\n    <form method="<%- method %>" action="<%- url %>" enctype="<%- encodingType %>"\r\n            target="g-filefield-frame-<%- id %>">\r\n    <% } %>\r\n        <input type="file"\r\n            id="<%- id %>" class="g-field-input ui-widget-content"\r\n            <% if (name) { %>name="<%- name %>"<% } %>\r\n            <% if (placeholder) { %>placeholder="<%- placeholder %>"<% } %>\r\n            <% if (mandatory) { %>aria-required="true"<% } %>\r\n        />\r\n        <% _.each(params, function(value) { %> <input type="hidden" name="<%- value %>" class="g-filefield-param" /> <% }); %>\r\n    <% if (!noFormWrap) { %>\r\n    </form>\r\n    <% } %>\r\n    <iframe name="g-filefield-frame-<%- id %>"></iframe>\r\n</div>\r\n<div class="g-field-error ui-state-error-text ui-helper-hidden" aria-live="rude"></div>';
  }),
  define(
    'giraffe/widgets/filefield',
    ['underscore', 'jquery', '../utils', './field', '../classes/timer', 'text!./filefield/widget.html', '../nls/str'],
    function (e, t, n, r, i, s, o) {
      'use strict';
      s = e.template(s);
      var u = 0;
      return r.as('FileField').extend({
        options: e.defaults(
          {
            method: 'POST',
            encodingType: 'multipart/form-data',
            noFormWrap: !1,
          },
          r.prototype.options,
        ),
        render: function () {
          r.prototype.render.call(this),
            this.$el
              .addClass('g-field-filefield g-field-fit')
              .html(
                s({
                  id: this.id,
                  label: this.options.label,
                  name: this.name,
                  mandatory: this.options.mandatory,
                  info: this.options.info,
                  placeholder: this.options.placeholder,
                  params: this.options.params,
                  method: this.options.method,
                  encodingType: this.options.encodingType,
                  url: this.options.url,
                  noFormWrap: this.options.noFormWrap,
                  str: o,
                }),
              )
              .find('iframe')
              .addClass('g-filefield-frame');
          var e = this;
          return (
            (this.$input = this.$el.find('.g-field-input').focus(function () {
              e.$el.trigger('fieldfocus', e);
            })),
            this
          );
        },
        _setInput: function () {
          return this;
        },
        _getInput: function () {
          return this.$input.val();
        },
        upload: function (e) {
          var r = this;
          (e = t.extend(
            {
              callback: !0,
            },
            e,
          )),
            this.$el.find('.g-filefield-param').each(function () {
              var n = t(this);
              n.val(e.params && e.params[n.attr('name')]);
            });
          var s = this.$el.find('form'),
            o;
          if (e.callback) {
            var a = t.Deferred(),
              f = new i(e.timeout || this.options.timeout || 12e4).promise(),
              l = n.format('_{1}_{2}', Date.now(), u++);
            (o = a.promise()),
              (window._callbacks = window._callbacks || {}),
              (window._callbacks[l] = function () {
                f.abort(), delete window._callbacks[l], a.resolve.apply(a, arguments);
              }),
              f.done(function () {
                delete window._callbacks[l], a.reject('timeout');
              }),
              s.attr('action', n.format('{1}?callback=parent._callbacks.{2}', r.options.url, l));
          } else o = t.when().promise();
          return s.submit(), o;
        },
      });
    },
  ),
  define('giraffe/widgets/popover', ['jquery', 'underscore', './widget', '../utils'], function (e, t, n, r) {
    'use strict';
    return n.as('Popover').extend({
      options: t.defaults(
        {
          selectable: !1,
          destroyOnHide: !0,
          showConnector: !0,
          width: 220,
        },
        n.prototype.options,
      ),
      render: function () {
        return n.prototype.render.call(this), this.$el.appendTo(e('body')).addClass('g-menu').hide(), this;
      },
      show: function (t) {
        n.prototype.show.call(this);
        var r = this,
          i = t.align === 'right' ? 'right' : 'left',
          s = '',
          o = '';
        if (t.shift) {
          var u = t.shift.split(' ');
          (s = u[0]), (o = u[1] || '');
        }
        this.$el
          .toggleClass('g-menu-align-left', i === 'left')
          .toggleClass('g-menu-align-right', i === 'right')
          .position({
            my: i + s + ' top' + o,
            at: i + ' bottom',
            of: t.below,
            collision: t.collision || 'flip',
            using: function (t, n) {
              if (n.vertical === 'bottom') {
                var r = e(window).height() - t.top - e(this).height();
                e(this).css({
                  left: t.left + 'px',
                  bottom: r + 'px',
                });
              } else
                e(this).css({
                  left: t.left + 'px',
                  top: t.top + 'px',
                });
            },
          }),
          t.color &&
            this.$el.css({
              background: t.color,
            }),
          e(window.document).on('mousedown.g-menu', function (t) {
            e(t.target).closest('.g-menu-panel').length || r.hide();
          });
      },
      hide: function () {
        e(window.document).off('mousedown.g-menu');
        if (!this.options.destroyOnHide) return n.prototype.hide.call(this);
        this.destroy();
      },
      destroy: function () {
        this.options.onDestroy && this.options.onDestroy(), n.prototype.destroy.call(this);
      },
    });
  }),
  define('text!giraffe/widgets/menu/widget.html', [], function () {
    return '<% if (showConnector !== false) { %>\r\n<div class="g-menu-connector"></div>\r\n<% } %>\r\n<ul class="g-menu-panel">\r\n    <% categories && categories.forEach(function (category) { %>\r\n    <li class="g-menu-item g-menu-category<% if (category.selected) print(" g-menu-category-selected"); %>">\r\n        <h5 class="g-menu-item-ellipsis"><%- category.label %></h5>\r\n        <ul>\r\n            <% category.items.forEach(function (item) { %>\r\n            <% if (item.separator) { %>\r\n                <li class="g-menu-separator"></li>\r\n            <% } else {%>\r\n                <li class="g-menu-item<% if (item.selected) print(" g-menu-item-selected"); if (item.disabled) print(" g-menu-item-disabled"); else print(" g-menu-child"); if (item.cssClass) print(" " + item.cssClass); %>" data-id="<%- item.id %>">\r\n                    <label for="<%- item.id %>">\r\n                        <% if (!item.disabled && item.url) { %>\r\n                        <a <% if (item.title) { %> title="<%- item.title %>"<% } %> href="<%- item.url %>" class="g-menu-item-ellipsis" data-idx="<%- item.index %>"><%- item.label %></a>\r\n                        <% } else { %>\r\n                        <%- item.label %>\r\n                        <% } %>\r\n                    </label>\r\n                </li>\r\n            <% } %>\r\n            <% }); %>\r\n        </ul>\r\n    </li>\r\n    <% }); %>\r\n    <% items && items.forEach(function (item) { %>\r\n    <% if (item.separator) { %>\r\n        <li class="g-menu-separator"></li>\r\n    <% } else { %>\r\n        <li class="g-menu-item<%  if (item.selected) print(" g-menu-item-selected"); if (item.disabled) print(" g-menu-item-disabled");  else print(" g-menu-child"); if (item.cssClass) print(" " + item.cssClass); if (item.selectable) print(" g-menu-item-selectable"); %>" data-id="<%- item.id %>">\r\n            <% if (selectable) { %>\r\n            <input type="checkbox" id="<%- item.id %>" <%if (item.selected) print(" checked"); if (item.disabled) print(\' disabled\'); %>></input><span></span>\r\n            <% } %>\r\n            <label for="<%- item.id %>">\r\n                <% if (!item.disabled && item.url) { %>\r\n                <a <% if (item.title) { %> title="<%- item.title %>"<% } %> href="<%- item.url %>" class="g-menu-item-ellipsis" data-idx="<%- item.index %>"><%- item.label %></a>\r\n                <% } else { %>\r\n                <%- item.label %>\r\n                <% } %>\r\n            </label>\r\n        </li>\r\n    <% } %>\r\n    <% }); %>\r\n</ul>';
  }),
  define(
    'giraffe/widgets/menu',
    ['jquery', 'underscore', './popover', '../utils', 'text!./menu/widget.html'],
    function (e, t, n, r, i) {
      'use strict';
      return (
        (i = t.template(i)),
        n.as('Menu').extend({
          render: function () {
            function a(n) {
              return n.map(function (n) {
                var i = e.extend({}, n, {
                  id: n.id || t.uniqueId(),
                  url: r.resolve(n.url),
                  selected: n.selected,
                  title: n.label,
                  separator: n.separator,
                });
                return (s.itemById[i.id] = i);
              });
            }
            n.prototype.render.call(this);
            var s = this,
              o,
              u;
            return (
              (this.itemById = {}),
              this.options.items && (o = a(this.options.items)),
              this.options.categories &&
                (u = this.options.categories.map(function (t) {
                  return e.extend({}, t, {
                    items: a(t.items),
                  });
                })),
              this.$el
                .append(
                  i({
                    categories: u,
                    items: o,
                    selectable: this.options.selectable,
                    showConnector: this.options.showConnector,
                  }),
                )
                .hide(),
              this.$el.find('.g-menu-panel > .g-menu-item:last').addClass('g-menu-item-last'),
              this.$el.on('click.g-menu', function (t) {
                var n = e(t.target);
                if (n.is('a') || n.is('input') || n.is('label') || n.is('li.g-menu-item.g-menu-child')) {
                  var r = n.closest('.g-menu-item').data('id'),
                    i = s.itemById[r];
                  i.disabled || (i.onClick ? i.onClick.call(s, i) : s.options.onClick && s.options.onClick.call(s, i)),
                    i.onSelect
                      ? (i.onSelect.call(s, i, n.is(':checked')), s.hide())
                      : s.options.onSelect && (s.options.onSelect.call(s, i), s.hide());
                }
                !n.is('a') && !n.is('input') && !n.is('label')
                  ? s.hide()
                  : s.itemById[n.closest('.g-menu-item').data('id')].selectable || s.hide();
                var o = n.closest('.g-menu-item').data('id');
                (!o || !s.itemById[o] || !s.itemById[o].selectable) && t.preventDefault();
              }),
              (s.menuListener = s.hideMenu.bind(s)),
              document.addEventListener('keydown', s.menuListener),
              this
            );
          },
          onDestroy: function () {
            document.removeEventListener('keydown', this.menuListener);
          },
          hideMenu: function () {
            (event.keyCode === 27 || event.keyCode === 13) && this.$el.hide().remove();
          },
          show: function (e) {
            (this.options.onDestroy = this.onDestroy.bind(this)),
              n.prototype.show.call(this, e),
              this.$el.hide().slideDown(125);
          },
          getSelected: function () {
            var t = this;
            return this.$el
              .find('.g-menu-item-selectable input:checked')
              .map(function (n, r) {
                return t.itemById[e(r).closest('.g-menu-item').data('id')];
              })
              .toArray();
          },
        })
      );
    },
  ),
  define('giraffe/widgets/numberfield', ['./textfield'], function (e) {
    'use strict';
    return e.as('NumberField').extend({
      render: function (t) {
        return (
          (this.options = $.extend({}, this.options, {
            validation: $.extend(
              {
                numeric: !0,
              },
              this.options.validation,
            ),
          })),
          e.prototype.render.call(this),
          this.$el.addClass('g-field-numberfield'),
          this
        );
      },
      getValue: function () {
        var e = parseFloat(this._getInput());
        if (!isNaN(e)) return e;
      },
    });
  }),
  define(
    'giraffe/widgets/objectcollection',
    ['underscore', '../utils', './collection', '../nls/str'],
    function (e, t, n, r) {
      'use strict';
      return n.as('ObjectCollection').extend({
        options: e.defaults({}, n),
        render: function () {
          var e = this,
            i = [
              {
                name: 'add',
                label: r.titles.BROWSE,
                icon: 'icon-folder',
                onClick: function () {
                  e.$el.trigger('request', [
                    e.options.listRequest,
                    $.extend(
                      {
                        pickable: !0,
                        multiSelect: !0,
                        onSelectionChange: function (t) {
                          var n = e._getInput().filter(function (e) {
                            var n;
                            return (
                              $.each(t, function () {
                                if (e.keep || e.id === this.id) return (n = !0), !1;
                              }),
                              !n
                            );
                          });
                          n.forEach(function (t) {
                            e._removeItem(t);
                          });
                          var r = t.filter(function (t) {
                            return !e.exists(t);
                          });
                          e._addItems(r), (n.length || r.length) && e.triggerChange();
                        },
                        select: e.getValue(),
                        pickableInit: function (t) {
                          e._onRemove = t.onRemove;
                        },
                      },
                      t.resolve(e.options.listRequestOptions, e),
                    ),
                  ]);
                },
              },
            ];
          return (
            (this.options.buttons = i.concat(this.options.buttons || [])),
            n.prototype.render.call(this),
            this.$el.addClass('g-field-requester'),
            this.$el.on('collectionremove', function (t, n) {
              e._onRemove && e._onRemove(n);
            }),
            this
          );
        },
      });
    },
  ),
  define(
    'giraffe/widgets/objectfield',
    ['jquery', 'underscore', '../utils', './autocomplete', '../nls/str'],
    function (e, t, n, r, i) {
      'use strict';
      return r.as('ObjectField').extend({
        render: function () {
          var t = this,
            s = [
              {
                name: 'browse',
                label: i.titles.BROWSE,
                icon: 'icon-folder',
                onClick: function () {
                  var r = n.resolve(t.options.listRequestOptions, t);
                  t.$el.trigger('request', [
                    t.options.listRequest,
                    e.extend(
                      {
                        pickable: !0,
                        select: [t.getValue()],
                        onSelectionChange: function (e) {
                          t.setValue(e[0]), t.setValid(!0), t.triggerChange();
                        },
                      },
                      r,
                    ),
                  ]);
                },
              },
              {
                name: 'clear',
                label: i.titles.CLEAR,
                icon: 'icon-cross',
                onClick: function () {
                  t.$el.trigger('request', 'clear'), t.setValue(), t.triggerChange();
                },
              },
            ];
          return (
            (this.options.buttons = s.concat(this.options.buttons || [])),
            r.prototype.render.call(this),
            this.$el.addClass('g-field-requester'),
            this
          );
        },
      });
    },
  ),
  define('text!giraffe/widgets/popover/popoverMsgList.html', [], function () {
    return '<ul class="g-widgets-popover-list">\r\n    <% options.items.forEach(function (val, idx) {%>\r\n    	<li class="g-widgets-popover-list-item">\r\n    		<% if (val.icon) { %>\r\n    			<span class="icon <%- val.icon %>"></span>\r\n    		<% } %>\r\n            <% if (val.title) { %>\r\n                <span class="g-widgets-popover-list-title">\r\n            <% } else { %>\r\n                <span class="g-widgets-popover-list-text">\r\n            <% } %> \r\n    		<%-val.text %></span></button></li>\r\n\r\n            <% if (val.separator) { %>\r\n                <li class="g-widgets-popover-separator"></li>\r\n            <% } %>\r\n    <% }); %>\r\n</ul>';
  }),
  define(
    'giraffe/widgets/popovermsglist',
    ['jquery', 'underscore', './popover', 'text!./popover/popoverMsgList.html'],
    function (e, t, n, r) {
      'use strict';
      return n.as('PopoverMsgList').extend({
        render: function () {
          return (
            n.prototype.render.call(this),
            this.$el.addClass('g-widgets-popover').append(
              t.template(r)({
                options: this.options.content,
              }),
            ),
            this
          );
        },
      });
    },
  ),
  define('text!giraffe/widgets/radiogroup/widget.html', [], function () {
    return '<fieldset <% if (mandatory) { %>aria-required="true"<% } %> >\r\n    <% if (label  || labelOptions && labelOptions.align === "horizontal") { %>\r\n    <div class="g-field-label<% if (info) { %> g-field-label-with-info<% } %>" title="<%- label %>" <% if (typeof isRTL !== "undefined" && isRTL === true) { %>dir="rtl"<% } %>>\r\n        <legend>\r\n            <%- label %>\r\n        </legend>\r\n        <% if (label) { %><span class="g-field-mandatory-indicator" title="<%= str.prompts.MANDATORY %>">*</span><% } %>\r\n        <% if (label && info) { %><span class="g-field-info-wrap"><span class="g-field-info ui-icon icon-info" title="<%- info %>"></span></span><% } %>\r\n    </div>\r\n    <% } %>\r\n    <div class="g-field-radiogroup-choices"></div>\r\n</fieldset>\r\n<div class="g-field-error ui-state-error-text ui-helper-hidden" aria-live="rude"></div>';
  }),
  define('text!giraffe/widgets/radiogroup/choice.html', [], function () {
    return '<div class="g-field-radiogroup-choice">\r\n    <span class="g-radiobutton-img" tabindex = "0"></span>\r\n    <input id="<%- id %>" type="radio" value="<%- value %>" name="<%- name %>"  tabindex = "0" class="g-field-input"/>\r\n    <label for="<%- id %>"<% if (title) { %> title="<%- title %>"<% } %>><%= label %>\r\n    <% if (placement === "vertical" && info) { %><span class="g-choice-info-wrap ui-state-default"><span class="g-choice-info ui-icon icon-info" title="<%- info %>"></span></span><% } %>\r\n    </label>\r\n    <% if (placement === "horizontal" && info) { %><span class="g-choice-info-wrap ui-state-default"><span class="g-choice-info ui-icon icon-info" title="<%- info %>"></span></span><% } %>\r\n</div>';
  }),
  define(
    'giraffe/widgets/radiogroup',
    [
      'underscore',
      'jquery',
      './choicefield',
      '../utils',
      'text!./radiogroup/widget.html',
      'text!./radiogroup/choice.html',
      '../nls/str',
    ],
    function (e, t, n, r, i, s, o) {
      'use strict';
      return (
        (i = e.template(i)),
        (s = e.template(s)),
        n.as('RadioGroup').extend({
          render: function () {
            return (
              n.prototype.render.call(this),
              (this.value = this.options.value || this.options.defaultValue),
              this.$el.addClass('g-field-radiogroup').html(
                i({
                  id: this.id,
                  name: this.name,
                  label: this.options.label,
                  labelOptions: this.options.labelOptions,
                  mandatory: this.options.mandatory,
                  info: this.options.info,
                  isRTL: this.isRTL,
                  str: o,
                }),
              ),
              this.options.horizontal && this.$el.addClass('g-field-radiogroup-horizontal'),
              this._checkChoices(),
              this
            );
          },
          _getInput: function () {
            return this.$input.filter(':checked').val();
          },
          _setInput: function (e) {
            this.$input.val([e]),
              this.$input.each(function () {
                var n = t(this);
                n.parent().toggleClass('g-radiobutton-selected', n.attr('value') === String(e));
              });
          },
          _setChoices: function (n) {
            var r = this.name || 'g-field-radiogroup-' + e.uniqueId(),
              i = this,
              o = this.$el.find('.g-field-radiogroup-choices').empty();
            n.forEach(function (t) {
              o.append(
                s(
                  e.extend(t, {
                    name: r,
                    placement: i.options.horizontal ? 'horizontal' : 'vertical',
                    info: t.info || undefined,
                    title: t.title || undefined,
                  }),
                ),
              );
            }),
              (this.$input = this.$el
                .find('.g-field-input')
                .focus(function () {
                  t(this).parent().addClass('g-radiobutton-focused');
                })
                .blur(function () {
                  t(this).parent().removeClass('g-radiobutton-focused');
                })
                .click(function () {
                  i.enabled &&
                    (i.$el.find('.g-radiobutton-selected').removeClass('g-radiobutton-selected'),
                    t(this).focus().parent().addClass('g-radiobutton-selected'));
                })),
              this.$el.find('.g-radiobutton-img').click(function () {
                t(this).parent().find('input').trigger('click');
              });
            var u = this.$el.find('.g-choice-info-wrap');
            u.css({
              border: '1px solid transparent',
            }),
              this.options.horizontal &&
                (this.$el.find('.g-choice-info.ui-icon').css({
                  'vertical-align': 'top',
                }),
                u.css({
                  'vertical-align': 'top',
                }));
          },
          _watchChange: function () {
            var e = this;
            r.isIE8()
              ? this.$el.click(function () {
                  e.triggerChange();
                })
              : this.$el.change(function () {
                  e.triggerChange();
                });
          },
        })
      );
    },
  ),
  define('giraffe/widgets/ranges/ranges', ['jquery'], function (e) {
    'use strict';
    function t() {
      this._ranges = [];
    }
    return (
      e.extend(t.prototype, {
        add: function (e) {
          e && this._ranges.push(e),
            this._ranges.sort(function (e, t) {
              return e.start === t.start ? 0 : e.start < t.start ? -1 : 1;
            });
          var t;
          return (
            this._ranges.forEach(function (n) {
              t &&
                n.start <= t.end &&
                ((t._cull = !0), (n._modified = !0), (e = n), (n.start = t.start), (n.end = Math.max(n.end, t.end))),
                (t = n);
            }),
            (this._ranges = this._ranges.filter(function (e) {
              return !e._cull;
            })),
            e
          );
        },
        remove: function (e) {
          var t = this;
          this._ranges.forEach(function (n) {
            if (e.start > n.start && e.end < n.end) {
              t._ranges.push({
                start: e.end,
                end: n.end,
                _modified: !0,
              }),
                (n._modified = !0),
                (n.end = e.start);
              return;
            }
          }),
            this._ranges.forEach(function (t) {
              e.start <= t.start && e.end >= t.end && (t._cull = !0);
            }),
            (this._ranges = this._ranges.filter(function (e) {
              return !e._cull;
            })),
            this._ranges.forEach(function (t) {
              t.end > e.start && t.start < e.start
                ? ((t.end = e.start), (t._modified = !0))
                : t.start < e.end && t.end > e.end && ((t.start = e.end), (t._modified = !0));
            });
        },
        get: function () {
          return this._ranges;
        },
        set: function (t) {
          this._ranges = e.extend(!0, [], t);
        },
      }),
      t
    );
  }),
  define('text!giraffe/widgets/ranges/widget.html', [], function () {
    return '<% if (label) { %>\r\n<div class="g-field-label<% if (info) { %> g-field-label-with-info<% } %>" title="<%- label %>">\r\n    <label for="<%- id %>">\r\n        <%- label %>\r\n    </label>\r\n    <% if (mandatory) { %><span class="g-field-mandatory-indicator" title="<%= str.prompts.MANDATORY %>">*</span><% } %>\r\n    <% if (info) { %><span class="g-field-info-wrap"><span class="g-field-info ui-icon icon-info" title="<%- info %>"></span></span><% } %>\r\n</div>\r\n<% } %>\r\n<div class="g-ranges-ticks">\r\n    <div class="g-ranges-tick g-ranges-tick-first"></div>\r\n    <div class="g-ranges-tick g-ranges-tick-last"></div>\r\n</div>\r\n<div id="<%- id %>" class="g-ranges-border ui-widget-content ui-corner-bottom" tabindex="0">\r\n    <div class="g-ranges-bars">\r\n        <div class="g-ranges-placeholder"><%= str.prompts.DRAG_TO_ADD_REMOVE_RANGES %></div>\r\n    </div>\r\n</div>\r\n<div class="g-ranges-draghandles"></div>\r\n<div class="g-field-error ui-state-error-text ui-helper-hidden" aria-live="rude"></div>\r\n';
  }),
  define('text!giraffe/widgets/ranges/dragHandle.html', [], function () {
    return '<div class="g-ranges-draghandle">\r\n    <div class="g-ranges-draghandle-connector"></div>\r\n    <div class="g-ranges-draghandle-body"></div>\r\n</div>';
  }),
  define(
    'giraffe/widgets/ranges',
    [
      'jquery',
      'underscore',
      './field',
      './ranges/ranges',
      'text!./ranges/widget.html',
      'text!./ranges/dragHandle.html',
      '../nls/str',
    ],
    function (e, t, n, r, i, s, o) {
      'use strict';
      return (
        (i = t.template(i)),
        n.as('Ranges').extend({
          options: t.defaults(
            {
              min: 0,
              max: 100,
              subdivisions: 1,
              step: 0,
              formatter: function (e) {
                return e;
              },
            },
            n.prototype.options,
          ),
          render: function () {
            return (
              n.prototype.render.call(this),
              (this._ranges = new r()),
              this.$el.addClass('g-field g-field-ranges g-field-fit').html(
                i({
                  id: this.id,
                  name: this.name,
                  label: this.options.label,
                  info: this.options.info,
                  mandatory: this.options.mandatory,
                  str: o,
                }),
              ),
              (this.elements = {
                $ticks: this.$el.find('.g-ranges-ticks'),
                $firstTick: this.$el.find('.g-ranges-tick-first'),
                $lastTick: this.$el.find('.g-ranges-tick-last'),
                $bars: this.$el.find('.g-ranges-bars'),
                $placeholder: this.$el.find('.g-ranges-placeholder'),
                $border: this.$el.find('.g-ranges-border'),
                $dragHandles: this.$el.find('.g-ranges-draghandles'),
                $tooltip: e('<div>', {
                  class: 'g-ranges-tooltip',
                })
                  .appendTo(this.$el)
                  .hide(),
              }),
              this.elements.$firstTick.text(this.options.formatter(this.options.min)),
              this.elements.$lastTick.text(this.options.formatter(this.options.max)),
              this.elements.$bars
                .mousedown(this._handleMouseDown.bind(this))
                .mousemove(this._handleMouseMove.bind(this))
                .mouseout(this._handleMouseOut.bind(this))
                .click(this._handleClick.bind(this)),
              (this._handleBodyMouseMove = this._handleBodyMouseMove.bind(this)),
              (this._handleBodyMouseUp = this._handleBodyMouseUp.bind(this)),
              this._drawSubdivisions(),
              this
            );
          },
          _toPos: function (e) {
            return Math.round(
              ((e - this.options.min) / (this.options.max - this.options.min)) * this.elements.$bars.width(),
            );
          },
          _normalize: function (e, t) {
            var n = Math.round(
              (e / this.elements.$bars.width()) * (this.options.max - this.options.min) + this.options.min,
            );
            return !t && this.options.step > 0 && (n = Math.round(n / this.options.step) * this.options.step), n;
          },
          _getOffset: function (e) {
            var t = e >= 0 ? '+' : '-';
            return t + e;
          },
          _handleMouseDown: function (t) {
            if (this.$el.is('.g-field-disabled')) return;
            this.elements.$bars.addClass('g-ranges-bars-dragging'),
              (this._dragStart = t.clientX),
              (this._erasing = e(t.target).is('.g-ranges-bar')),
              e(window.document).on('mousemove', this._handleBodyMouseMove),
              e(window.document).on('mouseup', this._handleBodyMouseUp),
              e('body').addClass('g-ranges-body-noselect');
          },
          _handleMouseMove: function (t) {
            if (e(this).is('.g-ranges-bars-dragging') || this.$el.is('.g-field-disabled')) return;
            var n = this.elements.$bars.offset().left,
              r = t.clientX - n,
              i = this.options.formatter(this._normalize(r, t.ctrlKey));
            this.elements.$tooltip.text(i).show();
            var s =
              Math.floor((r / (this.elements.$bars[0].offsetWidth - 1)) * (this.elements.$tooltip[0].offsetWidth - 3)) +
              1;
            this.elements.$tooltip
              .text(i)
              .show()
              .position({
                my: 'left' + this._getOffset(r - s) + ' top+3',
                at: 'left bottom',
                of: this.elements.$bars,
              });
          },
          _handleMouseOut: function () {
            if (e(this).is('.g-ranges-bars-dragging')) return;
            this.elements.$tooltip.hide();
          },
          _handleClick: function (t) {
            var n = e(t.target),
              r = n.data('range'),
              i = n.is('.g-ranges-bar-selected');
            if (i) return;
            this.elements.$bars.find('.g-ranges-bar-selected').stop(!0, !0).removeClass('g-ranges-bar-selected'),
              this._removeDragHandles(),
              r &&
                (n.stop(!0, !0).addClass('g-ranges-bar-selected'),
                this._addDragHandle(r, 'start'),
                this._addDragHandle(r, 'end')),
              this._onSelectionChange(r);
          },
          _handleBodyMouseMove: function (t) {
            var n = this.elements.$bars.find('.g-ranges-bar-selected');
            n.length && (n.removeClass('g-ranges-bar-selected'), this._removeDragHandles(), this._onSelectionChange());
            var r = this.elements.$bars.offset().left,
              i = t.clientX,
              s = {
                start: Math.max(this._toPos(this._normalize(Math.min(this._dragStart, i) - r, t.ctrlKey)), 0),
                end: Math.min(
                  this._toPos(this._normalize(Math.max(this._dragStart, i) - r, t.ctrlKey)),
                  this.elements.$bars.width(),
                ),
              };
            s.end > s.start
              ? (this.elements.$marker ||
                  (this.elements.$placeholder.hide(),
                  (this.elements.$marker = e('<div>', {
                    class: 'g-ranges-bar',
                  }).appendTo(this.elements.$bars)),
                  this._erasing
                    ? this.elements.$marker.addClass('g-ranges-bar-eraser')
                    : this.elements.$marker.addClass('g-ranges-bar-marker')),
                this.elements.$marker
                  .data('range', s)
                  .width(s.end - s.start)
                  .position({
                    my: 'left' + this._getOffset(s.start) + ' top+0',
                    at: 'left top',
                    of: this.elements.$bars,
                    collision: 'none',
                  }),
                this.elements.$tooltip
                  .text(
                    this.options.formatter(this._normalize(s.start, t.ctrlKey)) +
                      ' - ' +
                      this.options.formatter(this._normalize(s.end, t.ctrlKey)),
                  )
                  .show()
                  .position({
                    my: 'left+0 top+3',
                    at: 'left bottom',
                    of: this.elements.$marker,
                    collision: 'none',
                  }))
              : this.elements.$marker &&
                (this.elements.$marker.remove(),
                delete this.elements.$marker,
                this.elements.$tooltip.hide(),
                this.elements.$placeholder.toggle(!this._ranges.get().length));
          },
          _handleBodyMouseUp: function (t) {
            e(window.document).off('mousemove', this._handleBodyMouseMove),
              e(window.document).off('mouseup', this._handleBodyMouseUp),
              e('body').removeClass('g-ranges-body-noselect');
            if (this.elements.$marker) {
              var n = this.elements.$marker.data('range');
              (n.start = this._normalize(n.start, t.ctrlKey)),
                (n.end = this._normalize(n.end, t.ctrlKey)),
                n.end > n.start &&
                  (this._erasing
                    ? this._ranges.remove(n)
                    : ((n = this._ranges.add(n)),
                      (n._selected = !0),
                      this._addDragHandle(n, 'start'),
                      this._addDragHandle(n, 'end'),
                      this._onSelectionChange(n)),
                  this._drawRanges(),
                  this.triggerChange()),
                this.elements.$marker.remove(),
                delete this.elements.$marker,
                this.elements.$tooltip.hide();
            }
            this.elements.$bars.removeClass('g-ranges-bars-dragging');
          },
          _adjustRangeBar: function (t) {
            var n = t.data('range'),
              r = this._toPos(n.start),
              i = this._toPos(n.end);
            t.width(i - r).position({
              my: 'left' + this._getOffset(r) + ' top+0',
              at: 'left top',
              of: this.elements.$bars,
              collision: 'none',
            }),
              n._modified &&
                (t.addClass('g-ranges-bar-highlight').effect(
                  'highlight',
                  {
                    color: '#f5f5ab',
                  },
                  2e3,
                  function () {
                    e(this).removeClass('g-ranges-bar-highlight');
                  },
                ),
                delete n._modified);
          },
          _adjustDragHandle: function (e) {
            var t = e.width(),
              n = e.data('range'),
              r = e.data('side'),
              i = this.elements.$bars.offset().left - t,
              s = i,
              o = i + this.elements.$bars.width() + t;
            r === 'start' ? (o = i + this._toPos(n.end)) : (s = i + this._toPos(n.start) + t),
              e
                .position({
                  my: (r === 'start' ? 'right' : 'left') + this._getOffset(this._toPos(n[r])) + ' top+1',
                  at: 'left bottom',
                  of: this.elements.$bars,
                  collision: 'none',
                })
                .draggable('option', 'containment', [s, 0, o, 0]);
          },
          _removeDragHandles: function () {
            this.elements.$dragHandles.find('.g-ranges-draghandle').remove();
          },
          _addDragHandle: function (t, n) {
            var r = this,
              i = e(s)
                .appendTo(this.elements.$dragHandles)
                .addClass('g-ranges-draghandle-' + n)
                .data({
                  range: t,
                  side: n,
                })
                .hover(
                  function () {
                    var t = e(this),
                      n = t.data('range'),
                      i = t.data('side');
                    r.elements.$tooltip.text(r.options.formatter(n[i])).show(),
                      i === 'start'
                        ? r.elements.$tooltip.position({
                            my: 'left+2 top+2',
                            at: 'right top',
                            of: t,
                            collision: 'none',
                          })
                        : r.elements.$tooltip.position({
                            my: 'right-2 top+2',
                            at: 'left top',
                            of: t,
                            collision: 'none',
                          });
                  },
                  function () {
                    r.elements.$tooltip.hide();
                  },
                )
                .draggable({
                  axis: 'x',
                  drag: function (t, n) {
                    var i = e(this),
                      s = i.data('range'),
                      o = i.data('side'),
                      u = o === 'start' ? i.width() : 0;
                    s[o] = r._normalize(n.offset.left - r.elements.$bars.offset().left + u, t.ctrlKey);
                    var a = r.elements.$bars.find('.g-ranges-bar-selected');
                    a.length && r._adjustRangeBar(a),
                      r.elements.$tooltip
                        .text(r.options.formatter(s.start) + ' - ' + r.options.formatter(s.end))
                        .show(),
                      o === 'start'
                        ? r.elements.$tooltip.position({
                            my: 'left+2 top+2',
                            at: 'right top',
                            of: i,
                            collision: 'none',
                          })
                        : r.elements.$tooltip.position({
                            my: 'right-2 top+2',
                            at: 'left top',
                            of: i,
                            collision: 'none',
                          });
                  },
                  stop: function () {
                    var t = e(this),
                      n = t.data('range');
                    n.end > n.start
                      ? ((n = r._ranges.add() || n),
                        (n._selected = !0),
                        t.data('range', n),
                        r.elements.$dragHandles.find('.g-ranges-draghandle').each(function () {
                          r._adjustDragHandle(e(this));
                        }),
                        r._onSelectionChange(n))
                      : (r._ranges.remove(n), r._removeDragHandles(), r._onSelectionChange()),
                      r._drawRanges(),
                      r.triggerChange(),
                      r.elements.$tooltip.hide();
                  },
                });
            this._adjustDragHandle(i);
          },
          _drawSubdivisions: function () {
            if (!this.visible) return;
            if (this.options.subdivisions > 1) {
              var t = (this.options.max - this.options.min) / this.options.subdivisions,
                n,
                r;
              for (r = 0; r < this.options.subdivisions - 1; r++)
                (n = Math.round((r + 1) * t) + this.options.min),
                  e('<div>', {
                    class: 'g-ranges-tick',
                    text: this.options.formatter(n),
                  })
                    .insertBefore(this.elements.$lastTick)
                    .position({
                      my: 'bottom',
                      at: 'left' + this._getOffset(this._toPos(n)) + ' bottom+0',
                      of: this.elements.$ticks,
                      collision: 'none',
                    });
            }
            this.elements.$lastTick.position({
              my: 'right bottom',
              at: 'right bottom',
              of: this.elements.$ticks,
              collision: 'none',
            });
          },
          _drawRanges: function () {
            if (!this.visible) return;
            var t = this;
            this.elements.$bars.find('.g-ranges-bar').remove(),
              this.elements.$placeholder.toggle(!this._ranges.get().length),
              this._ranges.get().forEach(function (n) {
                var r = e('<div>', {
                  class: 'g-ranges-bar',
                })
                  .data('range', n)
                  .appendTo(t.elements.$bars);
                n._selected && (r.addClass('g-ranges-bar-selected'), delete n._selected), t._adjustRangeBar(r);
              });
          },
          _onSelectionChange: function (e) {
            this.options.onSelectionChange && this.options.onSelectionChange(e);
          },
          _getInput: function () {
            return this._ranges.get();
          },
          _setInput: function (e) {
            this._ranges.set(e), this._removeDragHandles(), this._drawRanges();
          },
          show: function () {
            return n.prototype.show.call(this), this._drawSubdivisions(), this._drawRanges(), this;
          },
          setEnabled: function (e) {
            e ? this.elements.$border.attr('tabindex', '0') : this.elements.$border.removeAttr('tabindex'),
              n.prototype.setEnabled.call(this, e);
          },
        })
      );
    },
  ),
  define('text!giraffe/widgets/tabs/widget.html', [], function () {
    return '<ul class="g-tabs-tabs"></ul>\r\n<div class="g-tabs-content">\r\n    <div class="g-tabs-tab-content"></div>\r\n    <div class="g-tabs-buttonbar"></div>\r\n</div>';
  }),
  define('text!giraffe/widgets/tabs/tab.html', [], function () {
    return '<li class="g-tabs-tab" data-idx="<%= idx %>" tabindex = "0"><%= title %></li>';
  }),
  define(
    'giraffe/widgets/tabs',
    ['underscore', '../utils', './container', './buttonbar', 'text!./tabs/widget.html', 'text!./tabs/tab.html'],
    function (e, t, n, r, i, s) {
      'use strict';
      return n.as('Tabs').extend({
        options: e.defaults(
          {
            tabWidth: 100,
          },
          n.prototype.options,
        ),
        render: function () {
          var s = this;
          this.$el
            .addClass('g-tabs')
            .append(e.template(i))
            .find('.g-tabs-tabs')
            .css({
              width: this.options.tabWidth + 1,
            })
            .on('click', '.g-tabs-tab', function () {
              var e = $(this).data('idx');
              s.setActiveTab(e);
            })
            .end()
            .find('.g-tabs-content')
            .css({
              marginLeft: this.options.tabWidth + 1,
            });
          var o = t.resolve(this.options.buttons),
            u = this.$el.find('.g-tabs-buttonbar');
          o
            ? (this.buttonBar = new r({
                el: u,
                parent: this,
                content: o,
                contentPadding: !0,
                align: 'left',
              }).render())
            : u.hide(),
            (this.$containerEl = this.$el.find('.g-tabs-tab-content')),
            n.prototype.render.call(this);
          if (this.items.length) {
            var a = 0;
            typeof this.options.activeTab == 'function'
              ? (a = this.options.activeTab())
              : (a = this.options.activeTab || 0),
              this.setActiveTab(a);
          }
          return this;
        },
        _onAppend: function (t, r) {
          n.prototype._onAppend.call(this, t),
            t.hide(),
            this.$el.find('.g-tabs-tabs').append(
              e.template(s, {
                title: t.options.title,
                idx: r,
              }),
            );
        },
        setActiveTab: function (e) {
          e = e.toString();
          if (e === this.activeTab) return;
          this.activeTab = e;
          var n = this.$el.find('.g-tabs-tab');
          this.items.forEach(function (t, r) {
            var i = r.toString() === e;
            n.eq(r).toggleClass('g-tabs-tab-active', i), t.setVisible(i);
          }),
            t.resolve(this.options.onTabChange, this, e);
        },
        toggleTabError: function (e, t, n) {
          this.$el
            .find('.g-tabs-tab')
            .eq(e)
            .toggleClass('g-tabs-tab-error', !!t)
            .attr('title', (!!t && n) || '');
        },
        _resize: function () {
          var e = this.getSize();
          this.$el.find('.g-tabs-content').outerHeight(e.height - 1),
            this.$el
              .find('.g-tabs-tab-content')
              .outerHeight(e.height - 1 - this.$el.find('.g-tabs-buttonbar').outerHeight());
        },
        setSize: function () {
          (this._buttonBarHeight = this.$el.find('.g-tabs-buttonbar').outerHeight()),
            n.prototype.setSize.apply(this, arguments),
            this._resize();
        },
        setHeight: function () {
          (this._buttonBarHeight = this.$el.find('.g-tabs-buttonbar').outerHeight()),
            n.prototype.setHeight.apply(this, arguments),
            this._resize();
        },
      });
    },
  ),
  define('text!giraffe/widgets/tile/widget.html', [], function () {
    return '    <div class="g-tile-overlay">\r\n        <span class="g-tile-img <%= icon%>"></span>\r\n        <div class="g-tile-header"><h2><%- label %></h2></div>\r\n    </div>';
  }),
  define(
    'giraffe/widgets/tile',
    ['underscore', '../utils', './container', 'text!./tile/widget.html'],
    function (e, t, n, r) {
      'use strict';
      return n.as('Tile').extend({
        options: e.defaults(
          {
            tileWidth: 220,
            tileHeight: 245,
          },
          n.prototype.options,
        ),
        render: function () {
          n.prototype.render.call(this);
          var t = this;
          return (
            this.$el
              .addClass('g-tile')
              .append(
                e.template(r, {
                  label: this.options.label,
                  icon: this.options.icon,
                }),
              )
              .css({
                height: this.options.height,
                width: this.options.tileWidth,
                color: this.options.color,
              }),
            this.options.margin && this.$el.addClass('g-tile-margin'),
            (this.underlay = new n({
              content: this.options.hoverContent,
              parent: this,
              cssClass: 'g-tile-content',
            })),
            this.append(this.underlay),
            this
          );
        },
      });
    },
  ),
  define('giraffe/widgets/timefield', ['underscore', './textfield', '../nls/str'], function (e, t, n) {
    'use strict';
    return t.as('TimeField').extend({
      render: function (e) {
        return (
          (this.options = $.extend(
            {
              placeholder: this.options.short ? n.titles.TIME_PLACEHOLDER_SHORT : n.titles.TIME_PLACEHOLDER_LONG,
            },
            this.options,
            {
              validation: $.extend(
                {
                  time_short: this.options.short,
                  time_long: !this.options.short,
                },
                this.options.validation,
              ),
            },
          )),
          t.prototype.render.call(this),
          this
        );
      },
    });
  }),
  define('giraffe/widgets/viewport', ['jquery', 'underscore', '../utils', './container'], function (e, t, n, r) {
    'use strict';
    return r.as('Viewport').extend({
      el: 'body',
      initialize: function () {
        r.prototype.initialize.call(this),
          (this.$window = e(window)),
          this.$window.resize(t.debounce(this._resize, 250).bind(this)),
          this.$window.focus(this._resize.bind(this)),
          this._resize(),
          this.render(),
          n.async(this._resize, this, 250);
      },
      _resize: function () {
        this.setSize(this.$window.width(), this.$window.height());
      },
      render: function () {
        return this.$el.empty(), r.prototype.render.call(this), this.$el.addClass('g-viewport'), this;
      },
    });
  }),
  define(
    'giraffe/widgets/all',
    [
      '../namespace',
      './autocomplete',
      './button',
      './buttonbar',
      './checkbox',
      './checkboxgroup',
      './collection',
      './combobox',
      './container',
      './datefield',
      './dialog',
      './dialogue',
      './field',
      './filefield',
      './form',
      './html',
      './menu',
      './message',
      './numberfield',
      './objectcollection',
      './objectfield',
      './panel',
      './popover',
      './popovermsglist',
      './radiogroup',
      './ranges',
      './tabs',
      './tile',
      './textfield',
      './timefield',
      './viewport',
      './widget',
      './field/validation',
    ],
    function (e) {
      'use strict';
      var t = e
        .using(arguments)
        .add('AutoComplete')
        .add('Button')
        .add('ButtonBar')
        .add('Checkbox')
        .add('CheckboxGroup')
        .add('Collection')
        .add('ComboBox')
        .add('Container')
        .add('DateField')
        .add('Dialog')
        .add('Dialogue')
        .add('Field')
        .add('FileField')
        .add('Form')
        .add('Html')
        .add('Menu')
        .add('Message')
        .add('NumberField')
        .add('ObjectCollection')
        .add('ObjectField')
        .add('Panel')
        .add('Popover')
        .add('PopoverMsgList')
        .add('RadioGroup')
        .add('Ranges')
        .add('Tabs')
        .add('Tile')
        .add('TextField')
        .add('TimeField')
        .add('Viewport')
        .add('Widget')
        .add('validationTypes')
        .get();
      return (t.create = t.Widget.create), (t.get = t.Widget.get), t;
    },
  ),
  define('giraffe/registry', ['./utils', './classes/logger'], function (e, t) {
    'use strict';
    var n = new t('Registry'),
      r = {};
    return {
      register: function (e) {
        var t = r[e.id];
        return t || (t = r[e.id] = []), t.push(e), this;
      },
      getAll: function (t) {
        var n;
        return (
          t instanceof RegExp
            ? ((n = []),
              $.each(r, function (e) {
                t.test(e) && n.push.apply(n, this);
              }))
            : (n = r[t] || []),
          n.map(function (t) {
            return t.extension ? e.resolve(t.extension) : t;
          })
        );
      },
      getFirst: function (e) {
        return this.getAll(e)[0];
      },
      has: function (e) {
        return !!this.getAll(e).length;
      },
      get: function (e) {
        return this.getAll(e);
      },
    };
  }),
  define(
    'giraffe/bootstrap',
    [
      'jquery',
      'underscore',
      'backbone',
      'giraffe/classes/all',
      'giraffe/widgets/all',
      'giraffe/layouts/all',
      'giraffe/registry',
      'giraffe/utils',
      './nls/str',
    ],
    function (e, t, n, r, i, s, o, u, a) {
      'use strict';
      var f = e.extend(
        {
          version: '2.2.1',
          widgets: i,
          layouts: s,
          registry: o,
          utils: u,
          str: a,
        },
        r,
      );
      return (
        (f.boot = function (i) {
          var s = e.Deferred(),
            o = new r.Progress({
              deferred: s,
              milestones: 2,
            });
          o.start(), (f.config = i), (f.Logger.prototype.level = i.logLevel);
          var u = new f.Logger('Bootstrap');
          u.info('Giraffe version {1}', f.version)
            .debug('Using RequireJS version {1}', require.version)
            .debug('Using jQuery version {1}', e.fn.jquery)
            .debug('Using jQuery UI version {1}', e.ui.version)
            .debug('Using Underscore version {1}', t.VERSION)
            .debug('Using Backbone version {1}', n.VERSION)
            .info('Loading plug-ins');
          var a = [];
          return (
            i.profile === 'default' ? a.push('./main/manifest') : i.profile === 'login' && a.push('./login/manifest'),
            require(a, function () {
              var t = arguments[0] && arguments[0].extensions;
              f.utils.resolveArray(t).some(function (e) {
                if (e.id === 'preInitialize') return f.registry.register.call(f.registry, e), !0;
              });
              var n = f.registry.getFirst('preInitialize');
              (n ? n.preInitialize() : e.when())
                .done(function () {
                  i.getExtensions || i.getPlugins
                    ? (i.getExtensions || i.getPlugins)()
                        .done(function (t) {
                          o.advance(),
                            require(t, function () {
                              function r(e) {
                                if (e instanceof Array) e.forEach(r);
                                else if (e.profile === '*' || n.test(e.profile || 'default'))
                                  u.debug('Registering extensions for module {1}', e.name),
                                    e.extensions.forEach(f.registry.register, f.registry);
                              }
                              o.advance();
                              var t = [].slice.call(arguments);
                              u.info('Using {1} profile', i.profile).info('Registering extensions');
                              var n = new RegExp(i.profile);
                              r(t), u.info('Initializing extensions');
                              var a = e.when();
                              f.registry
                                .getAll('initialize')
                                .sort(function (e, t) {
                                  return (e.priority || 10) - (t.priority || 10);
                                })
                                .forEach(function (e) {
                                  a = a.pipe(function () {
                                    return u.debug('Initializing extension'), e.initialize();
                                  });
                                }),
                                a.done(function () {
                                  u.info('Initialization complete'), s.resolve();
                                });
                            });
                        })
                        .fail(function () {
                          u.error('Could not load extensions');
                        })
                    : s.resolve();
                })
                .fail(function (e) {
                  typeof e == 'function' && e(), s.resolve();
                });
            }),
            s.promise()
          );
        }),
        f
      );
    },
  ),
  define('giraffe', ['giraffe/bootstrap'], function (e) {
    'use strict';
    return e;
  });
