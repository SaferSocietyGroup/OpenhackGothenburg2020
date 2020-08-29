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

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    console.log({ type });
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
      <Text style={styles.label}>Place barcode inside the square to scan</Text>
      <BarCodeScanner onBarCodeScanned={(scanned ? undefined : handleBarCodeScanned) as any} style={StyleSheet.absoluteFillObject} />

      {scanned && <Button color="#3d801f" title={"Scan Again"} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { textAlign: "center", marginBottom: 12 },
  image: {},
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
