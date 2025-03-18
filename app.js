// Players info

let first_player = document.querySelector(".first_player");
let second_player = document.querySelector(".second_player");

let winner = document.querySelector(".winner");

// rounds info

let current_raund = document.querySelector(".current_raund");
let total_raund = document.querySelector(".total_raund");

// result info

let fp_ball = document.querySelector(".fp_ball");
let sp_ball = document.querySelector(".sp_ball");

// modal

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function saveData() {
  first_player.textContent = document.getElementById("firstPlayerName").value;
  second_player.textContent = document.getElementById("secondPlayerName").value;
  total_raund.textContent = document.getElementById("raundCount").value;

  closeModal();
}

// tic tac toe

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
  [".bir", ".ikki", ".uch"], // Gorizontal 1-qator
  [".tort", ".besh", ".olti"], // Gorizontal 2-qator
  [".yetti", ".sakkiz", ".toqqiz"], // Gorizontal 3-qator
  [".bir", ".tort", ".yetti"], // Vertikal 1-ustun
  [".ikki", ".besh", ".sakkiz"], // Vertikal 2-ustun
  [".uch", ".olti", ".toqqiz"], // Vertikal 3-ustun
  [".bir", ".besh", ".toqqiz"], // Diagonal chapdan o‘ngga
  [".uch", ".besh", ".yetti"], // Diagonal o‘ngdan chapga
];

let acc = 0;
let clickedCells = {};

cells.map((cell) => {
  let element = document.querySelector(`.${cell}`);

  clickedCells[cell] = false;

  element.addEventListener("click", () => {
    if (clickedCells[cell]) {
      ("");
    } else {
      clickedCells[cell] = true;
      let mark = document.createElement(acc % 2 == 0 ? "i" : "div");

      if (acc % 2 == 0) {
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

      winPatterns.forEach((pattern) => {
        let cells = pattern.map((selector) => document.querySelector(selector));
        if (cells.every((cell) => cell.innerHTML.includes("fa-xmark"))) {
          fp_ball.textContent = Number(fp_ball.textContent) + 1;
          cells.forEach((cell) => (cell.style.backgroundColor = "aqua"));
          if (
            Number(current_raund.textContent) < Number(total_raund.textContent)
          ) {
            document.querySelector(".nextRoundModal").style.display = "flex";
            document.querySelector(".round_winner").textContent =
              "Bu raund X yutdi";
          } else if (fp_ball.textContent > sp_ball.textContent) {
            winner.textContent = `${first_player.textContent} yutdi`;
            document.querySelector(".winnerModal").style.display = "flex";
          } else if (fp_ball.textContent < sp_ball.textContent) {
            winner.textContent = `${second_player.textContent} yutdi`;
            document.querySelector(".winnerModal").style.display = "flex";
          }
        } else if (cells.every((cell) => cell.innerHTML.includes("nol"))) {
          sp_ball.textContent = Number(sp_ball.textContent) + 1;
          cells.forEach((cell) => (cell.style.backgroundColor = "red"));
          if (
            Number(current_raund.textContent) < Number(total_raund.textContent)
          ) {
            document.querySelector(".nextRoundModal").style.display = "flex";
            document.querySelector(".round_winner").textContent =
              "Bu raund 0 yutdi";
          } else if (fp_ball.textContent > sp_ball.textContent) {
            winner.textContent = `${first_player.textContent} yutdi`;
            document.querySelector(".winnerModal").style.display = "flex";
          } else if (fp_ball.textContent < sp_ball.textContent) {
            winner.textContent = `${second_player.textContent} yutdi`;
            document.querySelector(".winnerModal").style.display = "flex";
          }
        } else {
          let tableIsFull = 0;

          for (const key in clickedCells) {
            if (clickedCells[key] == true) {
              tableIsFull++;
            }
            if (tableIsFull == 9) {
              document.querySelector(".round_winner").textContent =
                "Bu raund Durrang bo'ldi";

              document.querySelector(".nextRoundModal").style.display = "flex";
            }
          }
        }
      });
    }
  });
});

// clear table

let everyBox = document.querySelectorAll(".box");

let nextRound = () => {
  everyBox.forEach((box) => {
    box.innerHTML = "";

    box.style.backgroundColor = "white";
  });
  cells.map((cell) => {
    clickedCells[cell] = false;
  });
  clickedCells = {};
  acc = Number(current_raund.textContent) % 2 == 0 ? 1 : 0;

  if (acc % 2 == 0) {
    first_player.classList.remove("queue_x");
    second_player.classList.remove("queue_nol");

    first_player.classList.add("queue_x");
  } else {
    first_player.classList.remove("queue_x");
    second_player.classList.remove("queue_nol");

    second_player.classList.add("queue_nol");
  }
};

let next_round_btn = document.querySelector(".next_round_btn");

next_round_btn.addEventListener("click", () => {
  if (Number(current_raund.textContent) < Number(total_raund.textContent)) {
    current_raund.textContent = Number(current_raund.textContent) + 1;
  } else if (fp_ball.textContent > sp_ball.textContent) {
    winner.textContent = `${first_player.textContent} yutdi`;
    document.querySelector(".winnerModal").style.display = "flex";
  } else if (fp_ball.textContent < sp_ball.textContent) {
    winner.textContent = `${second_player.textContent} yutdi`;
    document.querySelector(".winnerModal").style.display = "flex";
  }
  nextRound();
  document.querySelector(".nextRoundModal").style.display = "none";
});
