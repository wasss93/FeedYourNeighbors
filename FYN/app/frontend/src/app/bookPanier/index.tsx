import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Switch } from "react-native";

interface SelectedFoodItem {
  food: string;
  quantity: number;
  ean: string;
}

type FoodInfo = {
  food: string;
  quantity: number;
  ean: string;
};

const BookPanierPage = () => {
  const [selectedFoodInfo, setSelectedFoodInfo] = useState<FoodInfo | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [dateVisibility, setDateVisibility] = useState({});
  const [selectedSlotModalVisible, setSelectedSlotModalVisible] = useState(false);
  const [foodModalVisible, setFoodModalVisible] = useState(false); // Nouvel état pour la modal de la nourriture
  const [nutritionInfo, setNutritionInfo] = useState<any>(null); // Utilisez un type plus précis pour les informations nutritionnelles


  const jsonContent = {
    selectedFoodsList: [
      { food: "Céréales petit-déjeuner", quantity: 3, ean: "3270190021438" },
      { food: "Lactel 1L", quantity: 3, ean: "3270190021438" },
      { food: "Paquet de riz Basmati", quantity: 3, ean: "3270190021438" },
      { food: "Pommes (1kg)", quantity: 3, ean: "3270190021438" },
      { food: "Pâtes (500g)", quantity: 3, ean: "3270190021438"},
      { food: "Purée de tomates (500g)", quantity: 3, ean: "3270190021438"},
      { food: "Pois chiches (500g)", quantity: 3, ean: "3270190021438"},
      { food: "Haricots rouges (500g)", quantity: 3, ean: "3270190021438"},
      { food: "Lentilles (500g)", quantity: 3, ean: "3270190021438"},
    ],
    selectedSlotsList: [
      {
        day: "07/12/2023",
        slot: { dateDebut: "14:00", dateEnd: "16:00" }
      },
      {
        day: "03/12/2023",
        slot: { dateDebut: "16:00", dateEnd: "18:00" }
      },
      {
        day: "02/12/2023",
        slot: { dateDebut: "16:00", dateEnd: "18:00" }
      },
      {
        day: "03/12/2023",
        slot: { dateDebut: "10:00", dateEnd: "11:00" }
      },
    ]
  };

  const [sortedDays, setSortedDays] = useState<string[]>([]);

  useEffect(() => {
    const initialVisibility: { [key: string]: boolean } = {};
    sortedDays.forEach(day => {
      initialVisibility[day] = false;
    });
    setDateVisibility(initialVisibility);
  }, [sortedDays]);

  useEffect(() => {
    const days = [...new Set(jsonContent.selectedSlotsList.map(item => item.day))].sort();
    setSortedDays(days);
  }, []);

  const generateSubSlots = (start: string, end: string) => {
    const subSlots = [];
    let currentTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);

    while (currentTime < endTime) {
      const slotStart = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      currentTime.setMinutes(currentTime.getMinutes() + 15);
      const slotEnd = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      subSlots.push({ slotStart, slotEnd });
    }

    return subSlots;
  };

  const handleSlotReservation = () => {
    if (selectedDay && selectedTimeSlot) {
      const [startTime, endTime] = selectedTimeSlot.split(' à ');

      const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      };

      const formatDate = (day: string) => {
        const [dayStr, monthStr, yearStr] = day.split('/');
        return `${yearStr}-${monthStr.padStart(2, '0')}-${dayStr.padStart(2, '0')}`;
      };

      const dateBegin = `${formatDate(selectedDay)}T${formatTime(startTime)}:00`;
      const dateEnd = `${formatDate(selectedDay)}T${formatTime(endTime)}:00`;

      console.log({ dateBegin, dateEnd });

      // Vous pouvez également enregistrer ces données dans un fichier JSON ici

      setSelectedSlotModalVisible(false);
    }
  };

  const showFoodModal = async (foodInfo: { food: string; quantity: number; ean: string; }) => {
    setSelectedFoodInfo(foodInfo);
    var api_key = "0ad5af6f3a7a484a95519fa67a64c39f";
    try {
      const response = await fetch(`https://api.spoonacular.com/food/products/upc/${foodInfo.ean}?apiKey=${api_key}&includeNutrition=true`);
      const data = await response.json();
      console.log(data);
      setNutritionInfo(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations nutritionnelles :", error);
      setNutritionInfo(null);
    }
  
    setFoodModalVisible(true); // Corrected from setFoodModalVisible to setModalVisible
  };

  const hideFoodModal = () => {
    setSelectedFoodInfo(null);
    setFoodModalVisible(false); // Cacher la modal de la nourriture
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>FYN</Text>
        <Text style={styles.subtitle}>Feed your neighbour</Text>
        <Text style={styles.subtitle}>Réserver un panier</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Aliments présents dans le panier :</Text>
          {jsonContent.selectedFoodsList.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => showFoodModal(item)}
              activeOpacity={0.7}
            >
              <View style={styles.clickableItem}>
                <Text>{item.food} - Quantité: {item.quantity}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <Text style={styles.label}>Créneaux sélectionnés :</Text>
          {sortedDays.map((day, index) => (
            <View key={index}>
              <View style={styles.dayContainer}>
                <Text style={styles.dayLabel}>{day}</Text>
                <Switch
                  value={dateVisibility[day as keyof typeof dateVisibility] || false}
                  onValueChange={(value) => setDateVisibility({ ...dateVisibility, [day]: value })}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={dateVisibility[day as keyof typeof dateVisibility] ? "#f5dd4b" : "#f4f3f4"}
                />
              </View>
              {jsonContent.selectedSlotsList
                .filter(item => item.day === day)
                .map((item, innerIndex) => (
                  <View key={innerIndex}>
                    {dateVisibility[day as keyof typeof dateVisibility] ? (
                      // Affichez tous les sous-créneaux lorsque la date est visible
                      generateSubSlots(item.slot.dateDebut, item.slot.dateEnd).map((subSlot, subIndex) => (
                        <TouchableOpacity
                          key={subIndex}
                          onPress={() => {
                            // Mettez à jour l'état avec les informations du sous-créneau sélectionné
                            setSelectedDay(day);
                            setSelectedTimeSlot(`${subSlot.slotStart} à ${subSlot.slotEnd}`);
                            setSelectedSlotModalVisible(true);
                          }}
                        >
                          <View style={styles.infoItem}>
                            <Text>
                              De {subSlot.slotStart} à {subSlot.slotEnd}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    ) : null}
                  </View>
                ))}
            </View>
          ))}
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={selectedSlotModalVisible}
          onRequestClose={() => setSelectedSlotModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            {/* Utilisez les informations du sous-créneau sélectionné dans votre modal */}
            <Text style={styles.modalText}>
              Selected Day: {selectedDay}
            </Text>
            <Text style={styles.modalText}>
              Selected Time Slot: {selectedTimeSlot}
            </Text>
            
            <TouchableOpacity onPress={handleSlotReservation} style={styles.modalReserveButton}>
              <Text style={styles.modalReserveButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedSlotModalVisible(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
        animationType="slide"
        transparent={false}
        visible={foodModalVisible}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15A370",
    alignItems: "center",
    justifyContent: "center",
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
  infoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
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
  infoItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  clickableItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dayLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "white",
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalReserveButton: {
    backgroundColor: '#4CAF50', // Couleur de fond du bouton
    padding: 10, // Remplissage du bouton
    borderRadius: 5, // Bord arrondi du bouton
    marginTop: 20, // Marge en haut du bouton
  },
  // Ajoutez un style pour le texte du bouton "Submit"
  modalReserveButtonText: {
    color: 'white', // Couleur du texte
    fontSize: 18, // Taille du texte
    textAlign: 'center', // Alignement du texte au centre
  },
});

export default BookPanierPage;
