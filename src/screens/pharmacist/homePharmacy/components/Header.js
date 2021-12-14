import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, Switch, Pressable, Image} from 'react-native';
import {AxiosInstance} from '../../../../api/axios-instance';
import {UserDataContext} from '../../../../context';
import {PharmacyDataContext} from '../../../../context/PharmacyDataContext';

const Header = () => {
  const {pharmacyChatProviderValue, PharmacyOnlineOffline} =
    useContext(PharmacyDataContext);

  const {pharmacyChat} = pharmacyChatProviderValue;

  const {pharmacistDataProviderValue} = useContext(UserDataContext);
  const {pharmacistData} = pharmacistDataProviderValue;

  const updateOpenHandler = async data => {
    await AxiosInstance.put('pharmacist/updateOpen', {
      isOpen: data,
      pharmacyId: pharmacistData.Pharmacy.id,
    });
  };

  const [isEnabled, setIsEnabled] = useState(pharmacistData.Pharmacy.isOpen);
  const toggleSwitch = () => {
    updateOpenHandler(!isEnabled);
    PharmacyOnlineOffline({
      isOpen: !isEnabled,
      pharmacyId: pharmacistData.Pharmacy.id,
    });
    setIsEnabled(previousState => !previousState);
  };

  const navigation = useNavigation();

  const handleMoveSetting = () => {
    navigation.navigate('Setting');
  };

  return (
    <View style={styles.container}>
      <Text>PharmaFind</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Switch
          trackColor={{false: '#f4f3f4', true: '#1a11a'}}
          thumbColor={isEnabled ? 'green' : '#f4f3f4'}
          ios_backgroundColor="#1a11a"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Pressable
          // style={{width: 60, flex: 1, alignItems: 'flex-end'}}
          onPress={handleMoveSetting}>
          <Image source={require('../../../../assets/icons/options.png')} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56B1D3',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
});
