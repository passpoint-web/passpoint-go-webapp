import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// persist config
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(
  persistConfig,
  rootReducer
);

// eslint-disable-next-line space-before-function-paren
export default function mergeStore() {
  const store = configureStore({
    reducer: pReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }),
    // devTools: process.env.NODE_ENV !== 'production'
  });

  const persistor = persistStore(store);

  return { store, persistor };
}
