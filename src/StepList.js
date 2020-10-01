import React from "react";
import { connect } from "react-redux";
import Step from "./Step.js";
import { click_step, click_toggle } from "./actions";

class StepList extends React.Component {
  constructor(props) {
    super(props);
    this.click_step = this.click_step.bind(this);
    this.click_toggle = this.click_toggle.bind(this);
  }

  click_step(i) {
    this.props.click_step(i);
  }

  click_toggle() {
    this.props.click_toggle();
  }

  renderStep(i, history_step, stepNumber, current_location, order) {
    return (
      <Step
        history_step={history_step}
        order={order}
        current_location={current_location}
        current_step={stepNumber}
        i={i}
        onClick={() => this.click_step(i)}
        key={"Step#" + i}
      />
    );
  }

  render() {
    // this part is crazy good for loop and close div tag
    const history = this.props.history;
    const row_c = history.length;
    var steps = [];
    var locations = this.props.locations;
    for (var j = 0; j < row_c; j++) {
      steps.push(
        <li key={j} className="step_list">
          {this.renderStep(
            j,
            history[j],
            this.props.stepNumber,
            locations[j],
            this.props.order
          )}
        </li>
      );
    }
    var reverse = false;
    if (this.props.order === "Descend") {
      steps = steps.reverse();
      reverse = true;
    }
    return (
      <div>
        <ul>
          <button onClick={() => this.click_toggle()}>
            <b>{this.props.order}</b>
          </button>
        </ul>
        <ol reversed={reverse}>{steps}</ol>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    history: store.reducer.history, // initiate store.reducer of squares of the board and keep all the steps' states of all squares.
    stepNumber: store.reducer.stepNumber, // current step number.
    locations: store.reducer.locations,
    order: store.reducer.order,
  };
}

// in this object, keys become prop names,
// and values should be action creator functions.
// They get bound to `dispatch`.
const mapDispatchToProps = {
  click_step,
  click_toggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(StepList);
