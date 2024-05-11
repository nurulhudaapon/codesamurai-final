import React, { useEffect, useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { dbClient } from '@/data/client';
import useLocation from '@/hooks/location';
import Text from '@/components/Text';

const fetchStss = async () => {
  const stsQuery = await dbClient.from('sts').select('*').limit(1000);
  return stsQuery.data
}

type StsType = Awaited<ReturnType<typeof fetchStss>>

export default function App() {
  const [stss, setStss] = useState<StsType>([])
  const location = useLocation()

  const getPosts = async () => {
    const stss = await fetchStss()
    setStss(stss)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <View style={styles.container}>
      {!!(location && stss?.length) && <MapView
        style={styles.map}
        initialRegion={{
          // latitude: location.coords.latitude,
          // longitude: location.coords.longitude,
          latitude: 23.728649,
          longitude: 90.399244,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {stss?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
          >
            <Callout>
              <View>
                <Text size={12}>Location: {marker.name}</Text>
                <Text size={12}>Word Number: {marker.ward_number}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

const getDelta = (latitude: number, longitude: number) => {
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

  const latitudeDelta = 500 / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = 500 / (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));

  return {
    latitudeDelta,
    longitudeDelta,
  };
}
