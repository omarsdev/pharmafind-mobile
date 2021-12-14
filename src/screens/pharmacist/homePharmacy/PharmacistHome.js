import React, {Fragment, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
  Button,
  Pressable,
} from 'react-native';
import {PharmacyDataContext} from '../../../context/PharmacyDataContext';

import moment from 'moment';
import {AxiosInstance} from '../../../api/axios-instance';
import Header from './components/Header';
import {UserDataContext} from '../../../context';

const PharmacistHome = ({navigation}) => {
  const {
    pharmacyChatProviderValue,
    loadingProviderValue,
    socketRefProviderValue,
    receiveMessageProviderValue,
  } = useContext(PharmacyDataContext);

  const {receiveMessage, setReceiveMessage} = receiveMessageProviderValue;
  const {pharmacyChat, setPharmacyChat} = pharmacyChatProviderValue;
  const {loading} = loadingProviderValue;
  const {pharmacistDataProviderValue} = useContext(UserDataContext);
  const {pharmacistData} = pharmacistDataProviderValue;
  const socketRef = socketRefProviderValue;

  const getAllUsersMessage = async () => {
    await AxiosInstance.get('/pharamcy/message')
      .then(res => {
        if (res.data.success) {
          setPharmacyChat(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUsersMessage();
  }, []);

  useEffect(() => {
    if (!receiveMessage) return;

    let found = false;
    pharmacyChat.forEach((e, i) => {
      if (e.User.id === receiveMessage.User.id) {
        found = true;
        let newPharmacyChat = [...pharmacyChat];
        newPharmacyChat[i].Messages[0].id = receiveMessage.Messages[0].id;
        newPharmacyChat[i].Messages[0].createdAt =
          receiveMessage.Messages[0].createdAt;
        newPharmacyChat[i].Messages[0].message =
          receiveMessage.Messages[0].message;
        setPharmacyChat(newPharmacyChat);
      }
    });

    if (!found) {
      setPharmacyChat(oldArr => [...oldArr, receiveMessage]);
    }
  }, [receiveMessage]);

  return (
    // <SafeAreaView style={styles.container}>
    // </SafeAreaView>
    <Fragment>
      <SafeAreaView style={styles.topNavbarColor} />
      <SafeAreaView style={styles.bottomNavbarColor}>
        <View style={styles.containerView}>
          <View style={styles.headerStyle}>
            <Header />
          </View>
          <View>
            {!pharmacyChat ? (
              <View style={styles.viewSpinner}>
                <ActivityIndicator color="#1a1a1a" />
              </View>
            ) : (
              Array.isArray(pharmacyChat) &&
              pharmacyChat.map(e => (
                <Pressable
                  key={e.id}
                  onPress={() =>
                    navigation.navigate('PharmacistChat', {
                      userId: e.User.id,
                    })
                  }>
                  <View style={styles.userCardView}>
                    <View style={styles.nameMessageView}>
                      <Text style={styles.userName}>{e.User.name}</Text>
                      <Text>{e.Messages[0].message}</Text>
                    </View>
                    <Text style={styles.textTime}>
                      {moment(e.Messages[0].createdAt).format('hh:mm a')}
                    </Text>
                  </View>
                </Pressable>
              ))
            )}
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default PharmacistHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewSpinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    height: '5%',
    width: '100%',
  },
  userCardView: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  nameMessageView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  userName: {
    fontSize: 18,
  },
  textTime: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
