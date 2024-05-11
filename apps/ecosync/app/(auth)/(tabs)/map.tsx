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

const fetchIssue = async () => {
  const stsQuery = await dbClient.from('issue').select('*').limit(1000);
  return stsQuery.data
}

const landfilll = async () => {
  const stsQuery = await dbClient.from('landfill').select('*').limit(1000);
  return stsQuery.data
}

export default function App() {
  const [data, setData] = useState<any>([])
  const location = useLocation()

  const getPosts = async () => {
    const stss = await fetchStss();
    const issues = await fetchIssue();
    const landfill = await landfilll();
    const margedData = [
      ...(stss || []).map((item) => ({ ...item, type: 'STS' })),
      ...(issues || []).map((item) => ({ ...item, type: 'Issue' })),
      ...(landfill || []).map((item) => ({ ...item, type: 'Landfill' }))
    ].map((item: any) => {
      return {
        name: item.name || item.title,
        type: item.type,
        latitude: item.latitude,
        longitude: item.longitude
      }
    })
    setData(margedData)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <View style={styles.container}>
      {!!(location && data?.length) && <MapView
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
        {data?.map((marker: any, index: number) => (
          <Marker
            pinColor={ marker.type === 'STS' ? 'blue' : "red"}
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
          >
            <Callout>
              <View>
                <Text bold size={12}>{marker.type}</Text>
                <Text size={12}>{marker.name}</Text>
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
