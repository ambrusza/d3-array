import ascending from "./ascending.js";

export default function(f) {
  let compareNum = f,
    compare = f;
  if (f.length === 1) {
    compareNum = (d, x) => f(d) - x;
    compare = ascendingComparator(f);
  }
  return { left, center, right };

  function left (a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
      var mid = (lo + hi) >>> 1;
      if (compare(a[mid], x) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  
  function right(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
      var mid = (lo + hi) >>> 1;
      if (compare(a[mid], x) > 0) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  }

  function center(a, x) {
    const i = left(a, x, 1),
      v = a[i - 1],
      w = a[i];
    return compareNum(w, x) >= -compareNum(v, x) ? v : w;
  }
}

function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}
