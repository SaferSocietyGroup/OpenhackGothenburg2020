import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScannerView } from "./Views/ScannerView";
import { ResultView } from "./Views/ResultView";
import { Camera } from "expo-camera";
import { ICodeResult } from "./Functions/Api";
import { SplashView } from "./Views/SplashView";

function checkPermission(setPermission: any) {
  Camera.requestPermissionsAsync().then((status) => {
    setPermission(status.status === "granted");
  });
}

export default function App() {
  const [permission, setPermission] = React.useState(false);
  const [result, setResult] = React.useState<ICodeResult | null>(null);
  const [splashDone, setSplashDone] = React.useState(false);

  let timer1 = setTimeout(() => setSplashDone(true), 3000);
  React.useEffect(() => {
    return () => {
      clearTimeout(timer1);
    };
  }, [splashDone]);

  const setResultCallback = (result: any) => {
    setResult(result);
  };

  React.useEffect(() => checkPermission(setPermission), []);

  const showResult = !!result;

  if (!true) {
    return (
      <View style={styles.container}>
        <Text>Must give permission :(</Text>
      </View>
    );
  }

  if (!splashDone) {
    return <SplashView />;
  }

  if (showResult) {
    return <ResultView resultCallBack={setResultCallback} result={result}></ResultView>;
  }
  return <ScannerView resultCallBack={setResultCallback}></ScannerView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
