"use client";
import { dbApiClient, dbClient } from "@/client";
import Input from "@/components/input";
import { Schema } from "@ecosync/db";
import { createContractorCompany } from "./action";
import { useFormState } from "react-dom";
import Button from "@/components/button";
import Layout from "../layout";
// import { useActionState } from "react";


export function ContractorForm() {
  // @ts-ignore
  const [{ errors }, formAction] = useFormState(createContractorCompany, {
    errors: null,
  });

  return (
    <form action={formAction} className="max-w-lg mx-auto">
      <div className="flex flex-row gap-4">
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
      <Input
        label="Designated STS"
        placeholder="Designated STS"
        type="text"
        name="designated_sts"
        errors={errors}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
