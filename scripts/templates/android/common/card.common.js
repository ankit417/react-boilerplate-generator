import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
const {height, width} = Dimensions.get('window');
export const Card = (props) => {
  const {children, containerStyle} = props;
  return (
    <View style={[styles.card, styles.shadow,containerStyle]}>
      {children ? children : null}
    </View>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }
});
