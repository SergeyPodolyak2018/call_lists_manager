import { a as t } from './p-9031eb6a.js';
import { g as r } from './p-8a133b9b.js';
var n = function (t, r) {
  return (
    (n =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (t, r) {
          t.__proto__ = r;
        }) ||
      function (t, r) {
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
      }),
    n(t, r)
  );
};
function e(t, r) {
  if ('function' != typeof r && null !== r)
    throw new TypeError('Class extends value ' + String(r) + ' is not a constructor or null');
  function e() {
    this.constructor = t;
  }
  n(t, r), (t.prototype = null === r ? Object.create(r) : ((e.prototype = r.prototype), new e()));
}
var h,
  i,
  s,
  a = function () {
    return (
      (a =
        Object.assign ||
        function (t) {
          for (var r, n = 1, e = arguments.length; n < e; n++)
            for (var h in (r = arguments[n])) Object.prototype.hasOwnProperty.call(r, h) && (t[h] = r[h]);
          return t;
        }),
      a.apply(this, arguments)
    );
  };
function o(t, r, n) {
  if (n || 2 === arguments.length)
    for (var e, h = 0, i = r.length; h < i; h++)
      (!e && h in r) || (e || (e = Array.prototype.slice.call(r, 0, h)), (e[h] = r[h]));
  return t.concat(e || Array.prototype.slice.call(r));
}
function u(t) {
  return t.type === i.literal;
}
function c(t) {
  return t.type === i.argument;
}
function f(t) {
  return t.type === i.number;
}
function l(t) {
  return t.type === i.date;
}
function H(t) {
  return t.type === i.time;
}
function B(t) {
  return t.type === i.select;
}
function b(t) {
  return t.type === i.plural;
}
function v(t) {
  return t.type === i.pound;
}
function p(t) {
  return t.type === i.tag;
}
function E(t) {
  return !(!t || 'object' != typeof t || t.type !== s.number);
}
function d(t) {
  return !(!t || 'object' != typeof t || t.type !== s.dateTime);
}
!(function (t) {
  (t[(t.EXPECT_ARGUMENT_CLOSING_BRACE = 1)] = 'EXPECT_ARGUMENT_CLOSING_BRACE'),
    (t[(t.EMPTY_ARGUMENT = 2)] = 'EMPTY_ARGUMENT'),
    (t[(t.MALFORMED_ARGUMENT = 3)] = 'MALFORMED_ARGUMENT'),
    (t[(t.EXPECT_ARGUMENT_TYPE = 4)] = 'EXPECT_ARGUMENT_TYPE'),
    (t[(t.INVALID_ARGUMENT_TYPE = 5)] = 'INVALID_ARGUMENT_TYPE'),
    (t[(t.EXPECT_ARGUMENT_STYLE = 6)] = 'EXPECT_ARGUMENT_STYLE'),
    (t[(t.INVALID_NUMBER_SKELETON = 7)] = 'INVALID_NUMBER_SKELETON'),
    (t[(t.INVALID_DATE_TIME_SKELETON = 8)] = 'INVALID_DATE_TIME_SKELETON'),
    (t[(t.EXPECT_NUMBER_SKELETON = 9)] = 'EXPECT_NUMBER_SKELETON'),
    (t[(t.EXPECT_DATE_TIME_SKELETON = 10)] = 'EXPECT_DATE_TIME_SKELETON'),
    (t[(t.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11)] = 'UNCLOSED_QUOTE_IN_ARGUMENT_STYLE'),
    (t[(t.EXPECT_SELECT_ARGUMENT_OPTIONS = 12)] = 'EXPECT_SELECT_ARGUMENT_OPTIONS'),
    (t[(t.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13)] = 'EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE'),
    (t[(t.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14)] = 'INVALID_PLURAL_ARGUMENT_OFFSET_VALUE'),
    (t[(t.EXPECT_SELECT_ARGUMENT_SELECTOR = 15)] = 'EXPECT_SELECT_ARGUMENT_SELECTOR'),
    (t[(t.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16)] = 'EXPECT_PLURAL_ARGUMENT_SELECTOR'),
    (t[(t.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17)] = 'EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT'),
    (t[(t.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18)] = 'EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT'),
    (t[(t.INVALID_PLURAL_ARGUMENT_SELECTOR = 19)] = 'INVALID_PLURAL_ARGUMENT_SELECTOR'),
    (t[(t.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20)] = 'DUPLICATE_PLURAL_ARGUMENT_SELECTOR'),
    (t[(t.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21)] = 'DUPLICATE_SELECT_ARGUMENT_SELECTOR'),
    (t[(t.MISSING_OTHER_CLAUSE = 22)] = 'MISSING_OTHER_CLAUSE'),
    (t[(t.INVALID_TAG = 23)] = 'INVALID_TAG'),
    (t[(t.INVALID_TAG_NAME = 25)] = 'INVALID_TAG_NAME'),
    (t[(t.UNMATCHED_CLOSING_TAG = 26)] = 'UNMATCHED_CLOSING_TAG'),
    (t[(t.UNCLOSED_TAG = 27)] = 'UNCLOSED_TAG');
})(h || (h = {})),
  (function (t) {
    (t[(t.literal = 0)] = 'literal'),
      (t[(t.argument = 1)] = 'argument'),
      (t[(t.number = 2)] = 'number'),
      (t[(t.date = 3)] = 'date'),
      (t[(t.time = 4)] = 'time'),
      (t[(t.select = 5)] = 'select'),
      (t[(t.plural = 6)] = 'plural'),
      (t[(t.pound = 7)] = 'pound'),
      (t[(t.tag = 8)] = 'tag');
  })(i || (i = {})),
  (function (t) {
    (t[(t.number = 0)] = 'number'), (t[(t.dateTime = 1)] = 'dateTime');
  })(s || (s = {}));
var g = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,
  y =
    /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function m(t) {
  var r = {};
  return (
    t.replace(y, function (t) {
      var n = t.length;
      switch (t[0]) {
        case 'G':
          r.era = 4 === n ? 'long' : 5 === n ? 'narrow' : 'short';
          break;
        case 'y':
          r.year = 2 === n ? '2-digit' : 'numeric';
          break;
        case 'Y':
        case 'u':
        case 'U':
        case 'r':
          throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
        case 'q':
        case 'Q':
          throw new RangeError('`q/Q` (quarter) patterns are not supported');
        case 'M':
        case 'L':
          r.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][n - 1];
          break;
        case 'w':
        case 'W':
          throw new RangeError('`w/W` (week) patterns are not supported');
        case 'd':
          r.day = ['numeric', '2-digit'][n - 1];
          break;
        case 'D':
        case 'F':
        case 'g':
          throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
        case 'E':
          r.weekday = 4 === n ? 'short' : 5 === n ? 'narrow' : 'short';
          break;
        case 'e':
          if (n < 4) throw new RangeError('`e..eee` (weekday) patterns are not supported');
          r.weekday = ['short', 'long', 'narrow', 'short'][n - 4];
          break;
        case 'c':
          if (n < 4) throw new RangeError('`c..ccc` (weekday) patterns are not supported');
          r.weekday = ['short', 'long', 'narrow', 'short'][n - 4];
          break;
        case 'a':
          r.hour12 = !0;
          break;
        case 'b':
        case 'B':
          throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
        case 'h':
          (r.hourCycle = 'h12'), (r.hour = ['numeric', '2-digit'][n - 1]);
          break;
        case 'H':
          (r.hourCycle = 'h23'), (r.hour = ['numeric', '2-digit'][n - 1]);
          break;
        case 'K':
          (r.hourCycle = 'h11'), (r.hour = ['numeric', '2-digit'][n - 1]);
          break;
        case 'k':
          (r.hourCycle = 'h24'), (r.hour = ['numeric', '2-digit'][n - 1]);
          break;
        case 'j':
        case 'J':
        case 'C':
          throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
        case 'm':
          r.minute = ['numeric', '2-digit'][n - 1];
          break;
        case 's':
          r.second = ['numeric', '2-digit'][n - 1];
          break;
        case 'S':
        case 'A':
          throw new RangeError('`S/A` (second) patterns are not supported, use `s` instead');
        case 'z':
          r.timeZoneName = n < 4 ? 'short' : 'long';
          break;
        case 'Z':
        case 'O':
        case 'v':
        case 'V':
        case 'X':
        case 'x':
          throw new RangeError('`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead');
      }
      return '';
    }),
    r
  );
}
var w = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i,
  T = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,
  A = /^(@+)?(\+|#+)?[rs]?$/g,
  S = /(\*)(0+)|(#+)(0+)|(0+)/g,
  _ = /^(0+)$/;
function N(t) {
  var r = {};
  return (
    'r' === t[t.length - 1]
      ? (r.roundingPriority = 'morePrecision')
      : 's' === t[t.length - 1] && (r.roundingPriority = 'lessPrecision'),
    t.replace(A, function (t, n, e) {
      return (
        'string' != typeof e
          ? ((r.minimumSignificantDigits = n.length), (r.maximumSignificantDigits = n.length))
          : '+' === e
          ? (r.minimumSignificantDigits = n.length)
          : '#' === n[0]
          ? (r.maximumSignificantDigits = n.length)
          : ((r.minimumSignificantDigits = n.length),
            (r.maximumSignificantDigits = n.length + ('string' == typeof e ? e.length : 0))),
        ''
      );
    }),
    r
  );
}
function I(t) {
  switch (t) {
    case 'sign-auto':
      return { signDisplay: 'auto' };
    case 'sign-accounting':
    case '()':
      return { currencySign: 'accounting' };
    case 'sign-always':
    case '+!':
      return { signDisplay: 'always' };
    case 'sign-accounting-always':
    case '()!':
      return { signDisplay: 'always', currencySign: 'accounting' };
    case 'sign-except-zero':
    case '+?':
      return { signDisplay: 'exceptZero' };
    case 'sign-accounting-except-zero':
    case '()?':
      return { signDisplay: 'exceptZero', currencySign: 'accounting' };
    case 'sign-never':
    case '+_':
      return { signDisplay: 'never' };
  }
}
function R(t) {
  var r;
  if (
    ('E' === t[0] && 'E' === t[1]
      ? ((r = { notation: 'engineering' }), (t = t.slice(2)))
      : 'E' === t[0] && ((r = { notation: 'scientific' }), (t = t.slice(1))),
    r)
  ) {
    var n = t.slice(0, 2);
    if (
      ('+!' === n
        ? ((r.signDisplay = 'always'), (t = t.slice(2)))
        : '+?' === n && ((r.signDisplay = 'exceptZero'), (t = t.slice(2))),
      !_.test(t))
    )
      throw new Error('Malformed concise eng/scientific notation');
    r.minimumIntegerDigits = t.length;
  }
  return r;
}
function M(t) {
  return I(t) || {};
}
function L(t) {
  for (var r = {}, n = 0, e = t; n < e.length; n++) {
    var h = e[n];
    switch (h.stem) {
      case 'percent':
      case '%':
        r.style = 'percent';
        continue;
      case '%x100':
        (r.style = 'percent'), (r.scale = 100);
        continue;
      case 'currency':
        (r.style = 'currency'), (r.currency = h.options[0]);
        continue;
      case 'group-off':
      case ',_':
        r.useGrouping = !1;
        continue;
      case 'precision-integer':
      case '.':
        r.maximumFractionDigits = 0;
        continue;
      case 'measure-unit':
      case 'unit':
        (r.style = 'unit'), (r.unit = h.options[0].replace(/^(.*?)-/, ''));
        continue;
      case 'compact-short':
      case 'K':
        (r.notation = 'compact'), (r.compactDisplay = 'short');
        continue;
      case 'compact-long':
      case 'KK':
        (r.notation = 'compact'), (r.compactDisplay = 'long');
        continue;
      case 'scientific':
        r = a(
          a(a({}, r), { notation: 'scientific' }),
          h.options.reduce(function (t, r) {
            return a(a({}, t), M(r));
          }, {}),
        );
        continue;
      case 'engineering':
        r = a(
          a(a({}, r), { notation: 'engineering' }),
          h.options.reduce(function (t, r) {
            return a(a({}, t), M(r));
          }, {}),
        );
        continue;
      case 'notation-simple':
        r.notation = 'standard';
        continue;
      case 'unit-width-narrow':
        (r.currencyDisplay = 'narrowSymbol'), (r.unitDisplay = 'narrow');
        continue;
      case 'unit-width-short':
        (r.currencyDisplay = 'code'), (r.unitDisplay = 'short');
        continue;
      case 'unit-width-full-name':
        (r.currencyDisplay = 'name'), (r.unitDisplay = 'long');
        continue;
      case 'unit-width-iso-code':
        r.currencyDisplay = 'symbol';
        continue;
      case 'scale':
        r.scale = parseFloat(h.options[0]);
        continue;
      case 'integer-width':
        if (h.options.length > 1) throw new RangeError('integer-width stems only accept a single optional option');
        h.options[0].replace(S, function (t, n, e, h, i, s) {
          if (n) r.minimumIntegerDigits = e.length;
          else {
            if (h && i) throw new Error('We currently do not support maximum integer digits');
            if (s) throw new Error('We currently do not support exact integer digits');
          }
          return '';
        });
        continue;
    }
    if (_.test(h.stem)) r.minimumIntegerDigits = h.stem.length;
    else if (T.test(h.stem)) {
      if (h.options.length > 1) throw new RangeError('Fraction-precision stems only accept a single optional option');
      h.stem.replace(T, function (t, n, e, h, i, s) {
        return (
          '*' === e
            ? (r.minimumFractionDigits = n.length)
            : h && '#' === h[0]
            ? (r.maximumFractionDigits = h.length)
            : i && s
            ? ((r.minimumFractionDigits = i.length), (r.maximumFractionDigits = i.length + s.length))
            : ((r.minimumFractionDigits = n.length), (r.maximumFractionDigits = n.length)),
          ''
        );
      });
      var i = h.options[0];
      'w' === i ? (r = a(a({}, r), { trailingZeroDisplay: 'stripIfInteger' })) : i && (r = a(a({}, r), N(i)));
    } else if (A.test(h.stem)) r = a(a({}, r), N(h.stem));
    else {
      var s = I(h.stem);
      s && (r = a(a({}, r), s));
      var o = R(h.stem);
      o && (r = a(a({}, r), o));
    }
  }
  return r;
}
var C,
  O = {
    '001': ['H', 'h'],
    AC: ['H', 'h', 'hb', 'hB'],
    AD: ['H', 'hB'],
    AE: ['h', 'hB', 'hb', 'H'],
    AF: ['H', 'hb', 'hB', 'h'],
    AG: ['h', 'hb', 'H', 'hB'],
    AI: ['H', 'h', 'hb', 'hB'],
    AL: ['h', 'H', 'hB'],
    AM: ['H', 'hB'],
    AO: ['H', 'hB'],
    AR: ['H', 'h', 'hB', 'hb'],
    AS: ['h', 'H'],
    AT: ['H', 'hB'],
    AU: ['h', 'hb', 'H', 'hB'],
    AW: ['H', 'hB'],
    AX: ['H'],
    AZ: ['H', 'hB', 'h'],
    BA: ['H', 'hB', 'h'],
    BB: ['h', 'hb', 'H', 'hB'],
    BD: ['h', 'hB', 'H'],
    BE: ['H', 'hB'],
    BF: ['H', 'hB'],
    BG: ['H', 'hB', 'h'],
    BH: ['h', 'hB', 'hb', 'H'],
    BJ: ['H', 'hB'],
    BL: ['H', 'hB'],
    BM: ['h', 'hb', 'H', 'hB'],
    BN: ['hb', 'hB', 'h', 'H'],
    BO: ['H', 'hB', 'h', 'hb'],
    BQ: ['H'],
    BR: ['H', 'hB'],
    BS: ['h', 'hb', 'H', 'hB'],
    BT: ['h', 'H'],
    BW: ['H', 'h', 'hb', 'hB'],
    BZ: ['H', 'h', 'hb', 'hB'],
    CA: ['h', 'hb', 'H', 'hB'],
    CC: ['H', 'h', 'hb', 'hB'],
    CD: ['hB', 'H'],
    CF: ['H', 'h', 'hB'],
    CG: ['H', 'hB'],
    CH: ['H', 'hB', 'h'],
    CI: ['H', 'hB'],
    CK: ['H', 'h', 'hb', 'hB'],
    CL: ['H', 'h', 'hB', 'hb'],
    CM: ['H', 'h', 'hB'],
    CN: ['H', 'hB', 'hb', 'h'],
    CO: ['h', 'H', 'hB', 'hb'],
    CP: ['H'],
    CR: ['H', 'h', 'hB', 'hb'],
    CU: ['H', 'h', 'hB', 'hb'],
    CV: ['H', 'hB'],
    CX: ['H', 'h', 'hb', 'hB'],
    CY: ['h', 'H', 'hb', 'hB'],
    CZ: ['H'],
    DE: ['H', 'hB'],
    DG: ['H', 'h', 'hb', 'hB'],
    DJ: ['h', 'H'],
    DK: ['H'],
    DM: ['h', 'hb', 'H', 'hB'],
    DO: ['h', 'H', 'hB', 'hb'],
    DZ: ['h', 'hB', 'hb', 'H'],
    EA: ['H', 'h', 'hB', 'hb'],
    EC: ['H', 'hB', 'h', 'hb'],
    EE: ['H', 'hB'],
    EG: ['h', 'hB', 'hb', 'H'],
    EH: ['h', 'hB', 'hb', 'H'],
    ER: ['h', 'H'],
    ES: ['H', 'hB', 'h', 'hb'],
    ET: ['hB', 'hb', 'h', 'H'],
    FI: ['H'],
    FJ: ['h', 'hb', 'H', 'hB'],
    FK: ['H', 'h', 'hb', 'hB'],
    FM: ['h', 'hb', 'H', 'hB'],
    FR: ['H', 'hB'],
    GA: ['H', 'hB'],
    GB: ['H', 'h', 'hb', 'hB'],
    GD: ['h', 'hb', 'H', 'hB'],
    GE: ['H', 'hB', 'h'],
    GF: ['H', 'hB'],
    GG: ['H', 'h', 'hb', 'hB'],
    GH: ['h', 'H'],
    GI: ['H', 'h', 'hb', 'hB'],
    GM: ['h', 'hb', 'H', 'hB'],
    GN: ['H', 'hB'],
    GP: ['H', 'hB'],
    GQ: ['H', 'hB', 'h', 'hb'],
    GR: ['h', 'H', 'hb', 'hB'],
    GT: ['H', 'h', 'hB', 'hb'],
    GU: ['h', 'hb', 'H', 'hB'],
    GW: ['H', 'hB'],
    GY: ['h', 'hb', 'H', 'hB'],
    HK: ['h', 'hB', 'hb', 'H'],
    HN: ['H', 'h', 'hB', 'hb'],
    HR: ['H', 'hB'],
    IC: ['H', 'h', 'hB', 'hb'],
    ID: ['H'],
    IE: ['H', 'h', 'hb', 'hB'],
    IL: ['H', 'hB'],
    IM: ['H', 'h', 'hb', 'hB'],
    IN: ['h', 'H'],
    IO: ['H', 'h', 'hb', 'hB'],
    IQ: ['h', 'hB', 'hb', 'H'],
    IR: ['hB', 'H'],
    IS: ['H'],
    IT: ['H', 'hB'],
    JE: ['H', 'h', 'hb', 'hB'],
    JM: ['h', 'hb', 'H', 'hB'],
    JO: ['h', 'hB', 'hb', 'H'],
    JP: ['H', 'h', 'K'],
    KE: ['hB', 'hb', 'H', 'h'],
    KG: ['H', 'h', 'hB', 'hb'],
    KH: ['hB', 'h', 'H', 'hb'],
    KI: ['h', 'hb', 'H', 'hB'],
    KM: ['H', 'h', 'hB', 'hb'],
    KN: ['h', 'hb', 'H', 'hB'],
    KP: ['h', 'H', 'hB', 'hb'],
    KR: ['h', 'H', 'hB', 'hb'],
    KW: ['h', 'hB', 'hb', 'H'],
    KY: ['h', 'hb', 'H', 'hB'],
    KZ: ['H', 'hB'],
    LA: ['H', 'hb', 'hB', 'h'],
    LB: ['h', 'hB', 'hb', 'H'],
    LC: ['h', 'hb', 'H', 'hB'],
    LI: ['H', 'hB', 'h'],
    LK: ['H', 'h', 'hB', 'hb'],
    LR: ['h', 'hb', 'H', 'hB'],
    LS: ['h', 'H'],
    LT: ['H', 'h', 'hb', 'hB'],
    LU: ['H', 'h', 'hB'],
    LV: ['H', 'hB', 'hb', 'h'],
    LY: ['h', 'hB', 'hb', 'H'],
    MA: ['H', 'h', 'hB', 'hb'],
    MC: ['H', 'hB'],
    MD: ['H', 'hB'],
    ME: ['H', 'hB', 'h'],
    MF: ['H', 'hB'],
    MH: ['h', 'hb', 'H', 'hB'],
    MK: ['H', 'h', 'hb', 'hB'],
    ML: ['H'],
    MM: ['hB', 'hb', 'H', 'h'],
    MN: ['H', 'h', 'hb', 'hB'],
    MO: ['h', 'hB', 'hb', 'H'],
    MP: ['h', 'hb', 'H', 'hB'],
    MQ: ['H', 'hB'],
    MR: ['h', 'hB', 'hb', 'H'],
    MS: ['H', 'h', 'hb', 'hB'],
    MW: ['h', 'hb', 'H', 'hB'],
    MX: ['H', 'h', 'hB', 'hb'],
    MY: ['hb', 'hB', 'h', 'H'],
    MZ: ['H', 'hB'],
    NA: ['h', 'H', 'hB', 'hb'],
    NC: ['H', 'hB'],
    NE: ['H'],
    NF: ['H', 'h', 'hb', 'hB'],
    NG: ['H', 'h', 'hb', 'hB'],
    NI: ['H', 'h', 'hB', 'hb'],
    NL: ['H', 'hB'],
    NP: ['H', 'h', 'hB'],
    NR: ['H', 'h', 'hb', 'hB'],
    NU: ['H', 'h', 'hb', 'hB'],
    NZ: ['h', 'hb', 'H', 'hB'],
    OM: ['h', 'hB', 'hb', 'H'],
    PA: ['h', 'H', 'hB', 'hb'],
    PE: ['H', 'hB', 'h', 'hb'],
    PF: ['H', 'h', 'hB'],
    PG: ['h', 'H'],
    PH: ['h', 'hB', 'hb', 'H'],
    PK: ['h', 'hB', 'H'],
    PM: ['H', 'hB'],
    PN: ['H', 'h', 'hb', 'hB'],
    PR: ['h', 'H', 'hB', 'hb'],
    PS: ['h', 'hB', 'hb', 'H'],
    PT: ['H', 'hB'],
    PW: ['h', 'H'],
    PY: ['H', 'h', 'hB', 'hb'],
    QA: ['h', 'hB', 'hb', 'H'],
    RE: ['H', 'hB'],
    RO: ['H', 'hB'],
    RS: ['H', 'hB', 'h'],
    RU: ['H'],
    SA: ['h', 'hB', 'hb', 'H'],
    SB: ['h', 'hb', 'H', 'hB'],
    SC: ['H', 'h', 'hB'],
    SD: ['h', 'hB', 'hb', 'H'],
    SE: ['H'],
    SG: ['h', 'hb', 'H', 'hB'],
    SH: ['H', 'h', 'hb', 'hB'],
    SI: ['H', 'hB'],
    SJ: ['H'],
    SK: ['H'],
    SL: ['h', 'hb', 'H', 'hB'],
    SM: ['H', 'h', 'hB'],
    SN: ['H', 'h', 'hB'],
    SO: ['h', 'H'],
    SR: ['H', 'hB'],
    SS: ['h', 'hb', 'H', 'hB'],
    ST: ['H', 'hB'],
    SV: ['H', 'h', 'hB', 'hb'],
    SX: ['H', 'h', 'hb', 'hB'],
    SY: ['h', 'hB', 'hb', 'H'],
    SZ: ['h', 'hb', 'H', 'hB'],
    TA: ['H', 'h', 'hb', 'hB'],
    TC: ['h', 'hb', 'H', 'hB'],
    TD: ['h', 'H', 'hB'],
    TF: ['H', 'h', 'hB'],
    TG: ['H', 'hB'],
    TL: ['H', 'hB', 'hb', 'h'],
    TN: ['h', 'hB', 'hb', 'H'],
    TO: ['h', 'H'],
    TR: ['H', 'hB'],
    TT: ['h', 'hb', 'H', 'hB'],
    TW: ['hB', 'hb', 'h', 'H'],
    TZ: ['hB', 'hb', 'H', 'h'],
    UA: ['H', 'hB', 'h'],
    UG: ['hB', 'hb', 'H', 'h'],
    UM: ['h', 'hb', 'H', 'hB'],
    US: ['h', 'hb', 'H', 'hB'],
    UY: ['H', 'h', 'hB', 'hb'],
    UZ: ['H', 'hB', 'h'],
    VA: ['H', 'h', 'hB'],
    VC: ['h', 'hb', 'H', 'hB'],
    VE: ['h', 'H', 'hB', 'hb'],
    VG: ['h', 'hb', 'H', 'hB'],
    VI: ['h', 'hb', 'H', 'hB'],
    VU: ['h', 'H'],
    WF: ['H', 'hB'],
    WS: ['h', 'H'],
    XK: ['H', 'hB', 'h'],
    YE: ['h', 'hB', 'hb', 'H'],
    YT: ['H', 'hB'],
    ZA: ['H', 'h', 'hb', 'hB'],
    ZM: ['h', 'hb', 'H', 'hB'],
    'af-ZA': ['H', 'h', 'hB', 'hb'],
    'ar-001': ['h', 'hB', 'hb', 'H'],
    'ca-ES': ['H', 'h', 'hB'],
    'en-001': ['h', 'hb', 'H', 'hB'],
    'es-BO': ['H', 'h', 'hB', 'hb'],
    'es-BR': ['H', 'h', 'hB', 'hb'],
    'es-EC': ['H', 'h', 'hB', 'hb'],
    'es-ES': ['H', 'h', 'hB', 'hb'],
    'es-GQ': ['H', 'h', 'hB', 'hb'],
    'es-PE': ['H', 'h', 'hB', 'hb'],
    'fr-CA': ['H', 'h', 'hB'],
    'gl-ES': ['H', 'h', 'hB'],
    'gu-IN': ['hB', 'hb', 'h', 'H'],
    'hi-IN': ['hB', 'h', 'H'],
    'it-CH': ['H', 'h', 'hB'],
    'it-IT': ['H', 'h', 'hB'],
    'kn-IN': ['hB', 'h', 'H'],
    'ml-IN': ['hB', 'h', 'H'],
    'mr-IN': ['hB', 'hb', 'h', 'H'],
    'pa-IN': ['hB', 'hb', 'h', 'H'],
    'ta-IN': ['hB', 'h', 'hb', 'H'],
    'te-IN': ['hB', 'h', 'H'],
    'zu-ZA': ['H', 'hB', 'hb', 'h'],
  };
function G(t) {
  var r = t.hourCycle;
  if ((void 0 === r && t.hourCycles && t.hourCycles.length && (r = t.hourCycles[0]), r))
    switch (r) {
      case 'h24':
        return 'k';
      case 'h23':
        return 'H';
      case 'h12':
        return 'h';
      case 'h11':
        return 'K';
      default:
        throw new Error('Invalid hourCycle');
    }
  var n,
    e = t.language;
  return (
    'root' !== e && (n = t.maximize().region), (O[n || ''] || O[e || ''] || O[''.concat(e, '-001')] || O['001'])[0]
  );
}
var U = new RegExp('^'.concat(g.source, '*')),
  P = new RegExp(''.concat(g.source, '*$'));
function k(t, r) {
  return { start: t, end: r };
}
var D = !!String.prototype.startsWith,
  F = !!String.fromCodePoint,
  j = !!Object.fromEntries,
  K = !!String.prototype.codePointAt,
  V = !!String.prototype.trimStart,
  Z = !!String.prototype.trimEnd,
  x = Number.isSafeInteger
    ? Number.isSafeInteger
    : function (t) {
        return 'number' == typeof t && isFinite(t) && Math.floor(t) === t && Math.abs(t) <= 9007199254740991;
      },
  X = !0;
try {
  X =
    'a' ===
    (null === (C = tt('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu').exec('a')) || void 0 === C ? void 0 : C[0]);
} catch (t) {
  X = !1;
}
var Y,
  W = D
    ? function (t, r, n) {
        return t.startsWith(r, n);
      }
    : function (t, r, n) {
        return t.slice(n, n + r.length) === r;
      },
  z = F
    ? String.fromCodePoint
    : function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        for (var n, e = '', h = t.length, i = 0; h > i; ) {
          if ((n = t[i++]) > 1114111) throw RangeError(n + ' is not a valid code point');
          e +=
            n < 65536 ? String.fromCharCode(n) : String.fromCharCode(55296 + ((n -= 65536) >> 10), (n % 1024) + 56320);
        }
        return e;
      },
  J = j
    ? Object.fromEntries
    : function (t) {
        for (var r = {}, n = 0, e = t; n < e.length; n++) {
          var h = e[n];
          r[h[0]] = h[1];
        }
        return r;
      },
  Q = K
    ? function (t, r) {
        return t.codePointAt(r);
      }
    : function (t, r) {
        var n = t.length;
        if (!(r < 0 || r >= n)) {
          var e,
            h = t.charCodeAt(r);
          return h < 55296 || h > 56319 || r + 1 === n || (e = t.charCodeAt(r + 1)) < 56320 || e > 57343
            ? h
            : e - 56320 + ((h - 55296) << 10) + 65536;
        }
      },
  $ = V
    ? function (t) {
        return t.trimStart();
      }
    : function (t) {
        return t.replace(U, '');
      },
  q = Z
    ? function (t) {
        return t.trimEnd();
      }
    : function (t) {
        return t.replace(P, '');
      };
function tt(t, r) {
  return new RegExp(t, r);
}
if (X) {
  var rt = tt('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu');
  Y = function (t, r) {
    var n;
    return (rt.lastIndex = r), null !== (n = rt.exec(t)[1]) && void 0 !== n ? n : '';
  };
} else
  Y = function (t, r) {
    for (var n = []; ; ) {
      var e = Q(t, r);
      if (void 0 === e || ht(e) || it(e)) break;
      n.push(e), (r += e >= 65536 ? 2 : 1);
    }
    return z.apply(void 0, n);
  };
var nt = (function () {
  function t(t, r) {
    void 0 === r && (r = {}),
      (this.message = t),
      (this.position = { offset: 0, line: 1, column: 1 }),
      (this.ignoreTag = !!r.ignoreTag),
      (this.locale = r.locale),
      (this.requiresOtherClause = !!r.requiresOtherClause),
      (this.shouldParseSkeletons = !!r.shouldParseSkeletons);
  }
  return (
    (t.prototype.parse = function () {
      if (0 !== this.offset()) throw Error('parser can only be used once');
      return this.parseMessage(0, '', !1);
    }),
    (t.prototype.parseMessage = function (t, r, n) {
      for (var e = []; !this.isEOF(); ) {
        var s = this.char();
        if (123 === s) {
          if ((a = this.parseArgument(t, n)).err) return a;
          e.push(a.val);
        } else {
          if (125 === s && t > 0) break;
          if (35 !== s || ('plural' !== r && 'selectordinal' !== r)) {
            if (60 === s && !this.ignoreTag && 47 === this.peek()) {
              if (n) break;
              return this.error(h.UNMATCHED_CLOSING_TAG, k(this.clonePosition(), this.clonePosition()));
            }
            if (60 === s && !this.ignoreTag && et(this.peek() || 0)) {
              if ((a = this.parseTag(t, r)).err) return a;
              e.push(a.val);
            } else {
              var a;
              if ((a = this.parseLiteral(t, r)).err) return a;
              e.push(a.val);
            }
          } else {
            var o = this.clonePosition();
            this.bump(), e.push({ type: i.pound, location: k(o, this.clonePosition()) });
          }
        }
      }
      return { val: e, err: null };
    }),
    (t.prototype.parseTag = function (t, r) {
      var n = this.clonePosition();
      this.bump();
      var e = this.parseTagName();
      if ((this.bumpSpace(), this.bumpIf('/>')))
        return {
          val: { type: i.literal, value: '<'.concat(e, '/>'), location: k(n, this.clonePosition()) },
          err: null,
        };
      if (this.bumpIf('>')) {
        var s = this.parseMessage(t + 1, r, !0);
        if (s.err) return s;
        var a = s.val,
          o = this.clonePosition();
        if (this.bumpIf('</')) {
          if (this.isEOF() || !et(this.char())) return this.error(h.INVALID_TAG, k(o, this.clonePosition()));
          var u = this.clonePosition();
          return e !== this.parseTagName()
            ? this.error(h.UNMATCHED_CLOSING_TAG, k(u, this.clonePosition()))
            : (this.bumpSpace(),
              this.bumpIf('>')
                ? { val: { type: i.tag, value: e, children: a, location: k(n, this.clonePosition()) }, err: null }
                : this.error(h.INVALID_TAG, k(o, this.clonePosition())));
        }
        return this.error(h.UNCLOSED_TAG, k(n, this.clonePosition()));
      }
      return this.error(h.INVALID_TAG, k(n, this.clonePosition()));
    }),
    (t.prototype.parseTagName = function () {
      var t,
        r = this.offset();
      for (
        this.bump();
        !this.isEOF() &&
        (45 === (t = this.char()) ||
          46 === t ||
          (t >= 48 && t <= 57) ||
          95 === t ||
          (t >= 97 && t <= 122) ||
          (t >= 65 && t <= 90) ||
          183 == t ||
          (t >= 192 && t <= 214) ||
          (t >= 216 && t <= 246) ||
          (t >= 248 && t <= 893) ||
          (t >= 895 && t <= 8191) ||
          (t >= 8204 && t <= 8205) ||
          (t >= 8255 && t <= 8256) ||
          (t >= 8304 && t <= 8591) ||
          (t >= 11264 && t <= 12271) ||
          (t >= 12289 && t <= 55295) ||
          (t >= 63744 && t <= 64975) ||
          (t >= 65008 && t <= 65533) ||
          (t >= 65536 && t <= 983039));

      )
        this.bump();
      return this.message.slice(r, this.offset());
    }),
    (t.prototype.parseLiteral = function (t, r) {
      for (var n = this.clonePosition(), e = ''; ; ) {
        var h = this.tryParseQuote(r);
        if (h) e += h;
        else {
          var s = this.tryParseUnquoted(t, r);
          if (s) e += s;
          else {
            var a = this.tryParseLeftAngleBracket();
            if (!a) break;
            e += a;
          }
        }
      }
      var o = k(n, this.clonePosition());
      return { val: { type: i.literal, value: e, location: o }, err: null };
    }),
    (t.prototype.tryParseLeftAngleBracket = function () {
      return this.isEOF() || 60 !== this.char() || (!this.ignoreTag && (et((t = this.peek() || 0)) || 47 === t))
        ? null
        : (this.bump(), '<');
      var t;
    }),
    (t.prototype.tryParseQuote = function (t) {
      if (this.isEOF() || 39 !== this.char()) return null;
      switch (this.peek()) {
        case 39:
          return this.bump(), this.bump(), "'";
        case 123:
        case 60:
        case 62:
        case 125:
          break;
        case 35:
          if ('plural' === t || 'selectordinal' === t) break;
          return null;
        default:
          return null;
      }
      this.bump();
      var r = [this.char()];
      for (this.bump(); !this.isEOF(); ) {
        var n = this.char();
        if (39 === n) {
          if (39 !== this.peek()) {
            this.bump();
            break;
          }
          r.push(39), this.bump();
        } else r.push(n);
        this.bump();
      }
      return z.apply(void 0, r);
    }),
    (t.prototype.tryParseUnquoted = function (t, r) {
      if (this.isEOF()) return null;
      var n = this.char();
      return 60 === n || 123 === n || (35 === n && ('plural' === r || 'selectordinal' === r)) || (125 === n && t > 0)
        ? null
        : (this.bump(), z(n));
    }),
    (t.prototype.parseArgument = function (t, r) {
      var n = this.clonePosition();
      if ((this.bump(), this.bumpSpace(), this.isEOF()))
        return this.error(h.EXPECT_ARGUMENT_CLOSING_BRACE, k(n, this.clonePosition()));
      if (125 === this.char()) return this.bump(), this.error(h.EMPTY_ARGUMENT, k(n, this.clonePosition()));
      var e = this.parseIdentifierIfPossible().value;
      if (!e) return this.error(h.MALFORMED_ARGUMENT, k(n, this.clonePosition()));
      if ((this.bumpSpace(), this.isEOF()))
        return this.error(h.EXPECT_ARGUMENT_CLOSING_BRACE, k(n, this.clonePosition()));
      switch (this.char()) {
        case 125:
          return this.bump(), { val: { type: i.argument, value: e, location: k(n, this.clonePosition()) }, err: null };
        case 44:
          return (
            this.bump(),
            this.bumpSpace(),
            this.isEOF()
              ? this.error(h.EXPECT_ARGUMENT_CLOSING_BRACE, k(n, this.clonePosition()))
              : this.parseArgumentOptions(t, r, e, n)
          );
        default:
          return this.error(h.MALFORMED_ARGUMENT, k(n, this.clonePosition()));
      }
    }),
    (t.prototype.parseIdentifierIfPossible = function () {
      var t = this.clonePosition(),
        r = this.offset(),
        n = Y(this.message, r);
      return this.bumpTo(r + n.length), { value: n, location: k(t, this.clonePosition()) };
    }),
    (t.prototype.parseArgumentOptions = function (t, r, n, e) {
      var o,
        u = this.clonePosition(),
        c = this.parseIdentifierIfPossible().value,
        f = this.clonePosition();
      switch (c) {
        case '':
          return this.error(h.EXPECT_ARGUMENT_TYPE, k(u, f));
        case 'number':
        case 'date':
        case 'time':
          this.bumpSpace();
          var l = null;
          if (this.bumpIf(',')) {
            this.bumpSpace();
            var H = this.clonePosition();
            if ((y = this.parseSimpleArgStyleIfPossible()).err) return y;
            if (0 === (p = q(y.val)).length)
              return this.error(h.EXPECT_ARGUMENT_STYLE, k(this.clonePosition(), this.clonePosition()));
            l = { style: p, styleLocation: k(H, this.clonePosition()) };
          }
          if ((w = this.tryParseArgumentClose(e)).err) return w;
          var B = k(e, this.clonePosition());
          if (l && W(null == l ? void 0 : l.style, '::', 0)) {
            var b = $(l.style.slice(2));
            if ('number' === c)
              return (y = this.parseNumberSkeletonFromString(b, l.styleLocation)).err
                ? y
                : { val: { type: i.number, value: n, location: B, style: y.val }, err: null };
            if (0 === b.length) return this.error(h.EXPECT_DATE_TIME_SKELETON, B);
            var v = b;
            this.locale &&
              (v = (function (t, r) {
                for (var n = '', e = 0; e < t.length; e++) {
                  var h = t.charAt(e);
                  if ('j' === h) {
                    for (var i = 0; e + 1 < t.length && t.charAt(e + 1) === h; ) i++, e++;
                    var s = 1 + (1 & i),
                      a = i < 2 ? 1 : 3 + (i >> 1),
                      o = G(r);
                    for (('H' != o && 'k' != o) || (a = 0); a-- > 0; ) n += 'a';
                    for (; s-- > 0; ) n = o + n;
                  } else n += 'J' === h ? 'H' : h;
                }
                return n;
              })(b, this.locale));
            var p = {
              type: s.dateTime,
              pattern: v,
              location: l.styleLocation,
              parsedOptions: this.shouldParseSkeletons ? m(v) : {},
            };
            return { val: { type: 'date' === c ? i.date : i.time, value: n, location: B, style: p }, err: null };
          }
          return {
            val: {
              type: 'number' === c ? i.number : 'date' === c ? i.date : i.time,
              value: n,
              location: B,
              style: null !== (o = null == l ? void 0 : l.style) && void 0 !== o ? o : null,
            },
            err: null,
          };
        case 'plural':
        case 'selectordinal':
        case 'select':
          var E = this.clonePosition();
          if ((this.bumpSpace(), !this.bumpIf(',')))
            return this.error(h.EXPECT_SELECT_ARGUMENT_OPTIONS, k(E, a({}, E)));
          this.bumpSpace();
          var d = this.parseIdentifierIfPossible(),
            g = 0;
          if ('select' !== c && 'offset' === d.value) {
            if (!this.bumpIf(':'))
              return this.error(h.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, k(this.clonePosition(), this.clonePosition()));
            var y;
            if (
              (this.bumpSpace(),
              (y = this.tryParseDecimalInteger(
                h.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,
                h.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE,
              )).err)
            )
              return y;
            this.bumpSpace(), (d = this.parseIdentifierIfPossible()), (g = y.val);
          }
          var w,
            T = this.tryParsePluralOrSelectOptions(t, c, r, d);
          if (T.err) return T;
          if ((w = this.tryParseArgumentClose(e)).err) return w;
          var A = k(e, this.clonePosition());
          return 'select' === c
            ? { val: { type: i.select, value: n, options: J(T.val), location: A }, err: null }
            : {
                val: {
                  type: i.plural,
                  value: n,
                  options: J(T.val),
                  offset: g,
                  pluralType: 'plural' === c ? 'cardinal' : 'ordinal',
                  location: A,
                },
                err: null,
              };
        default:
          return this.error(h.INVALID_ARGUMENT_TYPE, k(u, f));
      }
    }),
    (t.prototype.tryParseArgumentClose = function (t) {
      return this.isEOF() || 125 !== this.char()
        ? this.error(h.EXPECT_ARGUMENT_CLOSING_BRACE, k(t, this.clonePosition()))
        : (this.bump(), { val: !0, err: null });
    }),
    (t.prototype.parseSimpleArgStyleIfPossible = function () {
      for (var t = 0, r = this.clonePosition(); !this.isEOF(); )
        switch (this.char()) {
          case 39:
            this.bump();
            var n = this.clonePosition();
            if (!this.bumpUntil("'")) return this.error(h.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, k(n, this.clonePosition()));
            this.bump();
            break;
          case 123:
            (t += 1), this.bump();
            break;
          case 125:
            if (!(t > 0)) return { val: this.message.slice(r.offset, this.offset()), err: null };
            t -= 1;
            break;
          default:
            this.bump();
        }
      return { val: this.message.slice(r.offset, this.offset()), err: null };
    }),
    (t.prototype.parseNumberSkeletonFromString = function (t, r) {
      var n = [];
      try {
        n = (function (t) {
          if (0 === t.length) throw new Error('Number skeleton cannot be empty');
          for (
            var r = [],
              n = 0,
              e = t.split(w).filter(function (t) {
                return t.length > 0;
              });
            n < e.length;
            n++
          ) {
            var h = e[n].split('/');
            if (0 === h.length) throw new Error('Invalid number skeleton');
            for (var i = h[0], s = h.slice(1), a = 0, o = s; a < o.length; a++)
              if (0 === o[a].length) throw new Error('Invalid number skeleton');
            r.push({ stem: i, options: s });
          }
          return r;
        })(t);
      } catch (t) {
        return this.error(h.INVALID_NUMBER_SKELETON, r);
      }
      return {
        val: { type: s.number, tokens: n, location: r, parsedOptions: this.shouldParseSkeletons ? L(n) : {} },
        err: null,
      };
    }),
    (t.prototype.tryParsePluralOrSelectOptions = function (t, r, n, e) {
      for (var i, s = !1, a = [], o = new Set(), u = e.value, c = e.location; ; ) {
        if (0 === u.length) {
          var f = this.clonePosition();
          if ('select' === r || !this.bumpIf('=')) break;
          var l = this.tryParseDecimalInteger(h.EXPECT_PLURAL_ARGUMENT_SELECTOR, h.INVALID_PLURAL_ARGUMENT_SELECTOR);
          if (l.err) return l;
          (c = k(f, this.clonePosition())), (u = this.message.slice(f.offset, this.offset()));
        }
        if (o.has(u))
          return this.error(
            'select' === r ? h.DUPLICATE_SELECT_ARGUMENT_SELECTOR : h.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,
            c,
          );
        'other' === u && (s = !0), this.bumpSpace();
        var H = this.clonePosition();
        if (!this.bumpIf('{'))
          return this.error(
            'select' === r ? h.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : h.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,
            k(this.clonePosition(), this.clonePosition()),
          );
        var B = this.parseMessage(t + 1, r, n);
        if (B.err) return B;
        var b = this.tryParseArgumentClose(H);
        if (b.err) return b;
        a.push([u, { value: B.val, location: k(H, this.clonePosition()) }]),
          o.add(u),
          this.bumpSpace(),
          (u = (i = this.parseIdentifierIfPossible()).value),
          (c = i.location);
      }
      return 0 === a.length
        ? this.error(
            'select' === r ? h.EXPECT_SELECT_ARGUMENT_SELECTOR : h.EXPECT_PLURAL_ARGUMENT_SELECTOR,
            k(this.clonePosition(), this.clonePosition()),
          )
        : this.requiresOtherClause && !s
        ? this.error(h.MISSING_OTHER_CLAUSE, k(this.clonePosition(), this.clonePosition()))
        : { val: a, err: null };
    }),
    (t.prototype.tryParseDecimalInteger = function (t, r) {
      var n = 1,
        e = this.clonePosition();
      this.bumpIf('+') || (this.bumpIf('-') && (n = -1));
      for (var h = !1, i = 0; !this.isEOF(); ) {
        var s = this.char();
        if (!(s >= 48 && s <= 57)) break;
        (h = !0), (i = 10 * i + (s - 48)), this.bump();
      }
      var a = k(e, this.clonePosition());
      return h ? (x((i *= n)) ? { val: i, err: null } : this.error(r, a)) : this.error(t, a);
    }),
    (t.prototype.offset = function () {
      return this.position.offset;
    }),
    (t.prototype.isEOF = function () {
      return this.offset() === this.message.length;
    }),
    (t.prototype.clonePosition = function () {
      return { offset: this.position.offset, line: this.position.line, column: this.position.column };
    }),
    (t.prototype.char = function () {
      var t = this.position.offset;
      if (t >= this.message.length) throw Error('out of bound');
      var r = Q(this.message, t);
      if (void 0 === r) throw Error('Offset '.concat(t, ' is at invalid UTF-16 code unit boundary'));
      return r;
    }),
    (t.prototype.error = function (t, r) {
      return { val: null, err: { kind: t, message: this.message, location: r } };
    }),
    (t.prototype.bump = function () {
      if (!this.isEOF()) {
        var t = this.char();
        10 === t
          ? ((this.position.line += 1), (this.position.column = 1), (this.position.offset += 1))
          : ((this.position.column += 1), (this.position.offset += t < 65536 ? 1 : 2));
      }
    }),
    (t.prototype.bumpIf = function (t) {
      if (W(this.message, t, this.offset())) {
        for (var r = 0; r < t.length; r++) this.bump();
        return !0;
      }
      return !1;
    }),
    (t.prototype.bumpUntil = function (t) {
      var r = this.offset(),
        n = this.message.indexOf(t, r);
      return n >= 0 ? (this.bumpTo(n), !0) : (this.bumpTo(this.message.length), !1);
    }),
    (t.prototype.bumpTo = function (t) {
      if (this.offset() > t)
        throw Error(
          'targetOffset '.concat(t, ' must be greater than or equal to the current offset ').concat(this.offset()),
        );
      for (t = Math.min(t, this.message.length); ; ) {
        var r = this.offset();
        if (r === t) break;
        if (r > t) throw Error('targetOffset '.concat(t, ' is at invalid UTF-16 code unit boundary'));
        if ((this.bump(), this.isEOF())) break;
      }
    }),
    (t.prototype.bumpSpace = function () {
      for (; !this.isEOF() && ht(this.char()); ) this.bump();
    }),
    (t.prototype.peek = function () {
      if (this.isEOF()) return null;
      var t = this.char(),
        r = this.offset(),
        n = this.message.charCodeAt(r + (t >= 65536 ? 2 : 1));
      return null != n ? n : null;
    }),
    t
  );
})();
function et(t) {
  return (t >= 97 && t <= 122) || (t >= 65 && t <= 90);
}
function ht(t) {
  return (t >= 9 && t <= 13) || 32 === t || 133 === t || (t >= 8206 && t <= 8207) || 8232 === t || 8233 === t;
}
function it(t) {
  return (
    (t >= 33 && t <= 35) ||
    36 === t ||
    (t >= 37 && t <= 39) ||
    40 === t ||
    41 === t ||
    42 === t ||
    43 === t ||
    44 === t ||
    45 === t ||
    (t >= 46 && t <= 47) ||
    (t >= 58 && t <= 59) ||
    (t >= 60 && t <= 62) ||
    (t >= 63 && t <= 64) ||
    91 === t ||
    92 === t ||
    93 === t ||
    94 === t ||
    96 === t ||
    123 === t ||
    124 === t ||
    125 === t ||
    126 === t ||
    161 === t ||
    (t >= 162 && t <= 165) ||
    166 === t ||
    167 === t ||
    169 === t ||
    171 === t ||
    172 === t ||
    174 === t ||
    176 === t ||
    177 === t ||
    182 === t ||
    187 === t ||
    191 === t ||
    215 === t ||
    247 === t ||
    (t >= 8208 && t <= 8213) ||
    (t >= 8214 && t <= 8215) ||
    8216 === t ||
    8217 === t ||
    8218 === t ||
    (t >= 8219 && t <= 8220) ||
    8221 === t ||
    8222 === t ||
    8223 === t ||
    (t >= 8224 && t <= 8231) ||
    (t >= 8240 && t <= 8248) ||
    8249 === t ||
    8250 === t ||
    (t >= 8251 && t <= 8254) ||
    (t >= 8257 && t <= 8259) ||
    8260 === t ||
    8261 === t ||
    8262 === t ||
    (t >= 8263 && t <= 8273) ||
    8274 === t ||
    8275 === t ||
    (t >= 8277 && t <= 8286) ||
    (t >= 8592 && t <= 8596) ||
    (t >= 8597 && t <= 8601) ||
    (t >= 8602 && t <= 8603) ||
    (t >= 8604 && t <= 8607) ||
    8608 === t ||
    (t >= 8609 && t <= 8610) ||
    8611 === t ||
    (t >= 8612 && t <= 8613) ||
    8614 === t ||
    (t >= 8615 && t <= 8621) ||
    8622 === t ||
    (t >= 8623 && t <= 8653) ||
    (t >= 8654 && t <= 8655) ||
    (t >= 8656 && t <= 8657) ||
    8658 === t ||
    8659 === t ||
    8660 === t ||
    (t >= 8661 && t <= 8691) ||
    (t >= 8692 && t <= 8959) ||
    (t >= 8960 && t <= 8967) ||
    8968 === t ||
    8969 === t ||
    8970 === t ||
    8971 === t ||
    (t >= 8972 && t <= 8991) ||
    (t >= 8992 && t <= 8993) ||
    (t >= 8994 && t <= 9e3) ||
    9001 === t ||
    9002 === t ||
    (t >= 9003 && t <= 9083) ||
    9084 === t ||
    (t >= 9085 && t <= 9114) ||
    (t >= 9115 && t <= 9139) ||
    (t >= 9140 && t <= 9179) ||
    (t >= 9180 && t <= 9185) ||
    (t >= 9186 && t <= 9254) ||
    (t >= 9255 && t <= 9279) ||
    (t >= 9280 && t <= 9290) ||
    (t >= 9291 && t <= 9311) ||
    (t >= 9472 && t <= 9654) ||
    9655 === t ||
    (t >= 9656 && t <= 9664) ||
    9665 === t ||
    (t >= 9666 && t <= 9719) ||
    (t >= 9720 && t <= 9727) ||
    (t >= 9728 && t <= 9838) ||
    9839 === t ||
    (t >= 9840 && t <= 10087) ||
    10088 === t ||
    10089 === t ||
    10090 === t ||
    10091 === t ||
    10092 === t ||
    10093 === t ||
    10094 === t ||
    10095 === t ||
    10096 === t ||
    10097 === t ||
    10098 === t ||
    10099 === t ||
    10100 === t ||
    10101 === t ||
    (t >= 10132 && t <= 10175) ||
    (t >= 10176 && t <= 10180) ||
    10181 === t ||
    10182 === t ||
    (t >= 10183 && t <= 10213) ||
    10214 === t ||
    10215 === t ||
    10216 === t ||
    10217 === t ||
    10218 === t ||
    10219 === t ||
    10220 === t ||
    10221 === t ||
    10222 === t ||
    10223 === t ||
    (t >= 10224 && t <= 10239) ||
    (t >= 10240 && t <= 10495) ||
    (t >= 10496 && t <= 10626) ||
    10627 === t ||
    10628 === t ||
    10629 === t ||
    10630 === t ||
    10631 === t ||
    10632 === t ||
    10633 === t ||
    10634 === t ||
    10635 === t ||
    10636 === t ||
    10637 === t ||
    10638 === t ||
    10639 === t ||
    10640 === t ||
    10641 === t ||
    10642 === t ||
    10643 === t ||
    10644 === t ||
    10645 === t ||
    10646 === t ||
    10647 === t ||
    10648 === t ||
    (t >= 10649 && t <= 10711) ||
    10712 === t ||
    10713 === t ||
    10714 === t ||
    10715 === t ||
    (t >= 10716 && t <= 10747) ||
    10748 === t ||
    10749 === t ||
    (t >= 10750 && t <= 11007) ||
    (t >= 11008 && t <= 11055) ||
    (t >= 11056 && t <= 11076) ||
    (t >= 11077 && t <= 11078) ||
    (t >= 11079 && t <= 11084) ||
    (t >= 11085 && t <= 11123) ||
    (t >= 11124 && t <= 11125) ||
    (t >= 11126 && t <= 11157) ||
    11158 === t ||
    (t >= 11159 && t <= 11263) ||
    (t >= 11776 && t <= 11777) ||
    11778 === t ||
    11779 === t ||
    11780 === t ||
    11781 === t ||
    (t >= 11782 && t <= 11784) ||
    11785 === t ||
    11786 === t ||
    11787 === t ||
    11788 === t ||
    11789 === t ||
    (t >= 11790 && t <= 11798) ||
    11799 === t ||
    (t >= 11800 && t <= 11801) ||
    11802 === t ||
    11803 === t ||
    11804 === t ||
    11805 === t ||
    (t >= 11806 && t <= 11807) ||
    11808 === t ||
    11809 === t ||
    11810 === t ||
    11811 === t ||
    11812 === t ||
    11813 === t ||
    11814 === t ||
    11815 === t ||
    11816 === t ||
    11817 === t ||
    (t >= 11818 && t <= 11822) ||
    11823 === t ||
    (t >= 11824 && t <= 11833) ||
    (t >= 11834 && t <= 11835) ||
    (t >= 11836 && t <= 11839) ||
    11840 === t ||
    11841 === t ||
    11842 === t ||
    (t >= 11843 && t <= 11855) ||
    (t >= 11856 && t <= 11857) ||
    11858 === t ||
    (t >= 11859 && t <= 11903) ||
    (t >= 12289 && t <= 12291) ||
    12296 === t ||
    12297 === t ||
    12298 === t ||
    12299 === t ||
    12300 === t ||
    12301 === t ||
    12302 === t ||
    12303 === t ||
    12304 === t ||
    12305 === t ||
    (t >= 12306 && t <= 12307) ||
    12308 === t ||
    12309 === t ||
    12310 === t ||
    12311 === t ||
    12312 === t ||
    12313 === t ||
    12314 === t ||
    12315 === t ||
    12316 === t ||
    12317 === t ||
    (t >= 12318 && t <= 12319) ||
    12320 === t ||
    12336 === t ||
    64830 === t ||
    64831 === t ||
    (t >= 65093 && t <= 65094)
  );
}
function st(t) {
  t.forEach(function (t) {
    if ((delete t.location, B(t) || b(t)))
      for (var r in t.options) delete t.options[r].location, st(t.options[r].value);
    else (f(t) && E(t.style)) || ((l(t) || H(t)) && d(t.style)) ? delete t.style.location : p(t) && st(t.children);
  });
}
function at(t, r) {
  void 0 === r && (r = {}), (r = a({ shouldParseSkeletons: !0, requiresOtherClause: !0 }, r));
  var n = new nt(t, r).parse();
  if (n.err) {
    var e = SyntaxError(h[n.err.kind]);
    throw ((e.location = n.err.location), (e.originalMessage = n.err.message), e);
  }
  return (null == r ? void 0 : r.captureLocation) || st(n.val), n.val;
}
function ot(t, r) {
  return (r && r.strategy ? r.strategy : lt)(t, {
    cache: r && r.cache ? r.cache : vt,
    serializer: r && r.serializer ? r.serializer : Ht,
  });
}
function ut(t, r, n, e) {
  var h,
    i = null == (h = e) || 'number' == typeof h || 'boolean' == typeof h ? e : n(e),
    s = r.get(i);
  return void 0 === s && ((s = t.call(this, e)), r.set(i, s)), s;
}
function ct(t, r, n) {
  var e = Array.prototype.slice.call(arguments, 3),
    h = n(e),
    i = r.get(h);
  return void 0 === i && ((i = t.apply(this, e)), r.set(h, i)), i;
}
function ft(t, r, n, e, h) {
  return n.bind(r, t, e, h);
}
function lt(t, r) {
  return ft(t, this, 1 === t.length ? ut : ct, r.cache.create(), r.serializer);
}
var Ht = function () {
  return JSON.stringify(arguments);
};
function Bt() {
  this.cache = Object.create(null);
}
(Bt.prototype.get = function (t) {
  return this.cache[t];
}),
  (Bt.prototype.set = function (t, r) {
    this.cache[t] = r;
  });
var bt,
  vt = {
    create: function () {
      return new Bt();
    },
  },
  pt = {
    variadic: function (t, r) {
      return ft(t, this, ct, r.cache.create(), r.serializer);
    },
    monadic: function (t, r) {
      return ft(t, this, ut, r.cache.create(), r.serializer);
    },
  };
!(function (t) {
  (t.MISSING_VALUE = 'MISSING_VALUE'), (t.INVALID_VALUE = 'INVALID_VALUE'), (t.MISSING_INTL_API = 'MISSING_INTL_API');
})(bt || (bt = {}));
var Et,
  dt = (function (t) {
    function r(r, n, e) {
      var h = t.call(this, r) || this;
      return (h.code = n), (h.originalMessage = e), h;
    }
    return (
      e(r, t),
      (r.prototype.toString = function () {
        return '[formatjs Error: '.concat(this.code, '] ').concat(this.message);
      }),
      r
    );
  })(Error),
  gt = (function (t) {
    function r(r, n, e, h) {
      return (
        t.call(
          this,
          'Invalid values for "'
            .concat(r, '": "')
            .concat(n, '". Options are "')
            .concat(Object.keys(e).join('", "'), '"'),
          bt.INVALID_VALUE,
          h,
        ) || this
      );
    }
    return e(r, t), r;
  })(dt),
  yt = (function (t) {
    function r(r, n, e) {
      return t.call(this, 'Value for "'.concat(r, '" must be of type ').concat(n), bt.INVALID_VALUE, e) || this;
    }
    return e(r, t), r;
  })(dt),
  mt = (function (t) {
    function r(r, n) {
      return (
        t.call(
          this,
          'The intl string context variable "'.concat(r, '" was not provided to the string "').concat(n, '"'),
          bt.MISSING_VALUE,
          n,
        ) || this
      );
    }
    return e(r, t), r;
  })(dt);
function wt(t) {
  return 'function' == typeof t;
}
function Tt(t, r, n, e, h, i, s) {
  if (1 === t.length && u(t[0])) return [{ type: Et.literal, value: t[0].value }];
  for (var a = [], o = 0, g = t; o < g.length; o++) {
    var y = g[o];
    if (u(y)) a.push({ type: Et.literal, value: y.value });
    else if (v(y)) 'number' == typeof i && a.push({ type: Et.literal, value: n.getNumberFormat(r).format(i) });
    else {
      var m = y.value;
      if (!h || !(m in h)) throw new mt(m, s);
      var w = h[m];
      if (c(y))
        (w && 'string' != typeof w && 'number' != typeof w) ||
          (w = 'string' == typeof w || 'number' == typeof w ? String(w) : ''),
          a.push({ type: 'string' == typeof w ? Et.literal : Et.object, value: w });
      else if (l(y)) {
        var T = 'string' == typeof y.style ? e.date[y.style] : d(y.style) ? y.style.parsedOptions : void 0;
        a.push({ type: Et.literal, value: n.getDateTimeFormat(r, T).format(w) });
      } else if (H(y))
        (T = 'string' == typeof y.style ? e.time[y.style] : d(y.style) ? y.style.parsedOptions : e.time.medium),
          a.push({ type: Et.literal, value: n.getDateTimeFormat(r, T).format(w) });
      else if (f(y))
        (T = 'string' == typeof y.style ? e.number[y.style] : E(y.style) ? y.style.parsedOptions : void 0) &&
          T.scale &&
          (w *= T.scale || 1),
          a.push({ type: Et.literal, value: n.getNumberFormat(r, T).format(w) });
      else {
        if (p(y)) {
          var A = y.children,
            S = y.value,
            _ = h[S];
          if (!wt(_)) throw new yt(S, 'function', s);
          var N = _(
            Tt(A, r, n, e, h, i).map(function (t) {
              return t.value;
            }),
          );
          Array.isArray(N) || (N = [N]),
            a.push.apply(
              a,
              N.map(function (t) {
                return { type: 'string' == typeof t ? Et.literal : Et.object, value: t };
              }),
            );
        }
        if (B(y)) {
          if (!(I = y.options[w] || y.options.other)) throw new gt(y.value, w, Object.keys(y.options), s);
          a.push.apply(a, Tt(I.value, r, n, e, h));
        } else if (b(y)) {
          var I;
          if (!(I = y.options['='.concat(w)])) {
            if (!Intl.PluralRules)
              throw new dt(
                'Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n',
                bt.MISSING_INTL_API,
                s,
              );
            var R = n.getPluralRules(r, { type: y.pluralType }).select(w - (y.offset || 0));
            I = y.options[R] || y.options.other;
          }
          if (!I) throw new gt(y.value, w, Object.keys(y.options), s);
          a.push.apply(a, Tt(I.value, r, n, e, h, w - (y.offset || 0)));
        }
      }
    }
  }
  return (M = a).length < 2
    ? M
    : M.reduce(function (t, r) {
        var n = t[t.length - 1];
        return n && n.type === Et.literal && r.type === Et.literal ? (n.value += r.value) : t.push(r), t;
      }, []);
  var M;
}
function At(t) {
  return {
    create: function () {
      return {
        get: function (r) {
          return t[r];
        },
        set: function (r, n) {
          t[r] = n;
        },
      };
    },
  };
}
!(function (t) {
  (t[(t.literal = 0)] = 'literal'), (t[(t.object = 1)] = 'object');
})(Et || (Et = {}));
var St = (function () {
  function t(r, n, e, h) {
    void 0 === n && (n = t.defaultLocale);
    var i,
      s,
      u,
      c = this;
    if (
      ((this.formatterCache = { number: {}, dateTime: {}, pluralRules: {} }),
      (this.format = function (t) {
        var r = c.formatToParts(t);
        if (1 === r.length) return r[0].value;
        var n = r.reduce(function (t, r) {
          return (
            t.length && r.type === Et.literal && 'string' == typeof t[t.length - 1]
              ? (t[t.length - 1] += r.value)
              : t.push(r.value),
            t
          );
        }, []);
        return n.length <= 1 ? n[0] || '' : n;
      }),
      (this.formatToParts = function (t) {
        return Tt(c.ast, c.locales, c.formatters, c.formats, t, void 0, c.message);
      }),
      (this.resolvedOptions = function () {
        var t;
        return {
          locale:
            (null === (t = c.resolvedLocale) || void 0 === t ? void 0 : t.toString()) ||
            Intl.NumberFormat.supportedLocalesOf(c.locales)[0],
        };
      }),
      (this.getAst = function () {
        return c.ast;
      }),
      (this.locales = n),
      (this.resolvedLocale = t.resolveLocale(n)),
      'string' == typeof r)
    ) {
      if (((this.message = r), !t.__parse))
        throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
      var f = (function (t, r) {
        var n = {};
        for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && r.indexOf(e) < 0 && (n[e] = t[e]);
        if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
          var h = 0;
          for (e = Object.getOwnPropertySymbols(t); h < e.length; h++)
            r.indexOf(e[h]) < 0 && Object.prototype.propertyIsEnumerable.call(t, e[h]) && (n[e[h]] = t[e[h]]);
        }
        return n;
      })(h || {}, ['formatters']);
      this.ast = t.__parse(r, a(a({}, f), { locale: this.resolvedLocale }));
    } else this.ast = r;
    if (!Array.isArray(this.ast)) throw new TypeError('A message must be provided as a String or AST.');
    (this.formats =
      ((s = t.formats),
      (u = e)
        ? Object.keys(s).reduce(
            function (t, r) {
              var n, e;
              return (
                (t[r] =
                  ((n = s[r]),
                  (e = u[r])
                    ? a(
                        a(a({}, n || {}), e || {}),
                        Object.keys(n).reduce(function (t, r) {
                          return (t[r] = a(a({}, n[r]), e[r] || {})), t;
                        }, {}),
                      )
                    : n)),
                t
              );
            },
            a({}, s),
          )
        : s)),
      (this.formatters =
        (h && h.formatters) ||
        (void 0 === (i = this.formatterCache) && (i = { number: {}, dateTime: {}, pluralRules: {} }),
        {
          getNumberFormat: ot(
            function () {
              for (var t, r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
              return new ((t = Intl.NumberFormat).bind.apply(t, o([void 0], r, !1)))();
            },
            { cache: At(i.number), strategy: pt.variadic },
          ),
          getDateTimeFormat: ot(
            function () {
              for (var t, r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
              return new ((t = Intl.DateTimeFormat).bind.apply(t, o([void 0], r, !1)))();
            },
            { cache: At(i.dateTime), strategy: pt.variadic },
          ),
          getPluralRules: ot(
            function () {
              for (var t, r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
              return new ((t = Intl.PluralRules).bind.apply(t, o([void 0], r, !1)))();
            },
            { cache: At(i.pluralRules), strategy: pt.variadic },
          ),
        }));
  }
  return (
    Object.defineProperty(t, 'defaultLocale', {
      get: function () {
        return (
          t.memoizedDefaultLocale || (t.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale),
          t.memoizedDefaultLocale
        );
      },
      enumerable: !1,
      configurable: !0,
    }),
    (t.memoizedDefaultLocale = null),
    (t.resolveLocale = function (t) {
      if (void 0 !== Intl.Locale) {
        var r = Intl.NumberFormat.supportedLocalesOf(t);
        return r.length > 0 ? new Intl.Locale(r[0]) : new Intl.Locale('string' == typeof t ? t : t[0]);
      }
    }),
    (t.__parse = at),
    (t.formats = {
      number: { integer: { maximumFractionDigits: 0 }, currency: { style: 'currency' }, percent: { style: 'percent' } },
      date: {
        short: { month: 'numeric', day: 'numeric', year: '2-digit' },
        medium: { month: 'short', day: 'numeric', year: 'numeric' },
        long: { month: 'long', day: 'numeric', year: 'numeric' },
        full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
      },
      time: {
        short: { hour: 'numeric', minute: 'numeric' },
        medium: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
        long: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' },
        full: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' },
      },
    }),
    t
  );
})();
const _t = {},
  Nt = [
    'ar',
    'cs',
    'da',
    'de',
    'en',
    'es-es',
    'es',
    'fi',
    'fr-ca',
    'fr',
    'he',
    'it',
    'ja',
    'ko',
    'nl',
    'no',
    'pl',
    'pt-br',
    'pt-pt',
    'ru',
    'sv',
    'th',
    'tr',
    'uk',
    'zh-cn',
    'zh-tw',
  ],
  It = {
    ar: 6,
    cs: 1,
    da: 1,
    de: 1,
    en: 0,
    'es-es': 1,
    es: 1,
    fi: 1,
    'fr-ca': 0,
    fr: 1,
    he: 0,
    it: 1,
    ja: 0,
    ko: 0,
    nl: 1,
    no: 1,
    pl: 1,
    'pt-br': 0,
    'pt-pt': 0,
    ru: 1,
    sv: 1,
    th: 0,
    tr: 1,
    uk: 1,
    'zh-cn': 1,
    'zh-tw': 0,
  },
  Rt = 'en';
async function Mt(r, n, e) {
  let h = n,
    i = 'en';
  void 0 !== r &&
    ((i = Lt(r)),
    (h = await (async function (r, n, e, h) {
      const i = h || r.tagName.toLocaleLowerCase().replace(/-beta$/, '');
      let s;
      if (r['i18n-resources']) s = r['i18n-resources'];
      else if (e !== Rt)
        try {
          s = await (async (r, n) => {
            if (!_t[n]) {
              const r = ((r = 'en') => t(`i18n/genesys-webcomponents.i18n.${r}.json`))(n),
                e = await fetch(r),
                h = await e.json();
              _t[n] = h;
            }
            return _t[n][r];
          })(i, e);
        } catch (t) {
          s = null;
        }
      return s || (s = n), s;
    })(r, n, i, e)));
  const s = Object.entries(h).reduce((t, [r, n]) => (t.set(r, new St(n, i)), t), new Map()),
    a = Object.entries(n).reduce((t, [r, n]) => (t.set(r, new St(n, Rt)), t), new Map());
  return (t, r) => {
    var n, e;
    let h = null === (n = s.get(t)) || void 0 === n ? void 0 : n.format(r);
    return (
      h ||
        ((h = null === (e = a.get(t)) || void 0 === e ? void 0 : e.format(r)),
        console.warn(
          `No localized string available for "${t}-${h}" for "${i}" locale. Falling back to English translation.`,
        )),
      h
    );
  };
}
function Lt(t) {
  const n = (function (t) {
      const n = r('[lang]', t);
      return n && n.lang ? n.lang.toLowerCase() : Rt;
    })(t),
    e = n.split(/[_-]/)[0];
  return Nt.indexOf(n) >= 0 ? n : Nt.indexOf(e) >= 0 ? e : Rt;
}
function Ct(t = Rt) {
  return It[t] ? It[t] : It[Rt];
}
export { Ct as a, Mt as b, Lt as g, Nt as l };
