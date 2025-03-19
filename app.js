// === O'yinchilar va raund ma'lumotlari ===

let first_player = document.querySelector(".first_player");
let second_player = document.querySelector(".second_player");

let winner = document.querySelector(".winner");

let current_round = document.querySelector(".current_round");
let total_round = document.querySelector(".total_round");

let fp_ball = document.querySelector(".fp_ball");
let sp_ball = document.querySelector(".sp_ball");

// === Modal oynalar ===

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function saveData() {
  let firstPlayerInput = document.getElementById("firstPlayerName");
  let secondPlayerInput = document.getElementById("secondPlayerName");
  let roundCountInput = document.getElementById("roundCount");

  // === Xatoliklarni tekshirish ===
  if (!firstPlayerInput || !secondPlayerInput || !roundCountInput) {
    console.error("Kiritish maydonlari topilmadi!");
    return;
  }

  if (
    !firstPlayerInput.value ||
    !secondPlayerInput.value ||
    !roundCountInput.value
  ) {
    alert("Barcha maydonlarni to'ldiring!");
    return;
  }

  first_player.textContent = firstPlayerInput.value;
  second_player.textContent = secondPlayerInput.value;
  total_round.textContent = roundCountInput.value;

  closeModal();
}

// === Tic-Tac-Toe o'yini ===

let cells = [
  "bir",
  "ikki",
  "uch",
  "tort",
  "besh",
  "olti",
  "yetti",
  "sakkiz",
  "toqqiz",
];

let winPatterns = [
  [".bir", ".ikki", ".uch"],
  [".tort", ".besh", ".olti"],
  [".yetti", ".sakkiz", ".toqqiz"],
  [".bir", ".tort", ".yetti"],
  [".ikki", ".besh", ".sakkiz"],
  [".uch", ".olti", ".toqqiz"],
  [".bir", ".besh", ".toqqiz"],
  [".uch", ".besh", ".yetti"],
];

let acc = 0;
let clickedCells = {};

// === Har bir katakka event qo'shish ===
cells.forEach((cell) => {
  let element = document.querySelector(`.${cell}`);

  clickedCells[cell] = false;

  element.addEventListener("click", () => {
    if (clickedCells[cell]) return;

    clickedCells[cell] = true;
    let mark = document.createElement(acc % 2 === 0 ? "i" : "div");

    if (acc % 2 === 0) {
      mark.classList.add("fa-solid", "fa-xmark");
      first_player.classList.toggle("queue_x");
      second_player.classList.toggle("queue_nol");
    } else {
      mark.classList.add("nol");
      first_player.classList.toggle("queue_x");
      second_player.classList.toggle("queue_nol");
    }

    element.appendChild(mark);
    acc++;

    checkWinCondition();
  });
});

// === G'alabani tekshirish funksiyasi ===

function checkWinCondition() {
  let winnerFound = false;

  winPatterns.forEach((pattern) => {
    let cells = pattern.map((selector) => document.querySelector(selector));

    if (cells.every((cell) => cell.innerHTML.includes("fa-xmark"))) {
      updateScore("X");
      winnerFound = true;
    } else if (cells.every((cell) => cell.innerHTML.includes("nol"))) {
      updateScore("O");
      winnerFound = true;
    }
  });

  if (!winnerFound) checkDraw();
}

// === Hisobni yangilash funksiyasi ===

function updateScore(winnerSymbol) {
  if (!fp_ball || !sp_ball) {
    console.error("fp_ball yoki sp_ball elementi topilmadi!");
    return;
  }

  if (winnerSymbol === "X") {
    fp_ball.textContent = Number(fp_ball.textContent) + 1;
    showWinnerOrNextRound("Bu raund X yutdi");
  } else if (winnerSymbol === "O") {
    sp_ball.textContent = Number(sp_ball.textContent) + 1;
    showWinnerOrNextRound("Bu raund 0 yutdi");
  }
}

// === Durrangni tekshirish funksiyasi ===

function checkDraw() {
  let tableIsFull = Object.values(clickedCells).every((cell) => cell);

  if (tableIsFull) {
    document.querySelector(".round_winner").textContent =
      "Bu raund Durrang bo'ldi";
    document.querySelector(".nextRoundModal").style.display = "flex";
  }
}

// === O'yinni tugatish yoki yangi raundga o'tish ===

function showWinnerOrNextRound(round_winner) {
  if (Number(current_round.textContent) < Number(total_round.textContent)) {
    document.querySelector(".nextRoundModal").style.display = "flex";
    document.querySelector(".round_winner").textContent = round_winner;
  } else {
    let fpScore = Number(fp_ball.textContent);
    let spScore = Number(sp_ball.textContent);

    if (fpScore > spScore) {
      winner.textContent = `${first_player.textContent} yutdi`;
    } else if (fpScore < spScore) {
      winner.textContent = `${second_player.textContent} yutdi`;
    } else {
      winner.textContent = "durrang";
    }

    document.querySelector(".winnerModal").style.display = "flex";
  }
}

// === Yangi raundni boshlash ===

function nextRound() {
  document.querySelectorAll(".box").forEach((box) => {
    box.innerHTML = "";
    box.style.backgroundColor = "white";
  });

  cells.forEach((cell) => {
    clickedCells[cell] = false;
  });

  acc = Number(current_round.textContent) % 2 === 0 ? 1 : 0;

  first_player.classList.toggle("queue_x", acc % 2 === 0);
  second_player.classList.toggle("queue_nol", acc % 2 !== 0);
}

// === Keyingi raund tugmachasi uchun event ===

document.querySelector(".next_round_btn").addEventListener("click", () => {
  if (Number(current_round.textContent) < Number(total_round.textContent)) {
    current_round.textContent = Number(current_round.textContent) + 1;
    nextRound();
  } else {
    showWinnerOrNextRound();
  }

  document.querySelector(".nextRoundModal").style.display = "none";
});
