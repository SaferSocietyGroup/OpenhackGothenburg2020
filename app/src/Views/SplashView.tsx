import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export function SplashView() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Checksit</Text>
      <Image style={styles.logo} source={require("../../Images/logo.png")}></Image>
    </View>
  );
}

const logoSize = 48;

const styles = StyleSheet.create({
  label: { fontSize: 24 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: 12,
    height: logoSize,
    width: logoSize,
  },
});
