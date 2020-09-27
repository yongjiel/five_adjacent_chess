import React from "react";
import { expect } from "chai";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import ThreeCounts from "../src/ThreeCounts";

Enzyme.configure({ adapter: new Adapter() });

describe("ThreeCounts", () => {
  it("should render 1 div 3 values and line break, 3 buttons", () => {
    const wrapper = shallow(<ThreeCounts />);
    expect(
      wrapper.containsAllMatchingElements([
        <div>
          <div>0 0 0</div>
          <button>Increment count1</button>
          <button>Increment count2</button>
          <button>Increment count3</button>
        </div>,
      ])
    ).to.equal(true);
  });

  it("should render count1,count2,count3 to 1, then 2", () => {
    const wrapper = mount(<ThreeCounts />);

    let bs = wrapper.find("button");

    bs.at(0).simulate("click");
    expect(wrapper.find("div.data").text()).to.equal("1 0 0");

    bs.at(1).simulate("click");
    expect(wrapper.find("div.data").text()).to.equal("1 1 0");

    bs.at(2).simulate("click");
    expect(wrapper.find("div.data").text()).to.equal("1 1 1");

    bs.map((b) => {
      b.simulate("click");
    });
    expect(wrapper.find("div.data").text()).to.equal("2 2 2");
    expect(bs.at(1).text()).to.contain("count2 changed!");
  });
});
