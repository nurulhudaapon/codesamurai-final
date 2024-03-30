"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { Modal } from "@/components/modal";
import React, { useState } from "react";
import { CreateNewUserType, createUser } from "./server";
import { notify } from "@/components/toast";

type CreateUserModalProps = {
  onClose: () => void;
  triggerUpdate?: () => void;
};

const CreateUserModal = ({ triggerUpdate, onClose }: CreateUserModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as unknown as CreateNewUserType;

    setLoading(true);
    await createUser(user)
      .then(() => {
        triggerUpdate?.();
        onClose();
        notify.success("User created successfully");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <Modal
        onClose={onClose}
        header={<h3>Create User</h3>}
        footer={
          <Button loading={loading} type="submit">
            Create
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <Input name="first_name" placeholder="First Name" required />
          <Input name="last_name" placeholder="Last Name" required />
          <Input name="email" placeholder="Email" required />
          <Input name="phone" placeholder="Phone Number" type="tel" required />
        </div>
      </Modal>
    </form>
  );
};

export default CreateUserModal;
