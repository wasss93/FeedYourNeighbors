import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "numeric" | "default" | "email-address" | "phone-pad";
  placeholderTextColor?: string;
  format?: "date" | "default"; // Ajout de la propriété de format
  maxCharacters?: number;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  placeholderTextColor = "rgba(255, 255, 255, 0.5)",
  format = "default", // Par défaut, utilisez le format "default"
  maxCharacters = 10,
}) => {
  const handleTextChange = (text: string) => {
    if (format === "date") {
      // Ajouter les barres obliques après le deuxième et le cinquième caractère
      if (text.length === 2 || text.length === 5) {
        text += "/";
      }

      // Limiter la longueur du texte
      if (text.length <= maxCharacters) {
        onChangeText(text);
      }
    } else {
      // Pour les autres champs, pas de formatage spécifique
      onChangeText(text);
    }
  };

  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={handleTextChange}
      placeholder={placeholder}
      keyboardType={keyboardType}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

export default function RegisterReceveurPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    // Logique d'enregistrement
    console.log("Bouton d'inscription de donnateur appuyé");

    // Afficher les valeurs dans la console
    console.log("Prénom:", firstName);
    console.log("Nom:", lastName);
    console.log("Date de naissance:", dateOfBirth);
    console.log("Email:", email);

    // Remplacez la ligne suivante par la logique de navigation appropriée
    // useHref("/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>FYN</Text>
        <Text style={styles.subtitle}>Feed your neighbour</Text>
        <Text style={styles.subtitle}>Inscription receveur</Text>

        <View style={styles.formContainer}>
          <CustomTextInput
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder="Prénom"
          />

          <CustomTextInput
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholder="Nom"
          />

          <CustomTextInput
            value={dateOfBirth}
            onChangeText={(text) => setDateOfBirth(text)}
            placeholder="Date de naissance (jj/MM/aaaa)"
            keyboardType="numeric"
            format="date" // Utiliser le format "date" pour la date de naissance
          />

          <CustomTextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
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
    maxWidth: 600,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
  },
  formContainer: {
    width: "80%",
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: "white",
  },
  registerButton: {
    backgroundColor: "#15A370",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkToHome: {
    color: "white",
    marginTop: 20,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
