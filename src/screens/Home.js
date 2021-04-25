import * as React from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import {
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import firebase from "../firebase";

function SignOutButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View style={[styles.button, pressed && { opacity: 0.65 }]}>
          <Text style={styles.btnText}>SIGN OUT</Text>
        </View>
      )}
    </Pressable>
  );
}

function HomeScreen() {
  const { landscape = false } = useDeviceOrientation();

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.log("Errow while signing out", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "grey",
          width: "100%",
          height: landscape ? "100%" : "30%",
        }}
      ></View>
      <SignOutButton onPress={handleSignOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    lineHeight: 20,
    borderWidth: 1,
    textTransform: "uppercase",
  },
  btnText: {
    textAlign: "center",
  },
});

export default HomeScreen;
export { HomeScreen };
