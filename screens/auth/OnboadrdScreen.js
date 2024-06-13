import React from 'react'
import { View } from 'react-native'
import { Page } from '../../components';
import {useSelector, useDispatch} from "react-redux"
import { saveUser } from '../../redux/authSlice';
import * as SecureStore from 'expo-secure-store';
import {useNavigation, useIsFocused} from "@react-navigation/native"


export default function OnboadingScreen() {

    const pagerRef = React.useRef()
    const [loading, setLoading] = React.useState(true)
    const [result, setResult] = React.useState("")
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const {user} = useSelector(state=>state.auth)


      React.useEffect(()=>{
        // SecureStore.deleteItemAsync("User")
      const dt = checkUser()
    },[isFocused])

async function checkUser(){
  const data =  await SecureStore.getItemAsync("User")
  const rst =  JSON.parse(data)
  setResult(rst)
  if(rst){
  dispatch(saveUser(rst))
  }
  return rst
        }


    React.useEffect(()=>{
        if(user){
          setLoading(false)
          navigation.navigate("Dashboard")
        }
    },[user])

// if(loading){
//         return null
//     }

  return (
   <View style={{ flex: 1 }}>
          <Page
            backgroundColor="#ffc93c"
            iconName="sun"
            title="Welcome to the weather app"
          />
        </View>
  )
}