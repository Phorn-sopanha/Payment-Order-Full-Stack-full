import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'


// export default configureStore({
//   reducer: {
//     user : userReducer
//   }
// })
export const store = configureStore({
    reducer : {
        user : userReducer
    },
})