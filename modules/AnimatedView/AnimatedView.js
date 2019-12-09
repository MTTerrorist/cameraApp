import { Animated } from "react-native";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import React from "react";
import colors from "../../colors";

const windowHeight = Math.ceil(Dimensions.get("window").height);

const AnimatedView = ({ pos }) => {
  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          transform: [{ translateY: pos }]
        }
      ]}
    >
      <Text style={colors.textPrimaryColor}>JEZUS DZIAŁA</Text>
      {/*<RadioButton />*/}
    </Animated.View>
  );
};

var styles = StyleSheet.create({
  animatedView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 152, 0, 0.8)",
    height: windowHeight - 69,
    width: Math.ceil(Dimensions.get("window").width) / 3
  }
});

export default AnimatedView;
