"use client";

import Button from "@/components/button";
import { Badge } from "@/components/chip";
import { Icon } from "@/components/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Toggle } from "@/components/toggle";
import { useEffect, useState } from "react";
import {
  PermissionsType,
  RolesWithPermissionType,
  addPermission,
  getPermissions,
  getRoles,
  removePermission,
} from "./server";
import PermissionModal from "./permission-modal";
import RoleModal from "./role-modal";
import { notify } from "@/components/toast";

const Index = () => {
  const [roles, setRoles] = useState<RolesWithPermissionType>([]);
  const [roleModal, setRoleModal] = useState<boolean>(false);
  const [permission, setPermissions] = useState<PermissionsType>([]);
  const [permissionModal, setPermissionModal] = useState<boolean>(false);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = () => {
    getRoles().then((data) => {
      setRoles(data);
    });
  };

  const fetchPermissions = () => {
    getPermissions().then((data) => {
      setPermissions(data);
    });
  };

  const onToogleUpdate = (
    role: string,
    permission: string,
    active: boolean
  ) => {
    (!active ? addPermission : removePermission)(role, permission).then(
      (res) => {
        fetchRoles();
        const notifier = !active ? notify.success : notify.error;
        notifier(`Permission ${!active ? 'added' : 'removed'}`);
      }
    );
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div>
          <div className="flex justify-between items-center mb-5">
            <p className="text-lg font-bold">Roles</p>
            <Button onClick={() => setRoleModal(true)} className="pl-3">
              <Icon name="Plus" />
              Add New Role
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                {permission.map((permission) => (
                  <TableHeader key={permission.id}>
                    {permission.title}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-bold">{role.title}</TableCell>
                  {permission.map((permission) => {
                    const active = role.role_permission.some(
                      (p) => p.permission.slug === permission.slug
                    );
                    return (
                      <TableCell key={permission.slug} className="font-bold">
                        <Toggle
                          onChange={(v) => {
                            onToogleUpdate(role.id, permission.id, active);
                          }}
                          checked={active}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <div className="flex justify-between items-center mb-5">
            <p className="text-lg font-bold">Permission</p>
            <Button onClick={() => setPermissionModal(true)} className="pl-3">
              <Icon name="Plus" />
              Add New Permission
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Slug</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {permission.map((p, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-bold">{p.title}</TableCell>
                  <TableCell className="font-bold">
                    <Badge label={p.slug} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {roleModal && (
        <RoleModal
          permission={permission}
          onClose={() => setRoleModal(false)}
          triggerUpdate={fetchRoles}
        />
      )}
      {permissionModal && (
        <PermissionModal
          onClose={() => setPermissionModal(false)}
          triggerUpdate={fetchPermissions}
        />
      )}
    </>
  );
};

export default Index;
