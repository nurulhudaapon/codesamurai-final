"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { v4 as uuid } from "uuid";
import { notify } from "@/components/toast";
import Button from "@/components/button";
import Input from "@/components/input";
import { Select } from "@/components/select";
import { createWorkforceRegistration } from "./action";

export const WorkforceRegistrationForm = () => {
  // @ts-ignore
  const [{ errors, message }, formAction] = useFormState(
    createWorkforceRegistration,
    {
      errors: null,
    }
  );

  return (
    <form action={formAction} className="max-w-lg mx-auto">
      <h1 className="text-xl text-center font-bold my-4">
        Workforce Registration
      </h1>

      <Input
        label="Employee ID"
        placeholder="Employee ID"
        type="text"
        name="employee_id"
        errors={errors}
      />

      <Input
        label="Full Name"
        placeholder="Full Name"
        type="text"
        name="full_name"
        errors={errors}
      />

      <Input label="Date of Birth" type="date" name="dob" errors={errors} />
      <Input label="Date of Hire" type="date" name="hired_at" errors={errors} />

      <Input
        label="Job Title"
        placeholder="Job Title"
        type="text"
        name="job_title"
        errors={errors}
      />

      <Input
        label="Payment Rate per Hour"
        placeholder="Payment Rate per Hour"
        type="number"
        name="payment_rate"
        errors={errors}
      />

      <Input
        label="Contact Information"
        placeholder="Contact Information"
        type="text"
        name="contact_information"
        errors={errors}
      />

      <Button type="submit">Submit</Button>

      {message &&
        notify.success("Workforce registration completed successfully!")}
    </form>
  );
};
