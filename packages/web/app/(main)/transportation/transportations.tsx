'use client';

import Button from "@/components/button";
import { Icon } from "@/components/icon";
import { TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/table";
import { TransportationsType, getAllTransportation } from "./server";
import { useEffect, useState } from "react";
import { Table } from "@/components/table";
import { Utils } from "@/utils";
import { TransportationModal } from "./modal";
import { Entity } from "@/types/prisma";

export type TransportatioProps = {
    currentUserId: string;
    stss: Entity.sts[];
    landfills: Entity.landfill[];
    vehicles: Entity.vehicle[];
    user: 'sts' | 'landfill';
};

export default function Transportations(props: TransportatioProps) {
    const [transportations, setTransportations] = useState<TransportationsType>([]);
    const [modal, setModal] = useState(false);
    const isSts = props.user === 'sts';

    const fetchTransportations = async () => {
        const data = await getAllTransportation(isSts ? 'sts' : 'landfill');
        setTransportations(data);
    };

    useEffect(() => {
        fetchTransportations();
    }, []);

    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-between items-center mb-5">
                    <p className="text-lg font-bold">Transportation</p>
                    <Button onClick={() => setModal(true)} className="pl-3">
                        <Icon name="Plus" />
                        Add New Transportation
                    </Button>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            {isSts && <TableHeader>STS Id</TableHeader>}
                            <TableHeader>Vehicle Number</TableHeader>
                            <TableHeader>Weight of waste</TableHeader>
                            <TableHeader>Arrival</TableHeader>
                            <TableHeader>Deperture</TableHeader>
                            <TableHeader>Distance</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transportations.map((item, idx) => (
                            <TableRow key={idx}>
                                {isSts && <TableCell>{item.sts_id}</TableCell>}
                                <TableCell>{item.vehicle.number}</TableCell>
                                <TableCell>{item.volume} tons</TableCell>
                                <TableCell>{Utils.Time.formatDateTime(item.arrival_time)}</TableCell>
                                <TableCell>{Utils.Time.formatDateTime(item.departure_time)}</TableCell>
                                <TableCell>{Math.round((item.total_distance_meters || 0)/1000).toLocaleString()}km</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {modal && <TransportationModal {...props} onClose={() => setModal(false)} triggerUpdate={fetchTransportations} />}
        </>
    )
}
