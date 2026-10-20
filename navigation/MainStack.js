import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTab from "./MainTab";
import ParcelDetailsScreen from "../screens/ParcelDetailsScreen";
import LoginScreen from "../screens/LoginScreen";
const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator //initialRouteName="LoginScreen"
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTab}
        options={{ headerShown: false }}
      />
  
    </Stack.Navigator>
  );
}
