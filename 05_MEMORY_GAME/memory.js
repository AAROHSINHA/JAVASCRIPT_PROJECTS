"use strict";
/*
0 1 2
3 4 5
*/
const resetBtn = document.querySelector(".reset-btn");
const imgs = document.querySelectorAll(".img");
var tapSound = new Audio("tap-notification-180637.mp3");
var wrongSound = new Audio("wrong-buzzer-6268.mp3");
var winSound = new Audio(
  "short-success-sound-glockenspiel-treasure-video-game-6346.mp3"
);

// 4 card game only right now
const images = ["memory/bug.png", "memory/snail.png"];
const imageAdd = ["url('bug.png')", "url('bee.png')", "url('snail.png')"];
const snailPos = [0, 2];
const beePos = [1, 5];
const bugPos = [3, 4];
let position = new Map([
  [0, 2],
  [2, 0],
  [1, 5],
  [5, 1],
  [3, 4],
  [4, 3],
]);

const addImg = (imgAddress, array, newClass) => {
  for (let i = 0; i < array.length; i += 1) {
    // imgs[array[i]].style.backgroundImage = imgAddress;
    imgs[array[i]].classList.add(newClass);
  }
};
let counter = 0;
for (let i = 0; i < imgs.length; i += 1) {
  imgs[i].setAttribute("id", `img${i}`);
}

addImg("url('bug.png')", bugPos, "bug");
addImg("url('bee.png')", beePos, "bee");
addImg("url('snail.png')", snailPos, "snail");

// MAIN GAME LOGIC

const addImageOnClick = (where, whichImage) => {
  where.style.transform = "scale(1.2)";
  where.style.border = "1px solid gray";
  where.style.transform = "rotateY(180deg)";
  setTimeout(() => {
    where.style.backgroundImage = whichImage;
    where.style.transition = "transform 0.5s";
    where.style.transform = "rotateY(180deg)";
  }, 90);
};

const checkAddImage = (classes, image) => {
  if (classes.contains("bug")) {
    addImageOnClick(image, imageAdd[0]);
  } else if (classes.contains("snail")) {
    addImageOnClick(image, imageAdd[2]);
  } else if (classes.contains("bee")) {
    addImageOnClick(image, imageAdd[1]);
  }
};

console.log(imgs);

let firstImageSelected = false;
let secondImageSelected = false;
let winCount = 0;
let firstImageClass = "";
let firstImageId = "";

imgs.forEach((image) => {
  image.addEventListener("click", () => {
    if (!firstImageSelected && !secondImageSelected) {
      tapSound.play();
      let classes = image.classList;
      firstImageId = image.id;

      if (classes.contains("bug")) {
        addImageOnClick(image, imageAdd[0]);
        firstImageClass = "bug";
      } else if (classes.contains("bee")) {
        addImageOnClick(image, imageAdd[1]);
        firstImageClass = "bee";
      } else if (classes.contains("snail")) {
        addImageOnClick(image, imageAdd[2]);
        firstImageClass = "snail";
      }

      firstImageSelected = true;
    } else if (firstImageSelected && !secondImageSelected) {
      tapSound.play();
      if (image.id != firstImageId) {
        checkAddImage(image.classList, image);
        // both images are same
        if (image.classList.contains(firstImageClass)) {
          winSound.play();
          console.log("same");
          winCount++;
        }
        // both are diffrent
        else {
          setTimeout(() => {
            wrongSound.play();
            let prevImg = document.getElementById(firstImageId);
            image.style.transform = "rotateY(0deg)";
            image.style.border = "1px solid gray";
            prevImg.style.transform = "rotateY(0deg)";
            prevImg.style.border = "1px solid gray";

            setTimeout(() => {
              image.style.backgroundImage = "none";
              prevImg.style.backgroundImage = "none";
            }, 140);
          }, 500);
        }

        firstImageSelected = false;
      }
    }

    if (winCount == 3) {
      setTimeout(() => {
        document.querySelector(".MAIN").style.backgroundColor = "#28A745";
      }, 200);
      // document.querySelector(".MAIN").style.backgroundColor = "white";
    }
  });
});

/*
imgs.forEach((image) => {
  image.addEventListener("click", (e) => {
    if (!firstImageSelected && !secondImageSelected) {
      let classes = image.classList;
      checkAddImage(classes, image);
      firstImageSelected = true;

      if (classes.contains("bug")) firstImageClass = "bug";
      else if (classes.contains("bee")) firstImageClass = "bee";
      else if (classes.contains("snail")) firstImageClass = "snail";
    } else if (firstImageSelected && !secondImageSelected) {
      let classes = image.classList;
      checkAddImage(classes, image);
      secondImageSelected = true;

      // same images condition
      if (classes.contains(firstImageClass)) {
        alert("THIS ONE IS CORRECT");
      }
      // diffrent image condition
      else {
      }
    } else {
      console.log("bothh no");
    }
  });
});

*/

resetBtn.addEventListener("click", () => {
  firstImageSelected = false;
  secondImageSelected = false;
  imgs.forEach((image) => {
    image.style.backgroundImage = "none";
    // image.style.border = "none";
    image.style.transform = "none";
    image.style.transform = "rotateY(0deg)";
    document.querySelector(".MAIN").style.backgroundColor = "#262626";
    winCount = 0;
  });
});
