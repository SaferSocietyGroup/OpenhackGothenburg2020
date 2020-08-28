import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { Camera } from "expo-camera";

const showResult = false;

export function ScannerView() {
  const [cameraRef, setCameraRef] = React.useState<any>(undefined);
  const [image, setImage] = React.useState<any>(undefined);

  const imageExists = !!image;

  console.log({ image });
  return (
    <View style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        autoFocus={false}
        type={Camera.Constants.Type.Back}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      ></Camera>
      {imageExists ? (
        <Image
          style={styles.image}
          source={{
            uri: image.uri,
          }}
        />
      ) : undefined}
      <Text>Scanner</Text>
      <Button
        color="#000000"
        title="Scan"
        onPress={() => {
          if (cameraRef) {
            cameraRef
              .takePictureAsync()
              .then((image: any) => setImage(image))
              .catch((error: any) => console.log({ error }));
          }
        }}
      ></Button>
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
