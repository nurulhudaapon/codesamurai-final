"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const SingleMap = ({ data }: { data: any }) => {
  const center = [
    [data.Latitude.$numberDecimal, data.Longitude.$numberDecimal],
  ] as any;

  return (
    <MapContainer zoom={5} center={center[0]} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={{
          lat: center[0][0],
          lng: center[0][1],
        }}
      >
        <Popup>
          <b>{data.restaurantsName}</b>
          <br />
          {data.location}
        </Popup>
      </Marker>
    </MapContainer>
  );
};
