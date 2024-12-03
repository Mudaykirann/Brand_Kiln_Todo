import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice.jsx'


const store = configureStore({
    reducer: {
        tasks: taskReducer,
    },
});

export default store;


