
import React from 'react';
import './index.css';
import Square from './Square.js';

class Board extends React.Component {
  renderSquare(i, match) {
    return (
      <Square 
          match={match}
          value={ this.props.squares[i] } 
          onClick={ () => this.props.onClick(i) } key={"Square#"+i}/>
    );
  }

  render() {
    // this part is crazy good for loop and close div tag
    const match = this.props.match;
    const row_c =  this.props.rows;
    var rows = [];
    for (var i = 0; i < row_c; i++) {
      rows.push(<div className="board-row" key={"row#"+i}/>);
      for (var j = 0; j < row_c; j++){
        let n = i * row_c + j;
        if (match.indexOf(n) > -1){
          rows.push(this.renderSquare(n, true));
        }else{
          rows.push(this.renderSquare(n, false));
        }
      }
      
    }

    return (
      <div >
         { rows }
      </div>
    );
  }
}


// Must export!
export default Board;