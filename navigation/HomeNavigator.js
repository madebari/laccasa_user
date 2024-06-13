import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import React from "react"
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import CartScreen from '../screens/cart/CartScreen';
import {  MaterialCommunityIcons } from "@expo/vector-icons"
import MembershipScreen from "../screens/home/Membership"
import ActionScreen from '../screens/home/ActionScreen';
import {View, Text} from "react-native"
import { db } from '../config/config';
import {useSelector} from "react-redux"

export default function HomeNavigator() {
const {user} = useSelector(state=>state.auth)
  const [total, setTotal] = React.useState([])

  React.useEffect(()=>{
    db.collection("Cart")
    .where("user", "==",user?.uid)
    .where("isPayed", "==",false)
    .where("isComplete","==",false)
    .where("order","==",false)
    .onSnapshot(querySnapshot=>{
      let result = []
      querySnapshot.forEach(doc=>{
        result.push({
          ...doc.data(),
          id: doc.id
        })
      })
      setTotal(result)
    })
  },[])
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
      backgroundColor: '#FFFFFF',
    },
      tabBarIcon: ({ focused, color, size }) =>
      {
        let iconName;

        if (route.name === 'Home')
        {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Profile')
        {
          iconName = focused ? 'account' : 'account-outline';
        }  else if (route.name === 'Cart')
        {
          iconName = focused ? 'cart' : 'cart-outline';
        } else{
          iconName = null
        }

        // You can return any component that you like here!
        return (
          <>
          {route.name === "Cart" ?
           <View style={{
            position:"relative",
            alignItems:"center",
            justifyContent:"center"
           }}>
            {total.length > 0 ? <View 
            
            style={{
              position:"absolute",
              backgroundColor:"green",
              alignContent:"center",
              justifyContent:"center",
              height:20,
              width:20,
              borderRadius:50,
              top: -20
            }}>
              <Text
            style={{
              textAlign:"center",
              color:"white",
              fontWeight:"bold"
            }}
            >{total.length}</Text>
            </View> : <></>}
            <MaterialCommunityIcons 
            style={{
              position:"absolute"
            }}
            name={iconName} size={size} color={color} />
           </View>
          : <MaterialCommunityIcons name={iconName} size={size} color={color} />}
          </>
        );
      },
      tabBarActiveTintColor: '#5E5F62',
      tabBarInactiveTintColor: 'gray',
    })}
    
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      {/* ActionScreen */}
      <Tab.Screen options={{
        presentation: 'modal',
    tabBarButton: () => null,
    tabBarVisible: false,
    // tabBarVisible:false,
    // tabBarStyle: { display: 'none' }
  }} name="Membership" component={MembershipScreen} />

  <Tab.Screen options={{
    tabBarButton: () => null,
    tabBarVisible: false,
  }} name="Action" component={ActionScreen} />
      
    </Tab.Navigator>
  )
}