"use client";
import React, { FormEventHandler, useState } from "react";
import * as Entity from "@prisma/client";
import { v4 as uuid } from "uuid";
// import { createSts } from "../server";
import { notify } from "@/components/toast";
import { Select } from "@/components/select";
import Button from "@/components/button";
import Input from "@/components/input";
import InputRadio from "@/components/Redio";
const now = new Date();

type NewStsMainProps = {
  currentUserId: string;
  managers: Entity.user[];
};

export const NewWork = ({ currentUserId, managers }: NewStsMainProps) => {
  return (
    <form className="max-w-lg mx-auto">
      <h1 className="text-xl text-center font-bold my-4">
        Add Employee work details
      </h1>
      <div className="grid grid-cols-2 gap-x-4">
        <Input label="Daily Log-in/start time" type="time" name="opens_at" />
        <Input label="Daily Log-out/end time" type="time" name="closes_at" />
      </div>

      <div className="flex flex-row gap-4">
        <Input
          label="Total Hours Worked per Day"
          placeholder="Workforce Size"
          type="number"
          name="work_hours_per_day"
        />
        <Input
          label="Overtime Hours"
          placeholder="Overtime Hours"
          type="tel"
          name="overtime_hours"
        />
      </div>

      <InputRadio label="Absence" id="status-1" name="user_status" value={0} />
      <InputRadio label="Leaves" id="status-2" name="user_status" value={1} />
      <div className="flex justify-center items-center mt-8">
        <Button
          type="submit"
          className="w-[100%] text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Work
        </Button>
      </div>
    </form>
  );
};
