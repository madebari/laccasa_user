import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Carousel, {Pagination} from 'react-native-snap-carousel'
import { FontAwesome, Feather } from '@expo/vector-icons'; 
export const SLIDER_WIDTH = Dimensions.get('window').width + 0.90
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1)
import {useNavigation} from "@react-navigation/native"



const CarouselCardItem = ({ item, index }, navigation) => {

  return (
    <View style={styles.container} key={item?.id}>
      <Image
      className="w-full h-72"
        source={{uri: item.image}}
style={{
  resizeMode: "cover"
}}
      />
      <View className="w-[160px] mx-auto mt-2">
        <TouchableOpacity onPress={()=>navigation.navigate("Membership")} className="px-2 py-2 rounded-lg shadow-md bg-[#B79D8A] items-center justify-center">
            <Text className="text-white font-semibold text-md">Membership</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function CustomCarousel({data}) {
    const navigation = useNavigation()
    const isCarousel = React.useRef(null)
    const [index, setIndex] = React.useState(0)

  return (
    <View className="items-center bg-white" style={{
       borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    }}>
      <View className="items-center w-full mx-auto px-6 bg-white">
        <View className="flex-row items-center justify-center gap-3 py-2">
            <Text className="text-xl text-[#C29066] font-bold capitalize">Make a booking</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Action",{"items":"whatsapp"})}>
            <FontAwesome name="whatsapp" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Action",{"items":"phone-call"})}>
           <Feather name="phone-call" size={20} color="black" />
            </TouchableOpacity>
        </View>
      </View>
     <Carousel
     layout="tinder"
        // layout="stack"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        loop={true}
        autoplay={true}
        renderItem={(props)=>CarouselCardItem(props, navigation)}
        sliderWidth={SLIDER_WIDTH}
        autoplayDelay={2000}
        autoplayInterval={4000}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: ITEM_WIDTH,
    paddingBottom: 10,
    shadowColor: "#CD101B]",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
  }
})