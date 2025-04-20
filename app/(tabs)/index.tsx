import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthProvider } from "../../context/AuthContext";
import LoginScreen from "../../screens/login"
import RegisterScreen from "../../screens/RegisterScreen";
import HomeScreen from "@/screens/HomeScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import MealDetailsScreen from "@/screens/MealDetailsScreen";
import AddMealScreen from "@/screens/AddMealScreen";
import ProgressScreen from "@/screens/ProgressScreen";
import AppNavigator from "@/navigator/AppNavigator";
// import { useThemeContext, ThemeProvider } from "@/context/ThemeContext";
import DailyGoals from "@/components/DailyGoals";
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
        <Stack.Navigator   screenOptions={{
     headerShown: false,
     animation: 'slide_from_right', // ✅ smooth transition
  }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          {/* <Stack.Screen name="MealDetail" component={MealDetailsScreen} /> */}
          <Stack.Screen 
            name="AddMeal" 
            component={(props: NativeStackScreenProps<any>) => <AddMealScreen {...props} />} 
          />
          <Stack.Screen name="Progress" component={ProgressScreen} />
         <Stack.Screen name="MainTabs" component={AppNavigator} />
          <Stack.Screen name="DailyGoals" component={DailyGoals} />
        </Stack.Navigator>

    </AuthProvider>
  );
}
export const screenOptions = {
  headerShown: false,
};

export default App;
