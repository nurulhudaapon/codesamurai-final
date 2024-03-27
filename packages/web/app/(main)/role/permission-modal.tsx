import Button from "@/components/button";
import Input from "@/components/input";
import { Modal } from "@/components/modal";
import React, { useState } from "react";
import { createPermission } from "./server";

type PermissionModalProps = {
  onClose: () => void;
  triggerUpdate?: () => void;
};

const PermissionModal = ({ onClose, triggerUpdate }: PermissionModalProps) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCreate = () => {
    setLoading(true);
    createPermission(inputValue).then(() => {
      setLoading(false);
      triggerUpdate?.();
      onClose();
    });
  };

  return (
    <Modal
      onClose={onClose}
      header={<h3>Create Permission</h3>}
      footer={<Button loading={loading} onClick={handleCreate}>Create</Button>}
    >
      <div>
        <Input
          placeholder="Permission Name"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </Modal>
  );
};

export default PermissionModal;
