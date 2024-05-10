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
    <form action={formAction}>
      <Input placeholder="Company Name" type="text" name="name" />
      <Input placeholder="Contract ID" type="text" name="contract_id" />
      <Input placeholder="Registration ID" type="text" name="registration_id" />
      <Input
        placeholder="Registration Date"
        type="date"
        name="registration_date"
      />
      <Input placeholder="TIN" type="text" name="tin" />
      <Input placeholder="Contact Number" type="tel" name="contact_number" />
      <Input placeholder="Workforce Size" type="number" name="workforce_size" />
      <Input
        placeholder="Payment per tonnage of waste"
        type="number"
        name="payment_per_tonnage"
      />
      <Input
        placeholder="Required amount of waste per day"
        type="number"
        name="required_amount_per_day"
      />
      <Input
        placeholder="Contract Duration"
        type="number"
        name="contract_duration"
      />
      <Input
        placeholder="Area of Collection"
        type="text"
        name="area_of_collection"
      />
      <Input placeholder="Designated STS" type="text" name="designated_sts" />

      <div>Error: {JSON.stringify(formState.errors, null, 2)}</div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
