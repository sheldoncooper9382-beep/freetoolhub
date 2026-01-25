(() => {
  const $ = (id) => document.getElementById(id);

  const els = {
    unit: $("unit"),
    rootSize: $("rootSize"),
    rootReset: $("rootReset"),

    minVw: $("minVw"),
    maxVw: $("maxVw"),
    minSize: $("minSize"),
    maxSize: $("maxSize"),

    minVwRange: $("minVwRange"),
    maxVwRange: $("maxVwRange"),
    minSizeRange: $("minSizeRange"),
    maxSizeRange: $("maxSizeRange"),

    precision: $("precision"),

    sampleText: $("sampleText"),
    metaLine: $("metaLine"),
    cssOut: $("cssOut"),

    copyBtn: $("copyBtn"),
    copyCssBtn: $("copyCssBtn"),
    copyValueBtn: $("copyValueBtn"),
    swapBtn: $("swapBtn"),
    status: $("status"),
  };

  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

  function toNum(v, fallback = 0) {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  }

  function fmt(n, p) {
    // avoid "-0"
    const x = Math.abs(n) < 1e-12 ? 0 : n;
    return Number(x.toFixed(p)).toString();
  }

  function syncPair(numberEl, rangeEl, min, max) {
    const n = clamp(toNum(numberEl.value, toNum(rangeEl.value, min)), min, max);
    numberEl.value = n;
    rangeEl.value = n;
  }

  function validateAndNormalize() {
    // keep ranges in reasonable bounds
    syncPair(els.minVw, els.minVwRange, 200, 1920);
    syncPair(els.maxVw, els.maxVwRange, 320, 2560);
    syncPair(els.minSize, els.minSizeRange, 0, 200);
    syncPair(els.maxSize, els.maxSizeRange, 0, 240);

    let minVw = toNum(els.minVw.value, 360);
    let maxVw = toNum(els.maxVw.value, 1200);

    // ensure maxVw > minVw
    if (maxVw <= minVw) {
      maxVw = minVw + 1;
      els.maxVw.value = maxVw;
      els.maxVwRange.value = maxVw;
    }

    let minSize = toNum(els.minSize.value, 16);
    let maxSize = toNum(els.maxSize.value, 32);

    // allow equal, but if inverted fix
    if (maxSize < minSize) {
      const tmp = minSize;
      minSize = maxSize;
      maxSize = tmp;
      els.minSize.value = minSize;
      els.maxSize.value = maxSize;
      els.minSizeRange.value = minSize;
      els.maxSizeRange.value = maxSize;
    }

    const root = clamp(toNum(els.rootSize.value, 16), 1, 200);
    els.rootSize.value = root;

    const precision = clamp(toNum(els.precision.value, 2), 0, 6);

    return { minVw, maxVw, minSize, maxSize, root, precision, unit: els.unit.value };
  }

  function buildClamp({ minVw, maxVw, minSize, maxSize, root, precision, unit }) {
    const sizeDelta = maxSize - minSize;
    const vwDelta = maxVw - minVw;

    const slope = (sizeDelta / vwDelta) * 100; // px per vw
    const intercept = minSize - (slope * minVw) / 100; // px

    // output formatting
    const minOut = unit === "rem" ? minSize / root : minSize;
    const maxOut = unit === "rem" ? maxSize / root : maxSize;

    const interceptOut = unit === "rem" ? intercept / root : intercept;

    const minStr = `${fmt(minOut, precision)}${unit}`;
    const maxStr = `${fmt(maxOut, precision)}${unit}`;

    // preferred is: (intercept) + (slope)vw
    // Keep slope as vw always; intercept uses selected unit.
    const preferred = `${fmt(interceptOut, precision)}${unit} + ${fmt(slope, precision)}vw`;

    const value = `clamp(${minStr}, calc(${preferred}), ${maxStr})`;

    return {
      value,
      slope,
      intercept,
      minStr,
      maxStr,
      preferred,
      interceptOut,
    };
  }

  function render() {
    const state = validateAndNormalize();
    const res = buildCla
