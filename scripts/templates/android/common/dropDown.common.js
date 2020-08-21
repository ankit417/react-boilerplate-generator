import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const {height, width} = Dimensions.get('window');
import {colors, fonts, normalize} from '../modules';

export const DefaultDropDown = ({
  list,
  defaultValue,
  containerStyle,
  listStyle,
  labelStyles,
  dropDownStyling,
  styling,
  onChange,
}) => {
  return (
    <DropDownPicker
      items={list}
      defaultValue={defaultValue}
      containerStyle={{...styles.container, ...containerStyle}}
      style={{...styles.dropdownStyle, ...styling}}
      itemStyle={{...styles.innerStyle, ...listStyle}}
      labelStyle={{...styles.labelStyling, ...labelStyles}}
      dropDownStyle={{...styles.dropDownStyling, ...dropDownStyling}}
      // onChangeItem={item => this.setState({
      //     country: item.value
      // })}
    />
  );
};

DefaultDropDown.propTypes = {
  list: PropTypes.array,
  defaultValue: PropTypes.string,
  containerStyle: PropTypes.any,
  styling: PropTypes.any,
  listStyle: PropTypes.any,
  labelStyles: PropTypes.any,
  dropDownStyling: PropTypes.any,
  onChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    // width:70
  },
  dropdownStyle: {
    backgroundColor: colors.light.cardColor,
  },
  innerStyle: {
    justifyContent: 'flex-start',
  },
  labelStyling: {
   color:'#000'
  },
  dropDownStyling: {
    backgroundColor: '#fafafa'
    },
});
