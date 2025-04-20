"use client";

import { useContext, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  Alert, 
  SafeAreaView,
  ImageBackground,
  ImageSourcePropType,
  ViewStyle,
  TextStyle
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { MealContext } from "../context/MealContext";
import { LinearGradient } from "expo-linear-gradient";
import { red } from "react-native-reanimated/lib/typescript/Colors";

// Type definitions
type NutritionGoals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type AuthContextType = {
  logout: () => void;
  userInfo?: {
    name?: string;
    email?: string;
  };
};

type MealContextType = {
  nutritionGoals: NutritionGoals;
  updateNutritionGoals: (goals: NutritionGoals) => void;
};

type GoalsState = {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
};

const ProfileScreen = () => {
  const authContext = useContext(AuthContext) as AuthContextType;
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { logout, userInfo } = authContext;
  const { nutritionGoals, updateNutritionGoals } = useContext(MealContext) as MealContextType;

  const [isEditing, setIsEditing] = useState(false);
  const [goals, setGoals] = useState<GoalsState>({
    calories: nutritionGoals.calories.toString(),
    protein: nutritionGoals.protein.toString(),
    carbs: nutritionGoals.carbs.toString(),
    fat: nutritionGoals.fat.toString(),
  });

  const handleSaveGoals = (): void => {
    const updatedGoals: NutritionGoals = {
      calories: Number.parseFloat(goals.calories) || 2000,
      protein: Number.parseFloat(goals.protein) || 100,
      carbs: Number.parseFloat(goals.carbs) || 250,
      fat: Number.parseFloat(goals.fat) || 70,
    };
    updateNutritionGoals(updatedGoals);
    setIsEditing(false);
    Alert.alert("Success", "Nutrition goals updated successfully");
  };

  const handleLogout = (): void => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => logout() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground
        source={require('../assets/images/profile-bg.jpg') as ImageSourcePropType}
        style={styles.headerBackground}
        blurRadius={10}
      > */}
        <LinearGradient
colors={['rgba(50, 0, 80, 0.8)', 'transparent']}

          style={styles.gradient}
        >
          <View style={styles.profileSection}>
            <View style={styles.profileIconContainer}>
              <LinearGradient
                colors={['#7F00FF', '#E100FF']}
                style={styles.profileIcon}
              >
                <Text style={styles.profileInitial}>
                  {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : "A"}
                </Text>
              </LinearGradient>
              <TouchableOpacity style={styles.cameraButton}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>{userInfo?.name || "Abhishek Patil"}</Text>
            <View style={styles.profileInfoContainer}>
              <Ionicons name="mail" size={16} color="rgb(0 0 0 0.9)" />
              <Text style={styles.profileEmail}>{userInfo?.email || "abhishekpatil04@gmail.com"}</Text>
            </View>
          </View>
        </LinearGradient>
      {/* </ImageBackground> */}

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleContainer}>
                <Ionicons name="nutrition" size={20} color="#7F00FF" />
                <Text style={styles.cardTitle}>Nutrition Goals</Text>
              </View>
              {!isEditing ? (
                <TouchableOpacity 
                  style={styles.editButton} 
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.editButtonsContainer}>
                  <TouchableOpacity 
                    style={[styles.editButton, styles.cancelButton]} 
                    onPress={() => setIsEditing(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.editButton, styles.saveButton]} 
                    onPress={handleSaveGoals}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {!isEditing ? (
              <View style={styles.goalsContainer}>
                {Object.entries(nutritionGoals).map(([key, value]) => (
                  <View style={styles.goalItem} key={key}>
                    <View style={styles.goalLabelContainer}>
                      <Ionicons 
                        name={key === 'calories' ? 'flame' : key === 'protein' ? 'barbell' : key === 'carbs' ? 'fast-food' : 'water'}
                        size={18} 
                        color="#7F00FF" 
                      />
                      <Text style={styles.goalLabel}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Text>
                    </View>
                    <Text style={styles.goalValue}>
                      {value} {key === 'calories' ? 'kcal' : 'g'}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.editGoalsContainer}>
                {Object.keys(goals).map((key) => (
                  <View style={styles.inputRow} key={key}>
                    <Text style={styles.inputLabel}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} 
                      <Text style={styles.unitLabel}>
                        ({key === 'calories' ? 'kcal' : 'g'})
                      </Text>
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={goals[key as keyof GoalsState]}
                      onChangeText={(text) => setGoals(prev => ({
                        ...prev,
                        [key]: text
                      }))}
                      keyboardType="numeric"
                      placeholder={`Current: ${nutritionGoals[key as keyof NutritionGoals]}`}
                      placeholderTextColor="#888"
                    />
                  </View>
                ))}
              </View>
            )}
          </View>
{/* 
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
          >
            <Ionicons name="log-out" size={20} color="#fff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Type definitions for styles
interface Styles {
  container: ViewStyle;
  headerBackground: ViewStyle;
  gradient: ViewStyle;
  profileSection: ViewStyle;
  profileIconContainer: ViewStyle;
  profileIcon: ViewStyle;
  profileInitial: TextStyle;
  cameraButton: ViewStyle;
  profileName: TextStyle;
  profileInfoContainer: ViewStyle;
  profileEmail: TextStyle;
  contentContainer: ViewStyle;
  card: ViewStyle;
  cardHeader: ViewStyle;
  cardTitleContainer: ViewStyle;
  cardTitle: TextStyle;
  editButton: ViewStyle;
  saveButton: ViewStyle;
  cancelButton: ViewStyle;
  editButtonsContainer: ViewStyle;
  buttonText: TextStyle;
  goalsContainer: ViewStyle;
  goalItem: ViewStyle;
  goalLabelContainer: ViewStyle;
  goalLabel: TextStyle;
  goalValue: TextStyle;
  editGoalsContainer: ViewStyle;
  inputRow: ViewStyle;
  inputLabel: TextStyle;
  unitLabel: TextStyle;
  input: ViewStyle & TextStyle;
  logoutButton: ViewStyle;
  logoutButtonText: TextStyle;
  scrollView: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerBackground: {
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileIconContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  profileInitial: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#7F00FF',
    borderRadius: 15,
    padding: 5,
    elevation: 3,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'rgb(48 1 60)',
    marginBottom: 8,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileEmail: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.9)",
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#7F00FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2d2d2d",
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgb(106 42 196)",
    gap: 5,
  },
  saveButton: {
    backgroundColor: "#7F00FF",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  editButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: '500',
  },
  goalsContainer: {
    gap: 12,
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  goalLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  goalLabel: {
    fontSize: 16,
    color: "#666",
  },
  goalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7F00FF",
  },
  editGoalsContainer: {
    gap: 15,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  inputLabel: {
    fontSize: 16,
    color: "#444",
    fontWeight: '500',
  },
  unitLabel: {
    fontSize: 12,
    color: "#888",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    width: 120,
    textAlign: 'center',
    fontWeight: '500',
    color: '#2d2d2d',
  } as ViewStyle & TextStyle,
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#ff4444',
    elevation: 3,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: '600',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
});

export default ProfileScreen;