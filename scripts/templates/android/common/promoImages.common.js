import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// DIMENSION
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import VEGETABLES from '../../assets/images/vegetables.jpg';

export const PromoImages = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {[1, 2, 3, 4].map((item, index) => {
          return (
            <View key={index} style={styles.imageContainer}>
              <Image style={styles.eachImage} source={VEGETABLES} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  imageContainer: {
    flexDirection: 'column',
    width: SCREEN_WIDTH * 0.85,
  },
  eachImage: {
    height: 0.2 * SCREEN_HEIGHT,
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 20,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
});
