import React from 'react';
//import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Board from './Board.js';
import Rows from './input_rows.js';
import GameProcesses from "./game_processes.js";

class Game extends React.Component {
  constructor(props) {
    super(props);

    let rows = props.rows; // 8 * 8 button matrix
    let win_rule = 5; // 5 adjacent buttons with same char.
    let lines = this.generate_win_lines(rows);
    
    this.state = {
      history: [{
        squares: Array(rows ** 2).fill(null),
      }], // initiate state of squares of the board and keep all the steps' states of all squares.
      xIsNext: true,
      stepNumber: 0,
      rows: rows, // also is the number of columns.
      locations: [{
        row: 0,
        col: 0,
      }],
      bold_step: -1,
      winner_stepNumber: -1,
      winner: null,
      match: [], // hold the square indices(linear in array) when win the game.
      lines: lines,
      win_rule: win_rule, 
    };
    // copying object is handy with ES6
    this.state_cp = {
      ...this.state
    };

    this.changeColorAndJumpTo = this.changeColorAndJumpTo.bind(this);
    this.restart = this.restart.bind(this);
  }

  generate_win_lines(rows){
    let lines = [];
    // row first, column second
    for (var i=0; i < rows; i++){
      var tmp = [];
      for(var j=0; j < rows; j++){
        tmp.push(j + i * rows);
      }
      lines.push(tmp);
    }
    // cloumn first, row second
    for (j=0; j < rows; j++){
      tmp = [];
      for(i=0; i < rows; i++){
        tmp.push(j + i * rows);
      }
      lines.push(tmp);
    }
      
    //diagonal 
    j = 0; //column, start with first column with 0
    tmp = [];
    for(i=0; i < rows; i++){
        tmp.push(j + i * rows);
        j = j + 1;
      }
    lines.push(tmp);

    j = rows - 1; //column, start last column with rows-1
    tmp = [];
    for(i=0; i < rows; i++){
        tmp.push(j + i * rows);
        j = j - 1;
      }
    lines.push(tmp);
    return lines;
  }

  right_count(squares, row, col){
    var n = row * this.state.rows + col;
    var locations = [n];
    var adjacent_count = 1;
    for(var j=col+1; j < this.state.rows; j++){
      var m = row * this.state.rows + j;
      if(squares[n] === squares[m]){
        adjacent_count += 1;
        locations.push(m);
      }else{
        return [adjacent_count, locations];
      }
    }
    return [adjacent_count, locations];
  }

  down_count(squares, row, col){
    var n = row * this.state.rows + col;
    var locations = [n];
    var adjacent_count = 1;
    for(var i=row+1; i < this.state.rows; i++){
      var m = i * this.state.rows + col;
      if(squares[n] === squares[m]){
        adjacent_count += 1;
        locations.push(m);
      }else{
        return [adjacent_count, locations];
      }
    }
    return [adjacent_count, locations];
  }

  right_up_count(squares, row, col){
    var n = row * this.state.rows + col;
    var locations = [n];
    var adjacent_count = 1;
    for(var i=row-1; i >= 0; i--){
      col = col + 1;
      if (col < this.state.rows){
        var m = i * this.state.rows + col;
        if(squares[n] === squares[m]){
          adjacent_count += 1;
          locations.push(m);
        }else{
          return [adjacent_count, locations];
        }
      } 
    }
    return [adjacent_count, locations];
  }

  right_down_count(squares, row, col){
    var n = row * this.state.rows + col;
    var locations = [row * this.state.rows + col];
    var adjacent_count = 1;
    for(var i=row+1; i < this.state.rows; i++){
      col = col + 1;
      if (col < this.state.rows){
        var m = i * this.state.rows + col;
        if(squares[n] === squares[m]){
          adjacent_count += 1;
          locations.push(m);
        }else{
          return [adjacent_count, locations];
        }
      } 
    }
    return [adjacent_count, locations];
  }

  look_for_row_column_in_board(r, c, squares){
    var n = this.state.rows * r + c;
    if (squares[n]){
      return [r, c]; // row and colum start from 0
    }
    return null
  }

  look_for_adjacents(i, j, squares){
    const win_rule = this.state.win_rule;
    var location = this.look_for_row_column_in_board(i, j, squares);
    var row = location? location[0] : -1;
    var col = location? location[1] : -1;
    var adjacent_count = 0;
    var adjacent_array = [];
    if (row > -1 && col > -1){
      let rc = this.right_count(squares, row, col);
      if(rc[0] > adjacent_count){
          adjacent_count = rc[0];
          adjacent_array = rc[1];
      }
      let dc = this.down_count(squares, row, col);
      if(dc[0] > adjacent_count){
          adjacent_count = dc[0];
          adjacent_array = dc[1];
      }
      let r_u_c = this.right_up_count(squares, row, col);
      if(r_u_c[0] > adjacent_count){
          adjacent_count = r_u_c[0];
          adjacent_array = r_u_c[1];
      }
      let r_d_c = this.right_down_count(squares, row, col);
      if(r_d_c[0] > adjacent_count){
          adjacent_count = r_d_c[0];
          adjacent_array = r_d_c[1];
      }
    }
    if (adjacent_count >= win_rule){
      return adjacent_array;
    }
    return null;
  }

  calculateWinner(squares) {
    /* This game requires the three squares in a line, such as horizontal, 
        vertical or diagnol with the same Chars. It wins the game.
    */
    var adjacent_array;
    for(var i=0; i < this.state.rows; i++){
      for(var j=0; j < this.state.rows; j++){
        adjacent_array = this.look_for_adjacents(i, j, squares);
        if(adjacent_array){
          return adjacent_array;
        }
      }
    }
    return adjacent_array;
  }

  handleClick(i){
    // actually this function will be passed into board.js and to square.js. 
    // That is not convenient to do that since the organization like this is
    // not good for maitenance. Normally this props drilling or top data flow down
    // principle in react.js. This is where Redux or React context API coming in.
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares =  current.squares.slice();
    const locations = this.state.locations;

    // Do nothing if someone has already won the game or if a square is already filled
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    let match_in_line = this.calculateWinner(squares);
    if (match_in_line) {
      this.setState({
        winner_stepNumber: history.length+1,
        winner: squares[i],
        match: match_in_line,
      })
    }
    const row = Math.floor(i / this.state.rows) + 1;
    const col = i - (row -1) * this.state.rows + 1;
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      locations: locations.concat([{
        row: row,
        col: col
      }]),
      bold_step: history.length,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  changeColorAndJumpTo(step){
    this.setState({
      bold_step: step,
    })
    this.jumpTo(step)
  }

  updateInputValue(value){
    
    //var value = e.target.value;
    console.log("11111111 " + value);
    if( value && ! value.toString().match(/^\d+$/)){
      alert("Value must be integer!!!");
    }
    
    if (this.state.win_rule > value){
      console.log('2222222 '+ value);
      alert("Error: Current width " + value +
            ". The board must bigger than " + this.state.win_rule +  " X " +
            this.state.win_rule + "!!!");
      this.restart();
    }
    this.setState({
      rows: value,
    })
  }

  restart(){
    this.setState({...this.state_cp})
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    

    // When using bind in updateInputValue function, this can be used inside updateInputValue()
    return (
      <div  key={"Game1"} className="game">
        <div className="game-input" key={"rows"}> 
          <Rows rows={this.state.rows} 
                onChange={ this.updateInputValue.bind(this) }
                start={JSON.stringify(this.state) === JSON.stringify( this.state_cp)}/> 
        </div>  <br/> <br/>
        <div className="board">
          <div className="game-board" key={"Board1"} >
            <Board
              match={this.state.match}
              rows={this.state.rows} 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />

          </div>
          <div className="game_processes">
            <GameProcesses restart={this.restart}
                           moves={this.moves}
                           winner={this.state.winner}
                           xIsNext={this.state.xIsNext}
                           changeColorAndJumpTo={this.changeColorAndJumpTo}
                           state={this.state}

            />
          </div>
        </div>
      </div>
    );  
  }
}


// Must export!
export default Game;
