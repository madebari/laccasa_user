import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()
import AuthNavigation from './AuthNavigation';
import HomeNavigator from './HomeNavigator';

export default function TopNavigator() {
  return (
    <Stack.Navigator screenOptions={{
  headerShown: false
}}>
        <Stack.Screen name="Auth" component={AuthNavigation} />
        <Stack.Screen name="Dashboard" component={HomeNavigator} />
    </Stack.Navigator>
  )
}