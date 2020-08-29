import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { checkCode, ICodeResult } from "../Functions/Api";

interface IScannerViewProps {
  resultCallBack: (result: ICodeResult | null) => void;
}

export function ScannerView(props: IScannerViewProps) {
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(null);
  const [scanned, setScanned] = React.useState(false);
  const [code, setCode] = React.useState<string>();
  const [result, setResult] = React.useState<any>();

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setCode(data);
    checkCode(data).then((result) => {
      props.resultCallBack(result);
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner onBarCodeScanned={(scanned ? undefined : handleBarCodeScanned) as any} style={StyleSheet.absoluteFillObject} />

      {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {},
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
