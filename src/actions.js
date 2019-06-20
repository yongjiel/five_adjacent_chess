export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";
export const CLICK_GRID = 'CLICK_GRID';



export function increment() {
  return { type: INCREMENT };
}


export const decrement = () => ({ type: DECREMENT });

export const reset = () => ({ type: RESET });

export const click_grid = () => ({ type: CLICK_GRID });