import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Reducers
import cartReducer from "./cartSlice";

// Persist config: only persist cart.items
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

// Combine reducers
const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
});

// ✅ Configure store WITHOUT manually adding thunk
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export persistor and store
export const persistor = persistStore(store);
export default store;
