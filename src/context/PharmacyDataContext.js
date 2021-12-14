import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import {API_BASE, AxiosInstance} from '../api/axios-instance';

export const PharmacyDataContext = createContext();

export const PharmacyDataContextProvider = props => {
  const [pharmacyChat, setPharmacyChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const socketRef = React.useRef(null);

  useEffect(() => {
    socketRef.current = io(API_BASE, {
      auth: {
        token: AsyncStorage.getItem('token'),
      },
    });
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on('connect', () => {
      setLoading(false);
      socketRef.current.emit('join', 'pharmacy');
    });

    socketRef.current.on('receive-user-message', data => {
      setReceiveMessage(data);
    });
    return () => {
      socketRef.current.on('disconnect', () => {
        socketRef.current.disconnect();
      });
    };
  }, [socketRef]);

  const sendMessage = (text, userId) => {
    socketRef.current.emit('pharmacy-message', {
      text,
      userId,
    });
  };

  const PharmacyOnlineOffline = data => {
    socketRef.current.emit('pharmacy-online-offline', {
      isOpen: data.isOpen,
      pharmacyId: data.pharmacyId,
    });
  };

  const pharmacyChatProviderValue = useMemo(
    () => ({
      pharmacyChat,
      setPharmacyChat,
    }),
    [pharmacyChat, setPharmacyChat],
  );

  const loadingProviderValue = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading, setLoading],
  );

  const receiveMessageProviderValue = useMemo(
    () => ({
      receiveMessage,
      setReceiveMessage,
    }),
    [receiveMessage, setReceiveMessage],
  );

  return (
    <PharmacyDataContext.Provider
      value={{
        pharmacyChatProviderValue,
        loadingProviderValue,
        receiveMessageProviderValue,
        socketRefProviderValue: socketRef,
        sendMessage,
        PharmacyOnlineOffline,
      }}>
      {props.children}
    </PharmacyDataContext.Provider>
  );
};
