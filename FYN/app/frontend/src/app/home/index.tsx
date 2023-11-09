import { Button, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from 'expo-router';

import { Link } from 'expo-router';

export default function homePage() {

    return (
        <View style={styles.container}>
            <Text style={styles.autre}>Home Page</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    autre: {
        backgroundColor: 'pink',
        textAlign: 'center',
    }
});
