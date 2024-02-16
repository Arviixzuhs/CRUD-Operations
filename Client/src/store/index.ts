import { configureStore } from '@reduxjs/toolkit'
import { manageUsersSlice } from '../features/usersSlice'

const store = configureStore({
  reducer: {
    users: manageUsersSlice.reducer,
  },
})

export default store
