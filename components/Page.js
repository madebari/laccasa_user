import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import img1 from "../assets/1.jpeg"
import {useNavigation} from "@react-navigation/native"
import Btn from "./Btn"

const Page = () => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        flex: 1
      }}
    >
        <ImageBackground 
        source={img1} resizeMode="cover" 
    style={{
    flex: 1,
  }}>
<View className="flex-1" />
      <View className="h-96 bg-[#CD101B] rounded-t-3xl items-center justify-center">
        <Text className="text-4xl text-white  mb-1 font-bold uppercase">
          Welcome to
        </Text>
        <Text className="text-md text-white text-xl capitalize font-semibold">
            La Casa
        </Text>
        <Text className="text-md text-white text-xl capitalize font-semibold">
            De
        </Text>
        <Text className="text-md text-white text-xl capitalize font-semibold">
            Barber
        </Text>
        <Text className="text-md text-white text-xl capitalize font-semibold">
            Shop
        </Text>
        <Btn title="Next" onPress={()=>navigation.navigate("Login")} />
      </View>
    </ImageBackground>
      
    </View>
    
  );
};

export default Page;