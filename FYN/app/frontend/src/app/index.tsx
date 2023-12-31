import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';
import { useNavigation } from 'expo-router';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>FYN</Text>
        <Text style={styles.subtitle}>Feed your neighbour</Text>
        <Text style={styles.subtitle}>Bienvenue sur FYN</Text>

        {/* Ajout de l'espace entre les boutons */}
        <View style={{ height: 20 }} />

        <Link href="/connect" style={styles.linkToHome} asChild>
         <TouchableOpacity 
          style={styles.registerButton} 
          onPress={() => console.log("Se connecter")}
        >
        <Text style={[styles.buttonText, { color: 'white' }]}>Se connecter</Text>
        </TouchableOpacity>
        </Link>

        <View style={{ height: 20 }} />

        <Link href="/register" style={styles.linkToHome} asChild>
        <TouchableOpacity 
        style={styles.registerButton} 
        onPress={() => console.log('Register button pressed')}
        >
        <Text style={[styles.buttonText, styles.signUpButtonText]}>Vous n'avez pas de compte ? S'inscrire</Text>
        </TouchableOpacity>

        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15A370",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 25,
    color: "white",
    marginBottom: 20,

  },
  link: {
    width: "100%",
    // backgroundColor: "yellow",
  },
  button: {
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  signUpButton: {
    backgroundColor: "white",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  signUpButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 19,
  },
  signInButton: {
    marginBottom: 10,
    textAlign: "center",
  },
  linkToHome: {
    color: "white",
    marginTop: 20,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  registerButton: {
    backgroundColor: "#15A370",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
});
