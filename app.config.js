export default {
  expo: {
    name: 'Book E-Store',
    slug: 'c92-book-e-store-v1',
    version: '1.0.38',
    runtimeVersion: '1.0.38',
    orientation: 'portrait',
    icon: './src/assets/images/e-book-logo.png',
    scheme: 'c92bookestorev1',
    userInterfaceStyle: 'automatic',
    jsEngine: 'hermes',
    splash: {
      image: './src/assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.dragonc92team.BookEStoreV1',
      buildNumber: '3',
      googleServicesFile: './GoogleService-Info.plist',
      usesAppleSignIn: true,
      infoPlist: {
        UIBackgroundModes: ['remote-notification'],
        UNUserNotificationCenter: true,
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
        },
        NSLocationWhenInUseUsageDescription:
          'This app uses your location to provide relevant content.',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/images/e-book-logo.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.dragonc92team.BookEStoreV1',
      versionCode: 88,
      googleServicesFile: './google-services.json',
      permissions: ['ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'],
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './src/assets/images/e-book-logo.png',
    },
    plugins: [
      'expo-apple-authentication',
      [
        'onesignal-expo-plugin',
        {
          mode: 'production',
        },
      ],
      'expo-router',
      ['@react-native-google-signin/google-signin'],
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
          android: {
            compileSdkVersion: 36,
            targetSdkVersion: 36,
            buildToolsVersion: '36.0.0',
          },
        },
      ],
      [
        'react-native-fbsdk-next',
        {
          appID: '2840342749458298',
          displayName: 'E-Store',
        },
      ],
      'expo-font',
      'expo-web-browser',
      './plugins/withNonModularHeaders',
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'aaff14e3-7daa-4336-9788-1145c8bd95fe',
      },
      oneSignalAppId: 'dc2647d3-ec46-4ea2-ab0d-c6528b0ea567',
    },
    updates: {
      url: 'https://u.expo.dev/aaff14e3-7daa-4336-9788-1145c8bd95fe',
    },
  },
};
