import { Alert } from "react-native";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';

export default function useLocation() {
    const [location, setLocation] = useState<Location.LocationObject>();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    return location
}