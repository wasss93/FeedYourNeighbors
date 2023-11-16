import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';
import { useNavigation } from 'expo-router';


export default function ChooseRolePage() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>FYN</Text>
        <Text style={styles.subtitle}>Feed your neighbour</Text>
        <Text style={styles.subtitle}>Choisissez votre rôle</Text>

        <Link href="/donnateurRegister" style={styles.linkToHome} asChild>
          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={() => console.log('Donnateur button pressed')}
          >
            <Text style={[styles.buttonText, styles.donnateurButtonText]}>Je suis Donnateur</Text>
          </TouchableOpacity>
        </Link>

        <View style={{ height: 20 }} />

        <Link href="/receveurRegister" style={styles.linkToHome} asChild>
          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={() => console.log("Receveur button pressed")}
          >
            <Text style={[styles.buttonText, styles.receveurButtonText]}>Je suis Receveur</Text>
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
    fontSize: 36,
    color: "white",
    marginBottom: 20,
  },
  link: {
    width: "100%",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  donnateurButton: {
    marginBottom: 10,
  },
  receveurButton: {
    marginBottom: 10,
  },


  buttonText: {
    color: 'white', // Change the color to white
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  donnateurButtonText: {
    color: 'white', // Change the color to white
    fontSize: 25,
    fontWeight: 'bold',
  },
  
  receveurButtonText: {
    color: 'white', // Change the color to white
    fontSize: 25,
    fontWeight: 'bold',
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
