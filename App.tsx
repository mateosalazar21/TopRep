import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./src/presentation/navigation/MainStackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator/>
    </NavigationContainer>
  );
}


