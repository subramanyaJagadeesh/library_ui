import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/User.reducer';

export default configureStore({
  reducer: {
    user: userReducer
  }
});