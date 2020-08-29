import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function SplashView() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Checksit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 24 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
