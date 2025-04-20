// A centralized theme file to maintain consistent styling across the app

// Color palette
export const colors = {
  // Primary colors
  primary: "#4CAF50",
  primaryLight: "#81C784",
  primaryDark: "#388E3C", 
  primaryGradient: ["#66BB6A", "#43A047"],
  
  // Secondary colors
  secondary: "#03A9F4",
  secondaryLight: "#4FC3F7",
  secondaryDark: "#0288D1",
  
  // Accent colors
  accent: "#FF9800",
  accentLight: "#FFCC80",
  
  // Background colors
  background: "#FAFAFA",
  card: "#FFFFFF",
  cardAlt: "#F5F9F6",
  
  // Text colors
  text: {
    primary: "#212121",
    secondary: "#757575",
    disabled: "#9E9E9E",
    hint: "#BDBDBD",
    light: "#FFFFFF",
  },
  
  // Border colors
  border: "#E0E0E0",
  borderLight: "#EEEEEE",
  
  // Status colors
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#F44336",
  info: "#2196F3",
  
  // Gradients (for use with LinearGradient)
  gradients: {
    primary: ["#66BB6A", "#43A047"],
    header: ["#43A047", "#2E7D32"],
    card: ["#FFFFFF", "#F9FBF9"],
    nutritionSummary: ["#F5F9F6", "#E8F5E9"],
  }
};

// Typography styles
export const typography = {
  largeTitle: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 0.25,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 0.15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.15,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.5,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.75,
    textTransform: "uppercase",
  },
  caption: {
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.4,
  },
  small: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.4,
  }
};

// Spacing values for consistent margins and paddings
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Shadow styles for different elevation levels
export const shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 3,
    elevation: 3,
  },
  large: {
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  extraLarge: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 8,
  }
};

// Border radius values
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999, // For fully rounded elements
};

// Animation timing
export const animation = {
  fast: 200,
  normal: 300,
  slow: 500,
};

// Layout constants
export const layout = {
  screenPadding: spacing.md,
  headerHeight: 60,
};

export default {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  animation,
  layout,
};
