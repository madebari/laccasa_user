import { View, Text, SafeAreaView,
  
  StyleSheet, Platform, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Header} from "../../components"
import {useSelector, useDispatch} from "react-redux"
import { logOutUser } from '../../redux/authSlice';
import * as SecureStore from 'expo-secure-store';
import { db } from '../../config/config';

export default function ProfileScreen({navigation}) {
  const [loading, setLoading] = React.useState(false)
  const [bundles, setBundles] = React.useState([])
  const {user, isLogout} = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  React.useEffect(()=>{
    if(user){
      (async ()=>{
      db.collection("Cart")
      .where("user", "==", user?.email)
      .where("isPayed", "==",true)
      .where("isComplete", "==", true)
      .where("order","==",true)
      .onSnapshot(querySnapshot=>{
        let result = []
        querySnapshot.forEach(doc=>{
          result.push({
            ...doc.data(),
            id: doc.id
          })
        })
        setBundles(result)
      })
    })()
    }
  },[])

  React.useEffect(()=>{
    if(isLogout){
    setLoading(false)
    navigation.navigate("Auth")
    }
  },[isLogout])

  const lodOut = async () =>{
    setLoading(true)
    const result = await SecureStore.deleteItemAsync("User")

    if(!result){
    dispatch(logOutUser(result))
    }

  }
  return (
    <SafeAreaView style={styles.AndroidSafeArea} className="bg-[#CD101B] flex-1">
<Header title="My Profile"/>

<ScrollView className="bg-white rounded-t-3xl py-12 px-5">
    <View className="m-2">
      <Text className="text-black font-bold">Email</Text>
      <Text>{user?.email}</Text>
    </View>

    <View className="m-2">
      <Text className="text-black font-bold">Full Name</Text>
      <Text>{user?.fullname}</Text>
    </View>

    <View className="m-2">
      <Text className="text-black font-bold">Mobile Number</Text>
      <Text>{user?.username}</Text>
    </View>

    <View className="m-2 mt-4">
      <Text className="text-black/80 font-bold capitalize text-lg pb-4">Your Bundles history</Text>
      {bundles.length > 0 ? <>
      {bundles.map((item)=>{
        return (
            <View key={item.id} className="mx-auto my-3 w-[220px] flex-row gap-4 items-center">
                <View className="relative">
                    <Image source={{uri: item.image}} style={{
                    width: 110,
                    height: 110,
                    borderRadius: 50,
                    resizeMode:"contain"
                }} />
                </View>
<View>
                    <Text className="text-black font-bold mt-3">{item.title}</Text>
                <Text className="text-gray-700 font-normal">{item.body}</Text>
                <Text className="text-green-900 font-bold mt-1 mb-1">TSH {item.cost} x {item.total} Person</Text>

    </View>
  
            </View>
        )
    })}</>: <View className="m-2">
      <Text className="py-3">No Bundles Yet</Text></View>}
    </View>
</ScrollView>

    <TouchableOpacity
    onPress={lodOut}
    className="absolute bottom-2 right-2 bg-[#B79D8A] px-6 py-3 rounded-md shadow-lg" 
    >{loading ? <Text className="text-white">...Loading</Text> : <Text className="text-white font-bold">Log out</Text>}
</TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});