import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function RegistrationScreen() {
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReview = () => {
    if (
      !userName.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !birthYear.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const currentYear = new Date().getFullYear();
    const parsedBirthYear = Number(birthYear);

    if (!/^\d{4}$/.test(birthYear) || parsedBirthYear < 1900 || parsedBirthYear > currentYear) {
      Alert.alert('Error', 'Please enter a valid 4-digit birth year.');
      return;
    }

    const calculatedAge = currentYear - parsedBirthYear;

    if (calculatedAge < 18) {
      Alert.alert(
        'Age Restriction',
        'You must be at least 18 years old to create an account.'
      );
      return;
    }

    router.push({
      pathname: '/review',
      params: {
        userName: userName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        birthYear,
        age: calculatedAge.toString(),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create Your Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#8A8A8A"
          value={userName}
          onChangeText={setUserName}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#8A8A8A"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#8A8A8A"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Year of Birth (e.g., 2002)"
          placeholderTextColor="#8A8A8A"
          keyboardType="numeric"
          maxLength={4}
          value={birthYear}
          onChangeText={setBirthYear}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#8A8A8A"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#8A8A8A"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <View style={styles.button}>
          <Button title="Review Details" onPress={handleReview} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: { flex: 1, backgroundColor: '#fff' },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 15, borderRadius: 8 },
  button: { marginTop: 4 },
});