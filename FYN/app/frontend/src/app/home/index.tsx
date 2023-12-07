import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function ShoppingCartPage() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>FYN</Text>
        <Text style={styles.subtitle}>Interface donnateur</Text>

        <View style={styles.formContainer}>
          <Link href="/createPanier" asChild>
            <TouchableOpacity
              style={styles.addButton}
              // onPress={() => console.log('Ajouter au panier button pressed')}
            >
              <Text style={styles.buttonText}>+ Créer un panier</Text>
            </TouchableOpacity>
          </Link>

          {/* Bouton "Réserver un panier" */}
          <Link href="/bookPanier" asChild>

          <TouchableOpacity
            style={styles.reserveButton}
            // onPress={() => console.log('Réserver un panier button pressed')}
          >
            <Text style={styles.buttonText}>+ Réserver un panier </Text>
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
  addButton: {
    backgroundColor: "#15A370",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 20,
  },
  reserveButton: {
    backgroundColor: "#15A370", // Couleur à adapter si nécessaire
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
