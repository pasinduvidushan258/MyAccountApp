import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ReviewScreen() {
  const router = useRouter();
  const { userName, email, phoneNumber, birthYear, age } = useLocalSearchParams();

  const handleConfirm = () => {
    const numericAge = Number(age);
    if (!Number.isFinite(numericAge) || numericAge < 18) {
      Alert.alert(
        'Age Restriction',
        'You must be at least 18 years old to proceed.'
      );
      return;
    }

    router.push({
      pathname: '/success',
      params: { userName },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Review Your Details</Text>

      <View style={styles.card}>
        <Text style={styles.detail}>Username: {userName}</Text>
        <Text style={styles.detail}>Email: {email}</Text>
        <Text style={styles.detail}>Phone: {phoneNumber}</Text>
        <Text style={styles.detail}>Year of Birth: {birthYear}</Text>
        <Text style={styles.detail}>Age: {age}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Edit Info" color="red" onPress={() => router.back()} />
        <Button title="Confirm & Submit" onPress={handleConfirm} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#f9f9f9', padding: 20, borderRadius: 8, marginBottom: 20 },
  detail: { fontSize: 16, marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
});