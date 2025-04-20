export  type  RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
  Progress: undefined;
  MainTabs: undefined;
  AddMeal: { category?: string };
  DailyGoals: undefined;
};