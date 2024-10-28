"use strict";
const button = document.querySelector(".change-color");
const span = document.getElementsByTagName("span")[0];

// Function To Get Random Color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

// Implementing logic in Button
button.addEventListener("click", function () {
  let randomColor = getRandomColor();
  const body = document.querySelector("body");
  body.style.backgroundColor = randomColor;
  span.textContent = randomColor;
});
