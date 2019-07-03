import React from 'react';
import './index.css';


function Rows(props) {
  var color = 'lightgrey';
  return (
    <div className="rows" key={"rows1"}>
      <input  placeholder={props.rows}
         id={"rows"}
         //value={ props.rows }
        onChange={ (evt) => props.onChange(evt.target.value)}
        size="10"
        disabled={props.fixed? true : false}
        style={props.fixed? {backgroundColor: color} : {}}
      >
      </input> 
      &nbsp;<b>rows</b> and <b>columns</b>
    </div>
  );
}

// Must export!
export default Rows;