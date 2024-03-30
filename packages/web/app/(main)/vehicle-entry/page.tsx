import React from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { Modal } from "@/components/modal";
import * as Entity from "@prisma/client";
import { v4 as uuid } from "uuid";
import { StsSelector } from "../vehicles/server";
import { getServerAuthSession } from "@/utils/auth";
import { dbClient } from "@/client";

type AddVehicleModalProps = {
  userId: string;
};

export async function addVehicle(formData: FormData) {
  "use server";
  const session = await getServerAuthSession();
  const data = Object.fromEntries(formData.entries());
  const entity = {
    ...data,
    id: uuid(),

    created_by_user_id: session.id,
    loaded_cost: +data.loaded_cost,
    unloaded_cost: +data.unloaded_cost,

    created_at: new Date(),
    updated_at: new Date(),
  } as Entity.vehicle;

  return await dbClient.vehicle.create(entity);
}

export default async function AddVehicleModal({ userId }: AddVehicleModalProps) {
  return (
    <form action={addVehicle}>
      <h3>Add New Vehicle</h3>
      <div>
        <Input placeholder="Number" name="number" type="text" required />
        <div className="mt-4 flex gap-4">
          <Input
            placeholder="Fuel Cost Per KM Fully Loaded"
            type="number"
            name="loaded_cost"
            required
          />
          <Input
            placeholder="Fuel Cost Per KM Empty Load"
            type="number"
            name="unloaded_cost"
            required
          />
        </div>
        <div className="mt-4 flex flex-row gap-4">
          <div className="">
            <select name="capacity">
              <option value="three_ton">3 Ton</option>
              <option value="five_ton">5 Ton</option>
              <option value="seven_ton">7 Ton</option>
            </select>
          </div>
          <div className="">
            <select name="type">
              <option value="open_truck">Open Truck</option>
              <option value="dump_truck">Dump Truck</option>
              <option value="compactor">Compactor</option>
              <option value="container_carrier">Container Carrier</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-row gap-4">
          <div className="">
            <StsSelector />
          </div>
        </div>
      </div>
      <Button className="mt-3" type="submit">Create</Button>
    </form>
  );
}