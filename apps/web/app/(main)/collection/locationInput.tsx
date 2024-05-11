import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Delete, DeleteIcon, Trash } from 'lucide-react';

const containerStyle = {
    width: '100%',
    height: '400px'
};

export function LocationInput() {
    const [map, setMap] = useState(null);
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [markers, setMarkers] = useState<any[]>([]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCDU3zDhJEjwRLjzNiJTV_TwZOhZOESDgk"
    });

    const onLoad = React.useCallback(function callback(map: any) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null);
    }, []);

    const addMarker = (event: any) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLocation({ lat: latitude, lng: longitude });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const remove = (index: number) => {
        setMarkers((prevMarkers) => prevMarkers.filter((_, i) => i !== index));
    }

    return <>
        {isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={12}
                onClick={addMarker}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker} />
                ))}
            </GoogleMap>
        ) : (
            <></>
        )}
        <label
            htmlFor="latitude"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            Selected Area
        </label>
        {markers.map((marker, index) => (
            <div className='flex items-center gap-3'>
                <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{marker.lat}</p>
                <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{marker.lng}</p>
                <Trash color='red' size={40} onClick={() => remove(index)} className='cursor-pointer' />
            </div>
        ))
        }
        <input name='area_of_collection' hidden value={JSON.stringify(markers)} />
    </>
}
