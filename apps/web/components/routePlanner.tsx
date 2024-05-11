
"use client";

import React, { useEffect } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    DirectionsRenderer,
} from "@react-google-maps/api";

type MapProps = { location: { lat: number, lng: number }[] }

const Map = (props: MapProps) => {
    const [directions, setDirections] = React.useState<any>(null);
    const first = props.location[0];
    const last = props.location[props.location.length - 1];
    const waypoints = props.location.slice(1, props.location.length - 1);

    useEffect(() => {
        if (window !== undefined) {
            const directionsService = new google.maps.DirectionsService();

            directionsService.route(
                {
                    origin: first,
                    destination: last,
                    waypoints: waypoints.map((waypoint) => ({
                        location: new google.maps.LatLng(waypoint.lat, waypoint.lng)
                    })),
                    travelMode: google.maps.TravelMode.DRIVING
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    }, []);

    return (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                height: '400px'
            }}
            center={{
                lat: 23.728694,
                lng: 90.399224
            }}
            zoom={1}
        >
            {directions && (
                <DirectionsRenderer options={{ directions }} />
            )}
        </GoogleMap>
    )
}

export const RoutePlanner = (props: MapProps) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCDU3zDhJEjwRLjzNiJTV_TwZOhZOESDgk",
    });

    if (isLoaded) {
        return (
            <Map {...props} />
        )
    } else {
        return <></>
    }
} 