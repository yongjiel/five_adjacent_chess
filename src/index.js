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

/*
class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render(value) {
    return (
      //<button className="square" onClick={() => alert('click ' + this.props.value)} >
      //  {this.props.value}
      <button className="square" onClick={ () => this.props.onClick() }>
        {this.props.value}
      </button>
    );
  }
}
*/

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


