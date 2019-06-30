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
function Step(props) {
  var blue_color = props.i===props.current_step? "blue": "purple"
  return (
    <button 
            style={ {
                    fontWeight: props.bold1,
                    color: blue_color,
                  } } 
            onClick={ props.onClick}
    > 
      {props.order}, Step: {props.i}, current_step: {props.current_step},  Row: {props.current_location.row} Col: {props.current_location.col}
   </button>


  );
}

// Must export!
export default Step;