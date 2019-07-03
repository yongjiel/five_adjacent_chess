import React from 'react';
import './index.css';
import Board from './Board.js';
import BoardSize from './BoardSize.js';
import StepList from './StepList.js';
import { connect } from 'react-redux';
import { reset, click_grid, click_step, click_toggle } from './actions';

class Game extends React.Component {

  componentDidMount() {
    this.props.reset();
  }

  restart(){
    this.props.reset()
  }


  render() {
    // When using bind in updateInputValue function, this can be used inside updateInputValue()
    
    // onClick={(i) => this.click_grid(i)} is amazing. Here it knows the index
    // of the square array in Board.js. Board.js has defined the onClick for Game.js's onClick
    // function with arg i.
    return (
      <div  key={"Game1"}>
        <BoardSize/> <br/> 
        <div className="game">
          <div className="game-board" key={"Board1"}>
            <Board/>
          </div>
          <div className="game-info">
             <div>
               <ul><button onClick={()=>this.restart()}> Restart the Game</button></ul>
             </div>
             <div style={ {color: this.props.win_color, fontWeight: this.props.bold2} }>
               {this.props.status}
             </div>
             <div className="step-list">
               <StepList/>
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
    rows: store.reducer.rows, // also is the number of columns.
    fixed: store.reducer.fixed, // after rows is changed in input box, it is true. No more change further.
    match: store.reducer.match , // hold the square indices(linear in array) when win the game.
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
};


// Must export!
//export default Game;
export default connect(mapStateToProps, mapDispatchToProps)(Game);
