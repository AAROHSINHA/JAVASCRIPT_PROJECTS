"use strict";

// logic -
/*
--> Encrypter
1. Get the input 
2. add the mappings and ASCII LOGIC
3. reverse
*/

// Variables
const encrypterTextArea = document.querySelector(".encrypter-text");
const decrypterTextArea = document.querySelector(".decrypted-text");
const encryptBtn = document.querySelector(".encrypt");
const decryptBtn = document.querySelector(".decrypt");
const saveBtn = document.querySelector(".save-btn");
const copyBtn = document.querySelectorAll(".copy");

// mapping
const Mappings = {
  A: "P",
  P: "A",
  B: "Y",
  Y: "B",
  C: "L",
  L: "C",
  D: "Q",
  Q: "D",
  E: "R",
  R: "E",
  F: "M",
  M: "F",
  G: "T",
  T: "G",
  H: "W",
  W: "H",
  I: "S",
  S: "I",
  J: "V",
  V: "J",
  K: "X",
  X: "K",
  N: "Z",
  Z: "N",
  O: "U",
  U: "O",
  a: "z",
  z: "a",
  b: "y",
  y: "b",
  c: "x",
  x: "c",
  d: "w",
  w: "d",
  e: "v",
  v: "e",
  f: "u",
  u: "f",
  g: "t",
  t: "g",
  h: "s",
  s: "h",
  i: "r",
  r: "i",
  j: "q",
  q: "j",
  k: "p",
  p: "k",
  l: "o",
  o: "l",
  m: "n",
  n: "m",
};

// 1. copy logic
copyBtn.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const target = e.currentTarget.classList;
    if (target.contains("enc-copy")) {
      encrypterTextArea.select();
      document.execCommand("Copy");
    } else if (target.contains("dec-copy")) {
      decrypterTextArea.select();
      document.execCommand("Copy");
    }
  });
});

// function to encrypt text
const EncrypterMethod = (content) => {
  let output = "";
  for (let i = 0; i < content.length; i++) {
    let asciiValue = content[i].charCodeAt(0);
    if (
      (asciiValue >= 65 && asciiValue <= 90) ||
      (asciiValue >= 97 && asciiValue <= 122)
    ) {
      output += Mappings[content[i]];
    } else {
      if (asciiValue == 0) {
        output += arr[i];
      } else {
        output += String.fromCharCode(asciiValue + 1);
      }
    }
  }
  // reverse
  output = output.split("").reverse().join("");
  return output;
};

// 1. Encrypt Text
encryptBtn.addEventListener("click", () => {
  const TextToEncrypt = encrypterTextArea.value;
  if (TextToEncrypt == "") {
    alert("Enter Some Text Please!!!");
    return;
  }
  const output_text = EncrypterMethod(TextToEncrypt);

  // adding this to decoded textarea
  console.log(output_text);
  decrypterTextArea.value = output_text;
});

// function to decrypt
const DecrypterMethod = (content) => {
  content = content.split("").reverse().join("");
  let output = "";
  for (let i = 0; i < content.length; i++) {
    let asciiValue = content[i].charCodeAt(0);
    if (
      (asciiValue >= 65 && asciiValue <= 90) ||
      (asciiValue >= 97 && asciiValue <= 122)
    ) {
      output += Mappings[content[i]];
    } else {
      if (asciiValue == 0) {
        output += arr[i];
      } else {
        output += String.fromCharCode(asciiValue - 1);
      }
    }
  }
  return output;
};

// 2. Decrypt Text
decryptBtn.addEventListener("click", () => {
  const TextToDecrypt = encrypterTextArea.value;
  if (TextToDecrypt == "") {
    alert("Enter Some Text Please!!!");
    return;
  }
  const output_text = DecrypterMethod(TextToDecrypt);
  console.log(output_text);
  // adding this to decoded textarea
  console.log(output_text);
  decrypterTextArea.value = output_text;
});

// SAVE BUTTON
saveBtn.addEventListener("click", () => {
  const content_to_save = decrypterTextArea.value;
  if (content_to_save == "") {
    alert("NOTHING TO SAVE!!");
    return;
  }

  var data_string = JSON.stringify(content_to_save);
  var file = new Blob([data_string], { type: "text" });
  var anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(file);
  anchor.download = "save.txt";
  anchor.click();
});
