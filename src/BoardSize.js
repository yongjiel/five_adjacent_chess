import React from 'react';
import './index.css';
import { input_size } from './actions.js';
import { connect } from 'react-redux';
import Rows from './square_rows.js';


class BoardSize extends React.Component {
  
  input_size = (size) => {
      this.props.input_size(size);
  }


  render() {
    return (
      <div className="game-input" key={"rows"}> 
          <Rows rows={this.props.rows} 
                onChange={ (size) => this.input_size(size) }
                fixed={this.props.fixed}/> 
      </div> 
    );
  }
}


function mapStateToProps(store) {
  return {
    rows: store.reducer.rows, // also is the number of columns.
    fixed: store.reducer.fixed
  };
}

// in this object, keys become prop names,
// and values should be action creator functions.
// They get bound to `dispatch`. 
const mapDispatchToProps = {
  input_size,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardSize);