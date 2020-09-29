import React from "react";
import { expect } from "chai";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import RoomApp, { App, Room } from "../src/room";

Enzyme.configure({ adapter: new Adapter() });

describe("RoomApp", () => {
  it("should render App", () => {
    const wrapper = shallow(<RoomApp />);
    expect(wrapper.containsMatchingElement(<App />)).to.equal(true);
  });

  it("should render App", () => {
    const wrapper = mount(<RoomApp />);
    expect(wrapper.containsMatchingElement(<Room />)).to.equal(true);
  });

  it("should turn lit", () => {
    const wrapper = mount(<RoomApp />);
    let roomStore = wrapper.find("RoomStore");
    expect(roomStore.state("isLit")).to.eql(false);

    let b = wrapper.find("button");
    b.simulate("click");

    //console.log(wrapper.debug());
    //console.log(r.text());
    //console.log(r.prop("className"));
    expect(roomStore.state("isLit")).to.eql(true);

    let r = wrapper.find("div.room"); // the old pointer
    expect(r.prop("className")).to.equal("room lit");

    b.simulate("click");

    //console.log(r.text());
    //console.log(r.prop("className"));
    expect(roomStore.state("isLit")).to.eql(false);
    r = wrapper.find("div.room"); // the new pointer
    expect(r.prop("className")).to.equal("room dark");
  });
});
