import React, { useState, useRef } from 'react';
import './index.css';


function GameProcesses(props) {  
    const [order, setOrder] = useState("Ascend");
    const status = useRef();
    const win_color = useRef( 'black');
    const bold= useState("");
    if (props.state.winner_stepNumber > -1) {
        status.current='Winner: ' + props.state.winner ;
        win_color.current="red";
        bold.current='bold';
    }
    else {
        if (props.state.xIsNext){
            status.current = "Next player: X"
        } else{
            status.current = "Next player: O"
        }
    }
    function toggle(){
        if (order === 'Ascend'){
            setOrder('Descend');
        }else{
            setOrder('Ascend');
        }
        
      }

    function moves(){
        const history = props.state.history;
        //const current = history[this.state.stepNumber];
        //const winner = calculateWinner(current.squares);
        
    
        const moves = history.map((step, move) => {
          const desc = move ?
             'Go to move #' + move :
             'Go to game start';
          const current_location = props.state.locations[move];
          var bold_step = props.state.bold_step
          var bold1 = bold_step > -1? "bold": ""
          var blue_color = bold_step > -1? "blue": ""
          // bind method is very interesting. It is able to take extra args.
          return (
            <li key={move}>
               <button 
                        style={ bold_step===move? {
                                fontWeight: bold1,
                                color: blue_color,
                              } : {} } 
                        onClick={()=> props.changeColorAndJumpTo(move) }
                > 
                  {desc},  Row: {current_location.row} Col: {current_location.col}
               </button>
            </li>
          );
        });
        if  (order==='Descend'){
            moves.reverse()
        } 
        return moves;
      }

  return (
    <>
    <ul><button onClick={()=>props.restart()} className="restart"> Restart </button></ul>
             <ul><div style={{color: win_color.current, fontWeight: bold.current }}>{status.current}</div></ul>
            <ul><button onClick={()=>toggle() }><b>{order}</b></button></ul>
            <ol reversed={order==='Descend'? true: false}>
                {moves()}
    </ol>
    </>
  );
}

// Must export!
export default GameProcesses;