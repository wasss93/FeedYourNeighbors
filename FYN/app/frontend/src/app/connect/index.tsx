import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link, useNavigation } from 'expo-router';

export default function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    // Clear previous error messages
    setEmailError('');
    setPasswordError('');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Email format is not valid');
      return; // Do not proceed with login
    }

    // Validate password length
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return; // Do not proceed with login
    }

    // If email and password are valid, proceed with login logic
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your login logic here
    console.log('Login button pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>FYN</Text>
        <Text style={styles.subtitle}>Feed your neighbour</Text>
        <Text style={styles.subtitle}>Connexion</Text>
  
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(''); // Clear email error when user starts typing
            }}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
  
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(''); // Clear password error when user starts typing
            }}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
  
          <Link href="/home" style={[styles.linkToHome]} asChild>
            <TouchableOpacity
              style={styles.connectButton}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
          </Link>
  
          <Link href="/register" style={[styles.linkToHome]} asChild>
            <TouchableOpacity
              style={styles.connectButton}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Pas de compte ? Inscrivez-vous</Text>
            </TouchableOpacity>
          </Link>
        </View>
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
  formContainer: {
    width: "80%",
  },
  input: {
    height: 50,
    width: 300,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15, // Wider padding
    marginBottom: 20,
    color: 'white',
    placeholderTextColor: 'white', // Set the placeholder text color
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  registerButton: {
    marginTop: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },

  linkToHome: {
    color: "white",
    marginTop: 20,
    textDecorationLine: "underline",
    textAlign: "center",
  },

  connectButton: {
    backgroundColor: "#15A370",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 20,
  },

  registerButtonMargin: {
    marginTop: 40, // Add your desired margin here
  },
});