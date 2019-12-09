import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RadioButton = () => {
  return <View style={styles.circle}></View>;
};

const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: "red"
  }
});

export default RadioButton;
