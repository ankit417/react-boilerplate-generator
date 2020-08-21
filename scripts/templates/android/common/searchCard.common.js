import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts, normalize} from '../modules';
const {height, width} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import {NameBadge} from './nameBadge.common';

// IMPORT IMAGES
import AVATAR from '../../assets/images/avatar.png';

export const SearchCard = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SearchDetail')}
      style={[styles.card, styles.shadow]}>
      <View style={[styles.left]}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={AVATAR} />
        </View>
        <View style={{marginLeft: 12}}>
          <NameBadge />
          <Text style={styles.location}>Basundhara-3</Text>
          <View style={styles.rateContainer}>
            <MaterialIcon
              color={colors.light.primaryColor}
              size={16}
              name="star"
            />
            <Text style={styles.rate}>3.2 Rated</Text>
          </View>
        </View>
      </View>
      <View style={styles.right}>
        <View>
          <Text style={styles.price}>Rs. 90/Kg</Text>
        </View>
        <View>
          <Text style={styles.qty}>200Kg</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.light.cardColor,
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30 / 2,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  },
  location: {
    marginTop: 4,
    fontFamily: fonts.family.AVERTA_LIGHT,
    fontSize: normalize(fonts.size.thin),
    color: colors.light.textColor,
  },
  rateContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rate: {
    marginLeft: 4,
    fontFamily: fonts.family.AVERTA_LIGHT,
    fontSize: normalize(fonts.size.thin),
    color: colors.light.textColor,
  },
  price: {
    fontFamily: fonts.family.AVERTA_SEMI_BOLD,
    fontSize: normalize(fonts.size.small),
    color: colors.light.green,
    textAlign: 'right',
  },
  qty: {
    marginTop: 10,
    fontFamily: fonts.family.AVERTA_LIGHT,
    fontSize: normalize(fonts.size.extraSmall),
    color: colors.light.textColor,
    textAlign: 'right',
  },
});
