import React, {Fragment, useContext, useRef, useState} from 'react';
import {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AxiosInstance} from '../../../api/axios-instance';
import {PharmacyDataContext} from '../../../context/PharmacyDataContext';
import {UserDataContext} from '../../../context/UserDataContext';
import HeaderChat from './components/HeaderChat';
import Message from './components/Message';

import SendLogo from '../../../assets/icons/send.png';
import {KeyboardShift} from '../../../utils/KeyboardShift';

const PharmacistChat = ({route, navigation}) => {
  const {pharmacistDataProviderValue} = useContext(UserDataContext);

  const {sendMessage, socketRefProviderValue, receiveMessageProviderValue} =
    useContext(PharmacyDataContext);
  const {receiveMessage, setReceiveMessage} = receiveMessageProviderValue;
  const socketRef = socketRefProviderValue;

  const {userId} = route.params;

  const [chat, setChat] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState(null);

  const scrollViewRef = useRef(0);

  const getUserChat = async () => {
    await AxiosInstance.get(`/pharamcy/message/${userId}`)
      .then(res => {
        setChatId(res.data.data.id);
        setUserInfo(res.data.data.User);
        let data = res.data.data.Messages;

        data = data.reverse();

        setChat(data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getUserChat();
  }, []);

  useEffect(() => {
    // if (receiveMessage && chat) {
    //   const newChat = chat;
    //   newChat.push(receiveMessage.Messages[0]);
    //   setChat(newChat);
    //   // console.log(data);
    // }
    if (receiveMessage && chatId) {
      // console.log(chat);
      if (chatId === receiveMessage.id) {
        // console.log(receiveMessage);
        setChat(oldArray => [...oldArray, receiveMessage.Messages[0]]);
        setReceiveMessage(null);
      }
    }
  }, [receiveMessage]);

  const onSendHandler = () => {
    if (message.length !== 0) {
      const date = new Date();
      sendMessage(message, userId);
      setChat(prevItems => [
        ...prevItems,
        {
          fromUserId: null,
          message: message,
          createdAt: date,
        },
      ]);
      setMessage('');
    }
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  return !chat ? (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator color="#1a1a1a" />
    </View>
  ) : (
    <KeyboardShift>
      <SafeAreaView style={styles.topNavbarColor} />
      <SafeAreaView style={styles.bottomNavbarColor}>
        <View style={styles.containerView}>
          <View style={styles.headerStyle}>
            <HeaderChat data={userInfo} goBackHandler={goBackHandler} />
          </View>
          <View style={styles.chatPage}>
            <ScrollView
              ref={ref => {
                scrollViewRef.current = ref;
              }}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }>
              {chat.map((e, i) => (
                <Message e={e} key={i} />
              ))}
            </ScrollView>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Enter your message"
              placeholderTextColor="rgba(47, 51, 47, 0.667)"
              value={message}
              onChangeText={text => setMessage(text)}
            />
            <Pressable onPress={onSendHandler} style={styles.pressSend}>
              <Image source={SendLogo} style={styles.centerSend} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardShift>
  );
};

export default PharmacistChat;

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
