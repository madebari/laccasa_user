import { TextInput, View ,Icon} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function Form({item, setItem, text, secure}) {
  return (
    <View className="w-[342px] mx-auto my-1 flex-row bg-gray-300">
      <TextInput 
      value={item}
      autoCapitalize='none' 
      secureTextEntry={secure}
      onChangeText={setItem}
      className="w-full rounded-md px-3 py-3 bg-gray-300 placeholder:text-gray-60"
      placeholder={text}
/>
{/* <AntDesign name="eye" /> */}
    </View>
  )
}