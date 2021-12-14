import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  Text,
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';
import {AxiosInstance} from '../../../api/axios-instance';
import {NavigationContainerRefContext} from '@react-navigation/native';

const PharmacyLocation = ({route, navigation}) => {
  const [region, setRegion] = useState(null);
  const [selectedMark, setSelectedMark] = useState(null);

  const map = useRef(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setSelectedMark({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
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
  }, []);

  const onSubmit = async () => {
    const data = {
      details: route.params.pharmacyDescription,
      locationDescription: route.params.pharmacyLocation,
      name: route.params.pharmacyName,
      start_time: route.params.openAt,
      end_time: route.params.closeAt,
      latitude: selectedMark.latitude,
      longitude: selectedMark.longitude,
    };
    await AxiosInstance.post('/pharamcy', data)
      .then(res => {
        navigation.navigate('PharmacyHomeStack');
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  const goBack = () => {
    navigation.goBack();
  };

  return !region ? (
    <View style={styles.containerSpinner}>
      <ActivityIndicator color="#1a1a1a" />
    </View>
  ) : (
    <View style={styles.container}>
      <MapView
        ref={map}
        style={styles.mapStyle}
        region={region}
        onPress={region => {
          setSelectedMark(region.nativeEvent.coordinate);
          setRegion(map.current.__lastRegion);
        }}>
        {selectedMark && (
          <Marker
            coordinate={{
              latitude: selectedMark.latitude,
              longitude: selectedMark.longitude,
            }}
          />
        )}
      </MapView>
      <Pressable style={styles.goBack} onPress={goBack}>
        <Text>Go Back</Text>
      </Pressable>
      <View style={styles.buttonView}>
        <Pressable style={styles.submit} onPress={onSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PharmacyLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
  },
  containerSpinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    marginLeft: '33%',
    position: 'absolute',
    bottom: 50,
  },
  goBack: {
    marginLeft: '3%',
    position: 'absolute',
    top: 50,
    backgroundColor: 'red',
  },
  submit: {
    width: 150,
    height: 40,
    backgroundColor: '#55C854',
    borderRadius: 12,
  },
  submitText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
  },
});
