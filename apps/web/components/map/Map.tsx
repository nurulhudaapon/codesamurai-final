"use client";
import React, { useEffect, useRef, useState } from "react";
import L, { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Entity } from "@/types/prisma";

type Props = {
  data?: Array<(Entity.issue & Entity.landfill & Entity.sts) & ({
    subtitle: string
  })>;
  center?: LatLngTuple;
  selectedIndex?: number;
};

const position = [51.505, -0.09];

export const MyMap = ({ data, center, selectedIndex }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const allLatLng: any = data?.map((store) => [
    store.latitude,
    store.longitude,
  ]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  console.log(data);
  return (
    <MapContainer
      zoom={1}
      minZoom={3}
      maxZoom={16}
      bounds={allLatLng}
      style={{ width: "100%", height: "300px" }}
      scrollWheelZoom={true}
      markerZoomAnimation={true}
      id="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {isClient && (
        <MyMarkers
          data={data?.map((item) => ({
            name: item.type,
            type: item.subtitle,
            title: item.title || item.name,
            Latitude: item.latitude,
            Longitude: item.longitude,
          }))}
        />
      )}
    </MapContainer>
  );
};

const MyMarkers = ({ data, selectedIndex }: any) => {
  return data.map((item: any, index: number) => (
    <PointMarker
      key={index}
      content={item}
      type={item.type}
      center={{
        lat: item.Latitude,
        lng: item.Longitude,
      }}
    />
  ));
};

const PointMarker = ({ center, content, openPopup, type }: any) => {
  const map = useMap();
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (openPopup) {
      // map.flyToBounds([center]);
      markerRef.current.openPopup();
    }
  }, [map, center, openPopup]);

  return (
    <Marker ref={markerRef} 
    
    // icon={new L.Icon({
    //   className: 'bg-red-500',

    // })} 
    
    position={[center.lat, center.lng]}>
      <Popup>
        <>{type} </>
        <br />
        <b>{content.title}</b>
        {/* <br />
        {content.location} */}
      </Popup>
    </Marker>
  );
};
