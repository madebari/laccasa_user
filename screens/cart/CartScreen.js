import { View, Text, SafeAreaView, 
    StyleSheet, Platform, StatusBar, 
    ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import {Header, data} from "../../components"
import { AntDesign } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native"
import { db } from '../../config/config';
import {useSelector} from "react-redux"
import {decreaseCart, deleteCart, updateCart, payCart} from "../../constant"

export default function CartScreen() {
const [cart, setCart] = React.useState([])
//   const isFocused = useIsFocused()
  const navigation = useNavigation()
  const {user} = useSelector(state=>state.auth)

    React.useEffect(()=>{
    db.collection("Cart").where("user", "==", user?.email)
    .where("isComplete", "==", false)
    .where("isPayed","==",false)
    .onSnapshot(querySnapshot=>{
        let result = []
        querySnapshot.forEach((doc)=>{
            result.push({
                ...doc.data(),
                id: doc.id
            })
        })
        setCart(result)
    })
  },[])

  return (
    <SafeAreaView style={styles.AndroidSafeArea} className="bg-[#CD101B] flex-1">
<Header title="My Cart"/>

{cart.length > 0 ? <>
<FlatList
showsVerticalScrollIndicator={false}
style={{
    backgroundColor:"white",
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
    paddingVertical:20
}}
    keyExtractor={item=>item.id}
    data={cart}
    renderItem={({item})=>{
        return (
            <View className="mx-auto my-3 w-[220px] flex-row gap-4 items-center">
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

                  <View className="flex-row justify-between items-center">
<TouchableOpacity 
                onPress={()=>updateCart(item)}
                className=" bg-white w-8 h-8 items-center justify-center rounded-full shadow-3xl">
                    <AntDesign name="pluscircleo" size={24} color="green" />
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>deleteCart(item)}
                className=" bg-[#CD101B] w-8 h-8 items-center justify-center rounded-full shadow-3xl">
                    <AntDesign name="delete" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>decreaseCart(item)}
                className=" bg-white w-8 h-8 items-center justify-center rounded-full shadow-3xl">
                    <AntDesign name="minuscircleo" size={24} color="orange" />
                </TouchableOpacity>

                    <TouchableOpacity
                    // onPress={()=>payCart(item)}
    className="flex-row items-center bg-orange-500 px-5 py-2 rounded-lg shadow-lg" 
    ><Text className="text-white font-bold uppercase">Pay</Text>
</TouchableOpacity>
    </View>

    </View>
  
            </View>
        )
    }}
    
    />
</> : <>
    <View className="flex-1 bg-white rounded-t-3xl py-8 px-4">
        <Text>No cart item yet</Text>
    </View>
    </>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});