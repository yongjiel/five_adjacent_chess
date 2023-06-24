import React, { useState } from 'react';
import './index.css';

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
// https://www.w3schools.com/react/react_usereducer.asp, about how to hoop up
// reducer in functional component.
function Square(props) {
  const [clicked, setClicked] = useState();
  var blue_color = props.match? "blue": "white";
  // should have the index attribue here of square.
  // the the onClick can take it as arg or param.
  var i = props.index;
  let v = props.value;
  function doClick() {
    // setClicked(v);  // Not the order issue with props.value update. It always
                       // happens like downstairs.
    props.onClick(i);
    //setClicked("A"); // it really able to follow up on time.
    setClicked(v);  // If want button's
                    // content follows up the update, it needs props.value,the
                    // update in this.state, and then reredner the content of the
                    // current button. v cannot follow up here since it is 
                    // only the previous state, not on time. After really click,
                    // it will follow up the new state.
    
  }

  return (
    <>
    <button className="square" onClick={ () => clicked ? undefined : doClick() } 
       style={{backgroundColor: blue_color}}
    >
      {v}
    </button>
    </>
  );
}

// Must export!
export default Square;