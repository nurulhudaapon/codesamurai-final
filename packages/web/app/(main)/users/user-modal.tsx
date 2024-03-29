"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { Modal } from "@/components/modal";
import React, { useState } from "react";
import { createUser } from "./server";
import { notify } from "@/components/toast";

type CreateUserModalProps = {
  onClose: () => void;
  triggerUpdate?: () => void;
};

const CreateUserModal = ({ triggerUpdate, onClose }: CreateUserModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const user = {
      first_name: data.get("first_name") as string,
      last_name: data.get("last_name") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
    };
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
