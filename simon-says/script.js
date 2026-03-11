const colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let gameStarted = false;

document.getElementById("start-btn").addEventListener("pointerup", startGame);

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    level = 0;
    gamePattern = [];
    userPattern = [];
    nextSequence();
  }
}

function nextSequence() {
  userPattern = [];
  level++;
  document.getElementById("level-num").textContent = level;

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gamePattern.push(randomColor);

  animateSequence();
}

function animateSequence() {
  let i = 0;
  const interval = setInterval(() => {
    flashButton(gamePattern[i]);
    i++;
    if (i === gamePattern.length) {
      clearInterval(interval);
      enableUserInput();
    }
  }, 600);
}

function flashButton(color) {
  const button = document.getElementById(color);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 300);
}

function enableUserInput() {
  colors.forEach((color) => {
    document.getElementById(color).addEventListener("pointerup", handleUserClick);
  });
}

function disableUserInput() {
  colors.forEach((color) => {
    document.getElementById(color).removeEventListener("pointerup", handleUserClick);
  });
}

function handleUserClick(event) {
  const clickedColor = event.currentTarget.id;
  userPattern.push(clickedColor);
  flashButton(clickedColor);
  checkAnswer(userPattern.length - 1);
}

function checkAnswer(currentIndex) {
  if (userPattern[currentIndex] === gamePattern[currentIndex]) {
    if (userPattern.length === gamePattern.length) {
      disableUserInput();
      setTimeout(() => {
        if (level >= 8) {
          showPrize("Nivel " + level + " concluido!");
          return;
        }
        showCongratsMessage();
        setTimeout(() => {
          hideCongratsMessage();
          nextSequence();
        }, 2000);
      }, 800);
    }
  } else {
    const correctColor = gamePattern[userPattern.length - 1];
    const colorNames = { green: "Verde", red: "Vermelho", yellow: "Amarelo", blue: "Azul" };
    showLoseMessage("Errou! A cor certa era " + (colorNames[correctColor] || correctColor) + ".");
    setTimeout(() => {
      hideLoseMessage();
    }, 2500);
    gameStarted = false;
    level = 0;
    gamePattern = [];
    document.getElementById("level-num").textContent = "-";
  }
}

function showMessage(text, color) {
  const el = document.getElementById("level-message");
  el.textContent = text;
  el.style.color = color || "#6ee7b7";
  el.classList.add("show");
}

function hideMessage() {
  document.getElementById("level-message").classList.remove("show");
}

function showCongratsMessage() {
  showMessage("Parabens! Voce passou o nivel " + level + "!", "#6ee7b7");
}

function hideCongratsMessage() {
  hideMessage();
}

function showLoseMessage(msg) {
  showMessage(msg, "#f87171");
}

function hideLoseMessage() {
  hideMessage();
}
