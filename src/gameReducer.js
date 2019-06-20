import { DECREMENT, INCREMENT, RESET, CLICK_GRID } from './actions';

let rows = 15; // 8 * 8 button matrix
let win_rule = 5; // 5 adjacent buttons with same char.
if (win_rule > rows){
  alert("Error: the board must bigger than " + win_rule +  " X " + win_rule + "!!!");
} 
// TO-DO:
let lines = generate_win_lines(rows);

function generate_win_lines(rows) {
    var lines = [];
    // row first, column second
    for (var i=0; i < rows; i++){
      var tmp = [];
      for(var j=0; j < rows; j++){
        tmp.push(j + i * rows);
      }
      lines.push(tmp);
    }
    // cloumn first, row second
    for (j=0; j < rows; j++){
      tmp = [];
      for(i=0; i < rows; i++){
        tmp.push(j + i * rows);
      }
      lines.push(tmp);
    }
      
    //diagonal 
    j = 0; //column, start with first column with 0
    tmp = [];
    for(i=0; i < rows; i++){
        tmp.push(j + i * rows);
        j = j + 1;
      }
    lines.push(tmp);

    j = rows - 1; //column, start last column with rows-1
    tmp = [];
    for(i=0; i < rows; i++){
        tmp.push(j + i * rows);
        j = j - 1;
      }
    lines.push(tmp);
    return lines;
};

const initialState = {
  history: [{
    squares: Array(rows ** 2).fill(null),
  }], // initiate state of squares of the board and keep all the steps' states of all squares.
  xIsNext: true,
  stepNumber: 0,
  rows: rows, // also is the number of columns.
  fixed: false, // after rows is changed in input box, it is true. No more change further.
  locations: [{
    row: 0,
    col: 0,
  }],
  bold: -1,
  winner_stepNumber: -1,
  winner: null,
  order: "Ascend",
  match: [], // hold the square indices(linear in array) when win the game.
  lines: lines,
  win_rule: win_rule,
};

export default function reducer(state = initialState, action) {
  console.log('reducer', state, action);
  switch(action.type) {
    case INCREMENT:
      return {
        count: state.count + 1
      };
    case DECREMENT:
      return {
        count: state.count - 1
      };
    case RESET:
      return initialState;
    case CLICK_GRID:
      return change_state(state);
    default:
      return state;
  }
};

function change_state(state){
  var tmp_state = {
      ...state
    };
    // TODO...
    // change state after adding x
    // change tmp_state here

    // TODO...
    // change state after adding o
    // change tmp_state here
  return tmp_state;
}