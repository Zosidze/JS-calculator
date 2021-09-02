const container = document.getElementById("calculator");
const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttonsContainer");
display.value = "";
display.calcValue = "";

const calculate = (value) => {
  const sum = (a, b) => parseFloat(a) + parseFloat(b);
  const substract = (a, b) => parseFloat(a) - parseFloat(b);
  const divide = (a, b) => parseFloat(a) / parseFloat(b);
  const multiply = (a, b) => parseFloat(a) * parseFloat(b);
  const pow = (a, b) => parseFloat(a) ** parseFloat(b);
  const sqrt = (a) => Math.sqrt(a);

  let toCalc = typeof value === "string" ? value.split("|") : value;

  const removeAround = (i) => {
    toCalc.splice(i + 1, 1);
    toCalc.splice(i - 1, 1);
  };

  if (toCalc.includes("^")) {
    toCalc.forEach((num, i) => {
      if (num === "^") {
        toCalc[i] = pow(toCalc[i - 1], toCalc[i + 1]);
        removeAround(i);
      }
    });
  }

  if (toCalc.includes("*")) {
    toCalc.forEach((num, i) => {
      if (num === "*") {
        toCalc[i] = multiply(toCalc[i - 1], toCalc[i + 1]);
        removeAround(i);
      }
    });
  }

  if (toCalc.includes("/")) {
    toCalc.forEach((num, i) => {
      if (num === "/") {
        toCalc[i] = divide(toCalc[i - 1], toCalc[i + 1]);
        removeAround(i);
      }
    });
  }
  if (toCalc.includes("+")) {
    toCalc.forEach((num, i) => {
      if (num === "+") {
        toCalc[i] = sum(toCalc[i - 1], toCalc[i + 1]);
        removeAround(i);
      }
    });
  }
  if (toCalc.includes("-")) {
    toCalc.forEach((num, i) => {
      if (num === "-") {
        toCalc[i] = substract(toCalc[i - 1], toCalc[i + 1]);
        removeAround(i);
      }
    });
  }
  if (toCalc.length === 1) {
    return toCalc[0];
  } else {
    return calculate(toCalc);
  }
};

const calc = () => {
  try {
    display.value = calculate(display.calcValue);
    console.log(eval(display.value));
  } catch (e) {
    display.value = "ERR";
  }
};

const clear = () => {
  display.value = "";
  display.calcValue = "";
};

display.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    calc();
  }
});

const buttons = [
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: "|/|" },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: "|*|" },
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: "|+|" },
  {
    value: "C",
    onclick: () => clear(),
  },
  { value: 0 },
  {
    value: "=",
    onclick: () => calc(),
  },
  { value: "|-|" },
  { value: "00" },
  { value: "." },
  { value: "|^|" },
  { value: "|√|" },
];

(() => {
  buttons.forEach((b) => {
    const button = document.createElement("button");
    const value =
      typeof b.value === "string" ? b.value.split("|").join("") : b.value;
    const calcValue = b.value;

    button.innerHTML = value;

    button.className = "button";
    button.onclick = b.onclick
      ? b.onclick
      : () => {
          display.value += value;
          display.calcValue += calcValue;
        };

    buttonsContainer.appendChild(button);
  });

  container.appendChild(buttonsContainer);
})();
