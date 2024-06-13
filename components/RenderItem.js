import { Dimensions, Image, TouchableOpacity } from "react-native"
const {width, height} = Dimensions.get("screen")
export default function RenderItem({result}){
      const ITEM_WIDTH = width * 0.35
      const ITEM_HEIGHT = width * 0.35
    // console.log(result)
    return (
      <TouchableOpacity 
      style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT
        }}
      className="rounded-xl m-2 p-2 bg-white items-center justify-center">
        <Image source={{uri: result.image}} 
        style={{
          width: ITEM_WIDTH * 0.95,
          height: ITEM_HEIGHT * 0.95,
          // resizeMode:"cover"
        }} className="rounded-xl" />
      </TouchableOpacity>
    )
  }