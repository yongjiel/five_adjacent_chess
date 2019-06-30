import React from 'react';
import './index.css';
import Board from './Board.js';
import StepList from './StepList.js';
import Rows from './square_rows.js';
import { connect } from 'react-redux';
import { reset, click_grid, click_step, click_toggle } from './actions';

class Game extends React.Component {

  componentDidMount() {
    this.props.reset();
  }

  click_grid = (i) => {
      this.props.click_grid(i);
  }

  click_step = (i) => {
      this.props.click_step(i);
  }

  click_toggle = () => {
    this.props.click_toggle();
  }

  restart(){
    this.props.reset()
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

  render() {
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
              squares={this.props.history[this.props.stepNumber].squares}
              onClick={(i) => this.click_grid(i)}
            />

          </div>
          <div className="game-info">
             <div>
             <ul><button onClick={()=>this.restart()}> Restart the Game</button></ul>
             </div>
             <div>
             <ul><div style={{color: this.props.win_color, fontWeight: this.props.bold2}}>{this.props.status}</div></ul>
             <ul><button onClick={ () => this.click_toggle() }><b>{this.props.order}</b></button></ul>
             </div>
             <div className="step-list">
               <StepList
                   props = {this.props}
                   onClick={ (i) => this.click_step(i)}
               />
            </div>
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
    stepNumber: store.reducer.stepNumber, // current step number.
    rows: store.reducer.rows, // also is the number of columns.
    fixed: store.reducer.fixed, // after rows is changed in input box, it is true. No more change further.
    locations: store.reducer.locations,
    bold: store.reducer.bold,
    winner_stepNumber: store.reducer.winner_stepNumber,
    winner: store.reducer.winner,
    order: store.reducer.order,
    match: store.reducer.match , // hold the square indices(linear in array) when win the game.
    lines: store.reducer.lines,
    win_rule: store.reducer.win_rule,
    status: store.reducer.status,
    win_color: store.reducer.win_color,
    bold2: store.reducer.bold2,
  };
}

// in this object, keys become prop names,
// and values should be action creator functions.
// They get bound to `dispatch`. 
const mapDispatchToProps = {
  reset,
  click_grid,
  click_step,
  click_toggle
};


// Must export!
//export default Game;
export default connect(mapStateToProps, mapDispatchToProps)(Game);
