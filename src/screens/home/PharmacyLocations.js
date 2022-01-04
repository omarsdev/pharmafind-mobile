import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {AxiosInstance} from '../../api/axios-instance';
import Geolocation from 'react-native-geolocation-service';

const PharmacyLocations = ({route, navigation}) => {
  const {pharmacy} = route.params;
  const [pharmacyLocation, setPharmacyLocation] = useState(null);
  const [region, setRegion] = useState(null);

  const getPharmacy = async () => {
    await AxiosInstance.get('/pharamcy/location')
      .then(res => {
        setPharmacyLocation(res.data.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    getPharmacy();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {!pharmacyLocation || !region ? (
        <View>
          <ActivityIndicator color="#1a1a1a" />
        </View>
      ) : (
        <View style={styles.mapStyle}>
          <MapView style={styles.mapStyle} region={region}>
            {pharmacyLocation.map((e, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: Number(e.latitude),
                  longitude: Number(e.longitude),
                }}
              />
            ))}
          </MapView>
          <Pressable style={styles.goBack} onPress={goBack}>
            <Image
              source={require('../../assets/icons/back.png')}
              style={{width: 30, height: 30}}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default PharmacyLocations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
  },
  goBack: {
    marginLeft: '3%',
    position: 'absolute',
    top: 50,
  },
});
