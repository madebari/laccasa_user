import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()
import {store} from "./redux/store"
import {Provider} from "react-redux"
import TopNavigator from './navigation/TopNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
<Stack.Navigator screenOptions={{
  headerShown: false
}}>
  <Stack.Screen name="Top" component={TopNavigator} />
</Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
