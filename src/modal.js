import React from "react";
import PropTypes from "prop-types";

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="backdropStyle">
        <div className="modalStyle">
          {this.props.children}

          <div className="footer">
            <button onClick={this.props.onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
};

class ModalApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className="App">
        {!this.state.isOpen && (
          <button onClick={this.toggleModal}>Open the modal</button>
        )}

        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          Here's some content for the modal
        </Modal>
      </div>
    );
  }
}

export default ModalApp;
