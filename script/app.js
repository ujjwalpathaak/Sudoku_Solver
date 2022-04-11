var btn = document.getElementById("solve");

function changeColor() {
  if (btn.innerHTML == "Solve") {
    btn.innerHTML = "Solved";
    btn.style.backgroundColor = "green";
  } else if (btn.innerHTML == "Solved") {
    btn.innerHTML = "Solve";
    btn.style.backgroundColor = "#361500";
  }
  return false;
}

const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve");
const squares = 81;
let array = [];

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.classList.add("even-section");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", "0");
  inputElement.setAttribute("max", "9");

  if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
  ) {
    inputElement.classList.remove("even-section");
    inputElement.classList.add("odd-section");
  }
  puzzleBoard.appendChild(inputElement);
}

const joinValues = () => {
  array = [];
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    if (input.value) {
      array.push(input.value);
    } else {
      array.push(".");
    }
  });
  console.log(array);
};

function populate(isSolvable, solution) {
  const inputs = document.querySelectorAll("input");
  if (isSolvable && solution) {
    inputs.forEach((input, i) => {
      input.value = solution[i];
    });
    changeColor();
  }
  else
  {error();
  array = [];}
}
function solve() {
  joinValues();
  const data = array.join("");
  console.log("data", data);
  var options = {
    method: "POST",
    url: "https://solve-sudoku.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "solve-sudoku.p.rapidapi.com",
      "x-rapidapi-key": "ffe172e0c8msh5d05e5d8d5204e1p175331jsne6371894c470",
    },
    data: {
      puzzle: data,
    },
  };

  axios
    .request(options).then(function (response) {
      console.log(response.data);
      populate(response.data.solvable, response.data.solution);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function error() {
  btn.innerHTML = "Wrong Question !";
  btn.style.backgroundColor = "#ec2929";
  btn.style.width = "350px";
}
btn.addEventListener("click", solve);
