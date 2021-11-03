import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import Focus from "./src/features/focus/Focus";
import FocusHistory from "./src/features/focus/FocusHistory";
import { colors } from "./src/utils/colors";
import Timer from "./src/features/timer/Timer";
import { paddingSizes } from "./src/utils/sizes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [focusSubject, setFocusSubject] = useState("");
  const [focusHistory, setfocusHistory] = useState([]);

  const STATUSES = {
    COMPLETE: 1,
    CANCELLED: 0,
  };

  const addFocusHistorySubject = (subject, status) => {
    setfocusHistory([...focusHistory, {id: String(focusHistory.length + 1), subject, status }]);
  };

  const saveFocusHistory = async() => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error);
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");

      if (history && JSON.parse(history).length){
        setfocusHistory(JSON.parse(history))
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubject(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubject(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory
            focusHistory={focusHistory}
            onClear={() => setfocusHistory([])}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkblue,
    paddingTop: Platform.OS === "ios" ? paddingSizes.md : paddingSizes.lg,
    alignItems: "center",
    justifyContent: "center",
  },
});
