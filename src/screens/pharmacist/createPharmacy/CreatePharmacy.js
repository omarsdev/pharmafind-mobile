import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Button,
} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';

const CreatePharmacy = ({navigation}) => {
  const [pharmacyName, setPharmacyName] = useState('');
  const [pharmacyLocation, setPharmacyLocation] = useState('');
  const [pharmacyDescription, setPharmacyDescription] = useState('');
  const [openAt, setOpenAt] = useState('');
  const [closeAt, setCloseAt] = useState('');

  const handlerMapsLocation = () => {
    if (
      pharmacyName.length !== 0 &&
      pharmacyLocation.length !== 0 &&
      pharmacyDescription.length !== 0
    ) {
      navigation.navigate('PharmacyLocation', {
        pharmacyName,
        pharmacyLocation,
        pharmacyDescription,
        openAt,
        closeAt,
      });
    }
  };

  const [isTimeOpenPickerVisible, setIsTimeOpenPickerVisible] = useState(false);
  const [isTimeClosePickerVisible, setIsTimeClosePickerVisible] =
    useState(false);

  const showDatePicker = type => {
    if (type === 'open') {
      setIsTimeOpenPickerVisible(true);
    } else if (type === 'close') {
      setIsTimeClosePickerVisible(true);
    }
  };

  const hideDatePicker = type => {
    if (type === 'open') {
      setIsTimeOpenPickerVisible(false);
    } else if (type === 'close') {
      setIsTimeClosePickerVisible(false);
    }
  };

  const handleConfirm = (date, type) => {
    const zone = RNLocalize.getTimeZone();
    // moment(time, format).tz(zone).format(format);
    if (type === 'open') {
      setOpenAt(date);
    } else if (type === 'close') {
      setCloseAt(date);
    }
    // console.warn('A date has been picked: ', date);
    hideDatePicker(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewInput}>
        <Text>Pharmacy Name</Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter Pharmacy Name"
          placeholderTextColor={'#1a1a1a'}
          value={pharmacyName}
          onChangeText={text => setPharmacyName(text)}
        />
      </View>
      <View style={styles.viewInput}>
        <Text>Pharmacy Location</Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter Pharmacy Location"
          placeholderTextColor={'#1a1a1a'}
          value={pharmacyLocation}
          onChangeText={text => setPharmacyLocation(text)}
        />
      </View>
      <View style={styles.viewInput}>
        <Text>Pharmacy Description</Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter Pharmacy Description"
          placeholderTextColor={'#1a1a1a'}
          value={pharmacyDescription}
          onChangeText={text => setPharmacyDescription(text)}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Button title="Open at" onPress={() => showDatePicker('open')} />
          <DateTimePickerModal
            isVisible={isTimeOpenPickerVisible}
            mode="time"
            onConfirm={date => handleConfirm(date, 'open')}
            onCancel={() => hideDatePicker('open')}
          />
          <Text style={{textAlign: 'center'}}>
            {moment(openAt, 'HH:mm:ss').format('LT')}
          </Text>
        </View>
        <View>
          <Button title="Close at" onPress={() => showDatePicker('close')} />
          <DateTimePickerModal
            isVisible={isTimeClosePickerVisible}
            mode="time"
            onConfirm={date => handleConfirm(date, 'close')}
            onCancel={() => hideDatePicker('close')}
          />
          <Text style={{textAlign: 'center'}}>
            {moment(closeAt, 'HH:mm:ss').format('LT')}
          </Text>
        </View>
      </View>
      <Pressable style={styles.submit} onPress={handlerMapsLocation}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CreatePharmacy;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#56B1D3',
    flex: 1,
  },
  textInputStyle: {
    width: 250,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 13,
    marginTop: 10,
    color: 'black',
  },
  viewInput: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 20,
  },
  mapStyle: {
    flex: 1,
    height: 200,
    width: 200,
  },
  submit: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 20,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
