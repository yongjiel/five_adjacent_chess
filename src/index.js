/*
Change the rule of this game.
Not entire row or column or diagnol
line with all same char. 
Instead with adjacent 5 same chars 
will win the game.
This is also named in Chinese chest 'Five finger chest'.
*/


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game.js';


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


