import React from "react";
//import { render } from "@testing-library/react";
import ModalApp, { Modal, Util } from "../src/modal";
import renderer from "react-test-renderer";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

describe("Modal", () => {
  it("renders a snapshot", () => {
    const tree = renderer.create(<ModalApp />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Logout is called if there is no active profile", (done) => {
    const utilLogoutSpy = jest.spyOn(Util, "logout");
    /*let isAuthenticatedStub = sinon
      .stub(AccountProfile, "isAuthenticated")
      .returns(true);*/
    let fetchURLStub = sinon.stub(Util, "fetchURL").returns(
      new Promise((resolve, reject) => {
        reject();
      })
    );
    let modal = mount(<Modal />);

    setTimeout(() => {
      expect(utilLogoutSpy).toHaveBeenCalled();
      //isAuthenticatedStub.restore();
      fetchURLStub.restore();
      done();
    });
  });
});
