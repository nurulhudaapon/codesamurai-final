'use client';

import React, { useState } from "react";
import * as Entity from "@prisma/client";
import { Select } from "@/components/select";
import Button from "@/components/button";
import Input from "@/components/input";
import { Modal } from "@/components/modal";
import { CreateNewTransportType, createNewTransport } from "./server";
import { notify } from "@/components/toast";
import { Utils } from "@/utils";

export type CreationTransportatioProps = {
    currentUserId: string;
    stss: Entity.sts[];
    landfills: Entity.landfill[];
    vehicles: Entity.vehicle[];
    user: 'sts' | 'landfill';
    onClose: () => void;
    triggerUpdate: () => void;
};

export const TransportationModal = ({ currentUserId, landfills, triggerUpdate, stss, vehicles, onClose, user }: CreationTransportatioProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const isSts = user === 'sts';

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const transport = Object.fromEntries(formData.entries()) as unknown as CreateNewTransportType;

        setLoading(true);
        await createNewTransport({ ...transport, volume: Number(transport.volume) })
            .then(() => {
                triggerUpdate?.();
                onClose();
                notify.success("New transportation entry successfully");
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <form onSubmit={onSubmit}>
            <Modal
                header={<h3>New Transportation</h3>}
                footer={
                    <Button loading={loading} type="submit">
                        Create
                    </Button>
                } onClose={onClose}>
                <input hidden value={currentUserId} name="created_by_user_id" />
                {isSts ?
                    <Select
                        name="sts_id"
                        required
                        options={stss.map((sts) => ({ value: sts.id, label: sts.name }))}
                    /> :
                    <Select
                        name="landfill_id"
                        required
                        options={landfills.map((landfill) => ({
                            value: landfill.id,
                            label: landfill.name,
                        }))}
                    />
                }
                <Select
                    name="vehicle_id"
                    required
                    options={vehicles.map((vehicle) => ({
                        value: vehicle.id,
                        label: vehicle.number + " - " + Utils.Text.enumToTitleCase(vehicle.capacity),
                    }))}
                />
                <Input name="volume" type="number" required placeholder="Volume" />
                <Input
                    name="arrival_time"
                    type="datetime-local"
                    required
                    placeholder="Arrival time"
                />

                <Input
                    name="departure_time"
                    type="datetime-local"
                    required
                    placeholder="Departure time"
                />
            </Modal>
        </form>
    );
};