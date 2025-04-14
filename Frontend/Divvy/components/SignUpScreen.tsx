// import api from '../utils/api';

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   KeyboardAvoidingView,
//   ScrollView,
//   Modal,
//   Image,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { DivvyColors } from '../constants/Colors';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';

// // Navigation type
// type AuthStackParamList = {
//   Login: undefined;
//   SignUp: undefined;
// };

// type SignUpScreenProps = {
//   navigation: StackNavigationProp<AuthStackParamList, 'SignUp'>;
// };

// const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
  
//   // Date picker states
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [date, setDate] = useState(new Date());
//   const [showPickerModal, setShowPickerModal] = useState(false);
//   const [tempDate, setTempDate] = useState(new Date());
  
//   // Month names for picker
//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
  
//   // Generate years for picker (allow users aged 18-100)
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 100 }, (_, i) => currentYear - 18 - i);
  
//   // Generate days based on selected month and year
//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate();
//   };
  
//   const generateDaysArray = () => {
//     const monthIndex = months.indexOf(months[tempDate.getMonth()]);
//     const year = tempDate.getFullYear();
//     const daysCount = getDaysInMonth(monthIndex, year);
//     return Array.from({ length: daysCount }, (_, i) => i + 1);
//   };

//   // Format phone number with dashes
//   const formatPhoneNumber = (input) => {
//     // Remove all non-digit characters
//     const cleaned = input.replace(/\D/g, '');
    
//     // Format with dashes
//     let formatted = '';
//     if (cleaned.length <= 3) {
//       formatted = cleaned;
//     } else if (cleaned.length <= 6) {
//       formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
//     } else {
//       formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
//     }
    
//     return formatted;
//   };

//   const handlePhoneNumberChange = (text) => {
//     const formatted = formatPhoneNumber(text);
//     setPhoneNumber(formatted);
//   };

//   // Handle date changes
//   const handleDateChange = (event, selectedDate) => {
//     if (Platform.OS === 'android') {
//       setShowDatePicker(false);
//     }
    
//     if (selectedDate) {
//       setDate(selectedDate);
//       const formattedDate = selectedDate.toLocaleDateString('en-US', {
//         month: '2-digit',
//         day: '2-digit',
//         year: 'numeric'
//       });
//       setDateOfBirth(formattedDate);
//     }
//   };
  
//   // Handle wheel picker date confirmation
//   const confirmWheelDate = () => {
//     setDate(tempDate);
//     const formattedDate = tempDate.toLocaleDateString('en-US', {
//       month: '2-digit',
//       day: '2-digit',
//       year: 'numeric'
//     });
//     setDateOfBirth(formattedDate);
//     setShowPickerModal(false);
//   };

//   const handleSignUp = async () => {
//     if (!firstName || !lastName || !email || !dateOfBirth || !phoneNumber || !password) {
//       alert('Please fill in all fields');
//       return;
//     }
  
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       alert('Please enter a valid email address');
//       return;
//     }
  
//     const cleanedPhone = phoneNumber.replace(/\D/g, '');
//     if (cleanedPhone.length !== 10) {
//       alert('Please enter a valid 10-digit phone number');
//       return;
//     }
  
//     if (password.length < 8) {
//       alert('Password must be at least 8 characters long');
//       return;
//     }
  
//     const payload = {
//       first_name: firstName,
//       last_name: lastName,
//       email: email,
//       date_of_birth: new Date(dateOfBirth).toISOString(),
//       phone_number: cleanedPhone,
//       password: password,
//     };
  
//     try {
//       const response = await api.post('/users/', payload);
//       console.log('User created:', response.data);
//       alert('Account created successfully!');
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Error creating user:', error.response?.data || error.message);
//       alert(error.response?.data?.detail || 'Failed to create account');
//     }
//   };

//   // const handleSignUp = () => {
//   //   // Validate inputs before processing
//   //   if (!firstName || !lastName || !email || !dateOfBirth || !phoneNumber || !password) {
//   //     alert('Please fill in all fields');
//   //     return;
//   //   }
    
//   //   // Basic email validation
//   //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   //   if (!emailRegex.test(email)) {
//   //     alert('Please enter a valid email address');
//   //     return;
//   //   }
    
//   //   // Phone number validation (should be 10 digits after formatting)
//   //   const cleanedPhone = phoneNumber.replace(/\D/g, '');
//   //   if (cleanedPhone.length !== 10) {
//   //     alert('Please enter a valid 10-digit phone number');
//   //     return;
//   //   }
    
//   //   // Password validation (at least 8 characters)
//   //   if (password.length < 8) {
//   //     alert('Password must be at least 8 characters long');
//   //     return;
//   //   }
    
//   //   // Sign up logic would go here
//   //   console.log('Sign up with:', {
//   //     firstName,
//   //     lastName,
//   //     email,
//   //     dateOfBirth,
//   //     phoneNumber,
//   //     password,
//   //   });
//   // };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* Back button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="arrow-back" size={24} color="#000000" />
//       </TouchableOpacity>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoidingView}
//       >
//         <ScrollView contentContainerStyle={styles.scrollView}>
//           <View style={styles.card}>
//             <View style={styles.headerContainer}>
//               <Text style={styles.title}>Register</Text>
//               <Text style={styles.subtitle}>Create an account to continue!</Text>
//             </View>

//             <View style={styles.formContainer}>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="First Name"
//                   value={firstName}
//                   onChangeText={setFirstName}
//                 />
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Last Name"
//                   value={lastName}
//                   onChangeText={setLastName}
//                 />
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Email"
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                 />
//               </View>

//               <View style={styles.inputContainer}>
//                 <TouchableOpacity
//                   style={styles.fullWidthTouchable}
//                   onPress={() => {
//                     if (Platform.OS === 'ios') {
//                       setShowPickerModal(true);
//                       setTempDate(date);
//                     } else {
//                       setShowDatePicker(true);
//                     }
//                   }}
//                 >
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Date of Birth"
//                     value={dateOfBirth}
//                     editable={false}
//                     pointerEvents="none"
//                   />
//                   <View style={styles.iconButton}>
//                     <Ionicons name="calendar-outline" size={20} color="#6C757D" />
//                   </View>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.inputContainer}>
//                 <View style={styles.phoneInputContainer}>
//                   <TouchableOpacity 
//                     style={styles.countrySelector}
//                     onPress={() => {
//                       // For now just show an alert that only US is supported
//                       alert('Currently only supporting United States (+1)');
//                     }}
//                   >
//                     <Image 
//                       source={require('../assets/images/usa-flag.png')} 
//                       style={styles.countryFlag}
//                     />
//                     <Text style={styles.countryCode}>+1</Text>
//                     <Ionicons name="chevron-down" size={16} color="#6C757D" />
//                   </TouchableOpacity>
//                   <TextInput
//                     style={styles.phoneInput}
//                     placeholder="Phone Number"
//                     value={phoneNumber}
//                     onChangeText={handlePhoneNumberChange}
//                     keyboardType="phone-pad"
//                     maxLength={12} // 10 digits + 2 dashes
//                   />
//                 </View>
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Password"
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry={!showPassword}
//                   autoCapitalize="none"
//                 />
//                 <TouchableOpacity
//                   style={styles.iconButton}
//                   onPress={() => setShowPassword(!showPassword)}
//                 >
//                   <Ionicons
//                     name={showPassword ? 'eye-off-outline' : 'eye-outline'}
//                     size={20}
//                     color="#6C757D"
//                   />
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
//                 <Text style={styles.registerButtonText}>Register</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.footer}>
//             <Text style={styles.footerText}>
//               Already have an account?{' '}
//               <Text
//                 style={styles.loginLink}
//                 onPress={() => navigation.navigate('Login')}
//               >
//                 Log in
//               </Text>
//             </Text>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>

//       {/* Date Picker - Android */}
//       {showDatePicker && Platform.OS === 'android' && (
//         <DateTimePicker
//           value={date}
//           mode="date"
//           display="default"
//           onChange={handleDateChange}
//           maximumDate={new Date(currentYear - 18, 11, 31)}
//           minimumDate={new Date(currentYear - 100, 0, 1)}
//         />
//       )}

//       {/* Date Picker Modal - iOS */}
//       <Modal
//         visible={showPickerModal}
//         transparent={true}
//         animationType="slide"
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.pickerContainer}>
//             <View style={styles.pickerHeader}>
//               <TouchableOpacity onPress={() => setShowPickerModal(false)}>
//                 <Text style={styles.cancelButton}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={confirmWheelDate}>
//                 <Text style={styles.doneButton}>Done</Text>
//               </TouchableOpacity>
//             </View>
            
//             <View style={styles.pickerRow}>
//               <View style={styles.pickerColumn}>
//                 <Picker
//                   selectedValue={months[tempDate.getMonth()]}
//                   onValueChange={(itemValue) => {
//                     const newDate = new Date(tempDate);
//                     newDate.setMonth(months.indexOf(itemValue));
//                     setTempDate(newDate);
//                   }}
//                   style={styles.picker}
//                 >
//                   {months.map((month) => (
//                     <Picker.Item key={month} label={month} value={month} />
//                   ))}
//                 </Picker>
//               </View>
              
//               <View style={styles.pickerColumn}>
//                 <Picker
//                   selectedValue={String(tempDate.getDate())}
//                   onValueChange={(itemValue) => {
//                     const newDate = new Date(tempDate);
//                     newDate.setDate(parseInt(itemValue, 10));
//                     setTempDate(newDate);
//                   }}
//                   style={styles.picker}
//                 >
//                   {generateDaysArray().map((day) => (
//                     <Picker.Item key={day} label={String(day)} value={String(day)} />
//                   ))}
//                 </Picker>
//               </View>
              
//               <View style={styles.pickerColumn}>
//                 <Picker
//                   selectedValue={String(tempDate.getFullYear())}
//                   onValueChange={(itemValue) => {
//                     const newDate = new Date(tempDate);
//                     newDate.setFullYear(parseInt(itemValue, 10));
//                     setTempDate(newDate);
//                   }}
//                   style={styles.picker}
//                 >
//                   {years.map((year) => (
//                     <Picker.Item key={year} label={String(year)} value={String(year)} />
//                   ))}
//                 </Picker>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

import api from '../utils/api';

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { DivvyColors } from '../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { 
  RootStackParamList,
  SignUpScreenNavigationProp 
} from '../types/navigation';
// Navigation type
type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

// type SignUpScreenProps = {
//   navigation: StackNavigationProp<AuthStackParamList, 'SignUp'>;
//   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
// };

type SignUpScreenProps = {
  navigation: SignUpScreenNavigationProp;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation, setIsLoggedIn }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
 const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);


  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 18 - i);

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const generateDaysArray = () => {
    const monthIndex = months.indexOf(months[tempDate.getMonth()]);
    const year = tempDate.getFullYear();
    return Array.from({ length: getDaysInMonth(monthIndex, year) }, (_, i) => i + 1);
  };

  const formatPhoneNumber = (input) => {
    const cleaned = input.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(formatPhoneNumber(text));
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setDateOfBirth(selectedDate); // store actual Date object
    }
    
  };
  const confirmWheelDate = () => {
    setDate(tempDate);
    setDateOfBirth(tempDate); // ✅ store actual Date object
    setShowPickerModal(false);
  };
  
  const handleSignUp = async () => {
    console.log(firstName, lastName)
    const formattedDate = dateOfBirth?.toISOString(); // now this is safe


    const hardcodedPayload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      date_of_birth: "2000-01-01T00:00:00.000Z",
      phone_number: phoneNumber.replace(/\D/g, ''),
      password: password
    };
  
    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hardcodedPayload)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Unknown error');
      }
  
      const result = await response.json();
      console.log("✅ Hardcoded user created:", result);
      alert("User successfully created!");
      // Optionally navigate
      navigation.navigate("Login");
  
    } catch (error) {
      console.error("❌ Error creating user:", error.message);
      alert(`Error: ${error.message}`);
    }
  };
  
  // const handleSignUp = async () => {
  //   if (!firstName || !lastName || !email || !dateOfBirth || !phoneNumber || !password) {
  //     alert('Please fill in all fields');
  //     return;
  //   }
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     alert('Please enter a valid email address');
  //     return;
  //   }
  //   const cleanedPhone = phoneNumber.replace(/\D/g, '');
  //   if (cleanedPhone.length !== 10) {
  //     alert('Please enter a valid 10-digit phone number');
  //     return;
  //   }
  //   if (password.length < 8) {
  //     alert('Password must be at least 8 characters long');
  //     return;
  //   }

  //   const payload = {
  //     first_name: firstName,
  //     last_name: lastName,
  //     email,
  //     date_of_birth: new Date(dateOfBirth).toISOString(),
  //     phone_number: cleanedPhone,
  //     password,
  //   };

  //   try {
  //     const response = await api.post('/users/', payload);
  //     console.log('User created:', response.data);
  //     // Mark user as logged in and reset navigation:
  //     setIsLoggedIn(true);
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'MainTabs' as never }],
  //     });
      
  //   } catch (error) {
  //     console.error('Error creating user:', error.response?.data || error.message);
  //     alert(error.response?.data?.detail || 'Failed to create account');
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.card}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Register</Text>
              <Text style={styles.subtitle}>Create an account to continue!</Text>
            </View>

            <View style={styles.formContainer}>
              <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
              <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
              <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

              <TouchableOpacity style={styles.fullWidthTouchable} onPress={() => {
  if (Platform.OS === 'ios') {
    setTempDate(date);
    setShowPickerModal(true);
  } else {
    setShowDatePicker(true);
  }
}}>
                
                 <TextInput value={dateOfBirth ? dateOfBirth.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'}) : ''}/>

                <View style={styles.iconButton}>
                  <Ionicons name="calendar-outline" size={20} color="#6C757D" />
                </View>
              </TouchableOpacity>

              <View style={styles.phoneInputContainer}>
                <TouchableOpacity style={styles.countrySelector} onPress={() => alert('Currently only supporting United States (+1)')}>
                  <Image source={require('../assets/images/usa-flag.png')} style={styles.countryFlag} />
                  <Text style={styles.countryCode}>+1</Text>
                  <Ionicons name="chevron-down" size={16} color="#6C757D" />
                </TouchableOpacity>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={handlePhoneNumberChange}
                  keyboardType="phone-pad"
                  maxLength={12}
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.iconButton} onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#6C757D" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                Log in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {showDatePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date(currentYear - 18, 11, 31)}
          minimumDate={new Date(currentYear - 100, 0, 1)}
        />
      )}

      <Modal visible={showPickerModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHeader}>
              <TouchableOpacity onPress={() => setShowPickerModal(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmWheelDate}>
                <Text style={styles.doneButton}>Done</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerRow}>
              <View style={styles.pickerColumn}>
                <Picker selectedValue={months[tempDate.getMonth()]} onValueChange={(itemValue) => {
                  const newDate = new Date(tempDate);
                  newDate.setMonth(months.indexOf(itemValue));
                  setTempDate(newDate);
                }}>
                  {months.map((month) => (
                    <Picker.Item key={month} label={month} value={month} />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerColumn}>
                <Picker selectedValue={String(tempDate.getDate())} onValueChange={(itemValue) => {
                  const newDate = new Date(tempDate);
                  newDate.setDate(parseInt(itemValue, 10));
                  setTempDate(newDate);
                }}>
                  {generateDaysArray().map((day) => (
                    <Picker.Item key={day} label={String(day)} value={String(day)} />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerColumn}>
                <Picker selectedValue={String(tempDate.getFullYear())} onValueChange={(itemValue) => {
                  const newDate = new Date(tempDate);
                  newDate.setFullYear(parseInt(itemValue, 10));
                  setTempDate(newDate);
                }}>
                  {years.map((year) => (
                    <Picker.Item key={year} label={String(year)} value={String(year)} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalIcon: {
    width: 17,
    height: 11,
    backgroundColor: '#000',
  },
  wifiIcon: {
    width: 15,
    height: 11,
    backgroundColor: '#000',
  },
  batteryIcon: {
    width: 24,
    height: 11,
    backgroundColor: '#000',
    borderRadius: 3,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
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
    marginBottom: 8,
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    height: 50,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  countryFlag: {
    width: 24,
    height: 16,
    marginRight: 8,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  countryCode: {
    fontSize: 14,
    marginRight: 8,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  iconButton: {
    position: 'absolute',
    right: 16,
    top: 15,
  },
  fullWidthTouchable: {
    width: '100%',
  },
  registerButton: {
    height: 50,
    backgroundColor: DivvyColors.turquoise,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
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
  loginLink: {
    color: DivvyColors.turquoise,
    fontWeight: '600',
  },
  // Modal and Picker styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cancelButton: {
    fontSize: 16,
    color: '#6C757D',
  },
  doneButton: {
    fontSize: 16,
    color: DivvyColors.turquoise,
    fontWeight: '600',
  },
  pickerRow: {
    flexDirection: 'row',
  },
  pickerColumn: {
    flex: 1,
    height: 200,
  },
  picker: {
    height: 200,
  },
});

export default SignUpScreen;