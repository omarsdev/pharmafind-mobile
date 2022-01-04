import {io} from 'socket.io-client';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {API_BASE} from '../api/axios-instance';

let socket;
export const initiateSocketConnection = room => {
  socket = io('http://89.233.108.199:5005', {
    auth: {
      token: AsyncStorage.getItem('token'),
    },
  });
};
export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const joinSocket = type => {
  socket.emit('join', type);
  if (!socket) return true;
  socket.on('join', data => {
    return data;
  });
};

export const messageSocket = (text, pharmacyId) => {
  socket.emit('user-message', {
    text,
    pharmacyId,
  });
  if (!socket) return true;
  socket.on('user-message', msg => {
    // console.log(msg);
  });
};
