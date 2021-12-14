import React, {useContext, useEffect, useState, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  Image,
} from 'react-native';

import Header from './components/Header';
import PharmacyCard from './components/PharmacyCard';

import {UserHomeDataContext} from '../../context/UserHomeDataContext';

const UserHome = ({navigation}) => {
  const {userChatProviderValue, loadingProviderValue, pharmacyProviderValue} =
    useContext(UserHomeDataContext);

  const {pharmacy} = pharmacyProviderValue;
  const {loading} = loadingProviderValue;
  const {userChat} = userChatProviderValue;

  const onPressPharmacyHandler = (
    pharmacyId,
    pharmacyName,
    pharmacyPhoto,
    pharmacyChatId,
    pharmacyIsOpen,
  ) => {
    navigation.navigate('ChatUserPharmacy', {
      pharmacyId,
      pharmacyName,
      pharmacyPhoto,
      pharmacyChatId,
      pharmacyIsOpen,
    });
  };

  const moveLocationHandler = () => {
    navigation.navigate('PharmacyLocations', {
      pharmacy,
    });
  };

  return !pharmacy || loading || !userChat ? (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator color="#1a1a1a" />
    </View>
  ) : (
    <Fragment>
      <SafeAreaView style={styles.topNavbarColor} />
      <SafeAreaView style={styles.bottomNavbarColor}>
        <View style={styles.containerView}>
          <View style={styles.headerStyle}>
            <Header />
          </View>
          <View>
            {pharmacy.map(e => (
              <Pressable
                onPress={() =>
                  onPressPharmacyHandler(
                    e.id,
                    e.name,
                    e.photo,
                    pharmacy.id,
                    e.isOpen,
                  )
                }
                key={e.id}>
                <PharmacyCard data={e} />
              </Pressable>
            ))}
          </View>
        </View>
        <Pressable style={styles.locationView} onPress={moveLocationHandler}>
          <Image
            source={require('../../assets/icons/location.png')}
            style={{width: 45, height: 45}}
          />
        </Pressable>
      </SafeAreaView>
    </Fragment>
  );
};

export default UserHome;

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    height: '5%',
    width: '100%',
  },
  topNavbarColor: {
    backgroundColor: '#56B1D3',
    flex: 0,
  },
  bottomNavbarColor: {
    backgroundColor: '#56B1D3',
    flex: 1,
  },
  containerView: {
    flex: 1,
    backgroundColor: 'white',
  },
  locationView: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: '#56B1D3',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
