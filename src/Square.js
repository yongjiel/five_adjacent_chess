import React from 'react';
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