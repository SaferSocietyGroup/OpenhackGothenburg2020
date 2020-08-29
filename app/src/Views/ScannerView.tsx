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
      <BarCodeScanner onBarCodeScanned={(scanned ? undefined : handleBarCodeScanned) as any} style={StyleSheet.absoluteFillObject} >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter} >
          <View style={styles.layerLeft} />
          <View style={styles.layerFocused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
      <Text style={styles.label}>Place barcode inside the square to scan</Text>
      {scanned && <Button color="#f3f1f0" title={"Scan Again"} onPress={() => setScanned(false)} />}
    </View>
  );
}
const opacity = 'rgba(0,0,0,.6)';

const styles = StyleSheet.create({
  label: { textAlign: "center", marginBottom: 12, color:'#f3f1f0' },
  image: {},
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  layerTop:{
    flex: 0.6,
    backgroundColor: opacity
  },
  layerCenter:{
    flex:1,
    flexDirection: 'row',
    maxHeight:240
  },
  layerLeft:{
    flex: 0.3,
    backgroundColor: opacity
  },
  layerFocused:{
    flex: 1,
  },
  layerRight:{
    flex: 0.3,
    backgroundColor: opacity
  },
  layerBottom:{
    flex: 1,
    backgroundColor: opacity
  },
});
