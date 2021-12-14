import React, {Fragment} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import moment from 'moment';

const Message = ({e}) => {
  return (
    <View style={[e.fromUserId ? styles.flexEnd : styles.flexStart]}>
      <View
        style={[
          styles.messageView,
          !e.fromUserId ? styles.receiverColor : styles.senderColor,
        ]}>
        {e.message.startsWith('http') ? (
          <View>
            <Image source={{uri: e.message}} style={styles.photoView} />
          </View>
        ) : (
          <Fragment>
            <Text style={styles.messageText}>{e.message}</Text>
            <Text style={styles.messageTime}>
              {moment(e.createdAt).format('hh:mm a')}
            </Text>
          </Fragment>
        )}
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  flexEnd: {
    alignItems: 'flex-end',
  },
  flexStart: {
    alignItems: 'flex-start',
  },
  messageView: {
    width: '50%',
    marginBottom: 10,
    marginHorizontal: 10,
    minHeight: 40,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 5,
  },
  photoView: {
    width: 200,
    height: 200,
    transform: [{rotate: '90deg'}],
  },
  receiverColor: {
    backgroundColor: '#C8CDCE',
  },
  senderColor: {
    backgroundColor: '#56B1D3',
  },
  messageText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: 1,
    color: 'black',
  },
  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
    color: 'black',
  },
});
