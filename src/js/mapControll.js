/**
 * Map SVG Controller
 * Supports: zoom in/out, pan (drag + arrow buttons), fullscreen
 * Works for both SVG and IMG maps
 */

(function () {
  // ─── State ───────────────────────────────────────────────────────────────────
  const state = {
    scale: 1,
    translateX: 0,
    translateY: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    lastTranslateX: 0,
    lastTranslateY: 0,
    activePane: null,
    isFullscreen: false,
  };

  const CONFIG = {
    // scaleMin: 0.5,
    scaleMax: 5,
    scaleStep: 0.25,
    panStep: 60,
    transitionDuration: 200, // ms – used when NOT dragging
    wheelSensitivity: 0.001,
  };
// Thay thế hàm này vào trong IIFE, sau phần CONFIG

function getMinScale() {
  const pane = getActivePane();
  const imageEl = pane?.querySelector(".image");
  const content = getMapContent(pane);
  if (!pane || !imageEl || !content) return 1;

  const paneW = pane.clientWidth;
  const paneH = pane.clientHeight;

  let contentW, contentH;

  if (content.tagName === "svg") {
    // Lấy viewBox hoặc width/height attribute của SVG
    const vb = content.getAttribute("viewBox");
    if (vb) {
      const parts = vb.split(/[\s,]+/);
      contentW = parseFloat(parts[2]);
      contentH = parseFloat(parts[3]);
    } else {
      contentW = content.getBoundingClientRect().width;
      contentH = content.getBoundingClientRect().height;
    }
  } else {
    // IMG: dùng naturalWidth/naturalHeight
    contentW = content.naturalWidth || content.clientWidth;
    contentH = content.naturalHeight || content.clientHeight;
  }

  if (!contentW || !contentH) return 1;

  // Scale tối thiểu = vừa khít pane (cover, không để lộ nền)
  const scaleToFitW = paneW / contentW;
  const scaleToFitH = paneH / contentH;

  // Dùng Math.max để "cover" (không để lộ viền trắng bất kỳ chiều nào)
  // Dùng Math.min nếu muốn "contain" (fit vừa khung)
  return Math.max(scaleToFitW, scaleToFitH);
}
  // ─── Helpers ─────────────────────────────────────────────────────────────────
  function getActivePane() {
    return document.querySelector(".map-pane.active");
  }

  function getMapContent(pane) {
    if (!pane) return null;
    // SVG inline or IMG inside .image div
    return pane.querySelector(".image svg") || pane.querySelector(".image img");
  }

  function applyTransform(animated = false) {
    const pane = getActivePane();
    const el = getMapContent(pane);
    if (!el) return;

    el.style.transition = animated
      ? `transform ${CONFIG.transitionDuration}ms cubic-bezier(0.25,0.46,0.45,0.94)`
      : "none";

    el.style.transform = `translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale})`;
    el.style.transformOrigin = "center center";
    el.style.cursor = state.isDragging ? "grabbing" : "grab";
    el.style.willChange = "transform";
    el.style.display = "block"; // ensure inline SVG is block
  }

 function resetTransform(animated = true) {
  state.scale = getMinScale(); // ← fit khung thay vì scale = 1
  state.translateX = 0;
  state.translateY = 0;
  state.lastTranslateX = 0;
  state.lastTranslateY = 0;
  applyTransform(animated);
}

function clampTranslate(x, y) {
  const pane = getActivePane();
  const content = getMapContent(pane);
  if (!pane || !content) return { x, y };

  const paneW = pane.clientWidth;
  const paneH = pane.clientHeight;

  // Kích thước gốc của content (trước scale)
  let naturalW, naturalH;

  if (content.tagName === "svg") {
    const vb = content.getAttribute("viewBox");
    if (vb) {
      const parts = vb.split(/[\s,]+/);
      naturalW = parseFloat(parts[2]);
      naturalH = parseFloat(parts[3]);
    } else {
      // Fallback: lấy attribute width/height
      naturalW = parseFloat(content.getAttribute("width")) || paneW;
      naturalH = parseFloat(content.getAttribute("height")) || paneH;
    }
  } else {
    naturalW = content.naturalWidth || content.clientWidth;
    naturalH = content.naturalHeight || content.clientHeight;
  }

  // SVG/IMG thường được CSS stretch về paneW x paneH trước khi scale
  // Nên "rendered size trước scale" = paneW x paneH
  const renderedW = paneW;
  const renderedH = paneH;

  // Kích thước sau scale
  const scaledW = renderedW * state.scale;
  const scaledH = renderedH * state.scale;

  // Phần "thừa" so với pane — đây là giới hạn tối đa có thể pan
  const maxX = Math.max(0, (scaledW - paneW) / 2);
  const maxY = Math.max(0, (scaledH - paneH) / 2);

  return {
    x: Math.max(-maxX, Math.min(maxX, x)),
    y: Math.max(-maxY, Math.min(maxY, y)),
  };
}

  // ─── Zoom ─────────────────────────────────────────────────────────────────────
  function zoom(direction, pivotX = null, pivotY = null) {
    const minScale = getMinScale(); // ← động thay vì CONFIG.scaleMin cố định

  const oldScale = state.scale;
  const newScale = Math.min(
    CONFIG.scaleMax,
    Math.max(minScale, state.scale + direction * CONFIG.scaleStep) // ← dùng minScale
  );

    if (newScale === oldScale) return;

    // Zoom toward pivot point (mouse/touch position)
    if (pivotX !== null && pivotY !== null) {
      const pane = getActivePane();
      if (pane) {
        const rect = pane.getBoundingClientRect();
        const cx = pivotX - rect.left - rect.width / 2;
        const cy = pivotY - rect.top - rect.height / 2;
        const scaleRatio = newScale / oldScale;
        state.translateX = cx - scaleRatio * (cx - state.translateX);
        state.translateY = cy - scaleRatio * (cy - state.translateY);
        const clamped = clampTranslate(state.translateX, state.translateY);
        state.translateX = clamped.x;
        state.translateY = clamped.y;
      }
    }

    state.scale = newScale;
    applyTransform(true);
    updateZoomButtons();
  }

 function updateZoomButtons() {
  const minScale = getMinScale();
  const btnPlus = document.querySelector(".btn-plus");
  const btnMinus = document.querySelector(".btn-minus");
  if (btnPlus) btnPlus.classList.toggle("disabled", state.scale >= CONFIG.scaleMax);
  if (btnMinus) btnMinus.classList.toggle("disabled", state.scale <= minScale); // ← minScale
}

  // ─── Pan via arrow buttons ────────────────────────────────────────────────────
  function pan(dx, dy) {
    const clamped = clampTranslate(state.translateX + dx, state.translateY + dy);
    state.translateX = clamped.x;
    state.translateY = clamped.y;
    state.lastTranslateX = state.translateX;
    state.lastTranslateY = state.translateY;
    applyTransform(true);
  }

  // ─── Drag (mouse) ─────────────────────────────────────────────────────────────
  function onMouseDown(e) {
    if (e.button !== 0) return; // left click only
    state.isDragging = true;
    state.startX = e.clientX - state.translateX;
    state.startY = e.clientY - state.translateY;
    applyTransform(false);
    e.preventDefault();
  }

  function onMouseMove(e) {
    if (!state.isDragging) return;
    const rawX = e.clientX - state.startX;
    const rawY = e.clientY - state.startY;
    const clamped = clampTranslate(rawX, rawY);
    state.translateX = clamped.x;
    state.translateY = clamped.y;
    applyTransform(false);
  }

  function onMouseUp() {
    if (!state.isDragging) return;
    state.isDragging = false;
    state.lastTranslateX = state.translateX;
    state.lastTranslateY = state.translateY;
    applyTransform(false);
  }

  // ─── Drag (touch) ─────────────────────────────────────────────────────────────
  let initialPinchDistance = null;
  let initialScaleOnPinch = 1;

  function getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      state.isDragging = true;
      state.startX = e.touches[0].clientX - state.translateX;
      state.startY = e.touches[0].clientY - state.translateY;
    } else if (e.touches.length === 2) {
      state.isDragging = false;
      initialPinchDistance = getTouchDistance(e.touches);
      initialScaleOnPinch = state.scale;
    }
    e.preventDefault();
  }

  function onTouchMove(e) {
    if (e.touches.length === 1 && state.isDragging) {
      const rawX = e.touches[0].clientX - state.startX;
      const rawY = e.touches[0].clientY - state.startY;
      const clamped = clampTranslate(rawX, rawY);
      state.translateX = clamped.x;
      state.translateY = clamped.y;
      applyTransform(false);
    } else if (e.touches.length === 2 && initialPinchDistance !== null) {
      const newDist = getTouchDistance(e.touches);
      const scaleRatio = newDist / initialPinchDistance;
        state.scale = Math.min(
    CONFIG.scaleMax,
    Math.max(getMinScale(), initialScaleOnPinch * scaleRatio) // ← getMinScale()
    );
      applyTransform(false);
      updateZoomButtons();
    }
    e.preventDefault();
  }

  function onTouchEnd(e) {
    if (e.touches.length < 2) initialPinchDistance = null;
    if (e.touches.length === 0) {
      state.isDragging = false;
      state.lastTranslateX = state.translateX;
      state.lastTranslateY = state.translateY;
    }
  }

  function showScrollHint() {
  const wrapper = document.querySelector(".map-wrapper");
  if (!wrapper || wrapper.querySelector(".scroll-hint")) return;

  const hint = document.createElement("div");
  hint.className = "scroll-hint";
  hint.textContent = "Giữ Ctrl + cuộn để zoom bản đồ";
  wrapper.appendChild(hint);

  // Tự ẩn sau 2s
  clearTimeout(wrapper._hintTimer);
  wrapper._hintTimer = setTimeout(() => hint.remove(), 2000);
}

function onWheel(e) {
  if (!e.ctrlKey && !e.metaKey) {
    showScrollHint(); // gợi ý khi scroll thường
    return;
  }

  e.preventDefault();
  const direction = e.deltaY < 0 ? 1 : -1;
  zoom(direction, e.clientX, e.clientY);
}

  // ─── Mouse wheel zoom ─────────────────────────────────────────────────────────
  function onWheel(e) {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const direction = e.deltaY < 0 ? 1 : -1;
    zoom(direction, e.clientX, e.clientY);
  }

  // ─── Fullscreen ───────────────────────────────────────────────────────────────
  function toggleFullscreen() {
    const wrapper = document.querySelector(".map-wrapper");
    if (!wrapper) return;

    if (!state.isFullscreen) {
      // Enter fullscreen
      wrapper.classList.add("map-fullscreen");
      document.body.classList.add("map-fullscreen-active");
      state.isFullscreen = true;

      // Update icon
      const icon = document.querySelector(".btn-fullscreen i");
      if (icon) {
        icon.classList.remove("fa-expand");
        icon.classList.add("fa-compress");
      }

      // ESC key to exit
      document.addEventListener("keydown", onEscKey);
    } else {
      exitFullscreen();
    }
  }

  function exitFullscreen() {
    const wrapper = document.querySelector(".map-wrapper");
    if (!wrapper) return;

    wrapper.classList.remove("map-fullscreen");
    document.body.classList.remove("map-fullscreen-active");
    state.isFullscreen = false;

    const icon = document.querySelector(".btn-fullscreen i");
    if (icon) {
      icon.classList.remove("fa-compress");
      icon.classList.add("fa-expand");
    }

    document.removeEventListener("keydown", onEscKey);
  }

  function onEscKey(e) {
    if (e.key === "Escape" && state.isFullscreen) exitFullscreen();
  }

  // ─── Bind events to active pane ───────────────────────────────────────────────
  function bindMapEvents(pane) {
    if (!pane) return;
    const imageEl = pane.querySelector(".image");
    if (!imageEl) return;

    // Remove old listeners by cloning (cleanest approach)
    const fresh = imageEl.cloneNode(true); // deep clone keeps SVG
    imageEl.parentNode.replaceChild(fresh, imageEl);

    fresh.addEventListener("mousedown", onMouseDown);
    fresh.addEventListener("wheel", onWheel, { passive: false });
    fresh.addEventListener("touchstart", onTouchStart, { passive: false });
    fresh.addEventListener("touchmove", onTouchMove, { passive: false });
    fresh.addEventListener("touchend", onTouchEnd);

    // Set base styles
    fresh.style.overflow = "visible";
    fresh.style.userSelect = "none";
    fresh.style.cursor = "grab";

    const content = getMapContent(pane);
    if (content) {
      content.style.transformOrigin = "center center";
      content.style.display = "block";
      content.draggable = false;
    }
  }

  // ─── Tab switching integration ────────────────────────────────────────────────
  function switchTab(targetId) {
    document.querySelectorAll(".map-pane").forEach((p) => p.classList.remove("active"));
    document.querySelectorAll(".tabs-container .btn").forEach((b) => {
      b.classList.remove("active", "btn-primary");
      b.classList.add("btn-light");
    });

    const targetPane = document.querySelector(targetId);
    const targetBtn = document.querySelector(`.btn[data-target="${targetId}"]`);

    if (targetPane) {
      targetPane.classList.add("active");
      resetTransform(false);
      bindMapEvents(targetPane);
    }

    if (targetBtn) {
      targetBtn.classList.add("active", "btn-primary");
      targetBtn.classList.remove("btn-light");
    }

    updateZoomButtons();
  }

  // ─── Keyboard navigation ──────────────────────────────────────────────────────
  function onKeyDown(e) {
    // Only when map section is in viewport
    const wrapper = document.querySelector(".map-wrapper");
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView && !state.isFullscreen) return;

    const keyMap = {
      ArrowUp: () => pan(0, CONFIG.panStep),
      ArrowDown: () => pan(0, -CONFIG.panStep),
      ArrowLeft: () => pan(CONFIG.panStep, 0),
      ArrowRight: () => pan(-CONFIG.panStep, 0),
      "+": () => zoom(1),
      "=": () => zoom(1),
      "-": () => zoom(-1),
      _: () => zoom(-1),
      "0": () => resetTransform(true),
      f: () => toggleFullscreen(),
      F: () => toggleFullscreen(),
    };

    if (keyMap[e.key]) {
      keyMap[e.key]();
      e.preventDefault();
    }
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    // Global mouse events (drag outside image bounds)
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("keydown", onKeyDown);

    // Control buttons
    document.querySelector(".btn-plus")?.addEventListener("click", () => zoom(1));
    document.querySelector(".btn-minus")?.addEventListener("click", () => zoom(-1));
    document.querySelector(".btn-fullscreen")?.addEventListener("click", toggleFullscreen);
    document.querySelector(".btn-up")?.addEventListener("click", () => pan(0, CONFIG.panStep));
    document.querySelector(".btn-down")?.addEventListener("click", () => pan(0, -CONFIG.panStep));
    document.querySelector(".btn-left")?.addEventListener("click", () => pan(CONFIG.panStep, 0));
    document.querySelector(".btn-right")?.addEventListener("click", () => pan(-CONFIG.panStep, 0));

    // Double-click to reset
    document.querySelector(".map-wrapper")?.addEventListener("dblclick", () => resetTransform(true));

    // Tab buttons
    document.querySelectorAll(".tabs-container .btn[data-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        if (target) switchTab(target);
      });
    });

    // Init active pane
    const activePane = getActivePane();
    if (activePane) {
      bindMapEvents(activePane);
      updateZoomButtons();
    }

    // Inject fullscreen CSS dynamically
    injectFullscreenStyles();
  }

  // ─── Inject required CSS ──────────────────────────────────────────────────────
  function injectFullscreenStyles() {
    if (document.getElementById("map-controller-styles")) return;

    const style = document.createElement("style");
    style.id = "map-controller-styles";
    style.textContent = `
      /* Fullscreen overlay */
      .map-fullscreen {
        position: fixed !important;
        inset: 0 !important;
        z-index: 9999 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: #0a0a0a !important;
        margin: 0 !important;
        border-radius: 0 !important;
      }

      .map-fullscreen-active {
        overflow: hidden;
      }

      .map-fullscreen .map-pane {
        height: 100vh !important;
      }

      /* Prevent text selection while dragging */
      .map-wrapper * {
        user-select: none;
        -webkit-user-drag: none;
      }

      /* Smooth SVG/IMG scale */
      .map-pane .image svg,
      .map-pane .image img {
        transform-origin: center center;
        will-change: transform;
      }

      /* Disabled state for zoom buttons */
      .map-controls .control-btn.disabled {
        opacity: 0.3;
        pointer-events: none;
      }

      /* Grab cursor on image area */
      .map-pane .image {
        cursor: grab;
        overflow: hidden;
      }

      .map-pane .image:active {
        cursor: grabbing;
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Boot ─────────────────────────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();