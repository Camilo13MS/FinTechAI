import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "portal-telefonia",
  slug: "portal-telefonia",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "portaltelefonia",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

  ios: {
    supportsTablet: true,
  },

  android: {
    adaptiveIcon: {
      backgroundColor: "#0D9488",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.nikx0.portaltelefonia",
    googleServicesFile: "./google-services.json",
  },

  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },

  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 220,
        resizeMode: "contain",
        backgroundColor: "#0D9488",
        dark: {
          backgroundColor: "#0F172A",
        },
      },
    ],
    "expo-font",
    "expo-image",
    "expo-status-bar",
    "expo-web-browser",
  ],

  experiments: {
    typedRoutes: true,
  },

  extra: {
    router: {},
    eas: {
      projectId: "35277999-5169-4116-a104-4eb20798b29c",
    },

    firebase: {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    },
    geminiApiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  },
});
