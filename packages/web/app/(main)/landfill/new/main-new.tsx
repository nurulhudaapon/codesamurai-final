"use client";
import React, { FormEventHandler, useState } from "react";
import * as Entity from "@prisma/client";
import { v4 as uuid } from "uuid";
import { create } from "../server";
import { notify } from "@/components/toast";
import { Select } from "@/components/select";
import Button from "@/components/button";
const now = new Date();

type CreationFormProps = {
  currentUserId: string;
  managers: Entity.user[];
};

const CreationForm = ({ currentUserId, managers }: CreationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [newData, setNew] = useState<Entity.landfill>({
    id: uuid(),
    name: "",
    closes_at: '18:00',
    opens_at: '8:00',
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

    create(newData)
      .then(() => {
        setLoading(false);
        notify.success("Landfill added successfully!");
      })
      .catch((e) => {
        setLoading(false);
        notify.error("Failed to add Landfill and Manager ID is invalid!");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h1 className="text-xl text-center font-bold my-4">Create a new landfill</h1>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="F1032"
          required
          onChange={(e) =>
            setNew({ ...newData, name: e.target.value })
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
          type="number"
          id="capacity"
          placeholder="1005"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
          onChange={(e) =>
            setNew({ ...newData, capacity_tonnes: Number(e.target.value) })
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
            type="number"
            id="latitude"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Latitude"
            required
            onChange={(e) =>
              setNew({ ...newData, latitude: Number(e.target.value) })
            }
          />
          <input
            type="number"
            id="longitude"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Longitude"
            required
            onChange={(e) =>
              setNew({ ...newData, longitude: Number(e.target.value) })
            }
          />
        </div>
      </div>
      <div className="mb-5">
        <label
          htmlFor="opens_at"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Operational Time
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="time"
            id="opens_at"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Opens At"
            required
            onChange={(e) =>
              setNew({ ...newData, opens_at: e.target.value })
            }
          />
          <input
            type="time"
            id="closes_at"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Closes At"
            required
            onChange={(e) =>
              setNew({ ...newData, closes_at: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-8">
        <Button
          type="submit"
          loading={loading}
          className="w-[100%]"
        >
          Add new landfill
        </Button>
      </div>
    </form>
  );
};

export default CreationForm;
