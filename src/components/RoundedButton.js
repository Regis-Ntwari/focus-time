import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes } from "../utils/sizes";

export default function RoundedButton({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) {
  return (
  <TouchableOpacity style={[styles(size).radius]} onPress={props.onPress}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
  </TouchableOpacity>
  )
}

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: "center",
      justifyContent : 'center',
      borderColor : colors.white,
      borderWidth : 2
    },
    text : {
        color : colors.white,
        fontSize : fontSizes.md,
    }
  });
