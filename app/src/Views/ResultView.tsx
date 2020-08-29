import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { ICodeResult } from "../Functions/Api";

interface IResultViewProps {
  result: ICodeResult;
  resultCallBack: (result: ICodeResult | null) => void;
}

export function ResultView(props: IResultViewProps) {
  const scanAnotherCode = () => {
    props.resultCallBack(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sortAsLabel}>Recycle as: {props.result.sortAs}</Text>
      <Text style={styles.co2Label}>CO2 Eq: {props.result.co2equiv}</Text>
      <TouchableOpacity style={styles.indicator}>
        <Text style={styles.indicatorText}>Good</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={scanAnotherCode}>
        <Text style={styles.buttonText}>Vote</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={scanAnotherCode}>
        <Text style={styles.buttonText}>Scan another code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    padding: 8,
    width: "80%",
    backgroundColor: "#3d801f",
    marginBottom: "50%",
    borderRadius: 8,
  },
  indicatorText: {
    color: "#FFFFFF",
    textAlign: "center",
  },

  button: { backgroundColor: "#000000", padding: 8, borderRadius: 2, marginBottom: 8 },
  buttonText: { color: "#FFFFFF" },
  sortAsLabel: { marginBottom: 4, fontSize: 20 },
  co2Label: { marginBottom: 8, fontSize: 20 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
