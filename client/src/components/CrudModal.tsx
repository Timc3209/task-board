import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface Props {
  modalOpen: boolean;
  modalAction: string;
  modalType: string;
  submitModal: () => void;
  closeModal: () => void;
  deleteAction?: any;
  children: any;
}

interface States {
  showDelete: boolean;
}

class CrudModal extends React.Component<Props, States> {
  readonly state: States = {
    showDelete: false,
  };

  showDelete = () => {
    this.setState({ showDelete: true });
  };

  deleteAction = () => {
    this.props.deleteAction();
    this.setState({ showDelete: false });
    this.props.closeModal();
  };

  closeDelete = () => {
    this.setState({ showDelete: false });
  };

  render() {
    const {
      modalOpen,
      modalAction,
      modalType,
      submitModal,
      closeModal,
      children,
    } = this.props;

    return (
      <div>
        <Modal isOpen={modalOpen} centered={true}>
          <ModalHeader toggle={closeModal}>
            {modalAction} {modalType}
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter
            className={modalAction === "Edit" ? "justify-content-between" : ""}
          >
            {modalAction === "Edit" && (
              <Button color="primary" onClick={this.showDelete}>
                Delete
              </Button>
            )}
            <Button color="primary" onClick={submitModal}>
              {modalAction === "Edit" ? "Save" : modalAction}
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.showDelete} centered={true} size="sm">
          <ModalBody>Are you sure you want to delete?</ModalBody>
          <ModalFooter centered={true} className="justify-content-center">
            <Button color="primary" onClick={this.closeDelete}>
              No
            </Button>
            <Button color="primary" onClick={this.deleteAction}>
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CrudModal;
