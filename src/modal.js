import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import Cookies from "js-cookie";

export class Util {
  static isAuthenticated() {
    Cookies.get("isLoggedIn");
  }

  static fetchURL() {
    return $.ajax({
      url: "https://www.reddit.com/r/reactjs.json",
      method: "GET",
      dataType: "json",
    });
  }

  static logout() {
    Cookies.remove("isLoggedIn");
  }
}

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      posts: [],
    };
  }

  componentDidMount() {
    //if (Util.isAuthenticated()) {
    Util.fetchURL()
      .then(
        (resp) => {
          const posts = resp.data.children.map((obj) => obj.data);
          this.setState({ posts });
        },
        (err) => {
          Util.logout();
        }
      )
      .catch((error) => {
        if (error.response) {
          this.setState({ error: "Response with Error: " + error.response });
        } else if (error.request) {
          this.setState({ error: "No response after requeset." });
        } else {
          this.setState({ error: "Unknown errors: " + error });
        }
        Util.logout();
      });
    //}
  }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    let list = "";
    if (!this.state.error && this.state.posts.length === 0) {
      list = (
        <div>
          <h1>{`/r/reactjs`}</h1>
          <p>No posts yet</p>
        </div>
      );
    } else if (!!this.state.error) {
      list = (
        <div>
          <h1>{`/r/reactjs`}</h1>
          <p>{this.state.error}</p>
        </div>
      );
    } else {
      list = (
        <div>
          <h1>{`/r/reactjs`}</h1>
          <ul>
            {this.state.posts.map((post, index) => (
              <li key={index}>{post.title}</li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="backdropStyle">
        <div className="modalStyle">
          {this.props.children}

          <div className="footer">
            <button onClick={this.props.onClose}>Close</button>
          </div>
          {list}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.node,
};

class ModalApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

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

export default ModalApp;
