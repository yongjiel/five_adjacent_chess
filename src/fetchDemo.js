import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

class FetchDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      posts: [],
    };
  }
  /*state = {
    error: "",
    posts: [],
  };*/

  componentDidMount() {
    axios
      .get(`https://www.reddit.com/r/${this.props.subreddit}.json`)
      .then((resp) => {
        const posts = resp.data.data.children.map((obj) => obj.data);
        this.setState({ posts });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ error: "Response with Error: " + error.response });
        } else if (error.request) {
          this.setState({ error: "No response after requeset." });
        } else {
          this.setState({ error: "Unknown errors: " + error });
        }
      });
  }

  render() {
    if (!this.state.error && this.state.posts.length === 0) {
      return (
        <div>
          <h1>{`/r/${this.props.subreddit}`}</h1>
          <p>No posts yet</p>
        </div>
      );
    } else if (!!this.state.error) {
      return (
        <div>
          <h1>{`/r/${this.props.subreddit}`}</h1>
          <p>{this.state.error}</p>
        </div>
      );
    }
    return (
      <div>
        <h1>{`/r/${this.props.subreddit}`}</h1>
        <ul>
          {this.state.posts.map((post, index) => (
            <li key={index}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
FetchDemo.prpoTypes = {
  error: PropTypes.string.isRequired,
  posts: PropTypes.func.isRequired,
};

export default FetchDemo;
