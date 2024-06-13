import { View, Text, SafeAreaView, 
  StyleSheet, Platform, StatusBar, FlatList, Image, 
  Dimensions,
  TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import { db } from '../../config/config'
import { Error, CustomCarousel, RenderItem } from '../../components'
import {useIsFocused, useNavigation} from "@react-navigation/native"
import * as SecureStore from 'expo-secure-store';
import { saveUser } from '../../redux/authSlice'

const {width, height} = Dimensions.get("screen")

export default function HomeScreen() {
  const {user}= useSelector(state=>state.auth)
  const [whatwedo, setWhatWeDo] = React.useState([])
  const [posters, setPosters] = React.useState([])
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const ITEM_WIDTH = width * 0.4
  const ITEM_HEIGHT = width * 0.45

  React.useEffect(()=>{
   if(user){
    const dt = checkUserExist(user)
   }else{
    navigation.navigate("Auth")
   }
  },[isFocused])


  async function checkUserExist(data){
    try {
       db.collection("Users")
      .where("email", "==", data?.email)
      .onSnapshot((querySnapShot)=>{
        let result = []
        querySnapShot.forEach((doc)=>{
        if(doc?.data().email === data?.email){
            result.push({
              ...doc.data(),
              id: doc.id
            })
          }
        })

        if(result.length > 0){
           dispatch(saveUser(result[0]))
           SecureStore.setItemAsync("User", JSON.stringify(result[0]))
        }else{
         db.collection("Users").add(data)
         SecureStore.setItemAsync("User", JSON.stringify(data))
        }

      })
     
    } catch (error) {
      const err= error?.message
      Error(title="Laccasa Error", message={err})
    }
  }


      React.useEffect(()=>{
     (async ()=>{
            db.collection("WhatWeDo")
      .where("isPublished","==",true).onSnapshot(result=>{
        let coll = []
        result.forEach(doc=>{
          coll.push({
            ...doc.data(),
            id: doc.id
          })
        })
     setWhatWeDo(coll)

      })
     })()
    },[])


         React.useEffect(()=>{
      db.collection("Posters")
      .where("isPublished","==",true).onSnapshot(result=>{
        let coll = []
        result.forEach(doc=>{
          coll.push({
            ...doc.data(),
            id: doc.id
          })
        })
      setPosters(coll)
      })
    },[])


  

  return (
    <SafeAreaView
    className="flex-1 bg-[#CD101B]"
    style={styles.AndroidSafeArea}>
      <View className="flex-1 bg-[#CD101B] mx-auto" style={{
        width
      }}>

        <FlatList
        numColumns={2}
        ListHeaderComponent={()=>{
          return (
            <>

          <CustomCarousel data={posters} />
       <View className="bg-[#CD101B] flex-1 items-center my-4">
       <Text className="text-[#B79D8A] font-bold text-[20px] my-3">
        What we do</Text>
      </View>

            </>
          )
         }}
        showsVerticalScrollIndicator={false}
        data={whatwedo}
        keyExtractor={item=>item.id}
        columnWrapperStyle={{
          justifyContent:"center",
          alignItems:"start"
        }}
        renderItem={({item})=>{
          return <RenderItem result={item} />
        }}
         
        />
        
      </View>
      <StatusBar backgroundColor="#CD101B" style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});