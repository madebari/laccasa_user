import { View, Text,Image, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import imgg from "../assets/1.jpeg"
import { AntDesign } from '@expo/vector-icons'; 
import {useNavigation} from "@react-navigation/native"
export default function Header({title}) {
  const navigation = useNavigation()
  return (
    <>
    <View className="items-center bg-[#CD101B] py-2">
        <Text className="text-white/90 font-semibold text-[18px]">Laccasa</Text>
        <Text className="text-white/90 font-semibold text-[20px] mb-1">Saloon</Text>
        <Image source={imgg} style={{
            width: 190,
            height: 60
        }} />
     <View className="flex-row items-center mt-3">
      <TouchableOpacity onPress={()=>navigation.goBack()} className="flex-row items-center">
      <AntDesign name="arrowleft" size={24} color="white" />
      <Text className="text-white/90 ml-3 font-semibold text-[19px] capitalize">{title}</Text>
      </TouchableOpacity> 
     </View>
    </View>
    <StatusBar backgroundColor="#CD101B" style="auto" />
    </>
  )
}