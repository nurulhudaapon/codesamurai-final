import React, { FormEventHandler, useState } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { Modal } from "@/components/modal";
import { Checkbox } from "@/components/checkbox";
import { Dropdown } from "flowbite-react";
import * as Entity from "@prisma/client";
import { v4 as uuid } from "uuid";
import { addVehicle } from "./server";

type AddVehicleModalProps = {
  onClose: () => void;
  userId: string;
};

// eslint-disable-next-line @next/next/no-async-client-component
const AddVehicleModal = ({ onClose, userId }: AddVehicleModalProps) => {
  const [inputValue, setInputValue] = useState<Entity.vehicles>({
    id: uuid(),
    number: "",
    fuel_cost_full_load: 0,
    fuel_cost_empty_load: 0,
    created_by_user_id: userId,
    capacity: Entity.vehicles_capacity.three_ton,
    type: Entity.vehicles_type.open_truck,
    created_at: new Date(),
    updated_at: new Date(),
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (value: string | number, type: string) => {
    setInputValue({
      ...inputValue,
      [type]: value,
    });
  };

  const handleCreate: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);

    addVehicle(inputValue).then(() => {
      setLoading(false);
      onClose();
    });
  };

  return (
    <form onSubmit={handleCreate}>
      <Modal
        onClose={onClose}
        header={<h3>Add New Vehicle</h3>}
        footer={
          <Button loading={loading} type="submit">
            Create
          </Button>
        }
      >
        <div>
          <Input
            placeholder="Number"
            name="number"
            type="text"
            onChange={(e) => {
              handleInputChange(e.target.value, "number");
            }}
            required
          />
          <div className="mt-4 flex gap-4">
            <Input
              placeholder="Fuel Cost Per KM Fully Loaded"
              type="text"
              name="fuel_cost_full_load"
              onChange={(e) => {
                handleInputChange(
                  Number(e.target.value),
                  "fuel_cost_full_load"
                );
              }}
              required
            />
            <Input
              placeholder="Fuel Cost Per KM Empty Load"
              type="text"
              name="fuel_cost_empty_load"
              onChange={(e) => {
                handleInputChange(
                  Number(e.target.value),
                  "fuel_cost_empty_load"
                );
              }}
              required
            />
          </div>
          <div className="mt-4 flex flex-row gap-4">
            <div className="">
              <select
                name="capacity"
                onChange={(e) => handleInputChange(e.target.value, "capacity")}
              >
                <option value="three_ton">3 Ton</option>
                <option value="five_ton">5 Ton</option>
                <option value="seven_ton">7 Ton</option>
              </select>
            </div>
            <div className="">
              <select
                name="type"
                onChange={(e) => handleInputChange(e.target.value, "type")}
              >
                <option value="open_truck">Open Truck</option>
                <option value="dump_truck">Dump Truck</option>
                <option value="compactor">Compactor</option>
                <option value="container_carrier">Container Carrier</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </form>
  );
};

export default AddVehicleModal;
