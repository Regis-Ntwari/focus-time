import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RoundedButton from "../../components/RoundedButton";
import { TextInput } from "react-native-paper";
import { fontSizes, paddingSizes } from "../../utils/sizes";

export default function Focus({ addSubject }) {
  const [subject, setSubject] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to put focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: paddingSizes.md }}
            placeholder="Enter a Subject"
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            size={75}
            title="+"
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: paddingSizes.md,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: paddingSizes.md,
    flexDirection: "row",
  },
});
