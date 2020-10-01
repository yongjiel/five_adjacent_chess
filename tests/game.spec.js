import React from "react";
import { expect } from "chai";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import { Game } from "../src/Game";
import BoardSize from "../src/BoardSize";
import Board from "../src/Board";
import StepList from "../src/StepList";

Enzyme.configure({ adapter: new Adapter() });

describe("Game", () => {
  it("should render BoardSize and Board", () => {
    const wrapper = shallow(<Game />);
    expect(
      wrapper.containsMatchingElement([<BoardSize />, <Board />, <StepList />])
    ).to.equal(true);
  });
});
