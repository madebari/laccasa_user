import { View, Text, SafeAreaView, 
    StyleSheet, Platform, StatusBar, ScrollView, Image, 
    Dimensions,FlatList,
    TouchableOpacity } from 'react-native'
import React from 'react'
import {Header} from "../../components"
import { AntDesign } from '@expo/vector-icons';
const {width, height} = Dimensions.get("screen")
import { db } from '../../config/config';
import {useSelector} from "react-redux"
import {  addToCart, updateCart } from '../../constant';

export default function MembershipScreen() {
  const ITEM_WIDTH = width * 0.40
  const ITEM_HEIGHT = width * 0.45
  const [bundles, setBundles] = React.useState([])
  const [cart, setCart] = React.useState([])
  const {user} = useSelector(state=>state.auth)

    React.useEffect(()=>{
    db.collection("Cart")
    .onSnapshot(querySnapshot=>{
        let result = []
        querySnapshot.forEach(doc=>{
            result.push({
                ...doc.data(),
                id: doc.id
            })
        })
        setCart(result)
    })
  },[])

  React.useEffect(()=>{
    db.collection("Bundles")
    .where("isPublished","==",true)
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
  },[])

  const onPress = (data)=>{
    const itemExist = cart?.filter((item)=>item.cart_id===data?.id && item.user === user?.uid)
    if(itemExist.length > 0){
       const rt = itemExist[0]
       updateCart(rt)
    }else{
        addToCart(data, user)
    }
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea} className="bg-[#CD101B] flex-1">
<Header title="Membership"/>

<View style={{
    width
}} className="flex-1 bg-white rounded-t-3xl px-5">
 {bundles.length > 0 ? <>
 <FlatList
 data={bundles}
 numColumns={2}
 showsVerticalScrollIndicator={false}
    keyExtractor={item=>item.id}
    renderItem={({item})=>{
       return (
            <View key={item.image} className="m-3" style={{
                width: ITEM_WIDTH,
            }}>
                <View className="relative">
                <Image source={{
                    uri: item.image
                }} style={{
                    width: ITEM_WIDTH * 0.9,
                    height: ITEM_HEIGHT * 0.9
                }} />
                <TouchableOpacity 
                onPress={()=>onPress(item)}
                className="absolute right-0 bottom-0 bg-[#B79D8A] w-8 h-8 items-center justify-center rounded-full shadow-lg">
                    <AntDesign name="plus" size={20} color="white" />
                </TouchableOpacity>
                </View>
                <Text className="text-black font-bold mt-3 mb-1">{item.title}</Text>
                <Text className="text-gray-600 font-normal">{item.body}</Text>
                <Text className="text-green-900 text-[12px] font-bold mt-1">TSH {item.cost}</Text>
            </View>
        )
    }}
    />
 </> : <><View>
        <Text>No Bundles yet</Text>
    </View></>}
</View>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});