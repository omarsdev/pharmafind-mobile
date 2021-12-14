import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import BackLogo from '../../../../assets/icons/back.png';

const HeaderChat = ({data, goBackHandler}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={() => goBackHandler()}>
          <Image source={BackLogo} style={styles.backStyle} />
        </Pressable>
        <Text>{data.name}</Text>
      </View>
    </View>
  );
};

export default HeaderChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56B1D3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  row: {flexDirection: 'row'},
  backStyle: {width: 20, height: 20, marginRight: 20},
});
