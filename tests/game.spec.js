import React from "react";
//import { expect } from "chai";  // use jest expect
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount, render } from "enzyme";
import ConnectedGame, { Game } from "../src/Game";
import BoardSize from "../src/BoardSize";
import Board from "../src/Board";
import StepList from "../src/StepList";
import configureMockStore from "redux-mock-store";
import { mapStateToProps, mapDispatchToProps } from "../src/Game";
import { Provider } from "react-redux";
import TestRenderer from "react-test-renderer";
import { reset } from "../src/actions";
import rootReducers from "../src/rootReducer";
import { createStore } from "redux";
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
let rows = 15; // 8 * 8 button matrix
let win_rule = 5; // 5 adjacent buttons with same char.
const initialState = {
  reducer: {
    history: [
      {
        squares: Array(rows ** 2).fill(null),
      },
    ], // initiate state of squares of the board and keep all the steps' states of all squares.
    xIsNext: true,
    stepNumber: 0,
    rows: rows, // also is the number of columns.
    max_rows: 20, //max limit of rows.
    fixed: false, // after rows is changed in left-up input box, it is true. No more change further.
    locations: [
      {
        row: 0,
        col: 0,
      },
    ],
    winner_stepNumber: -1,
    winner: null,
    order: "Ascend",
    match: [], // hold the square indices(linear in array) when win the game.
    win_rule: win_rule,
    status: null,
    win_color: null,
    bold2: null,
  },
};
/* Not work 
const waitForComponentToPaint = async (wrapper) => {
  act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
    wrapper.update();
  });
};*/

describe("Game", () => {
  let store;
  let component;
  // set up a fake store for all our tests
  beforeEach(() => {
    store = mockStore(initialState);

    store.dispatch = jest.fn();

    store.getActions = () => {
      return [{ type: "RESET" }];
    };

    component = TestRenderer.create(
      <Provider store={store}>
        <ConnectedGame rows_={15} />
      </Provider>
    );
  });

  it("should render BoardSize and Board", () => {
    const wrapper = shallow(<Game />);
    expect(
      wrapper.containsMatchingElement([<BoardSize />, <Board />, <StepList />])
    ).toEqual(true);
  });

  it("should render with given state from Redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should restart the game with state stepNumber == 0", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ConnectedGame rows_={15} />
      </Provider>
    );

    expect(wrapper.props().value.store.getState().reducer.stepNumber).toEqual(
      0
    );
  });

  // Simulate Cypress
  it("should reset the game with state stepNumber == 0", () => {
    let new_store = createStore(rootReducers);
    const wrapper = mount(
      <Provider store={new_store}>
        <ConnectedGame rows_={15} />
      </Provider>
    );
    expect(wrapper.find("li.step_list").length).toEqual(1);

    let squares = wrapper.find("button.square");
    let first_square = squares.get(0);
    act(() => {
      first_square.props.onClick();
    });
    wrapper.update();
    expect(wrapper.find("li.step_list").length).toEqual(2);

    let reset_wrap = wrapper.find(".reset");
    let reset_button = reset_wrap.get(0);
    act(() => {
      reset_button.props.onClick();
    });
    wrapper.update();
    expect(wrapper.find("li.step_list").length).toEqual(1);
  });

  //https://jsramblings.com/3-ways-to-test-mapstatetoprops-and-mapdispatchtoprops/
  it("test mapStateToProps", () => {
    const initialState = {
      reducer: {
        status: "Winer: O",
        bold2: "yes",
        win_color: "red",
      },
    };

    // Just call the method directly passing in sample data
    // to make sure it does what it's supposed to
    expect(mapStateToProps(initialState).status).toEqual(
      initialState.reducer.status
    );
    expect(mapStateToProps(initialState).bold2).toEqual(
      initialState.reducer.bold2
    );
    expect(mapStateToProps(initialState).win_color).toEqual(
      initialState.reducer.win_color
    );
  });

  it("test mapDispatchToPrpos", () => {
    const dispatch = jest.fn();

    // For the `mapDispatchToProps`, call it directly but pass in
    // a mock function and check the arguments passed in are as expected
    mapDispatchToProps(dispatch).reset();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: "RESET" });
  });

  it("should hit restart method in Game when hit reset button", () => {
    const spy = jest.spyOn(Game.prototype, "restart");

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedGame rows_={15} />
      </Provider>
    );
    // restart method should pass.
    expect(spy).not.toHaveBeenCalled();
    wrapper.find("div.game-reset button").simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("should hit reset action when click reset button", () => {
    const reset_spy = jest.spyOn(require("../src/actions"), "reset");
    TestRenderer.act(() => {
      //component.root.findByType("button").props.onClick();
      //console.log(component.root.findByProps({ className: "reset" }).props);
      component.root.findByProps({ className: "reset" }).props.onClick();
    });

    expect(reset_spy).toHaveBeenCalledTimes(1);
    expect(reset_spy).toHaveBeenCalledWith();
    reset_spy.mockRestore();
  });

  // Simulate Cypress
  it("should win the game", () => {
    let new_store = createStore(rootReducers);
    const wrapper = mount(
      <Provider store={new_store}>
        <ConnectedGame rows_={15} />
      </Provider>
    );
    expect(wrapper.find(".winner").text()).toEqual("");

    let rs = wrapper.find("div.board-row");
    //console.log(rs.at(0).children().find("button").debug());
    let row_1_buttons = rs.at(0).children().find("button");
    let row_2_buttons = rs.at(1).children().find("button");

    act(() => {
      row_1_buttons.get(0).props.onClick();
      row_2_buttons.get(0).props.onClick();
      row_1_buttons.get(1).props.onClick();
      row_2_buttons.get(1).props.onClick();
      row_1_buttons.get(2).props.onClick();
      row_2_buttons.get(2).props.onClick();
      row_1_buttons.get(3).props.onClick();
      row_2_buttons.get(3).props.onClick();
      row_1_buttons.get(4).props.onClick();
    });
    wrapper.update();
    expect(wrapper.find(".winner").prop("style")).toEqual({
      color: "red",
      fontWeight: "bold",
    });
    expect(wrapper.find(".winner").text()).toEqual("Winner: X");
  });
});
