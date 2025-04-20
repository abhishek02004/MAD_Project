"use client";

import { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MealContext } from "../context/MealContext";
import { ProgressChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const ProgressScreen: React.FC = () => {
  const { calculateDailyTotals, nutritionGoals } = useContext(MealContext);
  const [activeTab, setActiveTab] = useState<string>("daily");

  const dailyTotals = calculateDailyTotals();

  const progressData = {
    calories: Math.min(dailyTotals.calories / nutritionGoals.calories, 1),
    protein: Math.min(dailyTotals.protein / nutritionGoals.protein, 1),
    carbs: Math.min(dailyTotals.carbs / nutritionGoals.carbs, 1),
    fat: Math.min(dailyTotals.fat / nutritionGoals.fat, 1),
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const data = {
    labels: ["Calories", "Protein", "Carbs", "Fat"],
    data: [
      progressData.calories,
      progressData.protein,
      progressData.carbs,
      progressData.fat,
    ],
  };

  const actualPercentages = {
    calories: (dailyTotals.calories / nutritionGoals.calories) * 100,
    protein: (dailyTotals.protein / nutritionGoals.protein) * 100,
    carbs: (dailyTotals.carbs / nutritionGoals.carbs) * 100,
    fat: (dailyTotals.fat / nutritionGoals.fat) * 100,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition Progress</Text>
      </View>

      <View style={styles.tabContainer}>
        {['daily', 'weekly', 'monthly'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.chartContainer}>
          <ProgressChart
            data={data}
            width={screenWidth - 40}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ProgressScreen;
