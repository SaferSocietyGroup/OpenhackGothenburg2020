import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScannerView } from "./src/Views/ScannerView";
import { ResultView } from "./src/Views/ResultView";
import { ICodeResult } from "./src/Functions/Api";
import { SplashView } from "./src/Views/SplashView";
import { BarCodeScanner } from "expo-barcode-scanner";

function checkPermission(setPermission: any) {
  BarCodeScanner.requestPermissionsAsync().then((status) => {
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

  const resultCallback = (result: any) => {
    setResult(result);
  };

  React.useEffect(() => checkPermission(setPermission), []);

  const showResult = !!result;

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Must give permission to use camera :(</Text>
      </View>
    );
  }

  if (!splashDone) {
    return <SplashView />;
  }

  if (showResult) {
    return <ResultView resultCallBack={resultCallback} result={result}></ResultView>;
  }
  return <ScannerView resultCallBack={resultCallback}></ScannerView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
