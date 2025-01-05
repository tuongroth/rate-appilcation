import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null); // State để lưu lỗi đăng nhập

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      console.log({ username, password });
      try {
        const response = await fetch('https://eu-west-2.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-zbmnuij/auth/providers/local-userpass/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Xử lý nếu đăng nhập thành công
          console.log('Login Successful: ', data);
          setLoginError(null); // Xóa lỗi nếu có
          setUsername('');
          setPassword('');
        } else {
          // Xử lý khi đăng nhập thất bại
          setLoginError(data.error || 'Login failed');
        }
      } catch (error) {
        setLoginError('An error occurred: ' + error.message);
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

export default SignIn;
