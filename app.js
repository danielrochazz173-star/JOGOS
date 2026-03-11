(function () {
  const fullBtn = document.getElementById("fullscreenBtn");

  if (!fullBtn) {
    return;
  }

  fullBtn.addEventListener("click", async function () {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      await document.documentElement.requestFullscreen();
    } catch (err) {
      console.error("Falha ao alternar tela cheia", err);
    }
  });
})();
