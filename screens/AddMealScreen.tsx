// "use client";

import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MealContext } from "../context/MealContext";
import { ArrowLeft } from 'lucide-react-native';

interface AddMealScreenProps {
  navigation: any;
  route: { params?: { category?: string } };
}

const AddMealScreen: React.FC<AddMealScreenProps> = ({ navigation, route }) => {
  const initialCategory = route.params?.category || "Breakfast";

  const [name, setName] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [description, setDescription] = useState("");

  const { addMeal, isLoading } = useContext(MealContext);

  const handleAddMeal = () => {
    if (!name) {
      console.log(name)
      Alert.alert("Error", "Please enter a meal name");
      return;
    }

    const newMeal = {
      id: Date.now().toString(),
      name,
      category,
      calories: Number.parseFloat(calories) || 0,
      protein: Number.parseFloat(protein) || 0,
      carbs: Number.parseFloat(carbs) || 0,
      fat: Number.parseFloat(fat) || 0,
      description,
      date: new Date().toISOString(),
    };

    addMeal(newMeal)
      .then(() => {
        Alert.alert("Success", "Meal added successfully", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      })
      .catch((error: any) => {
        Alert.alert("Error", error.message || "Failed to add meal");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: '#f1f1f1',
          borderRadius: 10,
          alignSelf: 'flex-start',
          gap: 8,
        }}
      >
        <ArrowLeft size={20} color="#333" />
        <Text style={{ fontSize: 16, color: '#333' }}>Back</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Meal Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter meal name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Breakfast" value="Breakfast" />
                <Picker.Item label="Lunch" value="Lunch" />
                <Picker.Item label="Dinner" value="Dinner" />
                <Picker.Item label="Snacks" value="Snacks" />
              </Picker>
            </View>
          </View>

          <View style={styles.nutritionContainer}>
            <Text style={styles.sectionTitle}>Nutrition Information</Text>

            <View style={styles.nutritionRow}>
              <View style={styles.nutritionInput}>
                <Text style={styles.label}>Calories</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  value={calories}
                  onChangeText={setCalories}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.nutritionInput}>
                <Text style={styles.label}>Protein (g)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  value={protein}
                  onChangeText={setProtein}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.nutritionRow}>
              <View style={styles.nutritionInput}>
                <Text style={styles.label}>Carbs (g)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  value={carbs}
                  onChangeText={setCarbs}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.nutritionInput}>
                <Text style={styles.label}>Fat (g)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  value={fat}
                  onChangeText={setFat}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter meal description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddMeal}
            disabled={isLoading}
          >
            <Text style={styles.addButtonText}>{isLoading ? "Adding..." : "Add Meal"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  nutritionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nutritionInput: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default AddMealScreen;