import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { ICodeResult } from "../Functions/Api";
import { VoteView } from "./VoteView";
import { colors } from "../Styling/Colors";

interface IResultViewProps {
  result: ICodeResult | null;
  barcode: string | null;
  resultCallBack: (result: ICodeResult | null, barcode: any) => void;
}

export function ResultView(props: IResultViewProps) {
  const [showVoteView, setShowVoteView] = React.useState(false);
  const [hasVoted, setHasVoted] = React.useState(false);

  const scanAnotherCode = () => {
    props.resultCallBack(null, null);
  };
  if (showVoteView) {
    console.log({ derp: props.barcode });
    return (
      <VoteView
        barcode={props.barcode ? props.barcode : ""}
        votedCallback={() => {
          setShowVoteView(false);
          setHasVoted(true);
        }}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.firstTitleLabel}>Packaging</Text>
      <Text style={styles.regularLabel}>Recycle as: {props.result?.category}</Text>
      <Text style={styles.regularLabel}>Confidence: {props.result?.confidence ? props.result?.confidence * 100 + "%" : "unknown"}</Text>
      <Text style={styles.lastLabel}>Recycling gain: {props.result?.co2equivRecyclingGain} kg CO2/kg</Text>

      {!hasVoted && (
        <TouchableOpacity style={styles.button} onPress={() => setShowVoteView(true)}>
          <Text style={styles.buttonText}>Vote</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.titleLabel}>Environmental Impact</Text>
      <Text style={styles.lastLabel}>Emission: {props.result?.co2equiv} kg CO2</Text>

      {/* <TouchableOpacity style={styles.indicator}>
        <Text style={styles.indicatorText}>Good</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.scanButton} onPress={scanAnotherCode}>
        <Text style={styles.buttonText}>Scan another code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    padding: 8,
    width: "80%",
    backgroundColor: colors.green,
    marginBottom: "50%",
    borderRadius: 8,
  },
  indicatorText: {
    color: colors.white,
    textAlign: "center",
  },

  button: { backgroundColor: colors.darkGrey, padding: 8, borderRadius: 2, marginBottom: 8, minWidth: "80%" },
  scanButton: { backgroundColor: colors.darkGrey, padding: 8, borderRadius: 2, marginBottom: "10%", minWidth: "80%", marginTop: "auto" },
  buttonText: { color: colors.white, textAlign: "center" },
  regularLabel: { marginBottom: 4, fontSize: 20, minWidth: "80%" },
  firstTitleLabel: { marginBottom: 4, fontSize: 20, minWidth: "80%", fontWeight: "bold", marginTop: "45%" },
  titleLabel: { marginBottom: 4, fontSize: 20, minWidth: "80%", fontWeight: "bold", marginTop: 24 },
  lastLabel: { marginBottom: 16, fontSize: 20, minWidth: "80%" },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
