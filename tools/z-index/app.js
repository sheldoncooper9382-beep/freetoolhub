(() => {
  const $ = (id) => document.getElementById(id);

  const stage = $("stage");
  const stackList = $("stackList");

  const addBtn = $("addBtn");
  const resetBtn = $("resetBtn");
  const copyAllBtn = $("copyAllBtn");

  const stageContext = $("stageContext");

  const helpBtn = $("helpBtn");
  const helpModal = $("helpModal");
  const closeHelp = $("closeHelp");
  const closeHelp2 = $("closeHelp2");

  const stackPill = $("stackPill");
  const activePill = $("activePill");

  const layerEditor = $("layerEditor");
  const edName = $("edName");
  const edZ = $("edZ");
  const edPos = $("edPos");
  const edOpacity = $("edOpacity");
  const edTransform = $("edTransform");
  const edTop = $("edTop");
  const edLeft = $("edLeft");
  const edW = $("edW");
  const edH = $("edH");
  const edLabel = $("edLabel");
  const edPointer = $("edPointer");

  const bringFrontBtn = $("bringFrontBtn");
  const sendBackBtn = $("sendBackBtn");
  const dupBtn = $("dupBtn");
  const delBtn = $("delBtn");

  const cssOut = $("cssOut");

  // ---------- State ----------
  let layers = [];
  let activeId = null;
  let idCounter = 1;

  const palette = [
    "linear-gradient(135deg, rgba(110,231,255,.26), rgba(167,139,250,.26))",
    "linear-gradient(135deg, rgba(167,139,250,.25), rgba(251,113,133,.22))",
    "linear-gradient(135deg, rgba(251,113,133,.22), rgba(110,231,255,.20))",
    "linear-gradient(135deg, rgba(255,255,255,.10), rgba(167,139,250,.18))",
  ];

  function uid() { return `layer-${idCounter++}`; }

  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

  function getStageRect() { return stage.getBoundingClientRect(); }

  function select(id) {
    activeId = id;
    render();
  }

  function getActive() {
    return layers.find(l => l.id === activeId) || null;
  }

  function addLayer(seed = {}) {
    const rect = getStageRect();
    const baseW = 180 + (layers.length % 3) * 40;
    const baseH = 120 + (layers.length % 2) * 30;

    const l = {
      id: uid(),
      label: seed.label ?? `Layer ${layers.length + 1}`,
      z: seed.z ?? (layers.length * 10),
      pos: seed.pos ?? "absolute",
      opacity: seed.opacity ?? 0.92,
      transform: seed.transform ?? "none",
      pointer: seed.pointer ?? "auto",
      x: seed.x ?? clamp(30 + layers.length * 28, 10, Math.max(10, rect.width - baseW - 10)),
      y: seed.y ?? clamp(30 + layers.length * 22, 10, Math.max(10, rect.height - baseH - 10)),
      w: seed.w ?? baseW,
      h: seed.h ?? baseH,
      bg: seed.bg ?? palette[layers.length % palette.length],
    };

    layers.push(l);
    activeId = l.id;
    render();
  }

  function reset() {
    layers = [];
    idCounter = 1;

    addLayer({ label: "Layer A", z: 10, x: 60, y: 60, w: 210, h: 140, bg: palette[0] });
    addLayer({ label: "Layer B", z: 20, x: 140, y: 110, w: 240, h: 160, bg: palette[1] });
    addLayer({ label: "Layer C", z: 5,  x: 220, y: 70,  w: 200, h: 140, bg: palette[2] });

    activeId = layers[1].id; // select B
    render();
  }

  // NOTE: Real stacking order is more complex (contexts). Here we visualize:
  // 1) If positioned != static, z-index applies. Otherwise treat z as 0.
  // 2) Sort by effective z then by DOM order (later is on top if same z).
  function effectiveZ(l) {
    return (l.pos === "static") ? 0 : Number(l.z) || 0;
  }

  function stackingOrder() {
    // bottom -> top
    return layers
      .map((l, idx) => ({ l, idx, ez: effectiveZ(l) }))
      .sort((a, b) => a.ez - b.ez || a.idx - b.idx)
      .map(x => x.l);
  }

  function renderStage() {
    // stacking context toggle
    if (stageContext.checked) {
      stage.style.position = "relative";
      stage.style.zIndex = "0";
      stage.style.isolation = "isolate";
    } else {
      stage.style.position = "relative";
      stage.style.zIndex = "auto";
      stage.style.isolation = "auto";
    }

    stage.innerHTML = "";

    // append in DOM order = our layers array
    for (const l of layers) {
      const node = document.createElement("div");
      node.className = "layer" + (l.id === activeId ? " selected" : "");
      node.dataset.id = l.id;

      node.style.left = `${l.x}px`;
      node.style.top = `${l.y}px`;
      node.style.width = `${l.w}px`;
      node.style.height = `${l.h}px`;
      node.style.opacity = `${l.opacity}`;
      node.style.transform = l.transform;
      node.style.pointerEvents = l.pointer;

      // position & z-index
      node.style.position = l.pos;
      if (l.pos === "static") node.style.zIndex = "auto";
      else node.style.zIndex = String(l.z);

      node.style.backgroundImage = l.bg;

      node.innerHTML = `
        <div class="layerHead">
          <div class="layerName">${escapeHtml(l.label)}</div>
          <div class="badge">z: ${effectiveZ(l)}</div>
        </div>
        <div class="layerMeta">pos: ${l.pos} • opacity: ${round(l.opacity, 2)} • transform: ${escapeHtml(l.transform)}</div>
        <div class="handleRow">
          <span class="pillBtn">drag me</span>
          <span class="pillBtn">${l.pointer}</span>
        </div>
      `;

      node.addEventListener("pointerdown", onDragStart);
      node.addEventListener("click", (e) => {
        e.stopPropagation();
        select(l.id);
      });

      stage.appendChild(node);
    }

    stage.addEventListener("click", () => {
      activeId = null;
      render();
    }, { once: true });
  }

  function renderList() {
    const order = stackingOrder(); // bottom -> top
    const top = order[order.length - 1];

    stackPill.textContent = top ? `Top: ${top.label}` : "—";
    stackList.innerHTML = "";

    // show top first in list (more intuitive)
    const topFirst = [...order].reverse();

    topFirst.forEach((l, i) => {
      const row = document.createElement("div");
      row.className = "stackItem" + (l.id === activeId ? " active" : "");
      row.dataset.id = l.id;

      const isTop = (i === 0);
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(l.label)}</strong>
          <div class="mini">effective z: ${effectiveZ(l)} • pos: ${l.pos}${isTop ? " • (top)" : ""}</div>
        </div>
        <div class="badge">z ${effectiveZ(l)}</div>
      `;

      row.addEventListener("click", () => select(l.id));
      stackList.appendChild(row);
    });
  }

  function renderEditor() {
    const l = getActive();
    if (!l) {
      layerEditor.hidden = true;
      activePill.textContent = "No layer selected";
      return;
    }
    layerEditor.hidden = false;
    activePill.textContent = `Selected: ${l.label}`;
    edName.textContent = l.label;

    edZ.value = l.z;
    edPos.value = l.pos;
    edOpacity.value = l.opacity;
    edTransform.value = l.transform;
    edTop.value = l.y;
    edLeft.value = l.x;
    edW.value = l.w;
    edH.value = l.h;
    edLabel.value = l.label;
    edPointer.value = l.pointer;
  }

  function renderCSS() {
    const lines = [];

    lines.push(`/* Stage (container) */`);
    lines.push(`.stage {`);
    lines.push(`  position: relative;`);
    if (stageContext.checked) {
      lines.push(`  isolation: isolate;`);
      lines.push(`  z-index: 0;`);
    }
    lines.push(`}`);

    lines.push(``);
    layers.forEach((l, i) => {
      const cls = `.layer-${i + 1}`;
      lines.push(`/* ${l.label} */`);
      lines.push(`${cls} {`);
      lines.push(`  position: ${l.pos};`);
      if (l.pos !== "static") lines.push(`  z-index: ${l.z};`);
      lines.push(`  top: ${Math.round(l.y)}px;`);
      lines.push(`  left: ${Math.round(l.x)}px;`);
      lines.push(`  width: ${Math.round(l.w)}px;`);
      lines.push(`  height: ${Math.round(l.h)}px;`);
      lines.push(`  opacity: ${round(l.opacity, 3)};`);
      lines.push(`  transform: ${l.transform};`);
      lines.push(`  pointer-events: ${l.pointer};`);
      lines.push(`}`);
      lines.push(``);
    });

    lines.push(`/* Tip: z-index only works on non-static positioned elements */`);

    cssOut.textContent = lines.join("\n");
  }

  function render() {
    renderStage();
    renderList();
    renderEditor();
    renderCSS();

    // update selected class highlight
    Array.from(stage.querySelectorAll(".layer")).forEach(n => {
      n.classList.toggle("selected", n.dataset.id === activeId);
    });
  }

  // ---------- Dragging ----------
  let drag = null;

  function onDragStart(e) {
    const id = e.currentTarget.dataset.id;
    select(id);

    const l = layers.find(x => x.id === id);
    if (!l) return;

    const rect = getStageRect();
    const startX = e.clientX;
    const startY = e.clientY;

    drag = {
      id,
      startX,
      startY,
      origX: l.x,
      origY: l.y,
      stageW: rect.width,
      stageH: rect.height
    };

    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.addEventListener("pointermove", onDragMove);
    e.currentTarget.addEventListener("pointerup", onDragEnd, { once: true });
    e.currentTarget.addEventListener("pointercancel", onDragEnd, { once: true });
  }

  function onDragMove(e) {
    if (!drag) return;
    const l = layers.find(x => x.id === drag.id);
    if (!l) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    l.x = clamp(drag.origX + dx, 0, Math.max(0, drag.stageW - l.w));
    l.y = clamp(drag.origY + dy, 0, Math.max(0, drag.stageH - l.h));

    // update editor fields live
    if (activeId === l.id) {
      edTop.value = Math.round(l.y);
      edLeft.value = Math.round(l.x);
    }

    render();
  }

  function onDragEnd(e) {
    const node = e.currentTarget;
    node.removeEventListener("pointermove", onDragMove);
    drag = null;
  }

  // ---------- Editor bindings ----------
  function patchActive(mutator) {
    const l = getActive();
    if (!l) return;
    mutator(l);
    render();
  }

  edZ.addEventListener("input", () => patchActive(l => l.z = Number(edZ.value || 0)));
  edPos.addEventListener("input", () => patchActive(l => l.pos = edPos.value));
  edOpacity.addEventListener("input", () => patchActive(l => l.opacity = Number(edOpacity.value)));
  edTransform.addEventListener("input", () => patchActive(l => l.transform = edTransform.value));
  edTop.addEventListener("input", () => patchActive(l => l.y = Number(edTop.value || 0)));
  edLeft.addEventListener("input", () => patchActive(l => l.x = Number(edLeft.value || 0)));
  edW.addEventListener("input", () => patchActive(l => l.w = Math.max(40, Number(edW.value || 0))));
  edH.addEventListener("input", () => patchActive(l => l.h = Math.max(40, Number(edH.value || 0))));
  edLabel.addEventListener("input", () => patchActive(l => l.label = edLabel.value.trim() || "Layer"));
  edPointer.addEventListener("input", () => patchActive(l => l.pointer = edPointer.value));

  bringFrontBtn.addEventListener("click", () => {
    patchActive(l => {
      const maxZ = Math.max(...layers.map(x => effectiveZ(x)));
      l.z = (l.pos === "static") ? l.z : (maxZ + 1);
    });
  });

  sendBackBtn.addEventListener("click", () => {
    patchActive(l => {
      const minZ = Math.min(...layers.map(x => effectiveZ(x)));
      l.z = (l.pos === "static") ? l.z : (minZ - 1);
    });
  });

  dupBtn.addEventListener("click", () => {
    const l = getActive();
    if (!l) return;
    addLayer({
      label: l.label + " copy",
      z: l.z + 1,
      pos: l.pos,
      opacity: l.opacity,
      transform: l.transform,
      pointer: l.pointer,
      x: l.x + 18,
      y: l.y + 18,
      w: l.w,
      h: l.h,
      bg: l.bg
    });
  });

  delBtn.addEventListener("click", () => {
    const l = getActive();
    if (!l) return;
    layers = layers.filter(x => x.id !== l.id);
    activeId = layers[0]?.id ?? null;
    render();
  });

  // ---------- Stage controls ----------
  stageContext.addEventListener("change", render);

  addBtn.addEventListener("click", () => addLayer());
  resetBtn.addEventListener("click", reset);

  // ---------- Help modal ----------
  function openHelp(){ helpModal.hidden = false; }
  function closeHelpFn(){ helpModal.hidden = true; }
  helpBtn.addEventListener("click", openHelp);
  closeHelp.addEventListener("click", closeHelpFn);
  closeHelp2.addEventListener("click", closeHelpFn);
  helpModal.addEventListener("click", (e) => { if (e.target === helpModal) closeHelpFn(); });

  // ---------- Copy ----------
  async function copyText(txt) {
    try {
      await navigator.clipboard.writeText(txt);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = txt;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); document.body.removeChild(ta); return true; }
      catch { document.body.removeChild(ta); return false; }
    }
  }

  copyAllBtn.addEventListener("click", async () => {
    await copyText(cssOut.textContent || "");
    activePill.textContent = "CSS copied ✅";
    setTimeout(() => renderEditor(), 650);
  });

  // ---------- Utils ----------
  function round(n, d){
    const p = Math.pow(10, d);
    return Math.round(n * p) / p;
  }
  function escapeHtml(str){
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // Init
  window.addEventListener("resize", () => render());
  reset();
})();
