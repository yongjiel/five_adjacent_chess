import { RESET, CLICK_GRID, CLICK_STEP } from './actions';

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
    case RESET:
      return initialState;
    case CLICK_GRID:
      return change_state_grid(state, action.i);
    case CLICK_STEP:
      return change_state_step(state);
    default:
      return state;
  }
};

function change_state_step(state){
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

function change_state_grid(state, i){
  var new_state = handleClick(state, i);
    // TODO...
    // change state after adding x
    // change tmp_state here

    // TODO...
    // change state after adding o
    // change tmp_state here
  return new_state;
}

function handleClick(state, i){
    var tmp_state = {...state};
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares =  current.squares.slice();
    const locations = state.locations;
    // Do nothing if someone has already won the game or if a square is already filled
    if (calculateWinner(squares, state) || squares[i]) {
      return tmp_state;
    }
    squares[i] = state.xIsNext ? 'X' : 'O';
    let match_in_line = calculateWinner(squares, state);
    if (match_in_line) {
      tmp_state["winner_stepNumber"] = history.length+1;
      tmp_state["winner"] = squares[i];
      tmp_state["match"] = match_in_line;
    }
    const row = Math.floor(i / state.rows) + 1;
    const col = i - (row -1) * state.rows + 1;
    tmp_state["history"] = history.concat([{
        squares: squares,
      }]);
    tmp_state["stepNumber"] = history.length;
    tmp_state["xIsNext"] = !state.xIsNext;
    tmp_state["locations"] =  locations.concat([{
        row: row,
        col: col
      }]);
    tmp_state["bold"] = history.length;
    tmp_state["fixed"] = true;
    return tmp_state
  }

function calculateWinner(squares, state) {
    /* This game requires the three squares in a line, such as horizontal, 
        vertical or diagnol with the same Chars. It wins the game.
    */
    var adjacent_array;
    for(var i=0; i < state.rows; i++){
      for(var j=0; j < state.rows; j++){
        adjacent_array = look_for_adjacents(i, j, squares, state);
        if(adjacent_array){
          return adjacent_array;
        }
      }
    }
    return adjacent_array;
  }

function look_for_adjacents(i, j, squares, state){
    const win_rule = state.win_rule;
    var location = look_for_row_column_in_board(i, j, squares, state);
    var row = location? location[0] : -1;
    var col = location? location[1] : -1;
    var adjacent_count = 0;
    var adjacent_array = [];
    if (row > -1 && col > -1){
      let rc = right_count(squares, row, col, state);
      if(rc[0] > adjacent_count){
          adjacent_count = rc[0];
          adjacent_array = rc[1];
      }
      let dc = down_count(squares, row, col, state);
      if(dc[0] > adjacent_count){
          adjacent_count = dc[0];
          adjacent_array = dc[1];
      }
      let r_u_c = right_up_count(squares, row, col, state);
      if(r_u_c[0] > adjacent_count){
          adjacent_count = r_u_c[0];
          adjacent_array = r_u_c[1];
      }
      let r_d_c = right_down_count(squares, row, col, state);
      if(r_d_c[0] > adjacent_count){
          adjacent_count = r_d_c[0];
          adjacent_array = r_d_c[1];
      }
    }
    if (adjacent_count >= win_rule){
      return adjacent_array;
    }
    return null;
  }


function right_count(squares, row, col, state){
    var n = row * state.rows + col;
    var locations = [n];
    var adjacent_count = 1;
    for(var j=col+1; j < state.rows; j++){
      var m = row * state.rows + j;
      if(squares[n] === squares[m]){
        adjacent_count += 1;
        locations.push(m);
      }else{
        return [adjacent_count, locations];
      }
    }
    return [adjacent_count, locations];
  }


function down_count(squares, row, col, state){
    var n = row * state.rows + col;
    var locations = [n];
    var adjacent_count = 1;
    for(var i=row+1; i < state.rows; i++){
      var m = i * state.rows + col;
      if(squares[n] === squares[m]){
        adjacent_count += 1;
        locations.push(m);
      }else{
        return [adjacent_count, locations];
      }
    }
    return [adjacent_count, locations];
  }

function  right_up_count(squares, row, col, state){
    var n = row * state.rows + col;
    var locations = [n];
    var adjacent_count = 1;
    for(var i=row-1; i >= 0; i--){
      col = col + 1;
      if (col < state.rows){
        var m = i * state.rows + col;
        if(squares[n] === squares[m]){
          adjacent_count += 1;
          locations.push(m);
        }else{
          return [adjacent_count, locations];
        }
      } 
    }
    return [adjacent_count, locations];
  }

function right_down_count(squares, row, col, state){
    var n = row * state.rows + col;
    var locations = [row * state.rows + col];
    var adjacent_count = 1;
    for(var i=row+1; i < state.rows; i++){
      col = col + 1;
      if (col < state.rows){
        var m = i * state.rows + col;
        if(squares[n] === squares[m]){
          adjacent_count += 1;
          locations.push(m);
        }else{
          return [adjacent_count, locations];
        }
      } 
    }
    return [adjacent_count, locations];
  }

function  look_for_row_column_in_board(r, c, squares, state){
    var n = state.rows * r + c;
    if (squares[n]){
      return [r, c]; // row and colum start from 0
    }
    return null
  }
