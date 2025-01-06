import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import useSignIn from '../hooks/useSignIn'; // Import the custom hook

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [signIn, loginError] = useSignIn(); // Use the custom hook

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const result = await signIn({ username, password });

      if (result) {
        console.log('Login Successful: ', result.token);
        setUsername('');
        setPassword('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {/* Username Field */}
      <TextInput
        style={[styles.input, errors.username ? styles.inputError : null]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

      {/* Password Field */}
      <TextInput
        style={[styles.input, errors.password ? styles.inputError : null]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={handleSubmit} />
      </View>

      {/* Error Message */}
      {loginError && <Text style={styles.errorMessage}>{loginError}</Text>}
    </View>
  );
};

// Styles integrated in the same file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderColor: '#ddd',
  },
  inputError: {
    borderColor: '#d73a4a', // Red border for errors
  },
  errorText: {
    color: '#d73a4a',
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SignIn;
