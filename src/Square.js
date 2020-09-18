import React, { useState, useEffect } from "react";
import "./index.css";

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

function Square(props) {
  return (
    <button className={"square" + props.is_blue_color ? 'blue' : '' }
      onClick={props.onClick} >
      {props.value}
    </button >
  );
}
*/
function Square(props) {
  // Create a new piece of state.
  // It comes with its own updater function!
  const [clicked, setClicked] = useState(false);

  function doClick() {
    props.onClick();
    setClicked(true);
  }

  function reset() {
    setClicked(false);
  }

  useEffect(() => {
    if (props.stepNumber === 0) {
      reset();
    }
  });

  return (
    <button
      className={"square " + (props.is_bule_color ? "blue" : "")}
      onClick={clicked ? undefined : doClick}
      //  disabled={clicked}
    >
      {props.value} {props.is_blue_color}
    </button>
  );
}

// Must export!
export default Square;
