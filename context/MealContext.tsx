"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";
import { API_URL } from "../config";

// Meal interface
export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
}

// Nutrition goals interface
interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Context type
interface MealContextType {
  meals: Meal[];
  isLoading: boolean;
  error: string | null;
  nutritionGoals: NutritionGoals;
  fetchMeals: (date?: Date) => Promise<void>;
  addMeal: (meal: Meal) => Promise<void>;
  updateMeal: (id: string, updatedMeal: Partial<Meal>) => Promise<void>;
  deleteMeal: (id: string) => Promise<void>;
  updateNutritionGoals: (goals: NutritionGoals) => Promise<void>;
  calculateDailyTotals: () => NutritionGoals;
}

// Creating context with an initial default value
const defaultMealContext: MealContextType = {
  meals: [],
  isLoading: false,
  error: null,
  nutritionGoals: { calories: 0, protein: 0, carbs: 0, fat: 0 }, // Provide default values
  fetchMeals: async () => Promise.resolve(),
  addMeal: async () => Promise.resolve(),
  updateMeal: async () => Promise.resolve(),
  deleteMeal: async () => Promise.resolve(),
  updateNutritionGoals: async () => Promise.resolve(),
  calculateDailyTotals: () => ({ calories: 0, protein: 0, carbs: 0, fat: 0 }),
};


export const MealContext = createContext<MealContextType>(defaultMealContext);

// Props type for provider component
interface MealProviderProps {
  children: ReactNode;
}

export const MealProvider: React.FC<MealProviderProps> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals>({
    calories: 2000,
    protein: 100,
    carbs: 250,
    fat: 70,
  });

  const authContext = useContext(AuthContext);
  const userToken = authContext?.userToken;

  // Fetch meals from API
  const fetchMeals = async (date: Date = new Date()) => {
    if (!userToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await fetch(`${API_URL}/meals?date=${formattedDate}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch meals");
      }

      setMeals(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while fetching meals");
      console.error("Fetch meals error:", error);

      // Fallback to local storage
      try {
        const storedMeals = await AsyncStorage.getItem("meals");
        if (storedMeals) {
          setMeals(JSON.parse(storedMeals));
        }
      } catch (e) {
        console.error("Failed to load meals from storage", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new meal
  const addMeal = async (meal: Meal) => {
    setIsLoading(true);
    setError(null);
   console.log(meal)
    try {
      const response = await fetch(`${API_URL}/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(meal),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add meal");
      }

      setMeals([...meals, data]);

      // Update local storage
      await AsyncStorage.setItem("meals", JSON.stringify([...meals, data]));
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while adding a meal");
      console.error("Add meal error:", error);

      // Add meal locally if API fails
      const newMeal = { ...meal, id: Date.now().toString() };
      setMeals([...meals, newMeal]);
      await AsyncStorage.setItem("meals", JSON.stringify([...meals, newMeal]));
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing meal
  const updateMeal = async (id: string, updatedMeal: Partial<Meal>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/meals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(updatedMeal),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update meal");
      }

      setMeals(meals.map((meal) => (meal.id === id ? data : meal)));

      // Update local storage
      await AsyncStorage.setItem("meals", JSON.stringify(meals.map((meal) => (meal.id === id ? data : meal))));
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while updating the meal");
      console.error("Update meal error:", error);

      // Update meal locally if API fails
      setMeals(meals.map((meal) => (meal.id === id ? { ...meal, ...updatedMeal } : meal)));
      await AsyncStorage.setItem("meals", JSON.stringify(meals.map((meal) => (meal.id === id ? { ...meal, ...updatedMeal } : meal))));
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a meal
  const deleteMeal = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/meals/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete meal");
      }

      setMeals(meals.filter((meal) => meal.id !== id));

      // Update local storage
      await AsyncStorage.setItem("meals", JSON.stringify(meals.filter((meal) => meal.id !== id)));
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while deleting the meal");
      console.error("Delete meal error:", error);

      // Delete meal locally if API fails
      setMeals(meals.filter((meal) => meal.id !== id));
      await AsyncStorage.setItem("meals", JSON.stringify(meals.filter((meal) => meal.id !== id)));
    } finally {
      setIsLoading(false);
    }
  };

  // Update nutrition goals
  const updateNutritionGoals = async (goals: NutritionGoals) => {
    setNutritionGoals(goals);
    await AsyncStorage.setItem("nutritionGoals", JSON.stringify(goals));
  };

  // Calculate daily nutrition totals
  const calculateDailyTotals = (): NutritionGoals => {
    return meals.reduce(
      (totals, meal) => ({
        calories: totals.calories + (meal.calories || 0),
        protein: totals.protein + (meal.protein || 0),
        carbs: totals.carbs + (meal.carbs || 0),
        fat: totals.fat + (meal.fat || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  useEffect(() => {
    const loadNutritionGoals = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem("nutritionGoals");
        if (storedGoals) setNutritionGoals(JSON.parse(storedGoals));
      } catch (e) {
        console.error("Failed to load nutrition goals", e);
      }
    };

    loadNutritionGoals();
  }, []);

  useEffect(() => {
    if (userToken) fetchMeals();
  }, [userToken]);

  return (
    <MealContext.Provider value={{ meals, isLoading, error, nutritionGoals, fetchMeals, addMeal, updateMeal, deleteMeal, updateNutritionGoals, calculateDailyTotals }}>
      {children}
    </MealContext.Provider>
  );
};
