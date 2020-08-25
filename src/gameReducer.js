import { RESET, CLICK_GRID, CLICK_STEP, CLICK_TOGGLE, INPUT_SIZE } from './actions';

let rows = 15; // 8 * 8 button matrix
let win_rule = 5; // 5 adjacent buttons with same char.
if (win_rule > rows) {
  alert("Error: the board must bigger than " + win_rule + " X " + win_rule + "!!!");
}

const initialState = {
  history: [{
    squares: Array(rows ** 2).fill(null),
  }], // initiate state of squares of the board and keep all the steps' states of all squares.
  xIsNext: true,
  stepNumber: 0,
  rows: rows, // also is the number of columns.
  max_rows: 20, //max limit of rows.
  fixed: false, // after rows is changed in left-up input box, it is true. No more change further.
  locations: [{
    row: 0,
    col: 0,
  }],
  winner_stepNumber: -1,
  winner: null,
  order: "Ascend",
  match: [], // hold the square indices(linear in array) when win the game.
  win_rule: win_rule,
  status: null,
  win_color: null,
  bold2: null,
};

export default function reducer(state = initialState, action) {
  console.log('reducer', state, action);
  switch (action.type) {
    case RESET:
      return { ...initialState, rows: rows };
    case CLICK_GRID:
      return change_state_grid(state, action.i);
    case CLICK_STEP:
      return change_state_step(state, action.step);
    case CLICK_TOGGLE:
      return toggle_order(state);
    case INPUT_SIZE:
      return input_size(state, action.size);
    default:
      return state;
  }
};


function input_size(state, size) {
  var tmp_state = { ...state };
  if (isNaN(size)) {
    alert("Size is not an integer!");
  }
  else if (size > state.max_rows) {
    alert("Size over " + state.max_rows);
  } else {
    tmp_state['rows'] = size;
  }
  return tmp_state;
}


function toggle_order(state) {
  var tmp_state = { ...state };
  if (tmp_state.order === 'Ascend') {
    tmp_state.order = 'Descend'
  } else {
    tmp_state.order = 'Ascend'
  }
  return tmp_state;
}

function change_state_step(state, step) {
  var tmp_state = { ...state };
  tmp_state.stepNumber = step;
  tmp_state.xIsNext = (step % 2) === 0;
  return tmp_state;
}

function change_state_grid(state, i) {
  var new_state = handleClick(state, i);
  return new_state;
}

function handleClick(state, i) {
  // Cannot keep clicking if back to some old steps in list of steps.
  if (state.stepNumber !== state.history.length - 1) {
    alert("Backing to some old step. Not allowed to click on the board!");
    return state;
  }
  var tmp_state = { ...state };
  // Once click on the board the size input of the board fixed.
  tmp_state['fixed'] = tmp_state['fixed'] || true;
  const history = state.history.slice(0, state.stepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  const locations = state.locations;
  // Do nothing if someone has already won the game or if a square is already filled
  if (!!getWinner(squares, state) || squares[i]) {
    return tmp_state;
  }
  // Add X or O, then update state.
  squares[i] = state.xIsNext ? 'X' : 'O';
  let winner_array = getWinner(squares, state);
  if (!!winner_array) {
    tmp_state["winner_stepNumber"] = history.length + 1;
    tmp_state["winner"] = squares[i];
    tmp_state["match"] = winner_array;
  }
  let loc = find_row_col_by_index(i, state)
  tmp_state["history"] = history.concat([{
    squares: squares,
  }]);
  tmp_state["stepNumber"] = history.length;
  tmp_state["xIsNext"] = !state.xIsNext;
  tmp_state["locations"] = locations.concat([loc]);
  tmp_state = change_game_info(tmp_state);
  return tmp_state
}

function find_row_col_by_index(i, state) {
  const row = Math.floor(i / state.rows) + 1;
  const col = i - (row - 1) * state.rows + 1;
  return { row: row, col: col }
}

function change_game_info(tmp_state) {
  if (tmp_state.winner_stepNumber > -1) {
    tmp_state["status"] = 'Winner: ' + tmp_state.winner;
    tmp_state["win_color"] = "red";
    tmp_state["bold2"] = 'bold';
  } else {
    tmp_state["status"] = 'Next player: ' + (tmp_state.xIsNext ? 'X' : 'O');
    tmp_state["win_color"] = 'black';
  }
  return tmp_state;
}

function getWinner(squares, state) {
  /* This game requires the three squares in a line, such as horizontal, 
      vertical or diagnol with the same Chars. It wins the game.
  */
  var winner_array;
  for (var i = 0; i < state.rows; i++) {
    for (var j = 0; j < state.rows; j++) {
      winner_array = look_for_winner(i, j, squares, state);
      if (!!winner_array) {
        return winner_array;
      }
    }
  }
  return winner_array;
}

function look_for_winner(i, j, squares, state) {
  const win_rule = state.win_rule;
  var location = look_for_row_column_in_board(i, j, squares, state);
  var row = location ? location[0] : -1;
  var col = location ? location[1] : -1;
  var adjacent_count = 0;
  var adjacent_array = [];
  if (row > -1 && col > -1) {
    let rc = right_count(squares, row, col, state);
    if (rc[0] > adjacent_count) {
      adjacent_count = rc[0];
      adjacent_array = rc[1];
    }
    let dc = down_count(squares, row, col, state);
    if (dc[0] > adjacent_count) {
      adjacent_count = dc[0];
      adjacent_array = dc[1];
    }
    let r_u_c = right_up_count(squares, row, col, state);
    if (r_u_c[0] > adjacent_count) {
      adjacent_count = r_u_c[0];
      adjacent_array = r_u_c[1];
    }
    let r_d_c = right_down_count(squares, row, col, state);
    if (r_d_c[0] > adjacent_count) {
      adjacent_count = r_d_c[0];
      adjacent_array = r_d_c[1];
    }
  }
  if (adjacent_count >= win_rule) {
    return adjacent_array;
  }
  return null;
}


function right_count(squares, row, col, state) {
  var n = row * state.rows + col;
  var locations = [n];
  var adjacent_count = 1;
  for (var j = col + 1; j < state.rows; j++) {
    var m = row * state.rows + j;
    if (squares[n] === squares[m]) {
      adjacent_count += 1;
      locations.push(m);
    } else {
      return [adjacent_count, locations];
    }
  }
  return [adjacent_count, locations];
}


function down_count(squares, row, col, state) {
  var n = row * state.rows + col;
  var locations = [n];
  var adjacent_count = 1;
  for (var i = row + 1; i < state.rows; i++) {
    var m = i * state.rows + col;
    if (squares[n] === squares[m]) {
      adjacent_count += 1;
      locations.push(m);
    } else {
      return [adjacent_count, locations];
    }
  }
  return [adjacent_count, locations];
}

function right_up_count(squares, row, col, state) {
  var n = row * state.rows + col;
  var locations = [n];
  var adjacent_count = 1;
  for (var i = row - 1; i >= 0; i--) {
    col = col + 1;
    if (col < state.rows) {
      var m = i * state.rows + col;
      if (squares[n] === squares[m]) {
        adjacent_count += 1;
        locations.push(m);
      } else {
        return [adjacent_count, locations];
      }
    }
  }
  return [adjacent_count, locations];
}

function right_down_count(squares, row, col, state) {
  var n = row * state.rows + col;
  var locations = [row * state.rows + col];
  var adjacent_count = 1;
  for (var i = row + 1; i < state.rows; i++) {
    col = col + 1;
    if (col < state.rows) {
      var m = i * state.rows + col;
      if (squares[n] === squares[m]) {
        adjacent_count += 1;
        locations.push(m);
      } else {
        return [adjacent_count, locations];
      }
    }
  }
  return [adjacent_count, locations];
}

function look_for_row_column_in_board(r, c, squares, state) {
  var n = state.rows * r + c;
  if (squares[n]) {
    return [r, c]; // row and colum start from 0
  }
  return null
}

function toggle(tmp_state) {
  if (tmp_state.order === 'Ascend') {
    tmp_state.order = 'Descend'
  } else {
    tmp_state.order = 'Ascend'
  }
  return tmp_state;
}

