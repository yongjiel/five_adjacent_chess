import React from "react";
import { render } from "@testing-library/react";
import ModalApp from "../src/modal";
import renderer from "react-test-renderer";

it("renders a snapshot", () => {
  const tree = renderer.create(<ModalApp />).toJSON();
  expect(tree).toMatchSnapshot();
});
