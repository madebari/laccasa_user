import { View, Text, SafeAreaView,
     FlatList, StyleSheet, StatusBar,
     Platform, TouchableOpacity, Image,Linking } from 'react-native'
import React from 'react'
import { db } from '../../config/config'
import { Header, Error } from '../../components'
import img from "../../assets/1.jpeg"

export default function ActionScreen({route}) {
    const {items} = route.params
      const [users, setUsers] = React.useState([])
      const [selected, setSelected] = React.useState('')

      React.useEffect(()=>{
        db.collection("Users")
        .where("isAdmin", "==", true)
        .onSnapshot(querySnapshot=>{
          let result = []
          querySnapshot.forEach(doc=>{
            result.push({
              ...doc.data(),
              id: doc.id
            })
          })
          setUsers(result)
        })
      },[])

      const onPress = async (phoneNumber) =>{
        if(items === "phone-call"){


            if(Platform.OS === 'android') {

                let num = ''

                const leng = phoneNumber.length

                if(leng === 10){
                 num = `+255${phoneNumber.slice(1)}`
                }else if(leng === 11){
                    num = `+255${phoneNumber.slice(2)}`
                }else if(leng === 12){
                    num = `+255${phoneNumber.slice(3)}`
                }else if(leng === 13){
                    num = `+255${phoneNumber.slice(4)}`
                }

                const url = `tel:${num}`

                const supported = await Linking.canOpenURL(url);

                if (supported) {
                await Linking.openURL(url);
                } else {
                Error(`${items}`,`Can't open this ${url}`)
                }
            return;
            }

            if(Platform.OS === 'ios') {

                let num = ''

                const leng = phoneNumber.length

                if(leng === 10){
                 num = `+255${phoneNumber.slice(1)}`
                }else if(leng === 11){
                    num = `+255${phoneNumber.slice(2)}`
                }else if(leng === 12){
                    num = `+255${phoneNumber.slice(3)}`
                }else if(leng === 13){
                    num = `+255${phoneNumber.slice(4)}`
                }
                const url = `telprompt:${num}`
                // console.log(url)
                const supported = await Linking.canOpenURL(url);

                if (supported) {
                await Linking.openURL(url);
                } else {
                Error(`${items}`,`Can't open this ${url}`)
                }
              return;
            }

        }else{
            let num = ''

                const leng = phoneNumber.length

                if(leng === 10){
                 num = `+255${phoneNumber.slice(1)}`
                }else if(leng === 11){
                    num = `+255${phoneNumber.slice(2)}`
                }else if(leng === 12){
                    num = `+255${phoneNumber.slice(3)}`
                }else if(leng === 13){
                    num = `+255${phoneNumber.slice(4)}`
                }

                const url = `whatsapp://send?text=hello&phone=${num}`
                // console.log(url)
                const supported = await Linking.canOpenURL(url);

                if (supported) {
                await Linking.openURL(url);
                } else {
                Error(`${items}`,`Can't open this ${url}`)
                }


        }
      }
  return (
<SafeAreaView style={styles.AndroidSafeArea} className="bg-[#CD101B] flex-1">
<Header title={`Seletct User for ${items}`}/>
<View className="flex-1 bg-white px-4 rounded-t-3xl">
    <FlatList
 data={users}
 keyExtractor={item=>item.id}
 renderItem={({item, index})=>{
    return (
        <TouchableOpacity
        onPress={()=>onPress(item.username)}
        className="bg-white py-2 px-4 mt-3 shadow-sm flex-row items-center">
            <Image source={img} className="w-10 h-10 cover-fill rounded-full" />
            <View className="px-3">
                <Text>Name: {item.fullname}</Text>
            <Text>Phone : {item.username}</Text>
            <Text>Location {item?.location}</Text>
            </View>
        </TouchableOpacity>
    )
 }}
/>
</View>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});
