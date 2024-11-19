"use strict";
let currentCount = 0;
const countLabel = document.querySelector(".count");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const type = e.currentTarget.classList;
    if (type.contains("decrement")) {
      currentCount--;
    } else if (type.contains("increment")) {
      currentCount++;
    } else if (type.contains("reset")) {
      currentCount = 0;
    }

    if (currentCount < 0) {
      countLabel.style.color = "green";
      countLabel.style.opacity = 0.5;
    } else if (currentCount > 0) {
      countLabel.style.color = "red";
      countLabel.style.opacity = 0.5;
    } else {
      countLabel.style.color = "gray";
    }
    countLabel.textContent = currentCount;
  });
});

// const incrementBtn = document.querySelector(".increment");
// const resetBtn = document.querySelector(".reset");
// const decrementBtn = document.querySelector(".decrement");
// const countLabel = document.querySelector(".count");

// let currentCount = 0;
// const updateCountLabel = () => {
//   countLabel.textContent = currentCount;
// };

// incrementBtn.addEventListener("click", () => {
//   currentCount++;
//   updateCountLabel();
// });
// resetBtn.addEventListener("click", () => {
//   currentCount = 0;
//   updateCountLabel();
// });
// decrementBtn.addEventListener("click", () => {
//   currentCount--;
//   updateCountLabel();
// });
