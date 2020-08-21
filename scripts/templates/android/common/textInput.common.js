import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');
import {colors, fonts, normalize} from '../modules';

export const DefaultTextInput = ({placeholder, style, onChange}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder ? placeholder : 'Default placeholder'}
      onChangeText={(e) => onChange(e)}
    />
  );
};

DefaultTextInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

const styles = StyleSheet.create({
  input: {
    width: width - 40,
    height: 50,
    borderWidth: 1,
    borderColor: colors.light.darkBorderColor,
    borderRadius:4,
    paddingLeft:10
  },
});
