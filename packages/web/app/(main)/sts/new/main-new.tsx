"use client";
import React, { FormEventHandler, useState } from "react";
import * as Entity from "@prisma/client";
import { v4 as uuid } from "uuid";
import { createSts } from "../server";
import { notify } from "@/components/toast";
import { Select } from "@/components/select";
import Button from "@/components/button";
const now = new Date();

type NewStsMainProps = {
  currentUserId: string;
  managers: Entity.user[];
};

const NewStsMain = ({ currentUserId, managers }: NewStsMainProps) => {
  const [loading, setLoading] = useState(false);
  const [newSts, setNewSts] = useState<Entity.sts>({
    id: uuid(),
    manager_id: "",
    ward_number: "",
    capacity_tonnes: 0,
    created_at: now,
    updated_at: now,
    created_by_user_id: currentUserId,
    latitude: 0,
    longitude: 0,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);

    createSts(newSts)
      .then(() => {
        setLoading(false);
        notify.success("STS added successfully!");
      })
      .catch((e) => {
        setLoading(false);
        notify.error("Failed to add STS and Manager ID is invalid!");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h1 className="text-xl text-center font-bold my-4">Add A New Ward/STS</h1>
      <div className="mb-5">
        <label
          htmlFor="ward-name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Ward Number
        </label>
        <input
          type="text"
          id="ward-number"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="F1032"
          required
          onChange={(e) =>
            setNewSts({ ...newSts, ward_number: e.target.value })
          }
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="Capacity"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Capacity in tons
        </label>
        <input
          type="text"
          id="capacity"
          placeholder="1005"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
          onChange={(e) =>
            setNewSts({ ...newSts, capacity_tonnes: Number(e.target.value) })
          }
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="latitude"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Location
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            id="latitude"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Latitude"
            required
            onChange={(e) =>
              setNewSts({ ...newSts, latitude: Number(e.target.value) })
            }
          />
          <input
            type="text"
            id="longitude"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Longitude"
            required
            onChange={(e) =>
              setNewSts({ ...newSts, longitude: Number(e.target.value) })
            }
          />
        </div>
      </div>
      <div className="mb-5">
        <label
          htmlFor="manager"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          STS Manager
        </label>
        <Select
          name="manager"
          options={managers.map((user) => ({
            value: user.id,
            label: user.first_name + " " + user.last_name,
          }))}
          onChange={(e) => setNewSts({ ...newSts, manager_id: e.target.value })}
          required
        />
      </div>
      <div className="flex justify-center items-center mt-8">
        <Button
          type="submit"
          loading={loading}
          className="w-[100%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add new STS
        </Button>
      </div>
    </form>
  );
};

export default NewStsMain;
