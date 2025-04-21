import { combineReducers } from '@reduxjs/toolkit'
import sidebarReducer from '~/layouts/slices/sidebarSlice'
import userReducer from '~/features/auth/slices/userSlice'

const rootReducer = combineReducers({
  // Aggerate reducer list from different features
  // The key of object in combineReducers determines how the state is accesed in useSelector
  sidebar: sidebarReducer,
  user: userReducer,
})

export default rootReducer
