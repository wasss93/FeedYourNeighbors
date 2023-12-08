import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView  } from "react-native";
import Picker from "react-native-picker-select";
import axios from "axios";

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "numeric" | "default" | "email-address" | "phone-pad";
  placeholderTextColor?: string;
  format?: "date" | "default"; // Ajout de la propriété de format
  maxCharacters?: number;
  securetextEntry?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  placeholderTextColor = "rgba(255, 255, 255, 0.5)",
  format = "default", // Par défaut, utilisez le format "default"
  maxCharacters = 10,
  securetextEntry = false,
}) => {
  const handleTextChange = (text: string) => {
    if (format === "date") {
      if (text.length === 2 || text.length === 5) {
        text += "/";
      }

      if (text.length <= maxCharacters) {
        onChangeText(text);
      }
    } else {
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
      secureTextEntry={securetextEntry}
    />
  );
};

export default function RegisterDonnateurPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [street, setStreet] = useState("");
  const [addressComplement, setAddressComplement] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = () => {
    // Logique d'enregistrement
    console.log("Bouton d'inscription de donnateur appuyé");

    // Afficher les valeurs dans la console
    console.log("Prénom:", firstName);
    console.log("Nom:", lastName);
    console.log("Date de naissance:", dateOfBirth);
    console.log("Email:", email);
    console.log("Mot de passe:", password);
    console.log("Confirmer le mot de passe:", confirmPassword);
    console.log("Nom d'utilisateur:", username);
    console.log("Ville:", city);
    console.log("Département:", department);
    console.log("Numéro de rue:", streetNumber);
    console.log("Rue:", street);
    console.log("Complément d'adresse:", addressComplement);
    console.log("Code postal:", postalCode);
    console.log("Numéro de téléphone:", phoneNumber);
    const params = {
      first_name: firstName,
      last_name: lastName,
      birth_date: dateOfBirth,
      ville: city,
      departement: department,
      rue : street,
      code_postal: postalCode,
      numero_rue: streetNumber,
      numero_tel: phoneNumber,
      email: email,
      password: password,
      username: username,
      complement: addressComplement,
      status_user:0,
      is_verified:0,
    }

    const apiURL = 'https://4cde-163-5-23-68.ngrok-free.app/api/registration';
    const register = async () => {
      try {
        const response = await axios.post(apiURL, params);
        console.log('Response data:', response.data);
      } catch (error) {
        // console.error('Error making the request:', error);
        console.log('Error details:', error);
      }
    };
    register();
    // Remplacez la ligne suivante par la logique de navigation appropriée
    // useHref("/home");
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>FYN</Text>
        <Text style={styles.subtitle}>Feed your neighbour</Text>
        <Text style={styles.subtitle}>Inscription donnateur</Text>

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
          format="date"
        />

        <CustomTextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          keyboardType="email-address"
        />

        <CustomTextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Mot de passe"
          securetextEntry={true}
        />

        <CustomTextInput
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="Confirmer le mot de passe"
          securetextEntry={true}
        />

        <CustomTextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Nom d'utilisateur"
        />

        <CustomTextInput
          value={city}
          onChangeText={(text) => setCity(text)}
          placeholder="Ville"
        />

        <CustomTextInput
          value={department}
          onChangeText={(text) => setDepartment(text)}
          placeholder="Departement"
        />

        <CustomTextInput
          value={streetNumber}
          onChangeText={(text) => setStreetNumber(text)}
          placeholder="Numéro de rue"
        />

        <CustomTextInput
          value={street}
          onChangeText={(text) => setStreet(text)}
          placeholder="Rue"
        />

        <CustomTextInput
          value={addressComplement}
          onChangeText={(text) => setAddressComplement(text)}
          placeholder="Complément d'adresse"
        />

        <CustomTextInput
          value={postalCode}
          onChangeText={(text) => setPostalCode(text)}
          placeholder="Code postal"
          keyboardType="numeric"
        />

        <CustomTextInput
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          placeholder="Numéro de téléphone"
          keyboardType="phone-pad"
        />


          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
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
  scrollViewContainer: {
    flexGrow: 1,
  },
});
