"use strict";

// (a, y, c, l, h) = (array, y[, cmp, lo, hi])

function ge(a, y, c, l, h) {
  var i = h + 1;
  while (l <= h) {
    var m = (l + h) >>> 1,
      x = a[m];
    var p = c !== undefined ? c(x, y) : x - y;
    if (p >= 0) {
      i = m;
      h = m - 1;
    } else {
      l = m + 1;
    }
  }
  return i;
}

function gt(a, y, c, l, h) {
  var i = h + 1;
  while (l <= h) {
    var m = (l + h) >>> 1,
      x = a[m];
    var p = c !== undefined ? c(x, y) : x - y;
    if (p > 0) {
      i = m;
      h = m - 1;
    } else {
      l = m + 1;
    }
  }
  return i;
}

function lt(a, y, c, l, h) {
  var i = l - 1;
  while (l <= h) {
    var m = (l + h) >>> 1,
      x = a[m];
    var p = c !== undefined ? c(x, y) : x - y;
    if (p < 0) {
      i = m;
      l = m + 1;
    } else {
      h = m - 1;
    }
  }
  return i;
}

function le(a, y, c, l, h) {
  var i = l - 1;
  while (l <= h) {
    var m = (l + h) >>> 1,
      x = a[m];
    var p = c !== undefined ? c(x, y) : x - y;
    if (p <= 0) {
      i = m;
      l = m + 1;
    } else {
      h = m - 1;
    }
  }
  return i;
}

function eq(a, y, c, l, h) {
  while (l <= h) {
    var m = (l + h) >>> 1,
      x = a[m];
    var p = c !== undefined ? c(x, y) : x - y;
    if (p === 0) {
      return m;
    }
    if (p <= 0) {
      l = m + 1;
    } else {
      h = m - 1;
    }
  }
  return -1;
}

function norm(a, y, c, l, h, f) {
  if (typeof c === "function") {
    return f(
      a,
      y,
      c,
      l === undefined ? 0 : l | 0,
      h === undefined ? a.length - 1 : h | 0
    );
  }
  return f(
    a,
    y,
    undefined,
    c === undefined ? 0 : c | 0,
    l === undefined ? a.length - 1 : l | 0
  );
}

module.exports = {
  ge: function (a, y, c, l, h) {
    return norm(a, y, c, l, h, ge);
  },
  gt: function (a, y, c, l, h) {
    return norm(a, y, c, l, h, gt);
  },
  lt: function (a, y, c, l, h) {
    return norm(a, y, c, l, h, lt);
  },
  le: function (a, y, c, l, h) {
    return norm(a, y, c, l, h, le);
  },
  eq: function (a, y, c, l, h) {
    return norm(a, y, c, l, h, eq);
  },
};
