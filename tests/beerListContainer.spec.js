import React from "react";
import { expect } from "chai";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import {
  BeerListContainer,
  InputArea,
  BeerList,
} from "../src/beerListContainer";

Enzyme.configure({ adapter: new Adapter() });

describe("BeerListContainer", () => {
  it("should render InputArea and BeerList", () => {
    const wrapper = shallow(<BeerListContainer />);
    expect(
      wrapper.containsAllMatchingElements([<InputArea />, <BeerList />])
    ).to.equal(true);
  });

  it("should start with an empty list", () => {
    const wrapper = shallow(<BeerListContainer />);
    expect(wrapper.state("beers")).to.eql([]);
  });

  it("adds items to the list", () => {
    const wrapper = shallow(<BeerListContainer />);
    wrapper.instance().addItem("Sam Adams");
    expect(wrapper.state("beers")).to.eql(["Sam Adams"]);
  });

  it("passes addItem to InputArea", () => {
    const wrapper = shallow(<BeerListContainer />);
    const inputArea = wrapper.find(InputArea);
    const addItem = wrapper.instance().addItem;
    expect(inputArea.prop("onSubmit")).to.eql(addItem);
  });

  it("passes a bound addItem function to InputArea", () => {
    const wrapper = shallow(<BeerListContainer />);
    const inputArea = wrapper.find(InputArea);
    inputArea.prop("onSubmit")("Sam Adams");
    expect(wrapper.state("beers")).to.eql(["Sam Adams"]);
  });

  it("renders the items", () => {
    const wrapper = mount(<BeerListContainer />);

    wrapper.instance().addItem("Sam Adams");
    wrapper.instance().addItem("Resin");
    expect(wrapper.state("beers")).to.eql(["Sam Adams", "Resin"]);
    wrapper.update();
    expect(wrapper.find("li").length).to.equal(2);
  });
});

describe("InputArea", () => {
  it("should contain an input and a button", () => {
    const wrapper = shallow(<InputArea />);
    expect(
      wrapper.containsAllMatchingElements([<input />, <button>Add</button>])
    ).to.equal(true);
  });

  it("should accept input", () => {
    //const wrapper = mount(<InputArea />); // Also works
    const wrapper = shallow(<InputArea />);
    expect(wrapper.state("text")).to.equal("");
    let input = wrapper.find("input");
    input.simulate("change", { target: { value: "Resin" } });
    // Dom is changed
    expect(wrapper.state("text")).to.equal("Resin");

    input = wrapper.find("input");
    expect(input.prop("value")).to.equal("Resin");
  });
});

describe("BeerList", () => {
  it("should render zero items", () => {
    const wrapper = shallow(<BeerList items={[]} />);
    expect(wrapper.find("li")).to.have.length(0);
  });

  it("should render undefined items", () => {
    const wrapper = shallow(<BeerList items={undefined} />);
    expect(wrapper.find("li")).to.have.length(0);
  });

  it("should render 3 items", () => {
    const items = ["Sam Adams", "Resin", "Octoberfest"];
    const wrapper = shallow(<BeerList items={items} />);
    expect(wrapper.find("li").length).to.equal(3);
    expect(wrapper.find("li")).to.have.length(3);
  });
});
