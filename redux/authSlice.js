import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  user: null,
  posters: [],
  cart: [],
  whatwedo: [],
  bundles: [],
  isLogout: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state, action)=>{
    state.user = action.payload
    state.isLogout = false
    },
    logOutUser: (state, action)=>{
      state.user = action.payload
      state.isLogout = true
    },
    addPosters: (state, action)=>{
    state.posters = action.payload
    },
    addWhatwedo: (state, action)=>{
    state.whatwedo = action.payload
    },
    addBundles: (state, action)=>{
    state.bundles = action.payload
    },
  },
})

export const { saveUser,logOutUser, addPosters, addWhatwedo, addBundles } = authSlice.actions

export default authSlice.reducer