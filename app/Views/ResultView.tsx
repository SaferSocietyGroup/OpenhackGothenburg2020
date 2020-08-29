import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { ICodeResult } from "../Functions/Api";

interface IResultViewProps {
  result: any;
  resultCallBack: (result: ICodeResult | null) => void;
}

export function ResultView(props: IResultViewProps) {
  const scanAnotherCode = () => {
    props.resultCallBack(null);
  };

  return (
    <View style={styles.container}>
      <Text>CO2 Eq: {props.result.co2equiv}</Text>
      <Button title="Scan another code" onPress={scanAnotherCode} color="#3d801f"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
