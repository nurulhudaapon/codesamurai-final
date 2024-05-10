"use client";
import React, { useEffect, useRef } from "react";
import L, { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type LandFill = {
  _id: string;
  name: string;
  capacity_tonnes: number;
  location: string;
  Latitude?: any;
  Longitude?: any;
};
const position = [51.505, -0.09];

export const MyMap = ({
  data,
  center,
  selectedIndex,
}: {
  data: LandFill[];
  center: LatLngTuple;
  selectedIndex: number | null;
}) => {
  const allLatLng: any = data.map((store) => [
    store.Latitude.$numberDecimal,
    store.Longitude.$numberDecimal,
  ]);
  // const map = useMap(); it can be used decendent of MapContainer

  return (
    <MapContainer
      zoom={5}
      minZoom={3}
      maxZoom={16}
      // bounds={allLatLng}
      style={{ height: "60vh", width: "100vw" }}
      scrollWheelZoom={true}
      markerZoomAnimation={true}
      center={[23.44, 90.2]}
      id="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyMarkers
        data={[
          {
            name: "Landfill 1",
            location: "Location 1",
            Latitude: { $numberDecimal: 23.44 },
            Longitude: { $numberDecimal: 90.2 },
          },
          {
            name: "Landfill 2",
            location: "Location 2",
            Latitude: { $numberDecimal: 23.44 },
            Longitude: { $numberDecimal: 90.2 },
          },
        ]}
        selectedIndex={selectedIndex}
      />
    </MapContainer>
  );
};

const MyMarkers = ({ data, selectedIndex }: any) => {
  return data.map((item: any, index: number) => (
    <PointMarker
      key={index}
      content={item}
      center={{
        lat: item.Latitude.$numberDecimal,
        lng: item.Longitude.$numberDecimal,
      }}
      openPopup={selectedIndex === index}
    />
  ));
};

const PointMarker = ({ center, content, openPopup }: any) => {
  const map = useMap();
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (openPopup) {
      // map.flyToBounds([center]);
      markerRef.current.openPopup();
    }
  }, [map, center, openPopup]);

  return (
    <Marker ref={markerRef} position={[23.44, 90.2]}>
      <Popup>
        <b>{content.name}</b>
        <br />
        {content.location}
      </Popup>
    </Marker>
  );
};
