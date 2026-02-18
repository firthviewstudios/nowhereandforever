(() => {
    const hideFPS = () => {
        const fps = document.querySelector('#fpsMeter');
        if (fps) {
            fps.style.setProperty('display', 'none', 'important');
            clearInterval(checkFPS); // stop checking once hidden
        }
    };
    // check every 50ms until the FPS overlay exists
    const checkFPS = setInterval(hideFPS, 50);
})();