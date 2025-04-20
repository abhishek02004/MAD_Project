import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SetDailyGoal = () => {
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const validateAndSave = () => {
    if (![calories, protein, carbs, fat].every(val => val && !isNaN(Number(val)))) {
      Alert.alert("Invalid Input", "Please enter valid numbers for all fields.");
      return;
    }

    Alert.alert("Goals Saved", `Calories: ${calories} kcal\nProtein: ${protein}g\nCarbs: ${carbs}g\nFat: ${fat}g`);
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
  };

  const renderInput = (label: string, value: string, setter: (val: string) => void, unit: string) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value}
          onChangeText={setter}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor="#aaa"
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Set Your Daily Nutrition Goals</Text>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/9341/9341453.png" }}
          style={styles.iconImage}
        />
        {renderInput("Calories", calories, setCalories, "kcal")}
        {renderInput("Protein", protein, setProtein, "g")}
        {renderInput("Carbs", carbs, setCarbs, "g")}
        {renderInput("Fat", fat, setFat, "g")}

        <TouchableOpacity style={styles.saveButton} onPress={validateAndSave}>
          <Ionicons name="checkmark-circle" size={24} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Tips for Setting Goals</Text>
          <Text style={styles.tipText}>✔️ Consult with a dietitian if unsure about your needs.</Text>
          <Text style={styles.tipText}>✔️ Balance macros based on your activity level.</Text>
          <Text style={styles.tipText}>✔️ Update your goals regularly.</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  iconImage: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 6,
    color: "#444",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#000",
  },
  unit: {
    marginLeft: 8,
    color: "#666",
    fontSize: 15,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#219EBC",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  tipBox: {
    marginTop: 30,
    backgroundColor: "#e0f7fa",
    padding: 16,
    borderRadius: 12,
    width: "100%",
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#007B83",
  },
  tipText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
});

export default SetDailyGoal;
