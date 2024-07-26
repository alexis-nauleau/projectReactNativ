import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

export default function MapWithMarkers() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pictures, setPictures] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();

    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    try {
      const response = await axios.get('https://bunny-relaxing-quickly.ngrok-free.app/api/picture', {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setPictures(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !location) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  const handleMarkerPress = (picture, author) => {
    setSelectedPicture(picture);
    setSelectedAuthor(author);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          pinColor="blue"
          title="Your Position"
        />
        {pictures.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.geo.x, longitude: item.geo.y }}
            pinColor="red"
            onPress={() => handleMarkerPress(item.picture, item.author)}
          />
        ))}
      </MapView>
      {selectedPicture && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `https://bunny-relaxing-quickly.ngrok-free.app/uploads/${selectedPicture}` }}
            style={styles.image}
          />
          {selectedAuthor && <Text style={styles.author}>Author: {selectedAuthor}</Text>}
        </View>
      )}
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
  imageContainer: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  author: {
    marginTop: 5,
    fontSize: 16,
    color: 'black',
  },
});
