import React, {useRef, useState } from 'react';
import './index.css';


function Rows(props) {
  const inputRef = useRef();
  const [fixed, setFixed] = useState(false);
  console.log('5555555 ');
  console.log(inputRef);
  console.log(props.start);
  if (fixed && props.start){
    setFixed(false)
  }
  
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
    props.onChange(inputRef.current.value); // need to throw out from this component
                                            // to trigger another component changed.
  }
  
  var color = 'lightgrey';
  return (
    <>
    <div className="rows" key={"rows1"}>
      <span className="rows" key={"rows11"} style={{width: `80px`}} >
      <form >
      <input  placeholder={props.rows}
         id={"rows"}
         //value={props.rows}
         ref={inputRef}
        onChange={evt => handleSubmit(evt)}
        onBlur={evt => setFixed(true)}
        size="5"
        disabled={fixed? true : false}
        style={fixed? {backgroundColor: color} : {}}
      >
      </input> 
      </form></span>
      <span className="rows" key={"rows12"}><b>rows</b> and <b>columns</b></span>

    </div>
    </>
  );
}

// Must export!
export default Rows;