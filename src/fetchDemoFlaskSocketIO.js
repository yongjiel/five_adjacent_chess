import React from "react";
import axios from "axios";

// boot up the flask-socketIO project in example/
class FetchDemoFLaskSocketIO extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/${this.props.subreddit}`).then((res) => {
      const posts = res.data.map((obj) => obj);
      this.setState({ posts });
    });
  }

  render() {
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
