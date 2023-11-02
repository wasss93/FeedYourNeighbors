import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import alphabetReducer from '../features/alphabet/alphabetSlice'; // Importez le réducteur d'alphabet.

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    alphabet: alphabetReducer,
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
