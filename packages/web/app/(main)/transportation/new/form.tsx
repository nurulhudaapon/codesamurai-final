import React from "react";
import * as Entity from "@prisma/client";
import { v4 as uuid } from "uuid";
import { Select } from "@/components/select";
import Button from "@/components/button";
import Input from "@/components/input";
import { dbClient } from "@/client";

type CreationFormProps = {
  currentUserId: string;
  managers: Entity.user[];
};

const CreationForm = async ({ currentUserId, managers }: CreationFormProps) => {
  const stss = await dbClient.sts.getAll();
  const landfills = await dbClient.landfill.getAll();
  const vehicles = await dbClient.vehicle.getAll();

  async function handleSubmitAction(formData: FormData) {
    "use server";
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as Entity.transportation;

    const result = await dbClient.transportation.create({
      ...data,
      id: uuid(),
      volume: +data.volume,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Redirect to the billing page
  }

  return (
    <form action={handleSubmitAction} className="max-w-lg mx-auto">
      <h1 className="text-xl text-center font-bold my-4">New Transportation</h1>
      <input hidden value={currentUserId} name="created_by_user_id" />

      <Select
        name="sts_id"
        required
        options={stss.map((sts) => ({ value: sts.id, label: sts.name }))}
      />

      <Select
        name="landfill_id"
        required
        options={landfills.map((landfill) => ({
          value: landfill.id,
          label: landfill.name,
        }))}
      />

      <Select
        name="vehicle_id"
        required
        options={vehicles.map((vehicle) => ({
          value: vehicle.id,
          label: vehicle.number + " - " + vehicle.capacity,
        }))}
      />

      <Input name="volume" type="number" required placeholder="Volume" />

      <Input
        name="arrival_time"
        type="datetime-local"
        required
        placeholder="Arrival time"
      />

      <Input
        name="departure_time"
        type="datetime-local"
        required
        placeholder="Departure time"
      />

      <Button type="submit">Create</Button>
    </form>
  );
};

export default CreationForm;
