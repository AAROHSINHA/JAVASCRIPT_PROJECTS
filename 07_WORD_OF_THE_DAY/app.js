"use strict";

// Elements
const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const word = document.querySelector(".word");
const attribute = document.querySelector(".attribute");
const meaning = document.querySelector(".meaning");
const example = document.querySelector(".example");

// const api_key = "https://api.dictionaryapi.dev/api/v2/entries/en/tranquil";
// const request = fetch(api_key); // This gives a promise

/*
request
  .then((response) => {
    console.log(response);
    return response.json(); // provides json output as a promise. returns a promise so new then needed
  })
  .then((data) => {
    console.log(data);
    console.log(data[0]);
    console.log(data.meanings);
  });
*/

searchBtn.addEventListener("click", () => {
  const searchedWord = searchBar.value;
  if (!searchedWord) return;
  word.textContent = searchedWord;
  const api_key = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`;
  const request = fetch(api_key);
  searchBar.textContent = "";
  // promises
  request
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // attribute
      const attributes = data[0].meanings.map((obj) => obj.partOfSpeech);
      attribute.textContent = attributes.join(" / ");

      // meaning
      meaning.textContent = data[0].meanings[0].definitions[0].definition;
    });
});
