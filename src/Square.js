import React from 'react';
import './index.css';

function Square(props) {
  var blue_color = props.match? "blue": "white"
  return (
    <button className="square" onClick={props.onClick} 
       style={{backgroundColor: blue_color}}
    >
      {props.value}
    </button>
  );
}

// Must export!
export default Square;