"use client";

import Button from "@/components/button";
import { Icon } from "@/components/icon";
import { useEffect, useState } from "react";
import {
  RolesType,
  UsersType,
  getRoles,
  getUsers,
  updateUserRole,
} from "./server";
import CreateUserModal from "./user-modal";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Select } from "@/components/select";
import { notify } from "@/components/toast";

const Index = () => {
  const [userModal, setUserModal] = useState<boolean>(false);
  const [users, setUsers] = useState<UsersType>([]);
  const [roles, setRoles] = useState<RolesType>([]);

  const fetchRoles = async () => {
    const roles = await getRoles();
    setRoles(roles);
  };

  const fetchUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  const onRoleChange = async (userId: string, roleId: string) => {
    await updateUserRole(userId, roleId);
    fetchUsers()
      .then(() => {
        notify.success("User role updated successfully");
      })
      .catch(() => {
        notify.error("Failed to update user role");
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-5">
          <p className="text-lg font-bold">Users</p>
          <Button onClick={() => setUserModal(true)} className="pl-3">
            <Icon name="Plus" />
            Add New User
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Role</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {users.map((user, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-bold">
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Select
                    onChange={(e) => onRoleChange(user.id, e.target.value)}
                    value={user.role_id || ""}
                    options={roles.map((r) => ({
                      label: r.title,
                      value: r.id,
                      isSelected: r.id === user.role_id,
                    }))}
                  />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
      {userModal && (
        <CreateUserModal
          onClose={() => setUserModal(false)}
          triggerUpdate={fetchUsers}
        />
      )}
    </>
  );
};

export default Index;
