import React from "react";
import { expect } from "chai";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import FetchDemo from "../src/fetchDemo";
//import nock from "nock";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

Enzyme.configure({ adapter: new Adapter() });

describe("FetchDemo", () => {
  let mock;

  before(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  after(() => {
    mock.restore();
  });

  it("should render div", () => {
    const wrapper = shallow(<FetchDemo subreddit="reactjs" />);
    expect(
      wrapper.containsAllMatchingElements([
        <div>
          <h1>/r/reactjs</h1>
          <p>No posts yet</p>
        </div>,
      ])
    ).to.equal(true);
  });

  it("Posts should be 2 after mock", (done) => {
    // here we are spying on componentDidMount to know that it has been called
    const reactjs = "reactjs";

    let response = {
      data: {
        children: [
          {
            data: {
              id: 1,
              title: "t1",
            },
          },
          {
            data: {
              id: 2,
              title: "t2",
            },
          },
        ],
      },
    };

    mock.onGet("https://www.reddit.com/r/reactjs.json").reply(200, response);
    /*nock("http://www.reddit.com/")
      .get("/r/reactjs.json")
      .reply(200, response, { "Access-Control-Allow-Origin": "*" });*/

    const wrapper = mount(<FetchDemo subreddit={reactjs} />);
    expect(wrapper.state()).to.deep.equal({ error: "", posts: [] });

    // wait one tick for the promise to resolve
    setImmediate(() => {
      expect(wrapper.state("posts")).to.deep.equal(
        response.data.children.map((obj) => obj.data)
      );
      done();
    });
  });
});
