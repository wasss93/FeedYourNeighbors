import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../app/hooks'; // Importez les hooks personnalisés
import { setLetters } from './alphabetSlice'; // Utilisez un import relatif pour accéder à alphabetSlice

const AlphabetComponent = () => {
    // Utilisez useAppSelector pour accéder à la variable 'alphabet' depuis le store.
    const alphabet = useAppSelector((state) => state.alphabet.letters);
    const dispatch = useAppDispatch();

    // Utilisez useState pour gérer la lettre saisie par l'utilisateur.
    const [selectedLetter, setSelectedLetter] = useState('');

    const handleUpdateAlphabet = () => {
        // Dispatchez l'action setLetters avec la nouvelle valeur pour mettre à jour 'alphabet' dans le store.
        dispatch(setLetters(selectedLetter));
    };

    return (
        <View>
            <Text>Alphabet:</Text>
            <TextInput
                value={alphabet}
                editable={false} // Pour désactiver la saisie
                multiline={true} // Permet le texte multiligne
            />
            <Text>Entrez une lettre:</Text>
            <TextInput
                value={selectedLetter}
                onChangeText={(text) => setSelectedLetter(text)}
            />
            <Button
                title="Valider"
                onPress={handleUpdateAlphabet}
            />
        </View>
    );
};

export default AlphabetComponent;
