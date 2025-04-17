import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';
import { DivvyColors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const SignUpScreen = ({ navigation, setIsLoggedIn }: any) => {
  const { setUser } = useUser();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    dob: new Date(),
    phone: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | Date) => {
    if (showDatePicker && field !== 'dob') setShowDatePicker(false);
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handlePhoneChange = (input: string) => {
    const formatted = formatPhoneNumber(input);
    handleInputChange('phone', formatted);

    if (formatted.replace(/\D/g, '').length < 10) {
      setFormErrors((prev) => ({ ...prev, phone: 'Phone number must be 10 digits.' }));
    } else {
      setFormErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const calculateAge = (date: Date) => {
    const diff = Date.now() - date.getTime();
    return new Date(diff).getUTCFullYear() - 1970;
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const age = calculateAge(form.dob);

    if (!form.first_name) errors.first_name = 'Required';
    if (!form.last_name) errors.last_name = 'Required';

    if (!form.phone || form.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Phone number must be 10 digits.';
    }

    if (!form.email.includes('@') || !form.email.includes('.')) {
      errors.email = 'Email not valid.';
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(?=.{10,})/;
    if (!passwordRegex.test(form.password)) {
      errors.password = 'Password must include a capital letter, number, symbol, and be at least 10 characters.';
    }

    if (confirmPassword !== form.password) {
      errors.confirm = 'Passwords do not match.';
    }

    if (age < 16) {
      errors.dob = 'You must be at least 16 years old.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      Alert.alert('Invalid Submission', 'Please fix one or more fields and try again.');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    const { email, password, first_name, last_name, phone, dob } = form;
    setIsLoading(true);

    try {
      const payload = {
        first_name,
        last_name,
        email,
        phone,
        password,
        dob: dob.toISOString().split('T')[0],
      };

      const signUpResponse = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!signUpResponse.ok) {
        const errorData = await signUpResponse.json();
        throw new Error(errorData.detail || 'Sign up failed');
      }

      const loginResponse = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const { access_token, user } = await loginResponse.json();
      await AsyncStorage.setItem('token', access_token);
      setUser(user);
      setIsLoggedIn(true);
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Let's get you started</Text>
            </View>

            <View style={styles.formContainer}>
              <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="#888" onChangeText={(text) => handleInputChange('first_name', text)} />
              {formErrors.first_name && <Text style={styles.error}>{formErrors.first_name}</Text>}
              

              <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="#888" onChangeText={(text) => handleInputChange('last_name', text)} />
              {formErrors.last_name && <Text style={styles.error}>{formErrors.last_name}</Text>}

              <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => handleInputChange('email', text)} />
              {formErrors.email && <Text style={styles.error}>{formErrors.email}</Text>}

              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputRow}>
                <Text style={styles.dateText}>{form.dob.toDateString()}</Text>
              </TouchableOpacity>
              {formErrors.dob && <Text style={styles.error}>{formErrors.dob}</Text>}

              {showDatePicker && (
                <DateTimePicker
                  value={form.dob}
                  mode="date"
                  display="spinner"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    if (Platform.OS !== 'ios') setShowDatePicker(false);
                    if (selectedDate) handleInputChange('dob', selectedDate);
                  }}
                />
              )}

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
                value={form.phone}
                onFocus={() => setShowDatePicker(false)}
                onChangeText={handlePhoneChange}
              />
              {formErrors.phone && <Text style={styles.error}>{formErrors.phone}</Text>}

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#888"
                  secureTextEntry={!showPassword}
                  onChangeText={(text) => handleInputChange('password', text)}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#6C757D" />
                </TouchableOpacity>
              </View>
              {formErrors.password && <Text style={styles.error}>{formErrors.password}</Text>}

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#888"
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color="#6C757D" />
                </TouchableOpacity>
              </View>
              {formErrors.confirm && <Text style={styles.error}>{formErrors.confirm}</Text>}

              <TouchableOpacity style={[styles.signUpButton, isLoading && styles.signUpButtonDisabled]} onPress={handleSignUp} disabled={isLoading}>
                <Text style={styles.signUpButtonText}>{isLoading ? 'Signing up...' : 'Sign Up'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account? <Text style={styles.signInLink} onPress={() => navigation.navigate('Login')}>Log In</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
  },
  formContainer: {
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  inputRow: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 15,
  },
  signUpButton: {
    height: 50,
    backgroundColor: DivvyColors.turquoise,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signUpButtonDisabled: {
    backgroundColor: '#A7E9D9',
    opacity: 0.8,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6C757D',
  },
  signInLink: {
    color: DivvyColors.turquoise,
    fontWeight: '600',
  },
  error: {
    color: '#E53935',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default SignUpScreen;