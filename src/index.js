/*
Change the rule of this game.
Not entire row or column or diagnol
line with all same char. 
Instead with adjacent 5 same chars 
will win the game.
This is also named in Chinese chest 'Five finger chest'.
*/

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./Game";
import Footer from "./Footer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducers from "./rootReducer";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import BlinkyRender from "./BlinkyRender";

const store = createStore(rootReducers, applyMiddleware(thunk));
//const store = createStore(rootReducers)
// ========================================

const App = () => (
  <Provider store={store}>
    <Game rows="15" />
    <Footer />
    <BlinkyRender />
  </Provider>
);
/*
ReactDOM.render(
  <Game rows='15'/>,
  document.getElementById('root')
);
*/

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
