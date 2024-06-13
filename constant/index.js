import firebase, { db } from "../config/config";

export const addToCart = async (item, user) =>{

    await db.collection("Cart").add({
        image: item.image,
        cart_id: item.id,
        body: item.body,
        title: item.title,
        isPayed: false,
        isComplete:false,
        order: false,
        total: Number(1),
        cost: Number(item.cost),
        user: user.email
    })
}

export const updateCart = async (item) =>{
    const rersult = item?.total >= 1 ? item?.total + 1 : item?.total
    await db.collection("Cart").doc(item.id).update({ 
        total: Number(rersult)
    })
}

export const decreaseCart = async (item) =>{
    const rersult = item?.total > 1 ? item?.total - 1 : item?.total
    await db.collection("Cart").doc(item.id).update({ 
        total: Number(rersult)
    })
}

export const deleteCart = async (item) =>{
    await db.collection("Cart").doc(item.id).delete()
}

export const payCart = async (item) =>{
    await db.collection("Cart").doc(item.id).update({ 
        order: true,
        isPayed: true
    })
}