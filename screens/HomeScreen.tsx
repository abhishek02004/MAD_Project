"use client"

import { useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { MealContext, Meal as MealType } from "../context/MealContext"
import { AuthContext } from "../context/AuthContext"
import NutritionSummary from "../components/NutritionSummary"
import MealList from "../components/MealList"
import { NavigationProp } from "@react-navigation/native"

// import NavigateToDailyGoalsButton from "@/navigator/SetGoalNavigator"

interface HomeScreenProps {
  navigation: NavigationProp<any>
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const authContext = useContext(AuthContext);

if (!authContext) {
  throw new Error("AuthContext must be used within an AuthProvider");
}

  const { userInfo } = authContext


  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const { meals, isLoading, error, fetchMeals, calculateDailyTotals, nutritionGoals } = useContext(MealContext);

if (!meals) {
  throw new Error("Meals data is undefined.");
}

// Fix the filtering logic
// Ensure the Meal interface matches the imported Meal type
type Meal = MealType;

const mealsByCategory: Record<string, Meal[]> = {
  Breakfast: meals.filter((meal) => meal.category === "Breakfast"),
  Lunch: meals.filter((meal) => meal.category === "Lunch"),
  Dinner: meals.filter((meal) => meal.category === "Dinner"),
  Snacks: meals.filter((meal) => meal.category === "Snacks"),
};

  const dailyTotals = calculateDailyTotals()

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchMeals(selectedDate)
    setRefreshing(false)
  }

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() + days)
    setSelectedDate(newDate)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  useEffect(() => {
    fetchMeals(selectedDate)
  }, [selectedDate])

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {userInfo?.name || "Abhishek Patil"}</Text>
        <Text style={styles.subtitle}>Track your nutrition today</Text>
      </View> */}

      <View style={styles.dateSelector}>
        <TouchableOpacity onPress={() => changeDate(-1)}>
          <Ionicons name="chevron-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        <TouchableOpacity onPress={() => changeDate(1)}>
          <Ionicons name="chevron-forward" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {isLoading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} />}
        >
          <NutritionSummary dailyTotals={dailyTotals} nutritionGoals={nutritionGoals} />
 {/* <View>
  <NavigateToDailyGoalsButton />
</View> */}
          {Object.entries(mealsByCategory).map(([category, categoryMeals]) => (
            <View key={category} style={styles.categorySection}>
              <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddMeal", { category })}
                style={styles.addButton}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
              </View>
              <MealList
              meals={categoryMeals}
              category={category}
              onMealPress={(meal) =>
                navigation.navigate("MealDetails", { meal })
              }
              />
            </View>
          ))}
        </ScrollView>
      )}

      {/* <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("AddMeal")}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // Root container
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  // Header Section
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: "#212121",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#757575",
    marginTop: 6,
  },

  // Date Selector Row
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#424242",
  },

  // Scroll Container
  scrollView: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  // Loader & Error
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: "#388E3C",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 6,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  // Category Section
  categorySection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#FAFAFA",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212121",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  // Floating Action Button
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#4CAF50",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
});
export const screenOptions = {
  headerShown: false,
};

export default HomeScreen