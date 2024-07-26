import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Button, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import axios from 'axios';
import NavBar from '../components/navBar';

export default function Comment() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [geo, setGeo] = useState({ x: 0, y: 0 });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setGeo({ x: location.coords.latitude, y: location.coords.longitude });
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }
  };

  const handleSubmit = async () => {
    const postedAt = new Date().toISOString();

    const data = {
      geo: geo,
      picture: image,
      description: description,
      author: author,
      postedAt: postedAt,
    };

    try {
      await axios.post('https://bunny-relaxing-quickly.ngrok-free.app/api/picture', data, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });
      Alert.alert('Photo and data submitted successfully');
    } catch (error) {
      console.error(error.response.data);
      Alert.alert('Failed to submit data');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar />
      <Button title="Take a Photo" onPress={pickImage} />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
      />
      <View style={styles.geoContainer}>
        <TextInput
          placeholder="Geo X"
          value={String(geo.x)}
          editable={false}
          style={styles.geoInput}
        />
        <TextInput
          placeholder="Geo Y"
          value={String(geo.y)}
          editable={false}
          style={styles.geoInput}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  geoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  geoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
