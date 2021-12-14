import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackLogo from '../../../assets/icons/back.png';

const HeaderChat = ({pharmacyName, goBackHandler, pharmacyInfo}) => {
  const navigation = useNavigation();

  const navigationPharmacyProfile = () => {
    navigation.navigate('PharmacyProfile', {
      pharmacyInfo,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.row, {justifyContent: 'center', alignItems: 'center'}]}>
        <Pressable onPress={() => goBackHandler()}>
          <Image source={BackLogo} style={styles.backStyle} />
        </Pressable>
        <Pressable onPress={navigationPharmacyProfile} style={{flex: 1}}>
          <View style={[styles.row, {alignItems: 'center'}]}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'white',
                marginRight: 20,
              }}>
              <Image
                source={{uri: pharmacyInfo.photo}}
                style={{width: 40, height: 40, borderRadius: 20}}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text>{pharmacyInfo.name}</Text>

              <Text style={{fontSize: 12}}>
                {pharmacyInfo.locationDescription}
              </Text>
            </View>
          </View>
        </Pressable>
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
