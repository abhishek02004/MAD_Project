"use client"

import { useState, useContext } from "react"
import {
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native"
import { AuthContext , AuthProvider} from "../context/AuthContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../app/types" // Adjusted the path to the correct location
import { screenOptions } from "./HomeScreen"

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">

const LoginScreen = ({ navigation }: { navigation: LoginScreenNavigationProp }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const authContext = useContext(AuthContext);

if (!authContext) {
  throw new Error("AuthContext must be used within an AuthProvider");
}

const { login, isLoading, error } = authContext;

 
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }
  const success = await login(email, password);
   if(success){
    navigation.navigate("Home");
    console.log("LOGGED IN")
    navigation.replace("MainTabs")
    
  } else{
      Alert.alert("Login Failed", "Invalid email or password");
      // Alert.alert("Error", "An unexpected error occurred during login.");
    }
  };
    return (
      <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />
            <Text style={styles.appName}>Nutrition Meter</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Login</Text>}
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

// import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "contain",
  },

  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3F51B5",
    marginTop: 12,
    letterSpacing: 1,
  },

  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 25,
  },

  inputContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    color: "#424242",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#F5F5F5",
    color: "#212121",
  },

  inputFocus: {
    borderColor: "#3F51B5",
    backgroundColor: "#FFFFFF",
  },

  inputError: {
    borderColor: "#FF5252",
  },

  errorText: {
    color: "#FF5252",
    fontSize: 13,
    marginTop: 5,
  },

  loginButton: {
    backgroundColor: "#3F51B5",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#3F51B5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },

  loginButtonDisabled: {
    backgroundColor: "#9FA8DA",
  },

  loginButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  registerText: {
    fontSize: 14,
    color: "#757575",
  },

  registerLink: {
    fontSize: 14,
    color: "#0288D1",
    fontWeight: "bold",
    marginLeft: 5,
  },

  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },

  forgotPasswordText: {
    color: "#0288D1",
    fontSize: 14,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 25,
  },

  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },

  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 14,
    backgroundColor: "#ECEFF1",
    elevation: 2,
  },

  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  socialText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#424242",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  checkboxLabel: {
    fontSize: 14,
    color: "#424242",
    marginLeft: 8,
  },

  successText: {
    color: "#388E3C",
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(250, 250, 250, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },

  screenTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3F51B5",
    marginBottom: 20,
    textAlign: "center",
  },

  responsiveContainer: {
    width: width > 400 ? 380 : "100%",
    alignSelf: "center",
  },

  footerText: {
    fontSize: 12,
    color: "#BDBDBD",
    textAlign: "center",
    marginTop: 30,
  },

  shadowBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
});

// export default styles;

export default LoginScreen
