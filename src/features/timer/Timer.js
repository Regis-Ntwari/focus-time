import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Vibration,
  Platform,
} from "react-native";
import Countdown from "../../components/Countdown";
import { colors } from "../../utils/colors";
import { ProgressBar } from "react-native-paper";
import { fontSizes, paddingSizes } from "../../utils/sizes";
import Timing from "../timer/Timing";
import { useKeepAwake } from "expo-keep-awake";
import RoundedButton from '../../components/RoundedButton'

const DEFAULT_TIME = 1;

export default function Timer({ focusSubject, onTimerEnd, clearSubject }) {
  useKeepAwake();
  const [minutes, setminutes] = useState(0.1);
  const [isStarted, setisStarted] = useState(false);
  const [progress, setprogress] = useState(1);

  const onProgress = (progress) => {
    setprogress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => {
        Vibration.vibrate();
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
      }, 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const changeTime = (time) => {
    setminutes(time);
    setprogress(1);
    setisStarted(false);
  };

  const onEnd = () => {
    vibrate();
    setminutes(DEFAULT_TIME);
    setprogress(1);
    setisStarted(false);
    onTimerEnd();
  };


  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          onEnd={onEnd}
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
        />
      </View>
      <View style={{ paddingTop: paddingSizes.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: paddingSizes.xl }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>
      <View style={{ paddingTop: paddingSizes.xl }}></View>
      <View style={styles.buttonTime}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton size={100} title={isStarted ? 'Pause' : 'Start'} onPress={() => setisStarted(!isStarted)}/>
        <RoundedButton
          size={100}
          title="Cancel"
          onPress={() => clearSubject()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: paddingSizes.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTime: {
    flex: 0.3,
    flexDirection: "row",
    paddingTop: paddingSizes.md,
    marginHorizontal: paddingSizes.sm,
  },
});
