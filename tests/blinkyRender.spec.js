import React from "react";
import { expect } from "chai";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import BlinkyRender from "../src/BlinkyRender";

Enzyme.configure({ adapter: new Adapter() });

describe("BlinkyRender", () => {
  it("should render div", () => {
    let wrapper = shallow(<BlinkyRender />);
    expect(wrapper.containsAllMatchingElements([<div>value: 0</div>])).to.equal(
      true
    );
    wrapper = mount(<BlinkyRender />);
    expect(wrapper.containsAllMatchingElements([<div>value: 0</div>])).to.equal(
      false
    );
  });

  it("should start with value 0", () => {
    const wrapper = shallow(<BlinkyRender />);
    expect(wrapper.find("div").text()).to.equal("value: 0");
  });

  it("should start with value other than 0", () => {
    const wrapper = mount(<BlinkyRender />);
    expect(wrapper.find("div").text()).to.not.equal("value: 0");
  });
});
