import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Switch, ActivityIndicator } from "react-native";

interface SelectedFoodItem {
  food: string;
  quantity: number;
  ean: string;
}

type FoodInfo = {
  item: string;
  quantite: number; 
  codeEAN: string;
};

const BookPanierPage = () => {
  const [selectedFoodInfo, setSelectedFoodInfo] = useState<FoodInfo | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [dateVisibility, setDateVisibility] = useState({});
  const [selectedSlotModalVisible, setSelectedSlotModalVisible] = useState(false);
  const [foodModalVisible, setFoodModalVisible] = useState(false); // Nouvel état pour la modal de la nourriture
  const [nutritionInfo, setNutritionInfo] = useState<any>(null); // Utilisez un type plus précis pour les informations nutritionnelles
  const [jsonContent, setJsonContent] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const formatDateToWords = (dateString: string | number | Date) => {
    const daysOfWeek = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
  
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${dayOfWeek} ${day} ${month} ${year}`;
  };
  

  const reservationPanier = async () => {
    console.log('Selected Day:', selectedDay);
    const [startTime, endTime] = (selectedTimeSlot || "").split(' à ');

    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':');
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    };

    const dateBegin = `${selectedDay} ${formatTime(startTime)}:00`;
    const dateEnd = `${selectedDay} ${formatTime(endTime)}:00`;
    console.log({ dateBegin, dateEnd });
    console.log("id", jsonContent.id);
    const params = {
      "announcement_id": jsonContent.id,
      "start": dateBegin,
      "end": dateEnd,
      "status": 0,
      "comment": " ",
    };
    const header = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDIwNDU5MzcsImV4cCI6MTcwMjA0OTUzNywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlcjVAZ21haWwuY29tIn0.HjAKJXC2oiRs7YRlJlUslt7yzDF5sW8Eahvw1jQglpYKjQNKQZDwZzcx4336VtvLGHq453KpZsHby8RW_2rRrkGi3GljvRFJxKS2mLKMk4iQCK9SCC-Qnl6Sshd9O_UvHnH1LdD_6g-ZUKhXHnnumRoLZkOGUlK9bL5PKd1N8SwTBYZRUzVnS8UfFmuqZ520aaW-1Jvr2AwNnFwk8aqBuEXRHtz5O-F4i2E97bm4oG04bAI47ITkYCudt3yCHC8roujGSX48zvdIrt07a5fyBttbtXyfqYNnAHjd9hKtF6ma81d5hwnVfqKJbktXMh5REa7n-ZiSulooZoCasDy3sw'
        }
      }
    const apiURL = 'https://b287-163-5-23-68.ngrok-free.app/api/reservations/createReservation';
    try {
      const response = await axios.post(apiURL, params, header);
      const data = await response.data;
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error making the request:', error);
    }
  }




  const getBookedPanier = async () => {
    const params = {
      id_announcement: 65,
    };
    const header = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDIwNDU5MzcsImV4cCI6MTcwMjA0OTUzNywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlcjVAZ21haWwuY29tIn0.HjAKJXC2oiRs7YRlJlUslt7yzDF5sW8Eahvw1jQglpYKjQNKQZDwZzcx4336VtvLGHq453KpZsHby8RW_2rRrkGi3GljvRFJxKS2mLKMk4iQCK9SCC-Qnl6Sshd9O_UvHnH1LdD_6g-ZUKhXHnnumRoLZkOGUlK9bL5PKd1N8SwTBYZRUzVnS8UfFmuqZ520aaW-1Jvr2AwNnFwk8aqBuEXRHtz5O-F4i2E97bm4oG04bAI47ITkYCudt3yCHC8roujGSX48zvdIrt07a5fyBttbtXyfqYNnAHjd9hKtF6ma81d5hwnVfqKJbktXMh5REa7n-ZiSulooZoCasDy3sw'
      }
    }
    const apiURL = 'https://b287-163-5-23-68.ngrok-free.app/api/announcement/getAnnouncementById';
    try {
      const response = await axios.post(apiURL, params, header);
      const data = await response.data;
      console.log('Response data:', data);
      setJsonContent(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error('Error making the request:', error);
    }
  };

  const selectedFoodsList = jsonContent?.contenu || [];
  const selectedSlotsList = jsonContent?.creneaux || [];

  const [sortedDays, setSortedDays] = useState<string[]>([]);

  useEffect(() => {
    const initialVisibility: { [key: string]: boolean } = {};
    sortedDays.forEach(day => {
      initialVisibility[day] = false;
    });
    setDateVisibility(initialVisibility);
  }, [sortedDays]);

  useEffect(() => {
    if (jsonContent && selectedSlotsList) {
      const days = [...new Set(selectedSlotsList.map((item: { day: any }) => item.day))].sort() as string[];
      setSortedDays(days);
    }
  }, [jsonContent]);

  useEffect(() => {
    getBookedPanier();
    console.log(1111, jsonContent);
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

  // const handleSlotReservation = () => {
  //   if (selectedDay && selectedTimeSlot) {
  //     const [startTime, endTime] = selectedTimeSlot.split(' à ');

  //     const formatTime = (time: string) => {
  //       const [hours, minutes] = time.split(':');
  //       return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  //     };

  //     const formatDate = (day: string) => {
  //       const [dayStr, monthStr, yearStr] = day.split('/');
  //       return `${yearStr}-${monthStr.padStart(2, '0')}-${dayStr.padStart(2, '0')}`;
  //     };

  //     const dateBegin = `${formatDate(selectedDay)}T${formatTime(startTime)}:00`;
  //     const dateEnd = `${formatDate(selectedDay)}T${formatTime(endTime)}:00`;

  //     console.log({ dateBegin, dateEnd });
  //     // const dataPanier = getBookedPanier();
  //     // console.log(2222, dataPanier);
  //     // Vous pouvez également enregistrer ces données dans un fichier JSON ici

  //     setSelectedSlotModalVisible(false);
  //   }
  // };

  const showFoodModal = async (foodInfo: { item: string; quantite: number; codeEAN: string;}) => {
    setSelectedFoodInfo(foodInfo);
    var api_key = "0ad5af6f3a7a484a95519fa67a64c39f";
    try {
      const response = await fetch(`https://api.spoonacular.com/food/products/upc/${foodInfo.codeEAN}?apiKey=${api_key}&includeNutrition=true`);
      const data = await response.json();
      console.log("ddddd", data);
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
      {loading ? (
         <View style={styles.loadingContainer}>
         <ActivityIndicator size="large" color="#15A370" />
          </View>
      ) : (
        <View style={styles.container}>
          
          
      <View style={styles.container}>
        <Text style={styles.title}>FYN</Text>
        <Text style={styles.subtitle}>Feed your neighbour</Text>
        <Text style={styles.subtitle}>Réserver un panier</Text>

        <View style={styles.infoContainer}>
        <Text style={styles.label}>Aliments présents dans le panier :</Text>
              {selectedFoodsList.map((item: { item: string; quantite: number; codeEAN: string; size: string }, index: React.Key | null | undefined) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => showFoodModal(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.productContainer}>
                    <Text>{item.item} - Quantité: {item.quantite}</Text>
                  </View>
                </TouchableOpacity>
          ))}

          <Text style={styles.label}>Choisissez la date qui vous couvient puis réservez un créneau !</Text>
          {sortedDays.map((day, index) => (
            <View key={index}>
              <View style={styles.dayContainer}>
              <Text style={styles.dayLabel}>{formatDateToWords(day)}</Text>
                <Switch
                  value={dateVisibility[day as keyof typeof dateVisibility] || false}
                  onValueChange={(value) => setDateVisibility({ ...dateVisibility, [day]: value })}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={dateVisibility[day as keyof typeof dateVisibility] ? "#f5dd4b" : "#f4f3f4"}
                />
              </View>
              {selectedSlotsList
                .filter((item: { day: string; }) => item.day === day)
                .map((item: { slot: { dateDebut: string; dateEnd: string; }; }, innerIndex: React.Key | null | undefined) => (
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
            
            <TouchableOpacity onPress={reservationPanier} style={styles.modalReserveButton}>
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
            Selected Food: {nutritionInfo?.item?.name || selectedFoodInfo?.item}
          </Text>
          <Text style={styles.modalText}>
            Quantity: {selectedFoodInfo?.quantite}
          </Text>
          <Text style={styles.modalText}>
            EAN: {selectedFoodInfo?.codeEAN}
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
      </View>
        )}
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
    textAlign: "center",
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    height: 50, 
    width: 300, // Ajustez la largeur en fonction de vos besoins
  },
});

export default BookPanierPage;
