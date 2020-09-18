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
import ThreeCounts from "./ThreeCounts";
import FetchDemo from "./fetchDemo";
import FetchDemoFlaskSocketIO from "./fetchDemoFlaskSocketIO";
import RoomApp from "./room";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const store = createStore(rootReducers, applyMiddleware(thunk));
//const store = createStore(rootReducers)
// ========================================

const App = () => (
  <Router>
    <Provider store={store}>
      <Route path="/" component={nav_bar} />
      <Route path="/game" component={game} />
      <Route path="/blinkyrender" component={blinkyrender} />

      <Route path="/threecounts" component={threecounts} />
      <Route path="/fetchdemo" component={fetchdemo} />
      <Route path="/room" component={room} />
    </Provider>
  </Router>
);

const nav_bar = ({ match }) => (
  <div className="header">
    <ul>
      <li>
        <Link to={"/game"}>Game</Link>
      </li>
      <li>
        <Link to={"/blinkyrender"}>BlinkyRender</Link>
      </li>
      <li>
        <Link to={"/threecounts"}>ThreeCounts</Link>
      </li>
      <li>
        <Link to={"/fetchdemo"}>FetchDemo</Link>
      </li>
      <li>
        <Link to={"/room"}>Room</Link>
      </li>
    </ul>
  </div>
);

const game = ({ match }) => (
  <div>
    <Game rows="15" /> <Footer />
  </div>
);

const fetchdemo = ({ match }) => (
  <div>
    <FetchDemo subreddit="reactjs" />
    <FetchDemoFlaskSocketIO subreddit="api" />
  </div>
);

const blinkyrender = ({ match }) => (
  <div>
    <BlinkyRender />
  </div>
);
const threecounts = ({ match }) => (
  <div>
    <ThreeCounts />
  </div>
);
const room = ({ match }) => (
  <div>
    <RoomApp />
  </div>
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
