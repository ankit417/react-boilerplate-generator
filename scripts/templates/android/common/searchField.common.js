import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fonts} from '../modules';
// DIMENSION

export const SearchField = ({onchange, onPress}) => {
  const navigation = useNavigation();
  const onSubmitSearch = () => {
    navigation.navigate('Search');
  };
  return (
    <View style={{position: 'relative'}}>
      <TextInput
        style={styles.inputBox}
        placeholder="Search ... "
        onChangeText={(e) => onChange(e)}
        onSubmitEditing={onSubmitSearch}
      />
      <Icon
        size={30}
        name={'search'}
        style={styles.searchIcon}
        onPress={onPress}
      />
    </View>
  );
};

SearchField.propTypes = {
  onPress: PropTypes.func,
  onChange: PropTypes.func,
};

const styles = StyleSheet.create({
  inputBox: {
    height: 45,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    fontFamily: fonts.family.AVERTA_SEMI_BOLD,
    paddingLeft: 50,
    paddingRight: 50,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{translateY: -17}],
  },
});
