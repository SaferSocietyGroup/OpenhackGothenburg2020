import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScannerView } from "./Views/ScannerView";
import { ResultView } from "./Views/ResultView";
import { Camera } from "expo-camera";

function checkPermission(setPermission: any) {
  Camera.requestPermissionsAsync().then((status) => {
    setPermission(status.status === "granted");
  });
}

export default function App() {
  const [permission, setPermission] = React.useState(false);

  React.useEffect(() => checkPermission(setPermission));

  const showResult = false;
  console.log(permission);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Must give permission :(</Text>
      </View>
    );
  }

  if (showResult) {
    return <ResultView></ResultView>;
  }
  return <ScannerView></ScannerView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
