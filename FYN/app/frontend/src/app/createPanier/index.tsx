import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, TouchableHighlight, TouchableWithoutFeedback  } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import codegenNativeCommands from "react-native/Libraries/Utilities/codegenNativeCommands";
import axios from "axios";

interface TimeSlotOption {
  label: string;
  value: string;
}

interface FoodOption {
  label: string;
  value: string;
  ean: string;
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
  const [selectedFoodsList, setSelectedFoodsList] = useState<{ item: string; quantite: number, codeEAN: string}[]>([]);
  const [tempSelectedDate, setTempSelectedDate] =  useState(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [placeholderText, setPlaceholderText] = useState("Choisissez une date");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedSlotsList, setSelectedSlotsList] = useState<{ day: string; slot: { dateDebut: string; dateEnd: string } }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFoodInfo, setSelectedFoodInfo] = useState<{ food: string; quantity: number; ean: string } | null>(null);
  const [nutritionInfo, setNutritionInfo] = useState<any>(null); // Utilisez un type plus précis pour les informations nutritionnelles

  const showFoodModal = async (foodInfo: { food: string; quantity: number; ean: string }) => {
    setSelectedFoodInfo(foodInfo);
    var api_key = "0ad5af6f3a7a484a95519fa67a64c39f";
    try {
      const response = await fetch(`https://api.spoonacular.com/food/products/upc/${foodInfo.ean}?apiKey=${api_key}&includeNutrition=true`);
      const data = await response.json();
      console.log("data", data);
      setNutritionInfo(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations nutritionnelles  :", error);
      setNutritionInfo(null);
    }
  
    setModalVisible(true);
  };

  const hideFoodModal = () => {
    setSelectedFoodInfo(null);
    setModalVisible(false);
  };

  const handleContinue = async () => {
    console.log("jjjjjjj");
    const formData = {
      selectedFoodsList,
      selectedSlotsList,
      // Add other fields if needed
    };
    const params = {
      "complement":"complement 2",
      "description":"Ceci est une test description",
      "title":"ceci est un autre titre test",
      "ville":"Neuilly-Plaisance",
      "numero_rue":"29 bis",
      "categorie":"patates zakia",
      "rue":"boulevard gallieni",
      "code_postal":"93360",
      "allergenes":true,
      "status":0,
      "contenu": selectedFoodsList,
      "liste_creneaux": selectedSlotsList,
    };


    const apiURL = 'https://b287-163-5-23-68.ngrok-free.app/api/announcement/createAnnouncement';
    try{
      const header = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDIwNDU3NzUsImV4cCI6MTcwMjA0OTM3NSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlckBnbWFpbC5jb20ifQ.U2JBxBXawnksz9sDTGQiBY6Q3HkHmNO1I38ZyX-avzaP2XbGDj6cvk4MVtVX2BhoJ0eTXyjJC_2xOttnQrnx95O5TvRBiInP3svqKdCouRW4l7-R-Ff-_xtENIMVxytrJ-7WVqO9CJV_Y8_-x8QbMPXpUvYHAsACJnNsriMas2fc0jKtsjFgI8OClEq_m5cq2kJnLWtWyTohuuGJbQeYI9vWO7DR8cVWNg5ADGNfNP_DGOohZl4vn92IoC65u-JVTj3gRRUBZNrCFetz8ze0T1pnYYXF8bzwrgv1AZfPGmVPLpEd1BP5zG7P8UX1l4SS3slMDia31dapXWL-6KgnSA'
        }
      }
      const response = await axios.post(apiURL, params, header);
      console.log(response.data, response.status);
    }
    catch(error){
      console.error('err', error);
    }
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
    { label: "Lactel 1L", value: "Lactel 1L", ean: "3428272000059" },
    { label: "Paquet de pates Panzani", value: "Paquet de pates Panzani", ean: "3038350013606" },
    { label: "Paquet de riz Basmati", value: "Paquet de riz Basmati", ean: "3038359010408" },
    { label: "Snickers pack", value: "Snickers pack", ean: "5000159452540" },
    { label: "Jus d'orange 1L", value: "Jus d'orange 1L", ean: "3168930156376" },
    { label: "Pommes (1kg)", value: "Pommes (1kg)", ean: "3276550063636" },
    { label: "Poulet entier", value: "Poulet entier", ean: "3560070739394" },
    { label: "Yaourt nature", value: "Yaourt nature", ean: "3596710047826" },
    { label: "Pain de mie", value: "Pain de mie", ean: "3270190021438" },
    { label: "Salade verte", value: "Salade verte", ean: "3280223110077" },
    { label: "Céréales petit-déjeuner", value: "Céréales petit-déjeuner", ean: "7613034947611" },
    { label: "Poisson en conserve", value: "Poisson en conserve", ean: "3560070808731" },
    { label: "Purée de tomates", value: "Purée de tomates", ean: "3560070323289" },
    { label: "Compote de pommes", value: "Compote de pommes", ean: "3270190181262" },
  ];

  const handleAddToPanier = (item: string, quantite: number, codeEAN: string) => {
    if (item && quantite && !selectedFoodsList.some((items) => items.item === item)) {
      setSelectedFoodsList([{ item, quantite, codeEAN }, ...selectedFoodsList]);
    }
  };

  const handleAddToSlotsList = () => {
    if (selectedDate && selectedTimeSlot) {
      const formattedDate = new Date(selectedDate);
      const slotStart = new Date(formattedDate);
      const slotEnd = new Date(formattedDate);

      // Set the start time based on the selected time slot
      switch (selectedTimeSlot) {
        case 'Matin tôt (8h-10h)':
          slotStart.setHours(8, 0, 0, 0);
          slotEnd.setHours(10, 0, 0, 0);
          break;
        case 'Mi-matinée (10h-12h)':
          slotStart.setHours(10, 0, 0, 0);
          slotEnd.setHours(12, 0, 0, 0);
          break;
        case 'Début d\'après-midi (14h-16h)':
          slotStart.setHours(14, 0, 0, 0);
          slotEnd.setHours(16, 0, 0, 0);
          break;
        case 'Fin d\'après-midi (16h-18h)':
          slotStart.setHours(16, 0, 0, 0);
          slotEnd.setHours(18, 0, 0, 0);
          break;
        case 'Soirée (18h-20h)':
          slotStart.setHours(18, 0, 0, 0);
          slotEnd.setHours(20, 0, 0, 0);
          break;
        default:
          // Handle other cases if needed
      }

      const slotInfo = {
        day: formattedDate.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-'),
        slot: {
          dateDebut: slotStart.toLocaleString('fr-FR', { hour: 'numeric', minute: 'numeric', second: 'numeric' }),
          dateEnd: slotEnd.toLocaleString('fr-FR', { hour: 'numeric', minute: 'numeric', second: 'numeric' }),
        },
      };
      
      console.log("slotInfo + " + slotInfo.day + " " + slotInfo.slot.dateDebut + " " + slotInfo.slot.dateEnd);
      setSelectedSlotsList([slotInfo, ...selectedSlotsList]);
      setSelectedDate(null); // Réinitialise la date de livraison à null
      setSelectedTimeSlot(null); // Réinitialise le créneau de livraison à null
      setPlaceholderText("Choisissez une date");
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
              onPress={() => handleAddToPanier(selectedFood as string, selectedQuantity, foodOptions.find((item) => item.value === selectedFood)?.ean as string)}
            >
              <Text style={styles.buttonText}>Ajouter au panier</Text>
            </TouchableOpacity>

            {selectedFoodsList.length > 0 && (
              <View style={styles.selectedFoodsContainer}>
                <Text style={styles.label}>Aliments sélectionnés :</Text>
                {selectedFoodsList.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => showFoodModal({ food: item.item, quantity: item.quantite, ean: foodOptions
                .find((option) => option.value === item.item)?.ean as string })}
              style={styles.touchableFoodItem}
            >
              <View style={styles.selectedFoodItem}>
                <Text style={styles.selectedFoodText}>
                  {item.item} - Quantité: {item.quantite}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
              </View>
            )}
<Modal
  animationType="slide"
  transparent={false}
  visible={modalVisible}
  onRequestClose={hideFoodModal}
>
  <View style={styles.modalContainer}>
    <Text style={styles.modalText}>
      Selected Food: {nutritionInfo?.title}
    </Text>
    <Text style={styles.modalText}>
      Quantity: {selectedFoodInfo?.quantity}
    </Text>
    <Text style={styles.modalText}>
      EAN: {selectedFoodInfo?.ean}
    </Text>
    {nutritionInfo && nutritionInfo.nutrition && nutritionInfo.nutrition.nutrients && (
      <>
        <Text style={styles.modalText}>Nutrition Information:</Text>
        {nutritionInfo.nutrition.nutrients.map((nutrient: any, index: number) => (
          <Text key={index} style={styles.modalText}>
            {nutrient.name}: {nutrient.amount} {nutrient.unit}
          </Text>
        ))}
      </>
    )}
    {/* <Text style={styles.modalText}>
      JSON Information:
      {JSON.stringify(nutritionInfo, null, 2)}
    </Text> */}
    <TouchableOpacity onPress={hideFoodModal}>
      <Text style={styles.modalCloseText}>Close</Text>
    </TouchableOpacity>
  </View>
</Modal>

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
                  disabled: true,
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
                items={[
                  { label: "Matin tôt (8h-10h)", value: "Matin tôt (8h-10h)" },
                  { label: "Mi-matinée (10h-12h)", value: "Mi-matinée (10h-12h)" },
                  { label: "Début d'après-midi (14h-16h)", value: "Début d'après-midi (14h-16h)" },
                  { label: "Fin d'après-midi (16h-18h)", value: "Fin d'après-midi (16h-18h)" },
                  { label: "Soirée (18h-20h)", value: "Soirée (18h-20h)" },
                ]}
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
                  <Text style={styles.selectedFoodText}>
                    {item.day} - De {item.slot.dateDebut} à {item.slot.dateEnd}
                  </Text>
                </View>
                
                ))}
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleContinue()}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
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
    marginBottom: 20, // Add margin bottom for spacing
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
 submitButton: {
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#15A370',
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  modalCloseText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
  },
   touchableFoodItem: {
    opacity: 3, 
  },
  touchableCloseButton: {
    opacity: 0.7,
  },
});
