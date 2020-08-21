import React from "react";
import PropTypes from "prop-types";
import {
  View,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { colors } from "../../modules";

export const FetchLoader = props => {

  const { animating, children } = props;

  return (
    <>
      {
        animating ?
          <View style={styles.loaderContainer}>
            <ActivityIndicator 
              size="small"
              color={colors.light.primaryColor}
            />
          </View> : children 
      }
    </>
  )
}

FetchLoader.propTypes = {
  animating: PropTypes.bool,
  children: PropTypes.node
};

const styles = StyleSheet.create({
  loaderContainer: {
    paddingVertical: 20
  }
});