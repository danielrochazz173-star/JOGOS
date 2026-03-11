(function () {
  window.showPrize = function (achievement) {
    var overlay = document.getElementById("prize-overlay");
    if (!overlay) return;
    var achEl = document.getElementById("prize-achievement");
    if (achEl && achievement) achEl.textContent = achievement;
    overlay.classList.add("visible");
  };
})();
