import React from "react";
import axios from "axios";

class FetchDemo extends React.Component {
  state = {
    error: "",
    posts: [],
  };

  componentDidMount() {
    axios
      .get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .then((res) => {
        const posts = res.data.data.children.map((obj) => obj.data);
        this.setState({ posts });
      })
      .catch((error) => {
        if (error.response) {
          let error = "Response with Error: " + error.response;
          this.setState({ error });
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

export default FetchDemo;
