import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionSummaryProps {
  dailyTotals: NutritionData;
  nutritionGoals: NutritionData;
}

const windowWidth = Dimensions.get("window").width;

const foodSliderData = [
  {
    title: "Fresh Veggie Bowl",
    description: "A mix of fiber-rich vegetables, ideal for gut health and immunity.",
    image: require('../assets/images/veggies.jpg'),
  },
  {
    title: "Grilled Chicken Salad",
    description: "High-protein meal with lean meat and mixed greens for balanced nutrition.",
    image: require('../assets/images/chickenSalad.jpg'),
  },
  {
    title: "Fruit Smoothie Bowl",
    description: "Colorful fruits with antioxidants and natural sugars for quick energy.",
    image: require("../assets/images/smoothie.jpg"),
  },
  {
    title: "Oats & Berries",
    description: "Whole grains and berries make a perfect breakfast packed with fiber.",
    image: require('../assets/images/oats-Berries.jpg'),
  },
];

const NutritionSummary: React.FC<NutritionSummaryProps> = ({ dailyTotals, nutritionGoals }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % foodSliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const percentages = {
    calories: (dailyTotals.calories / nutritionGoals.calories) * 100 || 0,
    protein: (dailyTotals.protein / nutritionGoals.protein) * 100 || 0,
    carbs: (dailyTotals.carbs / nutritionGoals.carbs) * 100 || 0,
    fat: (dailyTotals.fat / nutritionGoals.fat) * 100 || 0,
  };

  const getColor = (nutrient: keyof NutritionData) => {
    switch (nutrient) {
      case "calories": return "#EF5350";
      case "protein": return "#42A5F5";
      case "carbs": return "#66BB6A";
      case "fat": return "#FFA726";
      default: return "#90A4AE";
    }
  };

  const renderNutrientCard = (nutrient: keyof NutritionData) => {
    const percentage = Math.min(Math.round(percentages[nutrient]), 100);
    const color = getColor(nutrient);

    return (
      <View key={nutrient} style={[styles.nutrientCard, { borderLeftColor: color }]}> 
        <View style={styles.cardHeader}>
          <Text style={[styles.nutrientTitle, { color }]}>{nutrient.toUpperCase()}</Text>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: color }]} />
        </View>
        <Text style={styles.nutrientValues}>
          <Text style={styles.boldText}>{dailyTotals[nutrient].toFixed(1)}g</Text>
          <Text style={styles.subText}> / {nutritionGoals[nutrient]}g</Text>
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.contentContainer}>
      <View style={styles.sliderWrapper}>
        <Image source={foodSliderData[currentSlide].image } style={styles.sliderImage} />
        <View style={styles.sliderOverlay}>
          <Text style={styles.sliderTitle}>{foodSliderData[currentSlide].title}</Text>
          <Text style={styles.sliderDesc}>{foodSliderData[currentSlide].description}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Nutrient Breakdown</Text>
        <View style={styles.nutrientSection}>
          {renderNutrientCard("calories")}
          {renderNutrientCard("protein")}
          {renderNutrientCard("carbs")}
          {renderNutrientCard("fat")}
        </View>

        <Text style={styles.sectionTitle}>Smart Meal Tips</Text>

        <ScrollView
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  style={styles.tipsScroll}
>

  {[
    {
      title: "Mindful Eating",
      desc: "Eat slowly and savor every bite to avoid overeating and aid digestion.",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600",
    },
    {
      title: "Hydrate First",
      desc: "Drink a glass of water before meals to improve metabolism and reduce hunger.",
      image: "https://plus.unsplash.com/premium_photo-1688938502983-a14020dc14c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2F0ZXIlMjBkcmlua3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Colorful Plates",
      desc: "Include fruits and vegetables of various colors to get a range of nutrients.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    },
    {
      title: "Portion Control",
      desc: "Use smaller plates to control portions and prevent overeating.",
      image: "https://images.unsplash.com/photo-1564636242997-77953084df48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHNtYWxsZXIlMjBwbGF0ZSUyMG1lYWxzfGVufDB8fDB8fHww",
    },
    {
      title: "Balanced Meals",
      desc: "Ensure your meals include protein, healthy fats, and complex carbs.",
      image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFsYW5jZWQlMjBtZWFsfGVufDB8fDB8fHww",
    },
    {
      title: "Avoid Late Night Eating",
      desc: "Finish eating at least 2 hours before bed to help digestion and sleep.",
      image: "https://plus.unsplash.com/premium_photo-1723120606308-698e1b1eb959?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxhdGUlMjBuaWdodCUyMGVhdGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Healthy Snacking",
      desc: "Choose nuts, yogurt, or fruits instead of processed snacks.",
      image: "https://images.unsplash.com/photo-1628624788459-4472cefc61d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEhlYWx0aHklMjBTbmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Read Labels",
      desc: "Always check ingredients and nutrition facts before buying packaged food.",
      image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=600",
    },
    {
      title: "Plan Your Meals",
      desc: "Prepping meals in advance helps maintain healthy eating habits.",
      image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600",
    },
    {
      title: "Chew Properly",
      desc: "Chewing food thoroughly aids digestion and helps you feel full faster.",
      image: "https://media.istockphoto.com/id/1127579847/photo/woman-eating-beef-burger.webp?a=1&b=1&s=612x612&w=0&k=20&c=NBq4F1_DtuL32m2bwGz-_8KoFt4ylScmohbd8dtsTAI=",
    },
  ].map((tip, index) => (
    <View key={index} style={styles.foodCard}>
      <Image source={{ uri: tip.image }} style={styles.foodImage} />
      <Text style={styles.foodTitle}>{tip.title}</Text>
      <Text style={styles.foodDesc}>{tip.desc}</Text>
    </View>
  ))}
</ScrollView>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  contentContainer: {
    paddingBottom: 60,
  },
  sliderWrapper: {
    width: "100%",
    height: 220,
    position: "relative",
  },
  sliderImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  sliderOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sliderTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  sliderDesc: {
    fontSize: 15,
    color: "#ddd",
    marginTop: 4,
  },
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
    marginTop: 16,
  },
  nutrientSection: {
    flexDirection: "column",
    gap: 20,
  },
  nutrientCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  nutrientTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  percentage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  barBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
  nutrientValues: {
    marginTop: 8,
    fontSize: 14,
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    color: "#888",
  },
  tipsScroll: {
    marginBottom: 16,
  },
  foodCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    width: 220,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  foodImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    color: "#333",
  },
  foodDesc: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
  
});

export default NutritionSummary;
