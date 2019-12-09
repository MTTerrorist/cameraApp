import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { SimplifiedLocation } from '../../screens/PositionsList';

type ListItemProps = SimplifiedLocation & {
   onValueChange: () => void;
};

const ListItem: React.FC<ListItemProps> = ({ timestamp, longitude, latitude, isActive, onValueChange }) => {
   return (
      <View style={styles.container}>
         <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../../assets/marker.png')} />
         </View>
         <View style={styles.textContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>timestamp: {timestamp}</Text>
            <Text>longitude: {longitude}</Text>
            <Text>latitude: {latitude}</Text>
         </View>
         <View style={styles.activeIndicatorContainer}>
            <Switch onValueChange={onValueChange} value={isActive} />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
   },
   imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   image: {
      width: 50,
      height: 50,
   },
   textContainer: {
      flex: 3,
   },
   activeIndicatorContainer: {
      flex: 1,
   },
});

export default ListItem;
