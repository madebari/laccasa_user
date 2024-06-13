import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Btn({onPress, title, loading}) {
  return (
     <TouchableOpacity
        onPress={onPress}
         className="py-3 mt-2 px-3 w-40 rounded-full items-center justify-center bg-white">
            {loading ? <Text className="text-[#CD101B] font-semibold">...loading</Text> : <Text className="text-[#CD101B] font-semibold">{title}</Text>}
        </TouchableOpacity>
  )
}