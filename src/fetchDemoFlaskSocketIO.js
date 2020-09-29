import React from "react";
import axios from "axios";

// boot up the flask-socketIO project in example/
class FetchDemoFLaskSocketIO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      posts: [],
    };
  }
  /*
  state = {
    posts: [],
  };*/

  componentDidMount() {
    axios
      .get(`http://localhost:5000/${this.props.subreddit}`)
      .then((res) => {
        const posts = res.data.map((obj) => obj);
        this.setState({ posts });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ error: "Response with Error: " + error.response });
        } else if (error.request) {
          this.setState({ error: "No response after requeset." });
        } else {
          this.setState({ error: "Unknown errors" });
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
          {this.state.posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FetchDemoFLaskSocketIO;
