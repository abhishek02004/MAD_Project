import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define Meal Type
interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
}

// Define Props Type
interface MealListProps {
  meals: Meal[];
  onMealPress: (meal: Meal) => void;
  category: string;
}

const MealList: React.FC<MealListProps> = ({ meals, onMealPress }) => {
  if (meals.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}></Text>
      </View>
    );
  }

  // Render meal item
  const renderMealItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity style={styles.mealItem} onPress={() => onMealPress(item)}>
      <View style={styles.mealInfo}>
        <Text style={styles.mealName}>{item.name}</Text>
        <Text style={styles.mealCalories}>{item.calories} kcal</Text>
      </View>
      <View style={styles.macros}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{item.protein}g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{item.carbs}g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{item.fat}g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return <FlatList data={meals} renderItem={renderMealItem} keyExtractor={(item) => item.id} scrollEnabled={false} />;
};

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
  },
  mealItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  mealCalories: {
    fontSize: 14,
    color: "#4CAF50",
  },
  macros: {
    flexDirection: "row",
    marginRight: 10,
  },
  macroItem: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  macroLabel: {
    fontSize: 12,
    color: "#666",
  },
});

export default MealList;
