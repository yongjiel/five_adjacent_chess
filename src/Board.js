import React from "react";
import Square from "./Square.js";
import { click_grid } from "./actions";
import { connect } from "react-redux";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.click_grid = this.click_grid.bind(this);
  }

  click_grid(i) {
    this.props.click_grid(i);
  }

  renderSquare(i, is_bule_color) {
    return (
      <Square
        stepNumber={this.props.stepNumber}
        is_bule_color={is_bule_color}
        value={this.props.history[this.props.stepNumber].squares[i]}
        onClick={() => this.click_grid(i)}
        key={"Square#" + i}
      />
    );
  }

  render() {
    // this part is crazy good for loop and close div tag
    const match = this.props.match;
    const row_c = this.props.rows;
    var rows = [];
    for (var i = 0; i < row_c; i++) {
      rows.push(<div className="board-row" key={"row#" + i} />);
      for (var j = 0; j < row_c; j++) {
        let n = i * row_c + j;
        rows.push(this.renderSquare(n, match.indexOf(n) > -1));
      }
    }

    return <div>{rows}</div>;
  }
}

function mapStateToProps(store) {
  return {
    history: store.reducer.history, // initiate store.reducer of squares of the board and keep all the steps' states of all squares.
    stepNumber: store.reducer.stepNumber, // current step number.
    rows: store.reducer.rows, // also is the number of columns.
    match: store.reducer.match, // hold the square indices(linear in array) when win the game.
  };
}

// in this object, keys become prop names,
// and values should be action creator functions.
// They get bound to `dispatch`.
const mapDispatchToProps = {
  click_grid,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
