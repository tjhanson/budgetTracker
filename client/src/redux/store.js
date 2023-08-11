import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../slices/boardSlice.js'
import usersReducer from '../slices/userSlice.js'

export default configureStore({
    reducer:{
        userData: boardReducer,
        users: usersReducer
    },
})
