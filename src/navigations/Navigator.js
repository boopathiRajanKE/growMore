import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, RegisterScreen } from "../screens";

const Stack = createStackNavigator();

function AppNavigatior({ screen }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigatior;
export { AppNavigatior };
