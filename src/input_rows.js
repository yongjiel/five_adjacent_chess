import React, {useRef } from 'react';
import './index.css';


function Rows(props) {
  const inputRef = useRef();
  console.log('5555555 ');
  console.log(inputRef);
  
  if (typeof(inputRef.current) !== 'undefined'){
    if (inputRef.current.value !== parseInt(inputRef.current.value, 10)){
      console.log("33333 "+ inputRef.current.value + " "+ props.rows);
      inputRef.current.value = props.rows;
    }
    else if (inputRef.current.value < props.rows) {
      console.log("44444 "+ inputRef.current.value + " "+ props.rows);
      inputRef.current.value = props.rows;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onChange(inputRef.current.value);
    

  }
  
  var color = 'lightgrey';
  return (
    <div className="rows" key={"rows1"}>
      <span className="rows" key={"rows11"}>
      <form onSubmit={handleSubmit}>
      <input  placeholder={props.rows}
         id={"rows"}
         //value={props.rows}
         ref={inputRef}
        //onChange={evt => props.onChange(evt)}
        onBlur={evt => props.onBlur(evt)}
        size="10"
        disabled={props.fixed? true : false}
        style={props.fixed? {backgroundColor: color} : {}}
      >
      </input> 
      </form></span>
      <span><b>rows</b> and <b>columns</b> </span>

    </div>
  );
}

// Must export!
export default Rows;