(() => {
  'use strict';
  // State definition with defaults
  const state = {
    text: 'Text FX',
    fontSize: 96,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: 0,
    outlineSize: 3,
    shadowBlur: 20,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shineIntensity: 0.5,
    bevelDepth: 0.5,
    edgeSoftness: 0.5,
    distortionAmount: 0,
    textureAmount: 0.3,
    glowStrength: 0.5,
    backgroundTransparent: false,
    lowPowerMode: false,
    preset: 'liquidChrome'
  };

  /**
   * Definition of presets. Each preset defines parameters used for rendering.
   * gradient: array of color strings or stop objects { color, pos }
   * outlineColor: color used for stroke
   * shadowColor: color used for glow/shadow
   * pattern: type of pattern to overlay inside text
   * extra: overrides for other state properties
   */
  const presets = [
    {
      id: 'liquidChrome',
      name: 'Liquid Chrome',
      gradient: [
        { color: '#0c0c0c', pos: 0.0 },
        { color: '#1a1a1a', pos: 0.2 },
        { color: '#444', pos: 0.35 },
        { color: '#9daec2', pos: 0.5 },
        { color: '#fff', pos: 0.6 },
        { color: '#9daec2', pos: 0.7 },
        { color: '#444', pos: 0.85 },
        { color: '#1a1a1a', pos: 0.95 },
        { color: '#0c0c0c', pos: 1.0 }
      ],
      outlineColor: '#dfe5ef',
      shadowColor: 'rgba(255,255,255,0.2)',
      pattern: null,
      extra: {
        shineIntensity: 0.7,
        bevelDepth: 0.6,
        glowStrength: 0.3
      }
    },
    {
      id: 'mirrorChrome',
      name: 'Mirror Chrome',
      gradient: [
        { color: '#101010', pos: 0.0 },
        { color: '#404040', pos: 0.25 },
        { color: '#b0b0b0', pos: 0.5 },
        { color: '#ffffff', pos: 0.6 },
        { color: '#b0b0b0', pos: 0.7 },
        { color: '#404040', pos: 0.85 },
        { color: '#101010', pos: 1.0 }
      ],
      outlineColor: '#e8ecf3',
      shadowColor: 'rgba(255,255,255,0.25)',
      pattern: null,
      extra: {
        shineIntensity: 0.8,
        bevelDepth: 0.5,
        glowStrength: 0.4
      }
    },
    {
      id: 'neonGlow',
      name: 'Neon Glow',
      gradient: [
        { color: '#00ffe0', pos: 0.0 },
        { color: '#00aaff', pos: 0.5 },
        { color: '#001eff', pos: 1.0 }
      ],
      outlineColor: '#00ffe0',
      shadowColor: 'rgba(0,255,255,0.7)',
      pattern: null,
      extra: {
        shineIntensity: 0.4,
        bevelDepth: 0.2,
        glowStrength: 1.0,
        shadowBlur: 40
      }
    },
    {
      id: 'frostedGlass',
      name: 'Frosted Glass',
      gradient: [
        { color: 'rgba(255,255,255,0.8)', pos: 0.0 },
        { color: 'rgba(200,220,255,0.5)', pos: 0.5 },
        { color: 'rgba(180,200,220,0.3)', pos: 1.0 }
      ],
      outlineColor: 'rgba(255,255,255,0.6)',
      shadowColor: 'rgba(255,255,255,0.3)',
      pattern: 'noise',
      extra: {
        shineIntensity: 0.2,
        bevelDepth: 0.1,
        glowStrength: 0.2
      }
    },
    {
      id: 'iceCrystal',
      name: 'Ice Crystal',
      gradient: [
        { color: '#a7cfff', pos: 0.0 },
        { color: '#d6eaff', pos: 0.5 },
        { color: '#f0f8ff', pos: 1.0 }
      ],
      outlineColor: '#e6f2ff',
      shadowColor: 'rgba(200,230,255,0.5)',
      pattern: 'noise',
      extra: {
        shineIntensity: 0.5,
        bevelDepth: 0.4,
        glowStrength: 0.4
      }
    },
    {
      id: 'waterRipple',
      name: 'Water Ripple',
      gradient: [
        { color: '#0040ff', pos: 0.0 },
        { color: '#0080ff', pos: 0.3 },
        { color: '#00b0ff', pos: 0.6 },
        { color: '#80d4ff', pos: 1.0 }
      ],
      outlineColor: '#b0d8ff',
      shadowColor: 'rgba(0,128,255,0.5)',
      pattern: 'noise',
      extra: {
        shineIntensity: 0.4,
        bevelDepth: 0.3,
        glowStrength: 0.3
      }
    },
    {
      id: 'brushedSteel',
      name: 'Brushed Steel',
      gradient: [
        { color: '#2b2b2b', pos: 0.0 },
        { color: '#555555', pos: 0.3 },
        { color: '#888888', pos: 0.5 },
        { color: '#bbbbbb', pos: 0.7 },
        { color: '#888888', pos: 1.0 }
      ],
      outlineColor: '#f5f5f5',
      shadowColor: 'rgba(200,200,200,0.3)',
      pattern: 'brushed',
      extra: {
        shineIntensity: 0.3,
        bevelDepth: 0.4,
        glowStrength: 0.2
      }
    },
    {
      id: 'diamondPlate',
      name: 'Diamond Plate',
      gradient: [
        { color: '#666666', pos: 0.0 },
        { color: '#888888', pos: 0.4 },
        { color: '#aaaaaa', pos: 0.6 },
        { color: '#888888', pos: 0.8 },
        { color: '#666666', pos: 1.0 }
      ],
      outlineColor: '#ffffff',
      shadowColor: 'rgba(255,255,255,0.2)',
      pattern: 'diamond',
      extra: {
        shineIntensity: 0.5,
        bevelDepth: 0.5,
        glowStrength: 0.3
      }
    },
    {
      id: 'holographic',
      name: 'Holographic',
      gradient: [
        { color: '#ff00ff', pos: 0.0 },
        { color: '#00ffff', pos: 0.25 },
        { color: '#ffdd00', pos: 0.5 },
        { color: '#00ff6a', pos: 0.75 },
        { color: '#ff00ff', pos: 1.0 }
      ],
      outlineColor: '#ffffff',
      shadowColor: 'rgba(255,255,255,0.4)',
      pattern: 'noise',
      extra: {
        shineIntensity: 0.6,
        bevelDepth: 0.5,
        glowStrength: 0.6
      }
    },
    {
      id: 'plasma',
      name: 'Plasma',
      gradient: [
        { color: '#6a00ff', pos: 0.0 },
        { color: '#ff007a', pos: 0.3 },
        { color: '#ffce00', pos: 0.6 },
        { color: '#00ffb3', pos: 1.0 }
      ],
      outlineColor: '#ffffff',
      shadowColor: 'rgba(255,255,255,0.6)',
      pattern: 'noise',
      extra: {
        shineIntensity: 0.7,
        bevelDepth: 0.4,
        glowStrength: 0.7
      }
    }
  ];

  // Grab DOM elements
  const canvas = document.getElementById('previewCanvas');
  const ctx = canvas.getContext('2d');
  const fpsCounter = document.getElementById('fpsCounter');
  const exportBtn = document.getElementById('exportBtn');
  const exportMenu = document.getElementById('exportMenu');
  const randomBtn = document.getElementById('randomBtn');
  const resetBtn = document.getElementById('resetBtn');
  const copyBtn = document.getElementById('copyBtn');
  const presetsGrid = document.getElementById('presetsGrid');
  const noiseOverlay = document.getElementById('noise-overlay');

  // Patterns cache
  let patternCache = {};

  /**
   * Generate a noise pattern canvas and return pattern.
   * @param {CanvasRenderingContext2D} context
   * @param {number} size
   */
  function createNoisePattern(context, size = 64) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const cx = c.getContext('2d');
    const img = cx.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    cx.putImageData(img, 0, 0);
    return context.createPattern(c, 'repeat');
  }

  /**
   * Generate a brushed metal pattern.
   * @param {CanvasRenderingContext2D} context
   */
  function createBrushedPattern(context) {
    const size = 64;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const cx = c.getContext('2d');
    cx.fillStyle = '#888';
    cx.fillRect(0, 0, size, size);
    cx.fillStyle = '#777';
    for (let y = 0; y < size; y += 2) {
      cx.fillRect(0, y, size, 1);
    }
    return context.createPattern(c, 'repeat');
  }

  /**
   * Generate a diamond plate pattern.
   * @param {CanvasRenderingContext2D} context
   */
  function createDiamondPattern(context) {
    const size = 64;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const cx = c.getContext('2d');
    cx.fillStyle = '#888';
    cx.fillRect(0, 0, size, size);
    cx.fillStyle = '#999';
    cx.strokeStyle = '#aaa';
    cx.lineWidth = 1;
    const diamondSize = 8;
    for (let y = -diamondSize; y < size + diamondSize; y += diamondSize) {
      for (let x = -diamondSize; x < size + diamondSize; x += diamondSize) {
        cx.save();
        cx.translate(x + diamondSize / 2, y + diamondSize / 2);
        cx.rotate(Math.PI / 4);
        cx.beginPath();
        cx.rect(-diamondSize / 2, -diamondSize / 4, diamondSize, diamondSize / 2);
        cx.closePath();
        cx.fill();
        cx.stroke();
        cx.restore();
      }
    }
    return context.createPattern(c, 'repeat');
  }

  /**
   * Build patterns cache on demand.
   * @param {string} type
   */
  function getPattern(type) {
    if (!type) return null;
    if (patternCache[type]) return patternCache[type];
    if (type === 'noise') {
      patternCache[type] = createNoisePattern(ctx);
    } else if (type === 'brushed') {
      patternCache[type] = createBrushedPattern(ctx);
    } else if (type === 'diamond') {
      patternCache[type] = createDiamondPattern(ctx);
    }
    return patternCache[type];
  }

  /**
   * Load saved state from localStorage.
   */
  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem('textFxState'));
      if (saved && typeof saved === 'object') {
        Object.assign(state, saved);
      }
    } catch (e) {
      // ignore
    }
  }

  /**
   * Save state to localStorage.
   */
  function saveState() {
    localStorage.setItem('textFxState', JSON.stringify(state));
  }

  /**
   * Apply state values to input controls.
   */
  function applyStateToControls() {
    document.getElementById('textInput').value = state.text;
    [
      'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'outlineSize',
      'shadowBlur', 'shadowOffsetX', 'shadowOffsetY', 'shineIntensity', 'bevelDepth',
      'edgeSoftness', 'distortionAmount', 'textureAmount', 'glowStrength'
    ].forEach(key => {
      const el = document.getElementById(key);
      if (el) el.value = state[key];
    });
    document.getElementById('transparentBg').checked = !!state.backgroundTransparent;
    document.getElementById('lowPower').checked = !!state.lowPowerMode;
  }

  /**
   * Update state when a control changes.
   * @param {string} key
   * @param {any} value
   */
  function updateState(key, value) {
    if (key in state) {
      state[key] = value;
      saveState();
      scheduleRender();
    }
  }

  /**
   * Build the presets grid UI and attach event listeners.
   */
  function buildPresets() {
    presetsGrid.innerHTML = '';
    presets.forEach(preset => {
      const card = document.createElement('div');
      card.className = 'preset-card';
      card.dataset.preset = preset.id;
      const thumbCanvas = document.createElement('canvas');
      thumbCanvas.width = 150;
      thumbCanvas.height = 100;
      card.appendChild(thumbCanvas);
      presetsGrid.appendChild(card);
      // Render thumbnail
      renderThumbnail(thumbCanvas.getContext('2d'), thumbCanvas.width, thumbCanvas.height, preset);
      card.addEventListener('click', () => {
        selectPreset(preset.id);
      });
    });
    highlightSelectedPreset();
  }

  /**
   * Highlight the currently selected preset card.
   */
  function highlightSelectedPreset() {
    const cards = presetsGrid.querySelectorAll('.preset-card');
    cards.forEach(card => {
      if (card.dataset.preset === state.preset) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  }

  /**
   * Select a preset by id and update state accordingly.
   * @param {string} id
   */
  function selectPreset(id) {
    const preset = presets.find(p => p.id === id);
    if (!preset) return;
    state.preset = id;
    // Merge preset extra parameters into state
    if (preset.extra) {
      Object.keys(preset.extra).forEach(key => {
        state[key] = preset.extra[key];
        const control = document.getElementById(key);
        if (control) control.value = preset.extra[key];
      });
    }
    highlightSelectedPreset();
    saveState();
    scheduleRender();
  }

  /**
   * Handle export menu toggle.
   */
  exportBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    exportMenu.classList.toggle('hidden');
  });

  // Hide export menu when clicking outside
  window.addEventListener('click', (e) => {
    if (!exportMenu.contains(e.target) && !exportBtn.contains(e.target)) {
      exportMenu.classList.add('hidden');
    }
  });

  /**
   * Handle export options
   */
  exportMenu.addEventListener('click', (e) => {
    const option = e.target.closest('.export-option');
    if (!option) return;
    const scale = parseFloat(option.dataset.scale || '1');
    const transparent = option.dataset.transparent === 'true';
    if (option.id === 'copyBtn') {
      copyToClipboard();
      exportMenu.classList.add('hidden');
      return;
    }
    downloadPNG(scale, transparent);
    exportMenu.classList.add('hidden');
  });

  /**
   * Randomize current state within tasteful bounds.
   */
  function randomize() {
    // Pick random preset
    const preset = presets[Math.floor(Math.random() * presets.length)];
    selectPreset(preset.id);
    // Randomize some parameters
    state.fontSize = Math.floor(Math.random() * 100) + 48;
    state.fontWeight = (Math.floor(Math.random() * 9) + 1) * 100;
    state.lineHeight = 1 + Math.random();
    state.letterSpacing = Math.floor(Math.random() * 20) - 5;
    state.outlineSize = Math.random() * 5;
    state.shadowBlur = Math.random() * 40;
    state.shadowOffsetX = Math.floor(Math.random() * 20) - 10;
    state.shadowOffsetY = Math.floor(Math.random() * 20) - 10;
    state.shineIntensity = Math.random();
    state.bevelDepth = Math.random();
    state.edgeSoftness = Math.random();
    state.distortionAmount = Math.random() * 0.5;
    state.textureAmount = Math.random();
    state.glowStrength = Math.random();
    state.backgroundTransparent = Math.random() < 0.5;
    applyStateToControls();
    saveState();
    scheduleRender();
  }

  /**
   * Reset to defaults and first preset.
   */
  function reset() {
    Object.assign(state, {
      text: 'Text FX',
      fontSize: 96,
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: 0,
      outlineSize: 3,
      shadowBlur: 20,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shineIntensity: 0.5,
      bevelDepth: 0.5,
      edgeSoftness: 0.5,
      distortionAmount: 0,
      textureAmount: 0.3,
      glowStrength: 0.5,
      backgroundTransparent: false,
      lowPowerMode: false,
      preset: presets[0].id
    });
    applyStateToControls();
    highlightSelectedPreset();
    saveState();
    scheduleRender();
  }

  /**
   * Convert canvas to PNG and trigger download.
   * @param {number} scale
   * @param {boolean} transparent
   */
  function downloadPNG(scale = 1, transparent = false) {
    const tmpCanvas = document.createElement('canvas');
    const dpr = window.devicePixelRatio || 1;
    tmpCanvas.width = canvas.width * scale;
    tmpCanvas.height = canvas.height * scale;
    const tctx = tmpCanvas.getContext('2d');
    // Draw onto temp canvas
    tctx.scale(scale, scale);
    drawPreview(tctx, canvas.width, canvas.height, transparent);
    const dataURL = tmpCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    const safeName = state.text.replace(/\n/g, '_').replace(/[^a-zA-Z0-9-_]/g, '').substring(0, 20) || 'textfx';
    link.download = `${safeName}_${state.preset}_${scale}x.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Copy PNG to clipboard using Clipboard API.
   */
  async function copyToClipboard() {
    try {
      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = canvas.width;
      tmpCanvas.height = canvas.height;
      const tctx = tmpCanvas.getContext('2d');
      drawPreview(tctx, canvas.width, canvas.height, state.backgroundTransparent);
      const blob = await new Promise(resolve => tmpCanvas.toBlob(resolve, 'image/png'));
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      showToast('Copied to clipboard');
    } catch (e) {
      showToast('Copy failed');
    }
  }

  /**
   * Display a temporary toast message.
   * @param {string} message
   */
  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '60px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(0,0,0,0.7)';
    toast.style.color = '#fff';
    toast.style.padding = '0.5rem 1rem';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = 100;
    toast.style.fontSize = '0.9rem';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.5s';
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 1500);
  }

  /**
   * Render a preset thumbnail into provided context.
   * @param {CanvasRenderingContext2D} context
   * @param {number} width
   * @param {number} height
   * @param {object} preset
   */
  function renderThumbnail(context, width, height, preset) {
    const tmpState = Object.assign({}, state, preset.extra || {}, { preset: preset.id });
    // Use a short sample text
    const sampleState = Object.assign({}, tmpState, {
      text: 'Fx',
      fontSize: 64,
      outlineSize: 2,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      backgroundTransparent: true,
      textureAmount: 0.5
    });
    drawPreview(context, width, height, true, preset, sampleState);
  }

  /**
   * Adjust canvas size to match container size taking device pixel ratio into account.
   */
  function updateCanvasSize() {
    const device = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const rect = device.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    scheduleRender();
  }

  window.addEventListener('resize', () => {
    updateCanvasSize();
  });

  /**
   * Schedule a render. Debounced to avoid excessive renders during rapid input.
   */
  let renderPending = false;
  function scheduleRender() {
    if (!renderPending) {
      renderPending = true;
      requestAnimationFrame(() => {
        renderPending = false;
        render();
      });
    }
  }

  /**
   * Main render function. Delegates drawing to drawPreview and updates FPS counter.
   */
  let lastTimestamp = performance.now();
  function render() {
    const now = performance.now();
    const dt = now - lastTimestamp;
    const fps = dt > 0 ? Math.round(1000 / dt) : 0;
    lastTimestamp = now;
    fpsCounter.textContent = `${fps} fps`;
    drawPreview(ctx, canvas.width, canvas.height, state.backgroundTransparent);
  }

  /**
   * Draw the preview onto the given context.
   * @param {CanvasRenderingContext2D} context
   * @param {number} width
   * @param {number} height
   * @param {boolean} transparentBackground
   * @param {object|null} presetOverride
   * @param {object|null} stateOverride
   */
  function drawPreview(context, width, height, transparentBackground, presetOverride, stateOverride) {
    const effectiveState = stateOverride ? stateOverride : state;
    const preset = presetOverride || presets.find(p => p.id === effectiveState.preset) || presets[0];
    // Clear canvas
    context.clearRect(0, 0, width, height);
    // Draw background if needed
    if (!transparentBackground) {
      // simple dark translucent background
      context.fillStyle = 'rgba(0,0,0,0)';
      context.clearRect(0, 0, width, height);
    }
    // Setup text settings
    const dpr = 1; // width and height already include dpr
    let fontSize = effectiveState.fontSize * dpr;
    const lines = effectiveState.text.split('\n');
    context.textBaseline = 'middle';
    context.textAlign = 'left';
    // Adjust font size to fit width/height
    const fitWidth = width * 0.9;
    const fitHeight = height * 0.9;
    context.font = `${effectiveState.fontWeight} ${fontSize}px sans-serif`;
    let maxLineWidth = 0;
    for (const line of lines) {
      const metrics = context.measureText(line);
      maxLineWidth = Math.max(maxLineWidth, metrics.width);
    }
    let totalHeight = lines.length * fontSize * effectiveState.lineHeight;
    let scale = 1;
    if (maxLineWidth > 0 && (maxLineWidth > fitWidth || totalHeight > fitHeight)) {
      const scaleX = fitWidth / maxLineWidth;
      const scaleY = fitHeight / totalHeight;
      scale = Math.min(scaleX, scaleY);
      fontSize *= scale;
    }
    context.font = `${effectiveState.fontWeight} ${fontSize}px sans-serif`;
    const lineHeightPx = fontSize * effectiveState.lineHeight;
    // Precompute gradient
    const grad = context.createLinearGradient(0, 0, 0, fontSize * lines.length * effectiveState.lineHeight);
    const stops = preset.gradient || [];
    stops.forEach(stop => grad.addColorStop(stop.pos, stop.color));
    // Draw each line
    const textHeight = lines.length * lineHeightPx;
    let y = (height - textHeight) / 2 + lineHeightPx / 2;
    for (const line of lines) {
      const metrics = context.measureText(line);
      const x = (width - metrics.width) / 2;
      context.save();
      // Apply shadow/glow
      const glow = preset.shadowColor || 'rgba(255,255,255,0.3)';
      const glowStrength = effectiveState.glowStrength * 100;
      context.shadowColor = glow;
      context.shadowBlur = effectiveState.shadowBlur + glowStrength;
      context.shadowOffsetX = effectiveState.shadowOffsetX;
      context.shadowOffsetY = effectiveState.shadowOffsetY;
      // Fill with gradient
      context.fillStyle = grad;
      // Apply letterSpacing manually by splitting characters
      if (effectiveState.letterSpacing !== 0) {
        let currentX = x;
        for (const ch of line) {
          const w = context.measureText(ch).width;
          context.fillText(ch, currentX, y);
          if (effectiveState.outlineSize > 0) {
            context.lineWidth = effectiveState.outlineSize;
            context.strokeStyle = preset.outlineColor || '#ffffff';
            context.strokeText(ch, currentX, y);
          }
          currentX += w + effectiveState.letterSpacing;
        }
      } else {
        context.fillText(line, x, y);
        if (effectiveState.outlineSize > 0) {
          context.lineWidth = effectiveState.outlineSize;
          context.strokeStyle = preset.outlineColor || '#ffffff';
          context.strokeText(line, x, y);
        }
      }
      context.restore();
      y += lineHeightPx;
    }
    // Apply pattern overlay if any
    if (preset.pattern && effectiveState.textureAmount > 0) {
      const pattern = getPattern(preset.pattern);
      if (pattern) {
        context.save();
        context.globalCompositeOperation = 'source-atop';
        context.globalAlpha = effectiveState.textureAmount;
        context.fillStyle = pattern;
        context.fillRect(0, 0, width, height);
        context.restore();
      }
    }
    // Shine effect: overlay specular band
    if (effectiveState.shineIntensity > 0) {
      context.save();
      context.globalCompositeOperation = 'source-atop';
      const shineGrad = context.createLinearGradient(0, 0, width, height);
      shineGrad.addColorStop(0.0, 'rgba(255,255,255,0)');
      shineGrad.addColorStop(0.5 - effectiveState.shineIntensity * 0.25, 'rgba(255,255,255,0)');
      shineGrad.addColorStop(0.5, 'rgba(255,255,255,0.6)');
      shineGrad.addColorStop(0.5 + effectiveState.shineIntensity * 0.25, 'rgba(255,255,255,0)');
      shineGrad.addColorStop(1.0, 'rgba(255,255,255,0)');
      context.fillStyle = shineGrad;
      context.fillRect(0, 0, width, height);
      context.restore();
    }
  }

  /**
   * Attach event listeners to controls.
   */
  function attachControlListeners() {
    const inputs = document.querySelectorAll('[data-key]');
    inputs.forEach(input => {
      const key = input.dataset.key;
      if (input.type === 'checkbox') {
        input.addEventListener('change', e => {
          updateState(key, e.target.checked);
        });
      } else {
        input.addEventListener('input', e => {
          let val = e.target.value;
          if (input.type === 'range') {
            val = parseFloat(val);
          }
          updateState(key, val);
        });
      }
    });
    document.getElementById('textInput').addEventListener('input', e => {
      updateState('text', e.target.value);
    });
    randomBtn.addEventListener('click', () => {
      randomize();
    });
    resetBtn.addEventListener('click', () => {
      reset();
    });
  }

  /**
   * Generate a subtle noise overlay for the entire page.
   */
  function generatePageNoise() {
    const size = 128;
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = noiseCanvas.height = size;
    const nctx = noiseCanvas.getContext('2d');
    const img = nctx.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 50; // low opacity
    }
    nctx.putImageData(img, 0, 0);
    noiseOverlay.style.backgroundImage = `url(${noiseCanvas.toDataURL()})`;
  }

  // Initialize
  function init() {
    loadState();
    applyStateToControls();
    buildPresets();
    attachControlListeners();
    updateCanvasSize();
    generatePageNoise();
    scheduleRender();
  }
  init();
})();