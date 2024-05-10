"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { createContractorCompany } from "./action";
import { StsSelector } from "./server";
import { Suspense } from "react";
import { Entity } from "@/types/prisma";
import { Select } from "@/components/select";
const now = new Date();
import { v4 as uuid } from "uuid";
import { notify } from "@/components/toast";

type ContractorProps = {
  currentUserId: string;
  Sts: Entity.sts[];
};

export function ContractorForm({ currentUserId, Sts }: ContractorProps) {
  // @ts-ignore
  const [{ errors, message }, formAction] = useFormState(
    createContractorCompany,
    {
      errors: null,
    }
  );
  return (
    <form action={formAction} className="max-w-lg mx-auto">
      <h1 className="text-xl text-center font-bold my-4">
        Add A New Contractor
      </h1>
      <div className="flex flex-row gap-4">
        <input type="hidden" name="id" defaultValue={uuid()} />
        <Input
          label="Company name"
          placeholder="Name"
          type="text"
          name="name"
          errors={errors}
        />
        <Input
          label="Contract ID"
          placeholder="ID"
          type="text"
          name="contract_id"
          errors={errors}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Input
          label="Registration"
          placeholder="Registration ID"
          type="text"
          name="registration_id"
          errors={errors}
        />
        <Input
          label="Registration Date"
          placeholder="Registration Date"
          type="date"
          name="registration_date"
          errors={errors}
        />
      </div>

      <Input
        label="TIN"
        placeholder="TIN"
        type="text"
        name="tin"
        errors={errors}
      />

      <div className="flex flex-row gap-4">
        <Input
          label="Workforce Size"
          placeholder="Workforce Size"
          type="number"
          name="workforce_size"
          errors={errors}
        />
        <Input
          label="Contact Number"
          placeholder="Contact Number"
          type="tel"
          name="contact_number"
          errors={errors}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Input
          label="Required amount"
          placeholder="Required amount of waste per day"
          type="number"
          name="required_amount_per_day"
          errors={errors}
        />
        <Input
          label="Payment"
          placeholder="Payment per tonnage of waste"
          type="number"
          name="payment_per_tonnage"
          errors={errors}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Input
          label="Area of Collection"
          placeholder="Area of Collection"
          type="text"
          name="area_of_collection"
          errors={errors}
        />
        <Input
          label="Contract Duration"
          placeholder="Contract Duration"
          type="number"
          name="contract_duration"
          errors={errors}
        />
      </div>
      <div className="mb-4">
        <Select
          name="sts_id"
          className="w-full"
          options={Sts.map((sts) => ({
            value: sts.id,
            label: `STS Ward Number ${sts.ward_number} (${sts.capacity_tonnes} Ton)`,
          }))}
        />
      </div>
      <Button type="submit">Submit</Button>
      {message && notify.success("Contractor added successfully!")}
    </form>
  );
}
