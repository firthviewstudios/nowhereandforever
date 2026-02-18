//=============================================================================
// main.js v1.8.0
//=============================================================================

const scriptUrls = [
    "js/libs/pixi.js",
    "js/libs/pako.min.js",
    "js/libs/localforage.min.js",
    "js/libs/effekseer.min.js",
    "js/libs/vorbisdecoder.js",
    "js/rmmz_core.js",
    "js/rmmz_managers.js",
    "js/rmmz_objects.js",
    "js/rmmz_scenes.js",
    "js/rmmz_sprites.js",
    "js/rmmz_windows.js",
    "js/plugins.js"
];
const effekseerWasmUrl = "js/libs/effekseer.wasm";

class Main {
    constructor() {
        this.xhrSucceeded = false;
        this.loadCount = 0;
        this.error = null;
    }

    run() {
        this.showLoadingSpinner();
        this.testXhr();
        this.hookNwjsClose();
        this.loadMainScripts();
    }

    showLoadingSpinner() {
        const loadingSpinner = document.createElement("div");
        const loadingSpinnerImage = document.createElement("div");
        loadingSpinner.id = "loadingSpinner";
        loadingSpinnerImage.id = "loadingSpinnerImage";
        loadingSpinner.appendChild(loadingSpinnerImage);
        document.body.appendChild(loadingSpinner);
    }

    eraseLoadingSpinner() {
        const loadingSpinner = document.getElementById("loadingSpinner");
        if (loadingSpinner) {
            document.body.removeChild(loadingSpinner);
        }
    }

    testXhr() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", document.currentScript.src);
        xhr.onload = () => (this.xhrSucceeded = true);
        xhr.send();
    }

    hookNwjsClose() {
        // [Note] When closing the window, the NW.js process sometimes does
        //   not terminate properly. This code is a workaround for that.
        if (typeof nw === "object") {
            nw.Window.get().on("close", () => nw.App.quit());
        }
    }

    loadMainScripts() {
        for (const url of scriptUrls) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.async = false;
            script.defer = true;
            script.onload = this.onScriptLoad.bind(this);
            script.onerror = this.onScriptError.bind(this);
            script._url = url;
            document.body.appendChild(script);
        }
        this.numScripts = scriptUrls.length;
        window.addEventListener("load", this.onWindowLoad.bind(this));
        window.addEventListener("error", this.onWindowError.bind(this));
    }

    onScriptLoad() {
        if (++this.loadCount === this.numScripts) {
            PluginManager.setup($plugins);
        }
    }

    onScriptError(e) {
        this.printError("Failed to load", e.target._url);
    }

    printError(name, message) {
        this.eraseLoadingSpinner();
        if (!document.getElementById("errorPrinter")) {
            const errorPrinter = document.createElement("div");
            errorPrinter.id = "errorPrinter";
            errorPrinter.innerHTML = this.makeErrorHtml(name, message);
            document.body.appendChild(errorPrinter);
        }
    }

    makeErrorHtml(name, message) {
        const nameDiv = document.createElement("div");
        const messageDiv = document.createElement("div");
        nameDiv.id = "errorName";
        messageDiv.id = "errorMessage";
        nameDiv.innerHTML = name;
        messageDiv.innerHTML = message;
        return nameDiv.outerHTML + messageDiv.outerHTML;
    }

    onWindowLoad() {
        if (!this.xhrSucceeded) {
            const message = "Your browser does not allow to read local files.";
            this.printError("Error", message);
        } else if (this.isPathRandomized()) {
            const message = "Please move the Game.app to a different folder.";
            this.printError("Error", message);
        } else if (this.error) {
            this.printError(this.error.name, this.error.message);
        } else {
            this.initEffekseerRuntime();
        }
    }

    onWindowError(event) {
        if (!this.error) {
            this.error = event.error;
        }
    }

    isPathRandomized() {
        // [Note] We cannot save the game properly when Gatekeeper Path
        //   Randomization is in effect.
        return (
            typeof process === "object" &&
            process.mainModule.filename.startsWith("/private/var")
        );
    }

    initEffekseerRuntime() {
        const onLoad = this.onEffekseerLoad.bind(this);
        const onError = this.onEffekseerError.bind(this);
        effekseer.initRuntime(effekseerWasmUrl, onLoad, onError);
    }

    onEffekseerLoad() {
        this.eraseLoadingSpinner();
        PIXI.settings.RENDER_OPTIONS["height"] = 624;
        PIXI.settings.RENDER_OPTIONS["width"] = 816;
        PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;
        SceneManager.run(Scene_Boot);
    }

    onEffekseerError() {
        this.printError("Failed to load", effekseerWasmUrl);
    }
}

const main = new Main();
main.run();

//-----------------------------------------------------------------------------
// Longer display for counterattack and magic reflection messages
window.addEventListener('load', () => {

    // Shorter delay for counterattacks
    const _Window_BattleLog_performCounter = Window_BattleLog.prototype.performCounter;
    Window_BattleLog.prototype.performCounter = function(target) {
        _Window_BattleLog_performCounter.call(this, target);
        this._waitCount = 20; // 1 second
    };

    // Longer delay for magic reflections
    const _Window_BattleLog_performReflection = Window_BattleLog.prototype.performReflection;
    Window_BattleLog.prototype.performReflection = function(target) {
        _Window_BattleLog_performReflection.call(this, target);
        this._waitCount = 120; // 2 seconds
    };

});

//-----------------------------------------------------------------------------


// --- Keep battle/menu text smooth ---
window.addEventListener("load", () => {
    const _Bitmap_drawText = Bitmap.prototype.drawText;
    Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
        if (this.baseTexture) {
            this.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
        }
        _Bitmap_drawText.call(this, text, x, y, maxWidth, lineHeight, align);
    };
});
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// Android-only virtual overlay controls (D-pad + OK/Cancel)
//  - Designed for Cordova/Android builds
//  - Will NOT appear in Windows/NW.js builds (gated by Utils.isNwjs + Android checks)
//-----------------------------------------------------------------------------
(() => {
    // Safety: only run once
    if (window.__VIRTUAL_PAD_INITIALIZED__) return;
    window.__VIRTUAL_PAD_INITIALIZED__ = true;

    const isNw = typeof Utils !== "undefined" && Utils.isNwjs && Utils.isNwjs();

    // Bluestacks often fails Utils.isMobileDevice(), so don't require it.
    const isAndroid =
        (typeof Utils !== "undefined" && Utils.isAndroidChrome && Utils.isAndroidChrome()) ||
        /Android/i.test(navigator.userAgent) ||
        typeof window.cordova !== "undefined";

    // Hard gate: never show on NW.js desktop builds; otherwise allow on Android/Cordova.
    if (isNw || !isAndroid) return;

    
    const BTN_SIZE = 56; // px
    const GAP = 10;      // px
    const OPACITY = 0.55;

    // Cancel RPG Maker touch-to-move only when pressing virtual pad buttons
    function vpadCancelTouchInput() {
        if (typeof TouchInput === "undefined") return;
        TouchInput._cancelled = true;
        TouchInput._triggered = false;
        TouchInput._pressedTime = 0;
    }

    function setInput(name, pressed) {
        // MZ input uses these action names: up/down/left/right/ok/cancel
        Input._currentState[name] = !!pressed;
    }

    function bindPress(el, onDown, onUp) {
        const down = (e) => {
            e.preventDefault();
            e.stopPropagation();
            vpadCancelTouchInput();
            onDown();
        };
        const up = (e) => {
            e.preventDefault();
            e.stopPropagation();
            vpadCancelTouchInput();
            onUp();
        };

        // Pointer events (newer WebViews)
        el.addEventListener("pointerdown", down, { passive: false });
        el.addEventListener("pointerup", up, { passive: false });
        el.addEventListener("pointercancel", up, { passive: false });
        el.addEventListener("pointerleave", up, { passive: false });

        // Touch events (older WebViews / some emulators)
        el.addEventListener("touchstart", down, { passive: false });
        el.addEventListener("touchend", up, { passive: false });
        el.addEventListener("touchcancel", up, { passive: false });

        // Mouse fallback
        el.addEventListener("mousedown", down, { passive: false });
        el.addEventListener("mouseup", up, { passive: false });
        el.addEventListener("mouseleave", up, { passive: false });

        // Some WebViews fire a synthetic click after touch; swallow it.
        el.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); }, { passive: false });
    }

    function makeBtn(label, x, y) {
        const b = document.createElement("div");
        b.textContent = label;
        b.style.position = "fixed";
        b.style.left = `${x}px`;
        b.style.top = `${y}px`;
        b.style.width = `${BTN_SIZE}px`;
        b.style.height = `${BTN_SIZE}px`;
        b.style.lineHeight = `${BTN_SIZE}px`;
        b.style.textAlign = "center";
        b.style.borderRadius = "16px";
        b.style.background = `rgba(0,0,0,${OPACITY})`;
        b.style.color = "#fff";
        b.style.fontFamily = "sans-serif";
        b.style.fontSize = "16px";
        b.style.userSelect = "none";
        b.style.touchAction = "none"; // prevent scroll/gesture on buttons
        b.style.zIndex = 99999;
        b.style.pointerEvents = "auto";
        b.classList.add("vpad-control");
        return b;
    }

    function createOverlay() {
        if (document.getElementById("virtualpad-root")) return;

        const root = document.createElement("div");
        root.id = "virtualpad-root";
        root.style.position = "fixed";
        root.style.left = "0";
        root.style.top = "0";
        root.style.width = "100%";
        root.style.height = "100%";
        root.style.pointerEvents = "none"; // only the buttons capture input
        root.style.zIndex = 99998;
        document.body.appendChild(root);

        // Container for all controls (we toggle this as a whole for reliability)
        const controlsWrap = document.createElement("div");
        controlsWrap.id = "virtualpad-controls";
        controlsWrap.style.position = "fixed";
        controlsWrap.style.left = "0";
        controlsWrap.style.top = "0";
        controlsWrap.style.width = "100%";
        controlsWrap.style.height = "100%";
        controlsWrap.style.pointerEvents = "none"; // children enable their own events
        controlsWrap.style.zIndex = 99999;
        root.appendChild(controlsWrap);
        window.__VPAD_CONTROLS_WRAP__ = controlsWrap;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // D-pad bottom-left
        const baseX = GAP;
        const baseY = vh - (BTN_SIZE * 3 + GAP * 4);

        const up    = makeBtn("▲", baseX + BTN_SIZE + GAP, baseY);
        up.id = "vpad-up";
        const left  = makeBtn("◀", baseX, baseY + BTN_SIZE + GAP);
        left.id = "vpad-left";
        const down  = makeBtn("▼", baseX + BTN_SIZE + GAP, baseY + (BTN_SIZE + GAP) * 2);
        down.id = "vpad-down";
        const right = makeBtn("▶", baseX + (BTN_SIZE + GAP) * 2, baseY + BTN_SIZE + GAP);
        right.id = "vpad-right";

        // OK/Cancel bottom-right
        const ok     = makeBtn("OK", vw - (BTN_SIZE * 2 + GAP * 3), vh - (BTN_SIZE + GAP * 2));
        ok.id = "vpad-ok";
        const cancel = makeBtn("X",  vw - (BTN_SIZE + GAP * 2),     vh - (BTN_SIZE + GAP * 2));
        cancel.id = "vpad-cancel";

        // MENU button (opens RPG Maker menu like the default top-right)
        const menu = makeBtn("MENU", vw - (BTN_SIZE * 2 + GAP * 3), vh - (BTN_SIZE * 2 + GAP * 3));
        menu.id = "vpad-menu";
        menu.style.fontSize = "14px";

        [up, left, down, right, ok, cancel, menu].forEach(b => root.appendChild(b));

        // Toggle button (top-left) to show/hide the virtual controls
        const toggle = makeBtn("≡", GAP, GAP);
        toggle.id = "vpad-toggle";
        toggle.style.opacity = "0.75";
        toggle.style.fontSize = "20px";
        toggle.style.display = "flex";
        toggle.style.alignItems = "center";
        toggle.style.justifyContent = "center";
        toggle.style.padding = "0";
        toggle.classList.remove("vpad-control");

        // Persist visibility preference
        let vpadVisible = localStorage.getItem("vpadVisible");
        vpadVisible = (vpadVisible === null) ? "0" : vpadVisible;

        const controls = [up, left, down, right, ok, cancel, menu];

        function applyVisibility() {
            const show = vpadVisible === "1";
            const ids = ["vpad-up","vpad-left","vpad-down","vpad-right","vpad-ok","vpad-cancel"];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (!el) continue;
                el.style.display = show ? "block" : "none";
                el.style.pointerEvents = show ? "auto" : "none";
                el.style.visibility = show ? "visible" : "hidden";
            }
            // Toggle is always visible
            toggle.style.display = "block";
            toggle.style.pointerEvents = "auto";
            toggle.style.visibility = "visible";
            toggle.style.opacity = "0.85";
            toggle.innerHTML = show ? '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M6 9c-2.2 0-4 1.8-4 4 0 1.7 1.1 3.2 2.7 3.8l.9.3c.5.2 1 .1 1.4-.2l2-1.6c.3-.2.6-.3.9-.3h4.2c.3 0 .6.1.9.3l2 1.6c.4.3.9.4 1.4.2l.9-.3C20.9 16.2 22 14.7 22 13c0-2.2-1.8-4-4-4H6z"/><path d="M9 12H8v-1H7v1H6v1h1v1h1v-1h1z" fill="#000000"/><circle cx="16.2" cy="12.1" r="0.9" fill="#000000"/><circle cx="18.4" cy="11.2" r="0.7" fill="#000000"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14h10"/><path d="M8.5 10.5h.01"/><path d="M15.5 10.5h.01"/><path d="M6 9c-2.2 0-4 1.8-4 4 0 1.7 1.1 3.2 2.7 3.8l.9.3c.5.2 1 .1 1.4-.2l2-1.6c.3-.2.6-.3.9-.3h4.2c.3 0 .6.1.9.3l2 1.6c.4.3.9.4 1.4.2l.9-.3C20.9 16.2 22 14.7 22 13c0-2.2-1.8-4-4-4H6z"/></svg>';
            toggle.style.fontSize = "14px";
            toggle.style.background = show ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.25)";
            vpadApplyMenuVisibility();
            console.log("VPAD toggle ->", show ? "show" : "hide");
        }

        function vpadShouldShowMenu() {
            // Match the default map menu button behavior as closely as practical
            const scene = SceneManager._scene;
            if (!scene || typeof Scene_Map === "undefined" || !(scene instanceof Scene_Map)) return false;
            if (typeof $gameSystem !== "undefined" && $gameSystem && !$gameSystem.isMenuEnabled()) return false;
            if (typeof $gameMessage !== "undefined" && $gameMessage && $gameMessage.isBusy()) return false;
            // When touch UI is disabled, the default on-screen menu button doesn't exist
            if (typeof ConfigManager !== "undefined" && ConfigManager && !ConfigManager.touchUI) return false;
            // Scene_Map has an isMenuEnabled() helper we can reuse when available
            if (scene.isMenuEnabled && !scene.isMenuEnabled()) return false;
            return true;
        }

        function vpadApplyMenuVisibility() {
            const menuEl = document.getElementById("vpad-menu");
            if (!menuEl) return;
            const showControls = vpadVisible === "1";
            const showMenu = showControls && vpadShouldShowMenu();
            menuEl.style.display = showMenu ? "block" : "none";
            menuEl.style.pointerEvents = showMenu ? "auto" : "none";
            menuEl.style.visibility = showMenu ? "visible" : "hidden";
        }


        function toggleVisibilitySafe() {
            try {
                const now = Date.now();
                if (window.__VPAD_LAST_TOGGLE__ && now - window.__VPAD_LAST_TOGGLE__ < 250) return;
                window.__VPAD_LAST_TOGGLE__ = now;
                vpadCancelTouchInput();
                vpadVisible = (vpadVisible === "1") ? "0" : "1";
                localStorage.setItem("vpadVisible", vpadVisible);
                applyVisibility();

        toggle.addEventListener("pointerdown", (e) => { e.preventDefault(); e.stopPropagation(); toggleVisibilitySafe(); }, { passive: false });
        toggle.addEventListener("touchstart", (e) => { e.preventDefault(); e.stopPropagation(); toggleVisibilitySafe(); }, { passive: false });
        toggle.addEventListener("mousedown", (e) => { e.preventDefault(); e.stopPropagation(); toggleVisibilitySafe(); }, { passive: false });
        toggle.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); }, { passive: false });
            } catch (err) {
                console.log("VPAD toggle error:", err);
            }
        }

        // MENU action
        function openMenu(e) {
            e.preventDefault();
            e.stopPropagation();
            vpadCancelTouchInput();

            // Prefer scene's own menu call when available
            const scene = SceneManager._scene;
            if (scene && typeof scene.callMenu === "function") {
                scene.callMenu();
                return;
            }
            // Fallback: push Scene_Menu (works from map)
            if (typeof Scene_Menu !== "undefined") {
                SceneManager.push(Scene_Menu);
            }
        }

        // Bind toggle and menu
        // Place toggle outside the root (some WebViews don't deliver events to children of a pointerEvents:none root)
        const existingToggle = document.getElementById("virtualpad-toggle");
        if (existingToggle) existingToggle.remove();
        toggle.id = "virtualpad-toggle";
        toggle.style.zIndex = 100001;
        document.body.appendChild(toggle);
        applyVisibility();

        // Bind toggle using the same handler style as the working buttons
        bindPress(toggle, () => toggleVisibilitySafe(), () => {});
        // Extra fallback: swallow synthetic click and still toggle
        toggle.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); }, { passive: false });

        menu.addEventListener("pointerdown", openMenu, { passive: false });
        menu.addEventListener("touchstart", openMenu, { passive: false });
        menu.addEventListener("mousedown", openMenu, { passive: false });
        menu.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); }, { passive: false });

        // Safely hook Scene_Map.update once Scene_Map exists (avoids ReferenceError on boot)
        function vpadEnsureMenuSyncHook() {
            if (window.__VPAD_MENU_SYNC_HOOKED__) return;
            if (typeof Scene_Map === "undefined" || !Scene_Map.prototype) return;
            const _Scene_Map_update = Scene_Map.prototype.update;
            Scene_Map.prototype.update = function() {
                _Scene_Map_update.call(this);
                try { vpadApplyMenuVisibility(); } catch (e) {}
            };
            window.__VPAD_MENU_SYNC_HOOKED__ = true;
        }

        // Try to hook now, and keep trying briefly during boot
        vpadEnsureMenuSyncHook();
        let _vpadHookTries = 0;
        const _vpadHookTimer = setInterval(() => {
            _vpadHookTries++;
            vpadEnsureMenuSyncHook();
            if (window.__VPAD_MENU_SYNC_HOOKED__ || _vpadHookTries > 200) clearInterval(_vpadHookTimer);
        }, 100);



        bindPress(up,    () => setInput("up", true),     () => setInput("up", false));
        bindPress(down,  () => setInput("down", true),   () => setInput("down", false));
        bindPress(left,  () => setInput("left", true),   () => setInput("left", false));
        bindPress(right, () => setInput("right", true),  () => setInput("right", false));

        bindPress(ok,     () => setInput("ok", true),     () => setInput("ok", false));
        bindPress(cancel, () => setInput("cancel", true), () => setInput("cancel", false));
    }

    // Initialize when the DOM/game is actually ready (works even if SceneManager.run already happened)

function tryInit() {
        if (!document.body || typeof Input === "undefined") return false;
        const hasCanvas = document.querySelector("canvas");
        if (!hasCanvas) return false;
        createOverlay();

        return true;
    }

    let tries = 0;
    const timer = setInterval(() => {
        tries++;
        if (tryInit() || tries > 200) { // ~20 seconds max
            clearInterval(timer);
        }
    }, 100);

    // Rebuild on rotation/resize
    window.addEventListener("resize", () => {
        const root = document.getElementById("virtualpad-root");
        if (root) root.remove();
        createOverlay();
    });
})();

