import React from "react";
import { useState, useEffect, useRef } from "react";

const Box = () => {
  const [riddle, setRiddle] = useState([]);
  const [currentRiddle, setCurrentRiddle] = useState(null);
  const [hasClicked, setHasClicked] = useState(false);
  const [score, setScore] = useState(-1);
  const [total, setTotal] = useState(-1);
  const [scoreColor, setScoreColor] = useState("green");
  const [title, setTitle] = useState("");
  const [riddleText, setRiddleText] = useState("");
  const [correctAnswer, setAnswer] = useState("");
  const [playerAnswer, setPlayerAnswer] = useState("");
  const inputRef = useRef(null);
  function updateScoreColor() {
    if (score > total / 2) {
      setScoreColor("green");
    } else {
      setScoreColor("red");
    }
  }

  // as we need to call the updateScoreColor everytime the score or total changes
  // we need to us the useEffect
  useEffect(() => {
    updateScoreColor();
  }, [score, total]);

  // api call
  useEffect(() => {
    const fetchRiddle = async () => {
      try {
        const response = await fetch("https://api.api-ninjas.com/v1/riddles", {
          method: "GET",
          headers: {
            "X-Api-Key": "ROoueMQwluXbIxoXfTDqwQ==YfkaBLHGxpl4mLN4",
          },
        });

        if (response.ok) {
          const riddle = await response.json();
          if (!hasClicked) {
            setTitle("START GAME!");
            setRiddleText("CLICK THE BUTTON TO START");
            setRiddle(riddle);
            setCurrentRiddle(riddle[0]);
            setHasClicked(true);
          } else {
            setCurrentRiddle(riddle[0]);
          }
          console.log(currentRiddle.answer);
          setTitle(currentRiddle.title);
          setRiddleText(currentRiddle.question);
          setAnswer(currentRiddle.answer);
        } else {
          setTitle("SERVER ISSUE");
          setRiddleText("SORRY FOR INCONVINIENCE");
        }
      } catch (error) {
        console.log("ERROR - ", error);
      }
    };
    fetchRiddle();
  }, [total]);

  // handle submit
  function handleSubmit() {
    inputRef.current.value = "";
    let userAnswer = playerAnswer;
    if (userAnswer.trim().toLowerCase() == correctAnswer.trim().toLowerCase()) {
      setScore(score + 1);
    }
    setTotal(total + 1);
  }

  return (
    <div className="w-[40em] h-[20em] bg-[#333333] rounded-2xl custom-shadow flex flex-col justify-center items-center">
      <div className="h-[12px] w-[36em]">
        {total >= 0 ? (
          <p
            className={`text-end text-xs font-thin tracking-[12px] text-${scoreColor}-500`}
          >
            {score}/{total}
          </p>
        ) : (
          <p></p>
        )}
      </div>
      <div className="w-[30em] h-[10em] text-white tracking-[5px] flex flex-col justify-center items-center font-semibold">
        <h3 className="text-red-400 tracking-[5px] m-3">{title}</h3>
        <p className="text-xs">{riddleText}</p>
      </div>
      {/* <p className="correct w-[20em] h-[16px] m-5 text-xs text-center text-gray-500 tracking-[12px]">
        CORRECT
      </p> */}
      <input
        type="text"
        className="m-3 bg-[#1a1a1a] outline-none pt-1 pb-1 pl-3 pr-3 text-xs w-50"
        onChange={(e) => setPlayerAnswer(e.target.value)}
        ref={inputRef}
      />
      <button
        className="bg-[#1a1a1a] w-[15em] h-[3em] text-white font-mono tracking-[4px] hover:text-gray-500 active:text-white"
        onClick={handleSubmit}
      >
        SUBMIT ANSWER!
      </button>
    </div>
  );
};

export default Box;
