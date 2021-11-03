import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes, paddingSizes } from "../utils/sizes";

const minutesToMilliseconds = (min) => min * 60 * 1000;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export default function Countdown({
  minutes = 5,
  isPaused,
  onProgress,
  onEnd,
}) {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(minutesToMilliseconds(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;

      return timeLeft;
    });
  };

  useEffect(() => {
    onProgress(millis / minutesToMilliseconds(minutes));
    if(millis === 0){
        onEnd();
    }
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minutesToMilliseconds(minutes));
  }, [minutes]);

  return (
    <Text style={styles.text}>
      {formatTime(minute)} : {formatTime(seconds)}
    </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
    padding: paddingSizes.lg,
    backgroundColor: colors.lightblue,
  },
});
