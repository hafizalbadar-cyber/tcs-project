import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ParcelProvider } from "./context/ParcelContext";
import LoginScreen from "./screens/LoginScreen";
import MainStack from "./navigation/MainStack";

function Main() {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <LoginScreen />;
  }

  return <MainStack />;
}

export default function App() {
  
  return (
    <AuthProvider>
      <ParcelProvider>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </ParcelProvider>
    </AuthProvider>
  );
}
