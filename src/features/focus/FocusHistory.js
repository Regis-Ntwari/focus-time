import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { paddingSizes, fontSizes } from "../../utils/sizes";
import RoundedButton from "../../components/RoundedButton";
import { Card } from "react-native-paper";
import { colors } from "../../utils/colors";

export default function FocusHistory({ focusHistory, onClear }) {
  const historyItem = ({ item }) => {
    console.log(item);
    return (
    //   <Text style={styles.historyItem(item.status)} key={index}>
    //     {item.subject}
    //   </Text>
    <View style={styles.itemContainer} key={item.id}>
        <Card style={styles.cardItem(item.status)}>
            <Text style={styles.itemSubject}>{item.subject}</Text>
        </Card>
    </View>
        
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {focusHistory.length !== 0 ? (
          <>
            <Text style={styles.title}>Things We have focused on:</Text>
            <FlatList
              contentContainerStyle={{ flex: 1, alignItems: "center" }}
              data={focusHistory}
              renderItem={historyItem}
              keyExtractor={historyItem.id}
            />

            <View style={styles.clearButtonContainer}>
              <RoundedButton
                size={100}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        ) : null}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status < 1 ? "red" : "lightgreen",
  }),
  title: {
    color: "white",
    fontSize: fontSizes.lg,
  },
  clearButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  cardItem : (status) => ({
      backgroundColor : status < 1 ? 'red' : 'green',
      alignItems : 'center',
      width : 300,
      height : 40
  }),
  itemSubject : {
      paddingTop : paddingSizes.sm,
      alignItems : 'center',
      justifyContent : 'center',
      color : colors.white
  },
  itemContainer : {
      paddingVertical : paddingSizes.sm
  }
});
