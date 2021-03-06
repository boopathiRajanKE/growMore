import React, { useState, useEffect } from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import {
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  Pressable,
  Text,
  TextInput,
  StyleSheet,
  LogBox,
} from "react-native";
import * as Notifications from "expo-notifications";
import { signOut } from "../firebase";
import {
  createUser,
  getUserDetails,
  updateUserName,
  updateNotificationToken,
} from "../models";
import { registerForPushNotificationsAsync } from "../utils";

// hide warning "Setting a timer for a long period of time, i.e. multiple minutes"
// https://stackoverflow.com/a/64832663
LogBox.ignoreLogs(["Setting a timer"]);

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

function UpdateButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View style={[styles.button, pressed && { opacity: 0.65 }]}>
          <Text style={styles.btnText}>UPDATE</Text>
        </View>
      )}
    </Pressable>
  );
}

// to handle notifications when is open(foreground)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function HomeScreen() {
  const [displayName, setDisplayName] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const { landscape = false } = useDeviceOrientation();

  useEffect(() => {
    fetchUserDetails();
    submitPushNotificationToken();
  }, []);

  const fetchUserDetails = async () => {
    const profileResponse = await getUserDetails();
    // if user is not created in the backend
    if (
      profileResponse.status === 404 ||
      profileResponse.errorCode === "not-found"
    ) {
      await createUser();
    }
    setUserInfo(profileResponse.data);
  };

  const submitPushNotificationToken = async () => {
    const token = await registerForPushNotificationsAsync();
    await updateNotificationToken(token);
  };

  const validateDisplayName = () => {
    return displayName.length > 3;
  };

  const updateProfile = async () => {
    const isValidDisplayName = validateDisplayName();
    if (isValidDisplayName) {
      await updateUserName(displayName);
      await fetchUserDetails();
    } else {
      console.log("Please enter a valid display name");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.log("Error while signing out", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[{ height: landscape ? "100%" : "30%" }, styles.card]} />
      {userInfo.userName ? (
        <Text>Hello {userInfo.userName}</Text>
      ) : (
        <View style={{ padding: 16 }}>
          <TextInput
            defaultValue={displayName}
            onChangeText={setDisplayName}
            style={styles.input}
          />
          <UpdateButton onPress={updateProfile} />
        </View>
      )}
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
  card: {
    backgroundColor: "grey",
    width: "100%",
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    paddingVertical: 12,
    marginBottom: 16,
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
