import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()
import LoginScreen from "../screens/auth/LoginScreen"
import RegisterScreen from "../screens/auth/RegisterScreen"
import ForgetScreen from "../screens/auth/ForgetScreen"
import OnboardScreen from "../screens/auth/OnboadrdScreen"

export default function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{
  headerShown: false
}}>
        <Stack.Screen name="Onboard" component={OnboardScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Forget" component={ForgetScreen} />
    </Stack.Navigator>
  )
}