import { View, Text, 
    KeyboardAvoidingView,
    SafeAreaView, StyleSheet, Platform, StatusBar, 
    TouchableOpacity,
    Image, 
    ScrollView} from 'react-native'
import React from 'react'
import {img1, Btn, Form, Error} from "../../components"
import { auth } from '../../config/config'
import {useSelector, useDispatch} from "react-redux"
import { saveUser } from '../../redux/authSlice'
import * as SecureStore from 'expo-secure-store';
import {useNavigation, useIsFocused} from "@react-navigation/native"

export default function RegisterScreen() {
      const [email, setEmail] = React.useState("")
      const [fullname, setFullName] = React.useState("")
      const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const [secure, setSecure] = React.useState(true)
    const [result, setReuslt] = React.useState(null)
    const navigation = useNavigation()
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

      React.useEffect(()=>{
        const dt = checkUser()
      if(result){
        setLoading(false)
     navigation.navigate("Dashboard")
      }
      setLoading(false)
    },[isFocused])

    React.useEffect(()=>{
   if(user){
    navigation.navigate("Dashboard")
   }
    }, [user])

    const checkUser = async ()=>{
      const rst = JSON.parse(await SecureStore.getItemAsync("User"))
      setReuslt(rst)
      dispatch(saveUser(rst))
      return rst
    }

    const onPress = async ()=>{
      setLoading(true)
     try {
      if(email && password && username && fullname){
        await auth.createUserWithEmailAndPassword(email.trim(), password)
      .then((userCredential) => {
    
      var result = userCredential.user;
      var user = {
      email: result.email,
      uid: result.uid,
      fullname: fullname,
      username: username,
      isAdmin: false
    }
    // console.log(user)
   dispatch(saveUser(user))
  }).catch((error)=>{
    switch (error.code) {
      case "auth/invalid-password":
        setLoading(false)
        Error(title="Register Error", message="Password provided is not corrected")
        break

      case "auth/invalid-email":
        setLoading(false)
        Error(title="Register Error", message="Email provided is invalid")
        break
      default:
        setLoading(false)
        Error(title="Register Error", message="Invaled credentials")
        break
  }

  })
      }else{
        setLoading(false)
        Error(title="Registration Error", message="All fields are required")
      }
     } catch (error) {
      switch (error.code) {
      case "auth/invalid-password":
        setLoading(false)
        Error(title="Register Error", message="Password provided is not corrected")
        break

      case "auth/invalid-email":
        setLoading(false)
        Error(title="Register Error", message="Email provided is invalid")
        break
      default:
        setLoading(false)
        Error(title="Register Error", message="Invaled credentials")
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
        <Text className="text-white font-bold text-4xl mt-2 mb-4 capitalize">
          Sign Up</Text>
       </View>
       <Form
       text="Working Email address"
       item={email}
       setItem={setEmail}
        />
        <View className="my-1" />
        <Form
       text="Fullname"
       item={fullname}
       setItem={setFullName}
        />
        <View className="my-1" />
        <Form
       text="Wattsapp Number"
       item={username}
       setItem={setUsername}
        />
        <View className="my-1" />
       <Form 
       text="Password"
       item={password}
       setItem={setPassword}
       secure={secure}
       setSecure={setSecure}
       />
<View className="items-center justify-end my-2">
    <Btn title="Sign Up" onPress={onPress} loading={loading} />
</View>

<View className="w-[342px] mx-auto flex-row mt-4 items-center">
    <Text className="text-gray-300 font-semibold capitalize text-[17px]">already have an account ? </Text>
    <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
        <Text className="text-white font-bold capitalize text-[19px]">Sing In</Text>
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