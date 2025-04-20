import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../app/types"; // Adjust the path to your navigation types
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  isLoading: boolean;
  userToken: string | null;
  userInfo: User | null;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL + 'users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUserInfo(data.user);
      setUserToken(data.token);

      await AsyncStorage.setItem("userInfo", JSON.stringify(data.user));
      await AsyncStorage.setItem("userToken", data.token);
      return true
    } catch (error: any) {
      setError(error.message || "An error occurred during login");
      console.log("Login error:", error);
      return false
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setUserInfo(data.user);
      setUserToken(data.token);

      await AsyncStorage.setItem("userInfo", JSON.stringify(data.user));
      await AsyncStorage.setItem("userToken", data.token);
    } catch (error: any) {
      setError(error.message || "An error occurred during registration");
      console.log("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);

    await AsyncStorage.removeItem("userInfo");
    await AsyncStorage.removeItem("userToken");

    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      const userToken = await AsyncStorage.getItem("userToken");

      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
        setUserToken(userToken);
      }
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
