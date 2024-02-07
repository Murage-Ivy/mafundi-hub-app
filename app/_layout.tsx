import Colors from '@/constants/Colors';
import { Octicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(modals)/login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'poppins': require('@/assets/fonts/Poppins-Regular.ttf'),
    'poppins-medium': require('@/assets/fonts/Poppins-Medium.ttf'),
    'poppins-bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'poppins-semibold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>);
}

function RootLayoutNav() {

  const { authState } = useAuth()
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleRight = () => {
    router.push('/(modals)/login')
  }
  return (
    <Stack initialRouteName='(modals)/login'
      screenOptions={{
        headerStyle: { ...headerStyles.headerStyle }, headerShown: false
      }}
    >
      {
        authState?.authenicated ? (
          <Stack.Screen name='(modals)/handyman-register'
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name='(modals)/login'
            options={{ headerShown: false, }}
          />

        )
      }
      <Stack.Screen name="(tabs)"
        options={{
          headerShown: false,
          headerStyle: { ...headerStyles.headerStyle }
        }} />

      <Stack.Screen name='(onboard)/get-started'
        options={{ headerShown: false, }}
      />

      <Stack.Screen name="(onboard)/auth-options"
        options={{ headerShown: false, }}
      />

      <Stack.Screen name="(modals)/sign-up"
        options={{ headerShown: false, animation: 'simple_push', }}
      />

      <Stack.Screen name='(modals)/task-form'
        options={{ presentation: 'modal' }}
      />

      <Stack.Screen name='(modals)/job-proposal-form'
        options={{ presentation: 'modal' }}
      />

      <Stack.Screen name='(modals)/appointment-form'
        options={{ presentation: 'modal' }}
      />


      {/* <Stack.Screen name="(modals)/handyman-register"
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: { ...headerStyles.headerStyle },
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} >
              <Octicons name='arrow-left'
                size={24}
                color={Colors.lighter}
                style={{ left: 10 }} />
            </TouchableOpacity>
          )
        }}
      /> */}

      <Stack.Screen name="(modals)/client-register"
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: { ...headerStyles.headerStyle },
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} >
              <Octicons name='arrow-left'
                size={24}
                color={Colors.lighter}
                style={{ left: 10 }} />
            </TouchableOpacity>)
        }} />

      <Stack.Screen name="(image-picker)/image-picker"
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: { ...headerStyles.headerStyle },
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} >
              <Octicons name='arrow-left'
                size={24}
                color={Colors.lighter}
                style={{ left: 10 }} />
            </TouchableOpacity>),
          headerRight: () => (
            <TouchableOpacity onPress={handleRight} >
              <Text style={headerStyles.headerRight}>Skip</Text>
            </TouchableOpacity>)
        }} />
    </Stack>
  );
}

const headerStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.primary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,

  },
  headerRight: {
    color: Colors.secondary,
    fontSize: 16,
    fontFamily: 'poppins-semibold',
    letterSpacing: 1.8
  }
})
