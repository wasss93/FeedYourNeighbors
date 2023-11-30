Utiliser une variable d'environnement dans son code :

Définition des Variables d'Environnement :

Lorsque vous définissez vos variables d'environnement dans le fichier .env, assurez-vous de suivre la convention de nommage en utilisant des majuscules. Par exemple :

API_KEY=your_api_key_here
DEBUG_MODE=true

Utilisation des Variables dans le Code :

Pour utiliser une variable d'environnement dans votre code React Native, vous pouvez l'importer comme suit :

import { API_KEY, DEBUG_MODE } from '@env';

Vous pouvez ensuite utiliser ces variables comme n'importe quelle autre constante JavaScript.

Voici un exemple simple d'utilisation des variables d'environnement dans une application React Native. Supposons que vous ayez défini les variables API_KEY et DEBUG_MODE dans votre fichier .env.

import React from 'react';
import { View, Text } from 'react-native';
import { API_KEY, DEBUG_MODE } from '@env';

const App = () => {
  return (
    <View>
      <Text>API Key: {API_KEY}</Text>
      <Text>Debug Mode: {DEBUG_MODE}</Text>
    </View>
  );
};

export default App;

Dans cet exemple, nous importons les variables d'environnement API_KEY et DEBUG_MODE depuis le fichier .env et les utilisons pour afficher des informations dans notre composant React Native.