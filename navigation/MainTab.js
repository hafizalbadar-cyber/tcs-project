import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "../screens/DashboardScreen";
import BookParcelScreen from "../screens/BookParcelScreen";
import TrackParcelScreen from "../screens/TrackParcelScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ParcelDetailsScreen from "../screens/ParcelDetailsScreen";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home-outline";

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } 
          else if (route.name === "Book Parcel") {
            iconName = focused ? "create" : "create-outline";
          } 
          else if (route.name === "Track Parcel") {
            iconName = focused ? "search" : "search-outline";
          } 
          else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } 
          else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } 
          else if (route.name === "ParcelDetails") {
            iconName = focused ? "document-text" : "document-text-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#E30613",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {/* MAIN TABS */}
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Book Parcel" component={BookParcelScreen} />
      <Tab.Screen name="Track Parcel" component={TrackParcelScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

      {/* DETAILS TAB (VISIBLE NOW) */}
      <Tab.Screen
        name="ParcelDetails"
        component={ParcelDetailsScreen}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
}