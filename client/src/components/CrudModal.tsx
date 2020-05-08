import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface MyProps {
  modalOpen: boolean;
  modalAction: string;
  modalType: string;
  submitModal: () => void;
  closeModal: () => void;
  children: any;
}

const CrudModal = ({
  modalOpen,
  closeModal,
  modalAction,
  modalType,
  submitModal,
  children,
}: MyProps) => (
  <Modal isOpen={modalOpen}>
    <ModalHeader toggle={closeModal}>
      {modalAction} {modalType}
    </ModalHeader>
    <ModalBody>{children}</ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={submitModal}>
        {modalAction === "Edit" ? "Save" : modalAction}
      </Button>
    </ModalFooter>
  </Modal>
);

export default CrudModal;
