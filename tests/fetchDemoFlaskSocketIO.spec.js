import React from "react";
import { expect } from "chai";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import FetchDemoFLaskSocketIO from "../src/fetchDemoFlaskSocketIO";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

Enzyme.configure({ adapter: new Adapter() });

describe("FetchDemoFLaskSocketIO", () => {
  let mock;

  //before(() => {
  // for mocha
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  //after(() => {
  // for mocha
  afterAll(() => {
    mock.restore();
  });

  it("should render div", () => {
    const wrapper = shallow(<FetchDemoFLaskSocketIO subreddit="api" />);
    expect(
      wrapper.containsAllMatchingElements([
        <div>
          <h1>/r/api</h1>
          <p>No posts yet</p>
        </div>,
      ])
    ).to.equal(true);
  });

  it("Posts should be 2", (done) => {
    const api = "api";

    let response = [
      {
        id: 1,
        title: "t1",
      },
      {
        id: 2,
        title: "t2",
      },
    ];

    mock.onGet(`http://localhost:5000/${api}`).reply(200, response);
    const wrapper = mount(<FetchDemoFLaskSocketIO subreddit={api} />);
    expect(wrapper.state()).to.deep.equal({ error: "", posts: [] });

    // wait one tick for the promise to resolve
    setImmediate(() => {
      expect(wrapper.state("posts")).to.deep.equal(response.map((obj) => obj));
      wrapper.update();
      expect(wrapper.find("li").length).to.equal(2);
      done();
    });
  });
});
