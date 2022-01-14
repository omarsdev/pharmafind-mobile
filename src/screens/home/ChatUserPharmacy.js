import React, {Fragment, useEffect, useState, useContext, useRef} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AxiosInstance} from '../../api/axios-instance';
import * as RNLocalize from 'react-native-localize';
import Header from './components/Header';
import HeaderChat from './components/HeaderChat';
import {messageSocket} from '../../socket/socket';

import {UserHomeDataContext} from '../../context/UserHomeDataContext';
import {launchCamera} from 'react-native-image-picker';

import Message from './components/Message';

import moment from 'moment';
import {UserDataContext} from '../../context/UserDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {Alert} from 'react-native';

import SendLogo from '../../assets/icons/send.png';
import CameraLogo from '../../assets/icons/camera.png';

import {KeyboardShift} from '../../utils/KeyboardShift';

const ChatUserPharmacy = ({route, navigation}) => {
  const {
    sendMessage,
    chatOpenProviderValue,
    receiveMessageProviderValue,
    pharmacyProviderValue,
    pharmacyOnlineOfflineProviderValue,
  } = useContext(UserHomeDataContext);
  const {pharmacy} = pharmacyProviderValue;
  const {chatOpen, setChatOpen} = chatOpenProviderValue;
  const {receiveMessage, setReceiveMessage} = receiveMessageProviderValue;
  const {pharmacyOnlineOffline} = pharmacyOnlineOfflineProviderValue;

  const {userDataProviderValue} = useContext(UserDataContext);
  const {userData} = userDataProviderValue;

  const {pharmacyId, pharmacyName, pharmacyPhoto, pharmacyIsOpen} =
    route.params;
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState('');
  const [pharmacyInfo, setPharmacyInfo] = useState(null);
  const [chatId, setChatId] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [reload, setReload] = useState(false);
  const [isOpen, setIsOpen] = useState(pharmacyIsOpen);

  const scrollViewRef = useRef(0);

  const getChat = async () => {
    await AxiosInstance.get(`/user/message/${pharmacyId}`)
      .then(res => {
        // let data = res.data.data;
        // data.Messages = data.Messages.reverse();
        setChatId(res.data.data.id);
        setChatOpen(res.data.data.Messages.reverse());
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getPharmacyInfo = async () => {
    await AxiosInstance.get(`/pharamcy/${pharmacyId}`).then(res => {
      setPharmacyInfo(res.data.data);
    });
  };

  useEffect(() => {
    getPharmacyInfo();
    getChat();
  }, []);

  useEffect(() => {
    if (receiveMessage && chatId) {
      if (chatId === receiveMessage.id) {
        setChatOpen(oldArray => [...oldArray, receiveMessage.Messages[0]]);
        setReceiveMessage(null);
      }
    }
  }, [receiveMessage]);

  useEffect(() => {
    if (!pharmacyOnlineOffline) return;
    if (pharmacyOnlineOffline.pharmacyId === pharmacyId) {
      setIsOpen(pharmacyOnlineOffline.isOpen);
    }
  }, [pharmacyOnlineOffline]);

  const onSendHandler = msg => {
    if (msg.length !== 0) {
      const date = new Date();
      sendMessage(msg, pharmacyId);
      let newChat = chatOpen;
      newChat.push({
        fromUserId: userData.id,
        message: msg,
        createdAt: date,
      });
      setChatOpen(newChat);
      setPhoto(null);
      setMessage('');
    }
  };

  const launchCameraHandler = async () => {
    const result = await launchCamera();
    if (result.assets) {
      setPhoto(result.assets[0]);
    }
  };

  useEffect(() => {
    const uploadPhoto = async () => {
      const token = await AsyncStorage.getItem('token');
      const data = new FormData();
      data.append('photos', {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
      await AxiosInstance.post(`/user/message/photo/${pharmacyId}`, data, {
        header: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (res.data.success) {
            onSendHandler(res.data.data);
          }
        })
        .catch(err => {
          console.log('error: ', err);
          setReload(!reload);
        });
    };

    if (photo) {
      uploadPhoto();
    }
  }, [photo, reload]);

  const goBackHandler = () => {
    navigation.goBack();
  };

  return !chatOpen || !pharmacyInfo ? (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator color="#1a1a1a" />
    </View>
  ) : (
    <KeyboardShift>
      <SafeAreaView style={styles.topNavbarColor} />
      <SafeAreaView style={styles.bottomNavbarColor}>
        <View style={styles.containerView}>
          <View style={styles.headerStyle}>
            <HeaderChat
              pharmacyName={pharmacyName}
              pharmacyPhoto={pharmacyPhoto}
              goBackHandler={goBackHandler}
              pharmacyInfo={pharmacyInfo}
            />
          </View>
          <View style={styles.chatPage}>
            <ScrollView
              ref={ref => {
                scrollViewRef.current = ref;
              }}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }>
              {chatOpen.map((e, i) => (
                <View key={i} style={i === 0 && {marginTop: 10}}>
                  <Message e={e} />
                </View>
              ))}
            </ScrollView>
          </View>
          {/* e.id ===  */}
          {isOpen ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.messageInput}
                placeholder="Enter your message"
                placeholderTextColor="rgba(47, 51, 47, 0.667)"
                value={message}
                onChangeText={text => setMessage(text)}
              />
              <Pressable
                onPress={() => onSendHandler(message)}
                style={styles.pressSend}>
                <Image source={SendLogo} style={styles.centerSend} />
              </Pressable>

              <Pressable onPress={launchCameraHandler} style={styles.pressSend}>
                <Image source={CameraLogo} style={styles.centerSend} />
              </Pressable>
            </View>
          ) : (
            <View>
              <Text>The pharmacy is offline</Text>
            </View>
          )}
          {/* {pharmacy.map(e => {
            if (e.id === pharmacyId) {
              if (e.isOpen) {
                return (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.messageInput}
                      placeholder="Enter your message"
                      placeholderTextColor="rgba(47, 51, 47, 0.667)"
                      value={message}
                      onChangeText={text => setMessage(text)}
                    />
                    <Pressable
                      onPress={() => onSendHandler(message)}
                      style={styles.pressSend}>
                      <Image source={SendLogo} style={styles.centerSend} />
                    </Pressable>

                    <Pressable
                      onPress={launchCameraHandler}
                      style={styles.pressSend}>
                      <Image source={CameraLogo} style={styles.centerSend} />
                    </Pressable>
                  </View>
                );
              } else {
                return (
                  <View>
                    <Text>The pharmacy is offline</Text>
                  </View>
                );
              }
            }
          })} */}
        </View>
      </SafeAreaView>
    </KeyboardShift>
  );
};

export default ChatUserPharmacy;

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    height: 50,
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
    height: 400 - 365,
  },
  chatPage: {
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    borderRadius: 30,
    paddingLeft: 10,
  },
  pressSend: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerSend: {
    width: 25,
    height: 25,
  },
});

// import React from 'react';
// import {Text, View} from 'react-native';
// import {KeyboardShift} from '../../utils/KeyboardShift';

// const ChatUserPharmacy = () => {
//   return (
//     <KeyboardShift>
//       <View>
//         <Text>HEllo</Text>
//       </View>
//     </KeyboardShift>
//   );
// };

// export default ChatUserPharmacy;
