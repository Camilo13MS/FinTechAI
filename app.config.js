import 'dotenv/config';

export default ({ config }) => ({
    ...config,
    name: "portal-telefonia",
    slug: "portal-telefonia",

    android: {
      package: "com.nikx0.portaltelefonia",
      googleServicesFile: "./google-services.json",
    },

    extra: {
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
