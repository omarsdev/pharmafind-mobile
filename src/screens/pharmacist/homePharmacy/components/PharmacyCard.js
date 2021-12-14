import {RFC_2822} from 'moment';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const PharmacyCard = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={{
            uri: `${data.photo}`,
          }}
          style={styles.photo}
        />
        <Text>{data.name}</Text>
        <View style={styles.circleView}>
          <View style={styles.center}>
            <View
              style={[
                styles.onlineOfflineStyle,
                data.online
                  ? {backgroundColor: 'green'}
                  : {backgroundColor: 'gray'},
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PharmacyCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  circleView: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderColor: 'black',
    borderWidth: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineOfflineStyle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
});
