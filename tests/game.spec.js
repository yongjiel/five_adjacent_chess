import React from "react";
import { expect } from "chai";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import { Game, BoardSize, Board } from "../src/game";

Enzyme.configure({ adapter: new Adapter() });

describe("Game", () => {
  it("should render BoardSize and Board", () => {
    const wrapper = shallow(<Game />);
    expect(
      wrapper.containsAllMatchingElements([<BoardSize />, <Board />])
    ).to.equal(true);
  });
});
