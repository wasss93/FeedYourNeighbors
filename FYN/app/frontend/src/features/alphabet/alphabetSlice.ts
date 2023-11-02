import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Créez une interface pour définir la forme de l'état de la tranche 'alphabet'.
interface AlphabetState {
    letters: string;
}

// Définissez l'état initial.
const initialState: AlphabetState = {
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

// Créez une tranche Redux pour gérer 'alphabet'.
const alphabetSlice = createSlice({
    name: 'alphabet',
    initialState,
    reducers: {
        // Un réducteur pour modifier les lettres de l'alphabet.
        setLetters: (state, action: PayloadAction<string>) => {
            state.letters = action.payload;
        },
    },
});

// Exportez les actions de la tranche 'alphabet'.
export const { setLetters } = alphabetSlice.actions;

// Exportez le réducteur de la tranche 'alphabet'.
export default alphabetSlice.reducer;
