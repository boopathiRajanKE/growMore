import * as React from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

function HomeScreen() {
  const { landscape = false } = useDeviceOrientation();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "grey",
          width: "100%",
          height: landscape ? "100%" : "30%",
        }}
      ></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? +StatusBar.currentHeight : 0,
  },
});

export default HomeScreen;
export { HomeScreen };
