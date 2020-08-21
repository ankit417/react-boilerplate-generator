import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// DIMENSION
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const Header = ({goback,title}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}>

        {goback ? (
        
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingVertical: 10,
          paddingRight: 20,
        }}>
        <Image
          style={{
            height: 26,
            width: 14.85,
          }}
          source={require('../../assets/icons/Vector.png')}
        />
      </TouchableOpacity>
        ) : (
          <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{
            paddingVertical: 10,
            paddingRight: 10,
          }}>
          <Image
            style={{
              height: 26,
              width: 37.44,
            }}
            source={require('../../assets/icons/Menu.png')}
          />
        </TouchableOpacity>
        )}

        <View
          style={{
            marginLeft: 30,
          }}>
          <Text style={{fontFamily: 'AvertaSemibold', fontSize: 22}}>
            {title}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

Header.propTypes = {
  goback: PropTypes.bool,
};

const styles = StyleSheet.create({
  inputBox: {
    height: 45,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    fontFamily: 'AvertaLight',
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
