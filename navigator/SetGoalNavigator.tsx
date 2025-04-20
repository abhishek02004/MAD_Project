import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  DailyGoals: undefined;
};

const NavigateToDailyGoalsButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DailyGoals")}
      >
        <Text style={styles.buttonText}>Set Daily Goals</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
    alignItems: "center",
  },
  button: {
    backgroundColor: "rgb(33, 158, 188)",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    elevation: 6,
    marginBottom: 45
  },
  buttonText: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default NavigateToDailyGoalsButton;