import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import postReducer from './post/slice';
import photosReducer from './photos/slice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		post: postReducer,
		photos: photosReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
