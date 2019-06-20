import React from 'react';
import './index.css';
import Board from './Board.js';
import Rows from './square_rows.js';
import { connect } from 'react-redux';
import { increment, decrement, reset, click_grid } from './actions';

class Game extends React.Component {
  /*
  constructor(props) {
    super(props);

    let rows = props.rows; // 8 * 8 button matrix
    let win_rule = 5; // 5 adjacent buttons with same char.
    if (win_rule > rows){
      alert("Error: the board must bigger than " + win_rule +  " X " + win_rule + "!!!");
    } 
    let lines = this.generate_win_lines(rows);
    

    this.state = {
      history: [{
        squares: Array(rows ** 2).fill(null),
      }], // initiate state of squares of the board and keep all the steps' states of all squares.
      xIsNext: true,
      stepNumber: 0,
      rows: rows, // also is the number of columns.
      fixed: false, // after rows is changed in input box, it is true. No more change further.
      locations: [{
        row: 0,
        col: 0,
      }],
      bold: -1,
      winner_stepNumber: -1,
      winner: null,
      order: "Ascend",
      match: [], // hold the square indices(linear in array) when win the game.
      lines: lines,
      win_rule: win_rule, 
    };
    // copying object is handy with ES6
    this.state_cp = {
      ...this.state
    };
  }
  */
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
    var n = row * this.props.rows + col;
    var locations = [n];
    var adjacent_count = 1;
    for(var j=col+1; j < this.props.rows; j++){
      var m = row * this.props.rows + j;
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
    var n = row * this.props.rows + col;
    var locations = [n];
    var adjacent_count = 1;
    for(var i=row+1; i < this.props.rows; i++){
      var m = i * this.props.rows + col;
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
    var n = row * this.props.rows + col;
    var locations = [n];
    var adjacent_count = 1;
    for(var i=row-1; i >= 0; i--){
      col = col + 1;
      if (col < this.props.rows){
        var m = i * this.props.rows + col;
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
    var n = row * this.props.rows + col;
    var locations = [row * this.props.rows + col];
    var adjacent_count = 1;
    for(var i=row+1; i < this.props.rows; i++){
      col = col + 1;
      if (col < this.props.rows){
        var m = i * this.props.rows + col;
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
    var n = this.props.rows * r + c;
    if (squares[n]){
      return [r, c]; // row and colum start from 0
    }
    return null
  }

  look_for_adjacents(i, j, squares){
    const win_rule = this.props.win_rule;
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
    for(var i=0; i < this.props.rows; i++){
      for(var j=0; j < this.props.rows; j++){
        adjacent_array = this.look_for_adjacents(i, j, squares);
        if(adjacent_array){
          return adjacent_array;
        }
      }
    }
    return adjacent_array;
  }

  handleClick(i){
    const history = this.props.history.slice(0, this.props.stepNumber + 1);
    const current = history[history.length - 1];
    const squares =  current.squares.slice();
    const locations = this.props.locations;

    // Do nothing if someone has already won the game or if a square is already filled
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.props.xIsNext ? 'X' : 'O';
    let match_in_line = this.calculateWinner(squares);
    if (match_in_line) {
      this.setState({
        winner_stepNumber: history.length+1,
        winner: squares[i],
        match: match_in_line,
      })
    }
    const row = Math.floor(i / this.props.rows) + 1;
    const col = i - (row -1) * this.props.rows + 1;
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.props.xIsNext,
      locations: locations.concat([{
        row: row,
        col: col
      }]),
      bold: history.length,
      fixed: true,
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
              bold: step,
            })
            this.jumpTo(step)
    }

  focusInCurrentTarget(relatedTarget, currentTarget){
    if (relatedTarget === null) return false;
    
    var node = relatedTarget.parentNode;
          
    while (node !== null) {
      if (node === currentTarget) return true;
      node = node.parentNode;
    }

    return false;
  }

  disableInput(e){
    if (!this.focusInCurrentTarget(e.relatedTarget, e.currentTarget)) {
      this.setState({
        fixed: true,
      })
    }
  }

  updateInputValue(evt){
    var value = evt.target.value;
    if( value && ! value.toString().match(/^\d+$/)){
      alert("Value must be integer!!!");
      return;
    }
    this.setState({
      rows: value,
    })
  }

  toggle(){
    let order = this.props.order;
    if (this.props.order === 'Ascend'){
        order = 'Descend'
    }else{
        order = 'Ascend'
    }
    this.setState({
      order: order
    })
  }

  restart(){
    this.props.reset()
  }

  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    //const winner = calculateWinner(current.squares);
    

    const moves = history.map((step, move) => {
      const desc = move ?
         'Go to move #' + move :
         'Go to game start';
      const current_location = this.props.locations[move];
      var bold = this.props.bold
      var bold1 = bold > -1? "bold": ""
      var blue_color = bold>-1? "blue": ""
      // bind method is very interesting. It is able to take extra args.
      return (
        <li key={move}>
           <button 
                    style={ bold===move? {
                            fontWeight: bold1,
                            color: blue_color,
                          } : {} } 
                    onClick={ this.changeColorAndJumpTo.bind(this, move) }
            > 
              {desc},  Row: {current_location.row} Col: {current_location.col}
           </button>
        </li>
      );
    });

    let status;
    let win_color;
    let bold2;
    if (this.props.winner_stepNumber > -1) {
      status = 'Winner: ' + this.props.winner ;
      win_color = "red"
      bold2 = 'bold'
    
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
      win_color = 'black'
    }
    // When using bind in updateInputValue function, this can be used inside updateInputValue()
    return (
      <div  key={"Game1"}>
        <div className="game-input" key={"rows"}> 
          <Rows rows={this.props.rows} 
                onChange={ this.updateInputValue.bind(this) }
                onBlur={this.disableInput.bind(this)}
                fixed={this.props.fixed}/> 
        </div>  <br/> 
        <div className="game">
          <div className="game-board" key={"Board1"}>
            <Board
              match={this.props.match}
              rows={this.props.rows} 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />

          </div>
          <div className="game-info">
             <ul><button onClick={()=>this.restart()}> Restart the Game</button></ul>
             <ul><div style={this.props.winner_stepNumber > -1? {color: win_color, fontWeight: bold2 }: {}}>{status}</div></ul>
            <ul><button onClick={ this.toggle.bind(this) }><b>{this.props.order}</b></button></ul>
            <ol reversed={this.props.order==='Descend'? true: false}>
                {this.props.order==='Descend'? moves.reverse(): moves}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

// Add this function:
function mapStateToProps(state) {
  return {
    history: state.history, // initiate state of squares of the board and keep all the steps' states of all squares.
    xIsNext: state.xIsNext,
    stepNumber: state.stepNumber,
    rows: state.rows, // also is the number of columns.
    fixed: state.fixed, // after rows is changed in input box, it is true. No more change further.
    locations: state.location,
    bold: state.bold,
    winner_stepNumber: state.winner_stepNumber,
    winner: state.winner,
    order: state.order,
    match: state.match , // hold the square indices(linear in array) when win the game.
    lines: state.lines,
    win_rule: state.win_rule,
  };
}

// in this object, keys become prop names,
// and values should be action creator functions.
// They get bound to `dispatch`. 
const mapDispatchToProps = {
  increment,
  decrement,
  reset,
  click_grid
};


// Must export!
//export default Game;
export default connect(mapStateToProps, mapDispatchToProps)(Game);
