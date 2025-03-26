import { combineReducers } from '@reduxjs/toolkit'
import sidebarReducer from '~/layouts/slices/sidebarSlice'

const rootReducer = combineReducers({
  // Aggerate reducer list from different features
  // The key of object in combineReducers determines how the state is accesed in useSelector
  sidebar: sidebarReducer,
})

export default rootReducer
