import React, {createContext, useState, useMemo, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import {API_BASE, AxiosInstance} from '../api/axios-instance';

import * as RNLocalize from 'react-native-localize';

export const UserHomeDataContext = createContext();

export const UserHomeDataContextProvider = props => {
  const [userChat, setUserChat] = useState(null);
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);

  const [receiveMessage, setReceiveMessage] = useState(null);
  const [pharmacyOnlineOffline, setPharmacyOnlineOffline] = useState(null);
  const [chatOpen, setChatOpen] = useState(null);

  const socketRef = React.useRef(null);

  const getAllMyMessage = async () => {
    await AxiosInstance.get('/user/message')
      .then(res => {
        if (res.data.success) {
          setUserChat(res.data.data);
        }
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  const getPharmacy = async () => {
    await AxiosInstance.get(`/pharamcy?timeZone=${RNLocalize.getTimeZone()}`)
      .then(res => {
        // setPharmacy(
        //   res.data.data.sort((a, b) => {
        //     if (a.isOpen !== b.isOpen) {
        //       return a.isOpen ? -1 : 1;
        //     } else {
        //       return a.name > b.name ? 1 : -1;
        //     }
        //   }),
        // );
        setPharmacy(res.data.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    socketRef.current = io(API_BASE, {
      auth: {
        token: AsyncStorage.getItem('token'),
      },
    });
    getAllMyMessage();
    getPharmacy();
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on('connect', () => {
      setLoading(false);
      socketRef.current.emit('join', 'user');
    });
    socketRef.current.on('disconnect', () => {
      socketRef.current.disconnect();
    });

    socketRef.current.on('join', data => {
      // setPharmacyChat(data);
    });

    socketRef.current.on('receive-pharmacy-message', data => {
      console.log(data);
      setReceiveMessage(data);
    });

    socketRef.current.on('pharmacy-online-offline', data => {
      console.log(data);
      setPharmacyOnlineOffline(data);
    });
  }, [socketRef]);

  useEffect(() => {
    if (!pharmacyOnlineOffline) return;
    const {isOpen, pharmacyId} = pharmacyOnlineOffline;
    let newPharmacy = pharmacy;
    newPharmacy.forEach(element => {
      if (element.id === pharmacyId) {
        element.isOpen = isOpen;
      }
    });
    setPharmacy(newPharmacy);
    setPharmacyOnlineOffline(null);
  }, [pharmacyOnlineOffline]);

  const userChatProviderValue = useMemo(
    () => ({
      userChat,
      setUserChat,
    }),
    [userChat, setUserChat],
  );

  const loadingProviderValue = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading, setLoading],
  );

  const pharmacyProviderValue = useMemo(
    () => ({
      pharmacy,
      setPharmacy,
    }),
    [pharmacy, setPharmacy],
  );

  const chatOpenProviderValue = useMemo(
    () => ({
      chatOpen,
      setChatOpen,
    }),
    [chatOpen, setChatOpen],
  );

  const receiveMessageProviderValue = useMemo(
    () => ({
      receiveMessage,
      setReceiveMessage,
    }),
    [receiveMessage, setReceiveMessage],
  );

  const pharmacyOnlineOfflineProviderValue = useMemo(
    () => ({
      pharmacyOnlineOffline,
      setPharmacyOnlineOffline,
    }),
    [pharmacyOnlineOffline, setPharmacyOnlineOffline],
  );

  const sendMessage = (text, pharmacyId) => {
    socketRef.current.emit('user-message', {
      text,
      pharmacyId,
    });
  };

  return (
    <UserHomeDataContext.Provider
      value={{
        userChatProviderValue,
        loadingProviderValue,
        pharmacyProviderValue,
        chatOpenProviderValue,
        receiveMessageProviderValue,
        pharmacyOnlineOfflineProviderValue,
        sendMessage,
      }}>
      {props.children}
    </UserHomeDataContext.Provider>
  );
};
