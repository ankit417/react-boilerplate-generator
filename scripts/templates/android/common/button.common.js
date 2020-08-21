import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import {colors, fonts, normalize} from '../modules';

export const DefaultButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.defaultButton}
      onPress={onPress}>
      <Text style={styles.defaultButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

DefaultButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

export const MiniDefaultButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.miniDefaultButton}
      onPress={onPress}>
      <Text style={styles.miniDefaultButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

DefaultButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

export const InvertedButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.invertedButton}
      onPress={onPress}>
      <Text style={styles.invertedButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

InvertedButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: colors.light.primaryColor,
    paddingVertical: 12,
    borderRadius: 10,
  },
  defaultButtonText: {
    fontSize: normalize(fonts.size.small),
    fontFamily: fonts.family.AVERTA_SEMI_BOLD,
    color: colors.light.cardColor,
    textAlign: 'center',
  },
  miniDefaultButton: {
    backgroundColor: colors.light.primaryColor,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  miniDefaultButtonText: {
    fontSize: normalize(fonts.size.extraThin),
    fontFamily: fonts.family.AVERTA_SEMI_BOLD,
    color: colors.light.cardColor,
    textAlign: 'center',
  },
  invertedButton: {
    backgroundColor: colors.light.cardColor,
    borderColor: colors.light.primaryColor,
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 10,
  },
  invertedButtonText: {
    fontSize: normalize(fonts.size.small),
    fontFamily: fonts.family.AVERTA_SEMI_BOLD,
    color: colors.light.primaryColor,
    textAlign: 'center',
  },
});
