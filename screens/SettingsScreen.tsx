import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons, Feather, Entypo } from "@expo/vector-icons";

const SettingsScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [useFingerprint, setUseFingerprint] = useState(false);

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", onPress: () => console.log("Logged out") },
    ]);
  };

  const renderToggle = (value: boolean, setValue: (val: boolean) => void) => (
    <Switch
      value={value}
      onValueChange={setValue}
      trackColor={{ false: "#ccc", true: "#4CAF50" }}
      thumbColor={value ? "#4CAF50" : "#f4f3f4"}
    />
  );

  const Section = ({ title }: { title: string }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const SettingRow = ({
    icon,
    label,
    onPress,
    rightElement,
  }: {
    icon: React.ReactNode;
    label: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <Pressable style={styles.settingRow} onPress={onPress}>
      <View style={styles.rowLeft}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
      <View>{rightElement || <Ionicons name="chevron-forward" size={20} color="#888" />}</View>
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      {/* User Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={require('../assets/images/profile1.png')}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Abhishek Patil</Text>
          <Text style={styles.profileEmail}>abhishek@gmail.com</Text>
        </View>
      </View>

      {/* General Settings */}
      <Section title="General" />
      <SettingRow
        icon={<Ionicons name="notifications-outline" size={20} color="#4CAF50" />}
        label="Notifications"
        rightElement={renderToggle(notificationsEnabled, setNotificationsEnabled)}
      />
      
      {/* Account Settings */}
      <Section title="Account" />
      <SettingRow
        icon={<Feather name="lock" size={20} color="#4CAF50" />}
        label="Change Password"
        onPress={() => console.log("Change Password")}
      />
      <SettingRow
        icon={<Feather name="shield" size={20} color="#4CAF50" />}
        label="Privacy Settings"
        onPress={() => console.log("Privacy Settings")}
      />

      {/* App Settings */}
      <Section title="App Settings" />
      <SettingRow
        icon={<Ionicons name="language" size={20} color="#4CAF50" />}
        label="Language"
        onPress={() => console.log("Language")}
      />
      <SettingRow
        icon={<Feather name="message-square" size={20} color="#4CAF50" />}
        label="Send Feedback"
        onPress={() => console.log("Send Feedback")}
      />
      <SettingRow
        icon={<Ionicons name="information-circle-outline" size={20} color="#4CAF50" />}
        label="About"
        onPress={() => console.log("About App")}
      />

      {/* Support */}
      <Section title="Support" />
      <SettingRow
        icon={<Feather name="file-text" size={20} color="#4CAF50" />}
        label="Terms & Conditions"
        onPress={() => console.log("Terms")}
      />

      {/* Logout */}
      <Section title=" " />
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Entypo name="log-out" size={20} color="#fff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      {/* Footer */}
      <Text style={styles.version}>App Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafa",
    paddingHorizontal: 20,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  profileEmail: {
    fontSize: 14,
    color: "#888",
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  settingRow: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#f44336",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  version: {
    marginTop: 30,
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginBottom: 50,
  },
});

export default SettingsScreen;
