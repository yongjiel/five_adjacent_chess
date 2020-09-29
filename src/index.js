/*
Change the rule of this game.
Not entire row or column or diagnol
line with all same char. 
Instead with adjacent 5 same chars 
will win the game.
This is also named in Chinese chest 'Five finger chest'.
*/

import React, { useState, useCallback, useEffect } from "react";
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
import Modal from "./modal";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import { BeerListContainer } from "./beerListContainer";

const store = createStore(rootReducers, applyMiddleware(thunk));
//const store = createStore(rootReducers)
// ========================================

function App() {
  const [show_or_hide, setHide] = useState(true);
  // make wrapper function to give child
  const onLoginClick = useCallback(
    (val) => {
      setHide(val);
    },
    [setHide]
  );

  return (
    <Router>
      <div>---- Current url in app: {window.location.href} ---</div>
      <Switch>
        <Redirect from="/home" to="/" />
        <Redirect from="/index" to="/" />
      </Switch>
      {show_or_hide && <Route path="/" component={NavBar} />}
      <Route path="/blinkyrender" component={blinkyrender} />
      <Route path="/threecounts" component={threecounts} />
      <Route path="/fetchdemo" component={fetchdemo} />
      <Route path="/room" component={room} />
      <Route path="/modal" component={ModalApp} />
      <Provider store={store}>
        <Route exact path="/game/:id?" component={GameApp} />
      </Provider>
      <Route path="/beerListcontainer" component={BeerListContainer} />
      <Route
        path="/login"
        render={(props) => (
          <Login
            {...props}
            onLoginClick={onLoginClick}
            show_or_hide={show_or_hide}
          />
        )}
      />
    </Router>
  );
}
//<Provider store={store}>
//      <Route exact path="/game/:id?" render ({match}) => <GameApp rows={match.params.id} />} />
//    </Provider>
function Login({ onLoginClick, show_or_hide }) {
  const [loggedin, setLogin] = useState(false);

  useEffect(() => {
    onLoginClick(false);
    setLogin(false);
  }, [onLoginClick, setLogin]);

  function onClick() {
    setLogin(true);
    onLoginClick(true);
  }

  return (
    <div>
      <div>
        This is login page.
        {show_or_hide
          ? "Should show the Nav bar now."
          : "Click on the button to show Nav bar."}
      </div>
      <button onClick={onClick}> {loggedin ? "LoggedIn" : "Login"}</button>
    </div>
  );
}

const NavBar = ({ match }) => (
  <div className="header">
    <ul>
      <li>
        <Link to={"/game"}>Game</Link>
      </li>
      <li>
        <Link to={"/blinkyrender"}>BlinkyRender useLayoutEffect</Link>
      </li>
      <li>
        <Link to={"/threecounts"}>ThreeCounts useEffect</Link>
      </li>
      <li>
        <Link to={"/fetchdemo"}>FetchDemo</Link>
      </li>
      <li>
        <Link to={"/room"}>Room Context API</Link>
      </li>
      <li>
        <Link to={"/modal"}>Modal</Link>
      </li>
      <li>
        <Link to={"/beerListcontainer"}>
          BeerListContaineral Mocha Test cases
        </Link>
      </li>

      <li>
        <Link to={"/login"}>Login</Link>
      </li>
    </ul>
  </div>
);

/*
const GameApp = ({ rows }) => (
  <div>
    <Game rows_={rows || 15} /> <Footer />
  </div>
);*/
const GameApp = ({ match }) => (
  <div>
    <Game rows_={!!match ? match.params.id : 15} /> <Footer />
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

class ModalApp extends React.Component {
  state = { isOpen: false };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div className="App">
        {!this.state.isOpen && (
          <button onClick={this.toggleModal}>Open the modal</button>
        )}

        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          Here's some content for the modal
        </Modal>
      </div>
    );
  }
}
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
