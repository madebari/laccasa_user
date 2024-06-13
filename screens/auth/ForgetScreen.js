import { View, Text, 
    KeyboardAvoidingView,
    SafeAreaView, StyleSheet, Platform, StatusBar, 
    TouchableOpacity,
    Image, 
    ScrollView} from 'react-native'
import React from 'react'
import {img1, Btn, Form, Error} from "../../components"
import {useNavigation} from "@react-navigation/native"
import { auth } from '../../config/config'

export default function ForgetScreen() {
        const [email, setEmail] = React.useState("")
    const [success, setSuccess] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const navigation = useNavigation()

    React.useEffect(()=>{
      setTimeout(()=>{
        setSuccess("")
        setEmail("")
      },5000)
    },[success])

    const onPress = async () =>{
      setLoading(true)
      if(email){
        
        try {
        await auth.sendPasswordResetEmail(email)
        setLoading(false)
        setSuccess("Successfully, Visit Your Email to reset your password")
        } catch (error) {
          switch(error.code){
            case "auth/invalid-email":
              setLoading(false)
              setSuccess("")
              Error("Forget Passowrd Error", "The email address is badly formatted")
              break
            default:
              setLoading(false)
              setSuccess("")
              Error("Forget Passowrd Error", "The email address is not true email")
              break

          }
        }
      }else{
        setLoading(false)
        setSuccess("")
        Error("Forget Passowrd Error", "Email is required")
      }
    }

  return (
    <SafeAreaView className={Platform.OS === "android" ? "flex-1 pt-10 bg-[#CD101B]" : "flex-1 bg-[#CD101B]"}>
        <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === "android" ? -500: null}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#CD101B]">
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
       <View className="items-center w-full justify-center pt-6 pb-3">
        <Text className="text-white font-semiblod text-xl capitalize">Laccasa</Text>
        <Text className="text-white font-semiblod text-xl capitalize">saloon</Text>
        <Image source={img1} style={{
            resizeMode:"cover",
            height:100,
            width: 200
        }} />
        <Text className="text-white font-bold text-2xl mt-2 mb-4 capitalize">
            Reset Your Password</Text>
       </View>
       {success && <Text className="text-white font-semibold px-8 text-lg mb-3 capitalize">{success}</Text>}
       <Form
       text="Email address"
       item={email}
       setItem={setEmail}
        />
        <View className="my-1" />
<View className="items-center justify-end my-2">
    <Btn loading={loading} title="Reset" onPress={onPress} />
</View>
<View className="w-[342px] mx-auto mt-4 mb-2">
    <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
        <Text className="text-gray-300 capitalize text-[17px] font-semibold">
            Back To Login </Text>
    </TouchableOpacity>
</View>
</ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});