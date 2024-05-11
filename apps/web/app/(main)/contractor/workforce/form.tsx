"use client";
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
    <div className="max-w-lg mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-xl font-bold text-center mb-4">
          Workforce Registration
        </h1>

        <form action={formAction} className="space-y-4">
          <input name="id" hidden defaultValue={uuid()} />
          <input
            name="assigned_collection_route"
            hidden
            defaultValue={uuid()}
          />

          <div className="flex flex-row gap-4">
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
          </div>
          <Input
            label="Contractor ID"
            placeholder="Contractor ID"
            type="text"
            name="contractor_id"
            errors={errors}
          />
          {/* collection_route */}
          <div className="flex flex-row gap-4">
            <Input
              label="Date of Birth"
              type="date"
              name="dob"
              errors={errors}
            />
            <Input
              label="Date of Hire"
              type="date"
              name="hired_at"
              errors={errors}
            />
          </div>
          <Input
            label="Collection Route"
            placeholder="Collection Route"
            type="text"
            name="collection_route"
            errors={errors}
          />
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
      </div>
    </div>
  );
};
