import React from "react";
import { Modal } from "antd";

const ModalConfirm = ({
  isModalOpen,
  handleOk,
  handleCancel,
  title,
  content,
}: {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  title: string;
  content: string;
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default ModalConfirm;
