import React, {useContext, useEffect, useState, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  Image,
  TextInput,
} from 'react-native';

import Header from './components/Header';
import PharmacyCard from './components/PharmacyCard';

import {UserHomeDataContext} from '../../context/UserHomeDataContext';
import {AxiosInstance} from '../../api/axios-instance';

import DeleteLogo from '../../assets/icons/delete.png';

const UserHome = ({navigation}) => {
  const {userChatProviderValue, loadingProviderValue, pharmacyProviderValue} =
    useContext(UserHomeDataContext);

  const {pharmacy, setPharmacy} = pharmacyProviderValue;
  const {loading} = loadingProviderValue;
  const {userChat} = userChatProviderValue;

  const [searchText, setSearchText] = useState('');
  const [pharmacySearch, setPharmacySearch] = useState(null);

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

  const handleSetPharmacy = async text => {
    setSearchText(text);
    await AxiosInstance.get(`/pharamcy/search?search=${text}`)
      .then(res => {
        setPharmacySearch(res.data.data.rows);
        // console.log(res.data.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  const resetSearch = () => {
    setSearchText('');
    setPharmacySearch(null);
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
          <View style={styles.searchView}>
            <TextInput
              placeholder="Search for pharmacy"
              placeholderTextColor="gray"
              style={styles.searchViewTextInput}
              value={searchText}
              onChangeText={text => handleSetPharmacy(text)}
            />
            {searchText !== '' && (
              <Pressable
                style={{
                  height: '100%',
                  width: 40,
                  position: 'absolute',
                  right: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: 20,
                }}
                onPress={resetSearch}>
                <Image source={DeleteLogo} style={{width: 14, height: 14}} />
              </Pressable>
            )}
          </View>
          <View>
            {pharmacySearch
              ? pharmacySearch.map(e => (
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
                ))
              : pharmacy.map(e => (
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
  searchView: {
    width: '100%',
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    position: 'relative',
  },
  searchViewTextInput: {
    height: '100%',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    left: 0,
    color: 'black',
    textAlign: 'left',
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
