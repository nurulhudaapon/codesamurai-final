"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { v4 as uuid } from "uuid";
import { notify } from "@/components/toast";
import Button from "@/components/button";
import Input from "@/components/input";
import { Select } from "@/components/select";
import { createContractorManager } from "./action";

export const ContractorManagerForm = () => {
  // @ts-ignore
  const [{ errors, message }, formAction] = useFormState(
    createContractorManager,
    {
      errors: null,
    }
  );

  return (
    <form action={formAction} className="max-w-lg mx-auto">
      <h1 className="text-xl text-center font-bold my-4">
        Create Contractor Manager Account
      </h1>

      <Input
        label="Full Name"
        placeholder="Full Name"
        type="text"
        name="full_name"
        errors={errors}
      />

      {/* <Input
        label="User ID"
        placeholder="User ID"
        type="text"
        name="user_id"
        errors={errors}
      /> */}

      <Input
        label="Email Address(Username)"
        placeholder="Email Address"
        type="email"
        name="email"
        errors={errors}
      />

      <Input
        label="Password"
        placeholder="Password"
        type="password"
        name="password"
        errors={errors}
      />

      <Input
        label="Contact Number"
        placeholder="Contact Number"
        type="tel"
        name="phone"
        errors={errors}
      />

      {/* <Select
        label="Assigned Contractor Company"
        name="assigned_contractor_company"
        options={contractorCompanies.map((company) => ({
          value: company.id,
          label: company.name,
        }))}
        value={formData.assigned_contractor_company}
        onChange={handleChange}
        errors={errors}
      />

      <Select
        label="Access Level"
        name="access_level"
        options={accessLevels.map((level) => ({
          value: level,
          label: level,
        }))}
        value={formData.access_level}
        onChange={handleChange}
        errors={errors}
      /> */}

      <Button type="submit">Submit</Button>

      {message &&
        notify.success("Contractor manager account created successfully!")}
    </form>
  );
};
