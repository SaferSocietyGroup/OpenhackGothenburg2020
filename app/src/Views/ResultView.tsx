import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
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
      <Text style={styles.co2Label}>CO2 Eq: {props.result.co2equiv}</Text>
      <TouchableOpacity style={styles.button} onPress={scanAnotherCode}>
        <Text style={styles.buttonText}>Scan another code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: "#3d801f", padding: 8, borderRadius: 2 },
  buttonText: { color: "#FFFFFF" },

  co2Label: { marginBottom: 8 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
