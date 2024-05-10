"use client";
import { dbApiClient, dbClient } from "@/client";
import Input from "@/components/input";
import { Schema } from "@ecosync/db";
import { createContractorCompany } from "./action";
import { useFormState } from "react-dom";
import Button from "@/components/button";
import Layout from "../layout";
// import { useActionState } from "react";

/*
• Name of the company
• Contract ID
• Registration ID
• Registration Date
• TIN of the company
• Contact number
• Workforce size
• Payment per tonnage of waste
• The amount of waste per day
• Contract duration 
• Area of collection
• Designated STS
*/

export function ContractorForm() {
  // @ts-ignore
  const [formState, formAction] = useFormState(createContractorCompany, {
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
        />
        <Input
          label="Contract ID"
          placeholder="ID"
          type="text"
          name="contract_id"
        />
      </div>
      <div className="flex flex-row gap-4">
        <Input
          label="Registration"
          placeholder="Registration ID"
          type="text"
          name="registration_id"
        />
        <Input
          label="Registration Date"
          placeholder="Registration Date"
          type="date"
          name="registration_date"
        />
      </div>

      <Input label="TIN" placeholder="TIN" type="text" name="tin" />

      <div className="flex flex-row gap-4">
        <Input
          label="Workforce Size"
          placeholder="Workforce Size"
          type="number"
          name="workforce_size"
        />
        <Input
          label="Contact Number"
          placeholder="Contact Number"
          type="tel"
          name="contact_number"
        />
      </div>
      <div className="flex flex-row gap-4">
        <Input
          label="Required amount"
          placeholder="Required amount of waste per day"
          type="number"
          name="required_amount_per_day"
        />
        <Input
          label="Payment"
          placeholder="Payment per tonnage of waste"
          type="number"
          name="payment_per_tonnage"
        />
      </div>
      <div className="flex flex-row gap-4">
        <Input
          label="Area of Collection"
          placeholder="Area of Collection"
          type="text"
          name="area_of_collection"
        />
        <Input
          label="Contract Duration"
          placeholder="Contract Duration"
          type="number"
          name="contract_duration"
        />
      </div>
      <Input
        label="Designated STS"
        placeholder="Designated STS"
        type="text"
        name="designated_sts"
      />
      <div>Error: {JSON.stringify(formState.errors, null, 2)}</div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
