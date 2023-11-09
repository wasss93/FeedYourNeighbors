import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { Link } from 'expo-router';

export default function index() {


    return (
        <View style={styles.container}>
            <Link href="/home" asChild>
                <Pressable>
                    <Text style={styles.autre}>Go to Home</Text>
                </Pressable>
            </Link>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    autre: {
        backgroundColor: 'green',
        textAlign: 'center',
        fontSize: 22,
    }
});