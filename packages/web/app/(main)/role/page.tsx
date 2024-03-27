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

const permissions = [
  {
    id: 1,
    name: "Create",
    slug: "create",
  },
  {
    id: 2,
    name: "Read",
    slug: "read",
  },
  {
    id: 3,
    name: "Update",
    slug: "update",
  },
  {
    id: 4,
    name: "Delete",
    slug: "delete",
  },
];

const roles = [
  {
    id: 1,
    name: "Admin",
    permissions: ["create", "read", "update", "delete"],
  },
  {
    id: 2,
    name: "User",
    permissions: ["read"],
  },
  {
    id: 3,
    name: "Guest",
    permissions: ["read"],
  },
];

const Index = () => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex justify-between items-center mb-5">
          <p className="text-lg font-bold">Roles</p>
          <Button className="pl-3">
            <Icon name="Plus" />
            Add New Role
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              {permissions.map((permission) => (
                <TableHeader key={permission.id}>{permission.name}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow>
                <TableCell className="font-bold">{role.name}</TableCell>
                {permissions.map((permission) => (
                  <TableCell key={permission.id} className="font-bold">
                    <Toggle checked={role.permissions.includes(permission.slug)} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <div className="flex justify-between items-center mb-5">
          <p className="text-lg font-bold">Permission</p>
          <Button className="pl-3">
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
            {permissions.map((p) => (
              <TableRow>
                <TableCell className="font-bold">{p.name}</TableCell>
                <TableCell className="font-bold"><Badge label={p.slug} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Index;
