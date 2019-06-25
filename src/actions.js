export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";
export const CLICK_GRID = 'CLICK_GRID';
export const CLICK_STEP = 'CLICK_STEP';



export function increment() {
  return { type: INCREMENT };
}


export const decrement = () => ({ type: DECREMENT });

export const reset = () => ({ type: RESET });

export const click_grid = (i) => ({ type: CLICK_GRID , i: i });

export const click_step = () => ({ type: CLICK_STEP });