import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Pressable } from 'react-native';
import { Link } from 'expo-router';


export default function NavBar() {
  return (
 
      <View style={styles.container}>

      <Link href="/" asChild>
        <Pressable>
          <Text style={styles.text}>Home</Text>
        </Pressable>
      </Link>
      <Link href="/liste" asChild>
        <Pressable>
          <Text style={styles.text}>Liste</Text>
        </Pressable>
      </Link>
      <Link href="/map" asChild>
        <Pressable>
          <Text style={styles.text}>Carte</Text>
        </Pressable>
      </Link>
        <StatusBar style="auto" />
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4850d1',
    display:'flex',
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10,
    alignItems:'center',
    paddingStart:10,
    paddingEnd:10,
  },
  text: {
    color: 'white',
    fontSize:18,
  }
});
