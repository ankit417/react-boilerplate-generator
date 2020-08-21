import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { connect } from "react-redux";
import { closeSnack } from "../snack.actions";
import Icon from "react-native-vector-icons/AntDesign";
import { colors, fonts, normalize } from "../../modules";

const BOX_HEIGHT = 120;

const SnackBarComp = props => {

  const { snack: { modalVisible, message, type }, dispatch } = props;

  const modalAnimation = useRef(new Animated.Value(0)).current;

  const closeModal = () => {
    Animated.spring(modalAnimation, {
      toValue: 0,
      useNativeDriver: true
    }).start(({ finished }) => {
      if(finished) {
        dispatch(closeSnack());
      }
    });
  }

  useEffect(() => {
    if(modalVisible) {

      setTimeout(() => {
        closeModal();
      }, 3000);

      Animated.spring(modalAnimation, {
        toValue: 1,
        useNativeDriver: true
      }).start();
    }    
  }, [ modalVisible ]);

  const translateYInterpolate = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-BOX_HEIGHT, 0]
  })

  const snackStyles = {
    transform: [
      { translateY: translateYInterpolate }
    ]
  };

  return (
    <>
      {
        modalVisible 
        &&
        <Animated.View style={[styles.snackContainer, snackStyles]}>
          <Animated.View style={[styles.snackBarContainer, {
            backgroundColor: type === "success" ? "#4aa255" : colors.light.highlightColor
          }]}>
            <View style={styles.snackBar}>
              <Text style={styles.snackMessage}>{ message }</Text>
            </View>

            <TouchableOpacity onPress={() => closeModal()} activeOpacity={0.8} style={styles.snackIcon}>
              <Icon 
                name="closecircle"
                size={24}
                color={colors.light.cardColor}
              />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      }
    </>
  );
}

const mapStateToProps = state => {
  return {
    snack: state.snack
  };
}

export const SnackBar = connect(mapStateToProps, null)(SnackBarComp);

const styles = StyleSheet.create({
  snackContainer: {
    ...StyleSheet.absoluteFillObject,
    height: BOX_HEIGHT,
    paddingVertical: 30,
    paddingHorizontal: 24
  },
  snackBarContainer: {
    backgroundColor: "#4aa255",
    padding: 20,
    borderRadius: 10,
    elevation: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  snackBar: {},
  snackMessage: {
    fontFamily: fonts.family.AVERTA_SEMI_BOLD,
    color: "#FFF",
    fontSize: normalize(fonts.size.small)
  },
  snackIcon: {}
});