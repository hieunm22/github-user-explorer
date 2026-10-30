import { configureStore } from "@reduxjs/toolkit"
import { PERSIST, persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import likedReducer from "./slices/likedSlice"
import searchReducer from "./slices/searchSlice"
import userDetailReducer from "./slices/userDetailSlice"

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["liked"],
}

const persistedLikedReducer = persistReducer(persistConfig, likedReducer)

export const store = configureStore({
	reducer: {
		search: searchReducer,
		liked: persistedLikedReducer,
		userDetail: userDetailReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [PERSIST],
			},
		}),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
