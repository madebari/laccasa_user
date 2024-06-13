import { View, Text, 
    KeyboardAvoidingView,
    SafeAreaView, StyleSheet, Platform, StatusBar, 
    TouchableOpacity,
    Image, ScrollView } from 'react-native'
import React from 'react'
import {img1, Btn, Form, Error} from "../../components"
import { auth } from '../../config/config'
import {useSelector, useDispatch} from "react-redux"
import { saveUser } from '../../redux/authSlice'
import * as SecureStore from 'expo-secure-store';
import {useNavigation, useIsFocused} from "@react-navigation/native"

export default function LoginScreen() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [result, setResult] = React.useState("")
    const [error, setError] = React.useState("")
    const [secure, setSecure] = React.useState(true)
    const navigation = useNavigation()
    const isFocused = useIsFocused()


    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    React.useEffect(() =>{
       const dt = checkUser()
       if(result){
        setLoading(false)
       navigation.navigate("Dashboard")
       }
     setLoading(false)
    },[isFocused])

  React.useEffect(()=>{
   if(user){
    setLoading(false)
     navigation.navigate("Dashboard")
   }
   setLoading(false)
    }, [user])

    const checkUser = async ()=>{
      const data =  JSON.parse(await SecureStore.getItemAsync("User"))
      setResult(data)
      if(data){
      dispatch(saveUser(data))
      }

      return data
    }

    const onPress = async ()=>{
      setLoading(true)
     try {
      if(email && password){
      auth.signInWithEmailAndPassword(email.trim(), password)
      .then((userCredential) => {
      var result = userCredential.user;
      var user = {
      email: result.email,
      uid: result.uid
    }
   dispatch(saveUser(user))
  }).catch((error)=>{
switch (error.code) {
      case "auth/invalid-password":
        setLoading(false)
        Error(title="Login Error", message="Password provided is not corrected")
        break

      case "auth/invalid-email":
        setLoading(false)
        Error(title="Login Error", message="Email provided is invalid")
        break
      default:
        setLoading(false)
        Error(title="Login Error", message="Invaled credentials")
        break
  }
  })
      }else{
        setLoading(false)
        Error(title="Login Error", message="All fields are required")
      }
     } catch (error) {
     switch (error.code) {
      case "auth/invalid-password":
        setLoading(false)
        Error(title="Login Error", message="Password provided is not corrected")
        break

      case "auth/invalid-email":
        setLoading(false)
        Error(title="Login Error", message="Email provided is invalid")
        break
      default:
        setLoading(false)
        Error(title="Login Error", message="Invaled credentials")
        break
  }
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
        <Text className="text-white font-bold text-4xl mt-2 mb-4 capitalize">Log In</Text>
       </View>
       <Form
       text="Email address"
       item={email}
       setItem={setEmail}
        />
        <View className="my-2" />
       <Form 
       text="Password"
       item={password}
       setItem={setPassword}
       secure={secure}
       setSecure={setSecure}
       />
<View className="items-center justify-end my-2">
    <Btn title="Login" onPress={onPress} loading={loading} />
</View>
<View className="w-[342px] mx-auto mt-4 mb-2">
    <TouchableOpacity onPress={()=>navigation.navigate("Forget")}>
        <Text className="text-gray-300 capitalize text-[17px] font-semibold">
            Forget password ? </Text>
    </TouchableOpacity>
</View>
<View className="w-[342px] mx-auto flex-row items-center">
    <Text className="text-gray-300 font-semibold capitalize text-[17px]">
        Dont have an account ? </Text>
    <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
        <Text className="text-white font-bold capitalize text-[19px]">Sing Up</Text>
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