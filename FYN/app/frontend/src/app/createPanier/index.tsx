import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface TimeSlotOption {
  label: string;
  value: string;
}

interface FoodOption {
  label: string;
  value: string;
}

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};

const dateOptions = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return {
    label: formatDate(date),
    value: date.toISOString(),
  };
});

export default function CreatePanierPage() {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [selectedFoodsList, setSelectedFoodsList] = useState<{ food: string; quantity: number }[]>([]);
  const [tempSelectedDate, setTempSelectedDate] =  useState(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [placeholderText, setPlaceholderText] = useState("Choisissez une date");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedSlotsList, setSelectedSlotsList] = useState<{ day: string; slot: string }[]>([]);


  const handleContinue = () => {
    const formData = {
      selectedFoodsList,
      selectedSlotsList,
      // Add other fields if needed
    };

    const jsonData = JSON.stringify(formData);
    saveJSONFile(jsonData);
    // Add other actions you want to perform after saving the data
  };

  const saveJSONFile = (jsonData: string) => {
    // Simulate saving the JSON file (adjust as per your React Native environment)
    console.log("Saving JSON file:", jsonData);
    // You will need to use an appropriate method to save the file in a React Native environment
  };

  const timeSlotOptions: TimeSlotOption[] = [
    { label: "Matin tôt (8h-10h)", value: "Matin tôt (8h-10h)" },
    { label: "Mi-matinée (10h-12h)", value: "Mi-matinée (10h-12h)" },
    { label: "Début d'après-midi (14h-16h)", value: "Début d'après-midi (14h-16h)" },
    { label: "Fin d'après-midi (16h-18h)", value: "Fin d'après-midi (16h-18h)" },
    { label: "Soirée (18h-20h)", value: "Soirée (18h-20h)" }
  ];

  const foodOptions: FoodOption[] = [
 { label: "Lactel 1L", value: "Lactel 1L" },
    { label: "Paquet de pates Panzani", value: "Paquet de pates Panzani" },
    { label: "Paquet de riz Basmati", value: "Paquet de riz Basmati" },
    { label: "Snickers pack", value: "Snickers pack" },
    { label: "Jus d'orange 1L", value: "Jus d'orange 1L" },
    { label: "Pommes (1kg)", value: "Pommes (1kg)" },
    { label: "Poulet entier", value: "Poulet entier" },
    { label: "Yaourt nature", value: "Yaourt nature" },
    { label: "Pain de mie", value: "Pain de mie" },
    { label: "Salade verte", value: "Salade verte" },
    { label: "Céréales petit-déjeuner", value: "Céréales petit-déjeuner" },
    { label: "Poisson en conserve", value: "Poisson en conserve" }  ];

  const handleAddToPanier = (food: string, quantity: number) => {
    if (food !== "" && !selectedFoodsList.some((item) => item.food === food)) {
      setSelectedFoodsList([{ food, quantity }, ...selectedFoodsList]);
    }
  };

  const handleAddToSlotsList = () => {
    if (selectedDate && selectedTimeSlot) {
      const formattedDate = formatDate(new Date(selectedDate));
      const slotInfo = `${formattedDate} ${selectedTimeSlot}`;
      setSelectedSlotsList([{ day: formattedDate, slot: slotInfo }, ...selectedSlotsList]);
      setSelectedDate(null); // Réinitialiser la date à null
      setSelectedTimeSlot(null); // Réinitialiser l'heure à null
      setPlaceholderText("Choisissez une date"); // Réinitialiser le texte du placeholder
    }
  };

  useEffect(() => {
    setSelectedDate(tempSelectedDate);
  }, [tempSelectedDate]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>FYN</Text>
          <Text style={styles.subtitle}>Feed your neighbour</Text>
          <Text style={styles.subtitle}>Créer un panier</Text>

          <View style={styles.formContainer}>
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Choix d'aliment :</Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{ label: "Choisissez un aliment", value: null }}
                items={foodOptions}
                onValueChange={(value) => setSelectedFood(value)}
                value={selectedFood}
              />
            </View>

            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Quantité :</Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{ label: "Sélectionnez la quantité", value: null }}
                items={[
                  { label: "1", value: 1 },
                  { label: "2", value: 2 },
                  { label: "3", value: 3 },
                ]}
                onValueChange={(value) => setSelectedQuantity(value)}
                value={selectedQuantity}
              />
            </View>

            <TouchableOpacity
              style={styles.createButton}
              onPress={() => handleAddToPanier(selectedFood as string, selectedQuantity)}
            >
              <Text style={styles.buttonText}>Ajouter au panier</Text>
            </TouchableOpacity>

            {selectedFoodsList.length > 0 && (
              <View style={styles.selectedFoodsContainer}>
                <Text style={styles.label}>Aliments sélectionnés :</Text>
                  {selectedFoodsList.map((item, index) => (
                    <View key={index} style={styles.selectedFoodItem}>
                      <Text style={styles.selectedFoodText}>
                        {item.food} - Quantité: {item.quantity}
                      </Text>
                    </View>
                  ))}
              </View>
            )}
            <Text style={styles.additionalText}>
              This is additional text below the form and the selected foods list.
            </Text>

            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Date de livraison :</Text>
              <RNPickerSelect
                style={{
                  ...pickerSelectStyles,
                  inputIOS: {
                    ...pickerSelectStyles.inputIOS,
                    color: selectedDate ? '#15A370' : '#000000',
                  },
                  inputAndroid: {
                    ...pickerSelectStyles.inputAndroid,
                    color: selectedDate ? '#15A370' : '#000000',
                  },
                }}
                placeholder={{
                  label: placeholderText,
                  value: null,
                  disabled: true, // Rend le placeholder non sélectionnable
                }}
                items={dateOptions}
                onValueChange={(value) => {
                  setTempSelectedDate(value);
                  setSelectedDate(value);
                  setPlaceholderText(formatDate(new Date(value)));
                }}
                value={tempSelectedDate}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Créneau de livraison :</Text>
              <RNPickerSelect
              style={pickerSelectStyles}
              placeholder={{ label: "Sélectionnez le créneau", value: null }}
              items={timeSlotOptions}
              onValueChange={(value) => setSelectedTimeSlot(value)}
              value={selectedTimeSlot}
              />
            </View>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => handleAddToSlotsList()}
            >
            <Text style={styles.buttonText}>Ajouter un créneau</Text>
            </TouchableOpacity>
            {selectedSlotsList.length > 0 && (
            <View style={styles.selectedFoodsContainer}>
              <Text style={styles.label}>Créneaux sélectionnés :</Text>
              {selectedSlotsList.map((item, index) => (
                <View key={index} style={styles.selectedFoodItem}>
                  <Text style={styles.selectedFoodText}>{item.slot}</Text>
                </View>
              ))}
            </View>
          )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#15A370",
    color: "#15A370",
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputAndroid: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#15A370",
    color: "#15A370",
    fontSize: 18,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

const styles = StyleSheet.create({
  additionalText: {
    marginTop: 20,
    fontSize: 16,
    color: "white",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
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
  dropdownContainer: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
  selectedFoodsContainer: {
    marginTop: 20,
  },
  selectedFoodItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedFoodText: {
    fontSize: 18,
    color: "#15A370",
  },
  createButton: {
    backgroundColor: "#15A370",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
