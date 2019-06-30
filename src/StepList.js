
import React from 'react';
import './index.css';
import Step from './Step.js';

class StepList extends React.Component {
  renderStep(i, history_step, stepNumber, 
      current_location, order, bold1) {
    return (
      <Step 
          history_step={history_step}
          order = {order}
          current_location = {current_location}
          current_step = {stepNumber}
          i = {i}
          bold1 = {bold1}
          onClick={ () => this.props.onClick(i) } key={"Step#"+i}/>
    );
  }


  render() {
    // this part is crazy good for loop and close div tag
    const history = this.props.props.history;
    const row_c =  history.length;
    var steps = [];
    var locations = this.props.props.locations;
    for (var j = 0; j < row_c; j++){
        steps.push(<li key={j} className="step_list"> 
          {this.renderStep(
            j, 
            history[j], 
            this.props.props.stepNumber, 
            locations[j], 
            this.props.props.order, 
            this.props.props.bold1)}
        </li>);
       
    }
    var reverse = false;
    if (this.props.props.order==='Descend'){
      steps = steps.reverse();
      reverse = true;
    }
    return (
      <div>
        <ol reversed={reverse}>
                  {steps}
        </ol>
      </div>
    );
  }
}


// Must export!
export default StepList;