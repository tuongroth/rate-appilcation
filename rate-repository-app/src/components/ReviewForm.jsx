import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Validation function
const validateForm = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Repository owner\'s username is required';
  } else if (values.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  if (!values.repository) {
    errors.repository = 'Repository name is required';
  } else if (values.repository.length < 3) {
    errors.repository = 'Repository name must be at least 3 characters';
  }

  if (!values.rating) {
    errors.rating = 'Rating is required';
  } else if (isNaN(values.rating)) {
    errors.rating = 'Rating must be a number';
  } else if (values.rating < 0 || values.rating > 100) {
    errors.rating = 'Rating must be between 0 and 100';
  }

  return errors;
};

const ReviewForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    repository: '',
    rating: '',
    review: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // If no errors, handle the form submission (e.g., call a mutation)
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form data:', formData);
      // Perform mutation or any other action after form submission
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Review</Text>

      {/* GitHub Username */}
      <TextInput
        style={styles.input}
        placeholder="GitHub Username"
        value={formData.username}
        onChangeText={(value) => handleChange('username', value)}
      />
      {errors.username && <Text style={styles.error}>{errors.username}</Text>}

      {/* Repository Name */}
      <TextInput
        style={styles.input}
        placeholder="Repository Name"
        value={formData.repository}
        onChangeText={(value) => handleChange('repository', value)}
      />
      {errors.repository && <Text style={styles.error}>{errors.repository}</Text>}

      {/* Rating */}
      <TextInput
        style={styles.input}
        placeholder="Rating (0-100)"
        keyboardType="numeric"
        value={formData.rating}
        onChangeText={(value) => handleChange('rating', value)}
      />
      {errors.rating && <Text style={styles.error}>{errors.rating}</Text>}

      {/* Review */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your Review (optional)"
        multiline
        value={formData.review}
        onChangeText={(value) => handleChange('review', value)}
      />

      {/* Submit Button */}
      <Button title="Submit Review" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Ensures text is aligned at the top of the input field
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default ReviewForm;
