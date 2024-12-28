import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Yup from 'yup';

// Manually handle the state of the form fields
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must be between 5 and 30 characters')
    .max(30, 'Username must be between 5 and 30 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(5, 'Password must be between 5 and 50 characters')
    .max(50, 'Password must be between 5 and 50 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUpForm = () => {
  // Form state
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Validate the form
  const validate = () => {
    const validationErrors = {};
    try {
      validationSchema.validateSync(formValues, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    const isValid = validate();
    if (isValid) {
      // Handle user creation logic here
      // For example, simulate user creation and redirect:
      Alert.alert('Success', 'User created successfully!');
      // You can replace this with actual user creation code
      // Navigate to home or repository list
    } else {
      Alert.alert('Error', 'Please fix the errors in the form.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Username Field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formValues.username}
        onChangeText={(value) => handleChange('username', value)}
      />
      {errors.username && <Text style={styles.error}>{errors.username}</Text>}

      {/* Password Field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formValues.password}
        onChangeText={(value) => handleChange('password', value)}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/* Confirm Password Field */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={formValues.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      {/* Submit Button */}
      <Button title="Sign Up" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default SignUpForm;
