import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import NavBar from '../components/navBar';

export default function PictureList() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Description: {item.description}</Text>
      <Text>GeoX: {item.geo?.x ?? 'N/A'}</Text>
      <Text>GeoY: {item.geo?.y ?? 'N/A'}</Text>
      <Text>Author: {item.author ?? 'N/A'}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
         
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavBar></NavBar>
      <FlatList
        data={pictures}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
});
