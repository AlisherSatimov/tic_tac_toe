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
      alert("bu bosilgan");
    } else {
      clickedCells[cell] = true;
      let mark = document.createElement(acc % 2 == 0 ? "i" : "div");

      if (acc % 2 == 0) {
        mark.classList.add("fa-solid", "fa-xmark");
      } else {
        mark.classList.add("nol");
      }

      element.appendChild(mark);
      acc++;

      winPatterns.forEach((pattern) => {
        let cells = pattern.map((selector) => document.querySelector(selector));
        if (cells.every((cell) => cell.innerHTML.includes("fa-xmark"))) {
          cells.forEach((cell) => (cell.style.backgroundColor = "aqua"));
        } else if (cells.every((cell) => cell.innerHTML.includes("nol"))) {
          cells.forEach((cell) => (cell.style.backgroundColor = "red"));
        }
      });
    }
  });
});
