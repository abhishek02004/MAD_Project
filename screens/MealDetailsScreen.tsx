"use client";

import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MealContext } from "../context/MealContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Define Meal type
interface Meal {
  id: string;
  name: string;
  category: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description?: string;
}

// Define navigation props
type RootStackParamList = {
  MealDetails: { meal: Meal };
  AddMeal: { meal?: Meal };
};

type Props = NativeStackScreenProps<RootStackParamList, "MealDetails">;

const MealDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { meal } = route.params;
  const { deleteMeal, isLoading } = useContext(MealContext);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle delete meal
  const handleDeleteMeal = () => {
    Alert.alert("Delete Meal", "Are you sure you want to delete this meal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteMeal(meal.id)
            .then(() => {
              navigation.goBack();
            })
            .catch((error: Error) => {
              Alert.alert("Error", error.message || "Failed to delete meal");
            });
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.category}>{meal.category}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("AddMeal", { meal })}>
              <Ionicons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteMeal} disabled={isLoading}>
              <Ionicons name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.date}>{formatDate(meal.date)}</Text>
        </View>

        <View style={styles.nutritionContainer}>
          <Text style={styles.sectionTitle}>Nutrition Information</Text>

          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{meal.calories}</Text>
              <Text style={styles.nutritionLabel}>Calories</Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{meal.protein}g</Text>
              <Text style={styles.nutritionLabel}>Protein</Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{meal.carbs}g</Text>
              <Text style={styles.nutritionLabel}>Carbs</Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{meal.fat}g</Text>
              <Text style={styles.nutritionLabel}>Fat</Text>
            </View>
          </View>
        </View>

        {meal.description ? (
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{meal.description}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  mealName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  category: {
    fontSize: 16,
    color: "#4CAF50",
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#2196F3",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  nutritionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  nutritionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  nutritionItem: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  nutritionLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  descriptionContainer: {
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});

export default MealDetailsScreen;
