import React from "react";
import Board from "./Board.js";
import BoardSize from "./BoardSize.js";
import StepList from "./StepList.js";
import { connect } from "react-redux";
import { reset } from "./actions";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.restart = this.restart.bind(this);
  }

  restart() {
    this.props.reset();
  }

  render() {
    // When using bind in updateInputValue function, this can be used inside updateInputValue()

    // onClick={(i) => this.click_grid(i)} is amazing. Here it knows the index
    // of the square array in Board.js. Board.js has defined the onClick for Game.js's onClick
    // function with arg i.
    return (
      <div key={"Game1"}>
        <BoardSize rows_={this.props.rows_} /> <br />
        <div className="game">
          <Board />

          <div className="game-info">
            <div className="game-reset">
              <ul>
                <button className="reset" onClick={() => this.restart()}>
                  Restart the Game
                </button>
              </ul>
            </div>
            <div
              className="winner"
              style={{
                color: this.props.win_color,
                fontWeight: this.props.bold2,
              }}
            >
              {this.props.status}
            </div>
            <StepList />
          </div>
        </div>
      </div>
    );
  }
}

// Add this function:
// Crucial point. store is a multi reducers collection.
// Need to point out which reducer to use.
export function mapStateToProps(store) {
  return {
    status: store.reducer.status,
    win_color: store.reducer.win_color,
    bold2: store.reducer.bold2,
  };
}

// in this object, keys become prop names,
// and values should be action creator functions.
// They get bound to `dispatch`.
// const mapDispatchToProps = {
// reset,
// };

export const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset()),
});

// Must export!
//export default Game;
const ConnectedGame = connect(mapStateToProps, mapDispatchToProps)(Game);
export default ConnectedGame;
