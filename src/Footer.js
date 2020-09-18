import React from "react";
import "./index.css";

function Footer() {
  return (
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <div className="ml-6 pt-1">
        <h4 className="text-2xl text-blue-700 leading-tight">Game Rule:</h4>
        <p>
          This game should be played by two people. <br /> Each person has his
          own char to fill the boxes. <br />
          Each time each person in turn fills in one box which <br />
          is empty in the board. If 5 continous same chars <br />
          are in a same diretion like, vertical, horizontal, <br />
          diagonal, that person will win the game.
        </p>
      </div>
      <br />
      <br />
      This is the start page for the web app. my-app/public/index.html in
      development mode. Source code can be located at{" "}
      <a href="https://github.com/yongjiel/five_adjacent_chest"> Git </a>
    </div>
  );
}

// Must export!
export default Footer;
