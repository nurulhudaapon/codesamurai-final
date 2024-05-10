"use client";

import React, { useState } from "react";
import * as Entity from "@prisma/client";
import { Select } from "@/components/select";
import Button from "@/components/button";
import Input from "@/components/input";
import { Modal } from "@/components/modal";
import { CreateNewTransportType, createNewTransport } from "./server";
import { notify } from "@/components/toast";
import { Utils } from "@/utils";
import { v4 as uuid } from "uuid";

export type CreationTransportatioProps = {
  currentUserId: string;
  stss: Entity.sts[];
  landfills: Entity.landfill[];
  vehicles: Entity.vehicle[];
  onClose: () => void;
  triggerUpdate: () => void;
  modalType: string;
  contractors_company: Entity.contractor_company[];
};

export const TransportationModal = ({
  currentUserId,
  landfills,
  triggerUpdate,
  vehicles,
  stss,
  onClose,
  modalType,
  contractors_company,
}: CreationTransportatioProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const transport = Object.fromEntries(
      formData.entries()
    ) as unknown as CreateNewTransportType;

    setLoading(true);
    await createNewTransport({
      id: uuid(),
      sts_id: transport.sts_id,
      landfill_id: transport.landfill_id,
      vehicle_id: transport.vehicle_id,
      created_by_user_id: currentUserId,
      created_at: new Date(),
      updated_at: new Date(),
      volume: Number(transport.volume),
      distance: Number(transport.distance),
      padding: true,
      departure_time: new Date(),
      arrival_time: new Date(),
      location_type: "landfill",
      contractor_id: contractors_company[0].id,
    })
      .then(() => {
        triggerUpdate?.();
        onClose();
        notify.success("New transportation entry successfully");
      })
      .catch(() => {
        setLoading(false);
      });
    console.log({ transport });
  };

  return (
    <form onSubmit={onSubmit}>
      <Modal
        header={<h3>New Transportation</h3>}
        footer={
          <Button loading={loading} type="submit">
            Create
          </Button>
        }
        onClose={onClose}
      >
        <input hidden value={currentUserId} name="created_by_user_id" />
        <div className="mb-2">
          <label
            htmlFor="sts_id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select STS
          </label>
          <Select
            name="sts_id"
            required
            options={stss.map((sts) => ({ value: sts.id, label: sts.name }))}
          />
        </div>

        {modalType === "sts" ? (
          <div className="mb-2">
            <label
              htmlFor="landfill_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Landfill
            </label>
            <Select
              name="landfill_id"
              required
              options={landfills.map((landfill) => ({
                value: landfill.id,
                label: landfill.name,
              }))}
            />
          </div>
        ) : (
          <div className="mb-2">
            <label
              htmlFor="contractor_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Contractor
            </label>
            <Select
              name="contractor_id"
              required
              options={contractors_company.map((contractor) => ({
                value: contractor.id,
                label: contractor.name,
              }))}
            />
          </div>
        )}
        <div className="mb-2">
          <label
            htmlFor="vehicle_id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Vehicle
          </label>
          <Select
            name="vehicle_id"
            required
            options={vehicles.map((vehicle) => ({
              value: vehicle.id,
              label:
                vehicle.number +
                " - " +
                Utils.Text.enumToTitleCase(vehicle.capacity),
            }))}
          />
        </div>
        {modalType === "sts" && (
          <div className="flex flex-row gap-4">
            <Input name="volume" type="number" required placeholder="Volume" />
            <Input
              name="distance"
              type="number"
              required
              placeholder="Distance From STS to Landfill"
            />
          </div>
        )}
      </Modal>
    </form>
  );
};
