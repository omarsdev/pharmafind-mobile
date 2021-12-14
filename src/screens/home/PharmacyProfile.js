import moment from 'moment';
import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {UserHomeDataContext} from '../../context/UserHomeDataContext';

const PharmacyProfile = ({route, navigation}) => {
  const {pharmacyOnlineOfflineProviderValue} = useContext(UserHomeDataContext);
  const {pharmacyOnlineOffline} = pharmacyOnlineOfflineProviderValue;

  const [isOpen, setIsOpen] = useState(route.params.pharmacyInfo.isOpen);

  const onChatHandler = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (!pharmacyOnlineOffline) return;
    console.log(pharmacyOnlineOffline);
    if (pharmacyOnlineOffline.pharmacyId === route.params.pharmacyInfo.id) {
      setIsOpen(pharmacyOnlineOffline.isOpen);
    }
  }, [pharmacyOnlineOffline]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageView}>
        <Image
          source={{
            uri: route.params.pharmacyInfo.photo,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.rowView}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {route.params.pharmacyInfo.name}
          </Text>
          <Text>{route.params.pharmacyInfo.locationDescription}</Text>
        </View>
        <View style={styles.circleView}>
          <View style={styles.center}>
            <View
              style={[
                styles.onlineOfflineStyle,
                isOpen ? {backgroundColor: 'green'} : {backgroundColor: 'gray'},
              ]}
            />
          </View>
        </View>
      </View>
      <View style={{height: '40%', marginTop: 20}}>
        <Text>{route.params.pharmacyInfo.details}</Text>
      </View>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
          }}>
          Open from{' '}
          {moment(route.params.pharmacyInfo.start_time).format('hh:mm a')} to{' '}
          {moment(route.params.pharmacyInfo.end_time).format('hh:mm a')}
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          height: 50,
          width: '100%',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              width: 100,
              height: 30,
              borderRadius: 20,
              backgroundColor: '#56B1D3',
            }}
            onPress={onChatHandler}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Chat</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PharmacyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 20,
  },
  imageView: {
    height: '30%',
    borderRadius: 20,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleView: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderColor: 'black',
    borderWidth: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineOfflineStyle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  text: {
    color: 'black',
  },
});
