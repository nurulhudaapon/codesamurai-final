"use client";
import React, { useEffect } from "react";
import Input from "@/components/input";
import { Select } from "@/components/select";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { createCollectionDetails } from "../action";
import { notify } from "@/components/toast";
import { Entity } from "@/types/prisma";
import { LocationInput } from "../locationInput";
import { v4 as uuid } from "uuid";

type CollectionDetailsProps = {
  Sts: Entity.sts[];
  contractor_cp: Entity.contractor_company;
};

export function CollectionDetailsForm({
  Sts,
  contractor_cp,
}: CollectionDetailsProps) {
  // @ts-ignore
  const [{ errors, message }, formAction] = useFormState(
    createCollectionDetails,
    {
      errors: null,
    }
  );
  useEffect(() => {
    if (message) {
      notify.success(message);
    }
  }, [message]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-xl font-bold text-center mb-4">
          Add Collection Details
        </h1>
        <form action={formAction} className="space-y-4">
          <LocationInput />
          <input
            type="hidden"
            name="contractor_company_id"
            value={contractor_cp?.id || uuid()}
          />
          <input type="hidden" name="id" value={uuid()} />
          <Input
            label="Collection Start Time"
            placeholder="Start Time"
            type="time"
            name="collection_start_time"
            errors={errors}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Duration for Collection"
              placeholder="Duration (in hours)"
              type="number"
              name="collection_duration"
              errors={errors}
            />
            <Input
              label="Number of Laborers"
              placeholder="Number of Laborers"
              type="number"
              name="num_laborers"
              errors={errors}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Number of Vans"
              placeholder="Number of Vans"
              type="number"
              name="num_vans"
              errors={errors}
            />
            <Input
              label="Expected Weight of Daily Solid Waste"
              placeholder="Weight (in tonnes)"
              type="number"
              name="expected_weight_per_day"
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
        </form>
      </div>
    </div>
  );
}
