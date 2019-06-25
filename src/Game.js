import React from 'react';
import './index.css';
import Board from './Board.js';
import Rows from './square_rows.js';
import { connect } from 'react-redux';
import { reset, click_grid, click_step } from './actions';

class Game extends React.Component {

  componentDidMount() {
    this.props.reset();
  }

  click_grid = (i) => {
      this.props.click_grid(i);
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

  moves(){
    const history = this.get_history();
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
    return moves;
  }

  get_current_square = () => {
    var history = this.get_history();
    var current = history[this.props.stepNumber];
    return current;
  }

  get_history = () => {
    var history = this.props.history;
    return history;
  }

  render() {
    const current = this.get_current_square();
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
    
    // onClick={(i) => this.click_grid(i)} is amazing. Here it knows the index
    // of the square array in Board.js. Board.js has defined the onClick for Game.js's onClick
    // function with arg i.
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
              onClick={(i) => this.click_grid(i)}
            />

          </div>
          <div className="game-info">
             <ul><button onClick={()=>this.restart()}> Restart the Game</button></ul>
             <ul><div style={this.props.winner_stepNumber > -1? {color: win_color, fontWeight: bold2 }: {}}>{status}</div></ul>
            <ul><button onClick={ this.toggle.bind(this) }><b>{this.props.order}</b></button></ul>
            <ol reversed={this.props.order==='Descend'? true: false}>
                {this.props.order==='Descend'? this.moves().reverse(): this.moves()}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

// Add this function:
// Crucial point. store is a multi reducers collection.
// Need to point out which reducer to use.
function mapStateToProps(store) {
  return {
    history: store.reducer.history, // initiate store.reducer of squares of the board and keep all the steps' states of all squares.
    xIsNext: store.reducer.xIsNext,
    stepNumber: store.reducer.stepNumber,
    rows: store.reducer.rows, // also is the number of columns.
    fixed: store.reducer.fixed, // after rows is changed in input box, it is true. No more change further.
    locations: store.reducer.locations,
    bold: store.reducer.bold,
    winner_stepNumber: store.reducer.winner_stepNumber,
    winner: store.reducer.winner,
    order: store.reducer.order,
    match: store.reducer.match , // hold the square indices(linear in array) when win the game.
    lines: store.reducer.lines,
    win_rule: store.reducer.win_rule
  };
}

// in this object, keys become prop names,
// and values should be action creator functions.
// They get bound to `dispatch`. 
const mapDispatchToProps = {
  reset,
  click_grid,
  click_step
};


// Must export!
//export default Game;
export default connect(mapStateToProps, mapDispatchToProps)(Game);
