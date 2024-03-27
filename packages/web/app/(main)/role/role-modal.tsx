import Button from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import Input from "@/components/input";
import { Modal } from "@/components/modal";
import React, { FormEventHandler, useState } from "react";
import { PermissionsType, createNewRole } from "./server";

type RoleModalProps = {
  permissions: PermissionsType;
  onClose: () => void;
  triggerUpdate?: () => void;
};

const RoleModal = ({ permissions, onClose, triggerUpdate }: RoleModalProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedPermissions, setSelecedPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCheckboxChange = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelecedPermissions(selectedPermissions.filter((p) => p !== permission));
    } else {
      setSelecedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleCreate: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    createNewRole({
      name: inputValue,
      permissions: selectedPermissions,
    }).then(() => {
      setLoading(false);
      triggerUpdate?.();
      onClose();
    });
  };

  return (
    <form onSubmit={handleCreate}>
      <Modal
        onClose={onClose}
        header={<h3>Create Role</h3>}
        footer={
          <Button loading={loading} type="submit">
            Create
          </Button>
        }
      >
        <div>
          <Input
            placeholder="Role Name"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            required
          />
          <p className="text-sm mt-6 mb-1 font-bold">Permissions</p>
          <hr className="mb-4" />
          {permissions.map((permission) => (
            <Checkbox
              key={permission.id}
              label={permission.title}
              checked={selectedPermissions.includes(permission.id)}
              onChange={() => handleCheckboxChange(permission.id)}
            />
          ))}
        </div>
      </Modal>
    </form>
  );
};

export default RoleModal;
