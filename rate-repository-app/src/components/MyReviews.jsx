import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Picker } from 'react-native';

// Dữ liệu cập nhật về các sự kiện theo thứ tự ngày tháng
const timelineData = [
  {
    "date": "2024-05-17",
    "event": "Encouragement and Health Check",
    "description": "Priority yourself. Progress is slow due to constant disruptions and stress. You’re so great and independent. You handle it so quick. Symptom you are recovering. Your blood test is fine, keep boundaries with family."
  },
  {
    "date": "2024-05-19",
    "event": "First Gmail",
    "description": "The initial email sent about your personal story and request for support."
  },
  {
    "date": "2024-07-09",
    "event": "Teacher and Psychologist Support",
    "description": "Support from a teacher: 'I am fully supporting you in this IT field because you are good at finding problems and handling them.' Psychologist: 'You’re good at mathematics, and you have a passion for IT. By your own capability, you’ll succeed.'"
  },
  {
    "date": "2024-08-24",
    "event": "Encouragement on IT Study",
    "description": "I remember that you have told me your ideas about IT study. I encourage you because it is your internal desire!"
  },
  {
    "date": "2024-09-10",
    "event": "Recovery Progress",
    "description": "You are really strong, signs of recovery are evident, and you're not late anymore. Better to keep boundaries."
  },
  {
    "date": "2024-10-05",
    "event": "Encouragement to Continue Coding",
    "description": "I think you should continue to do this because you like it and are good at it. Do you like writing the code? Additional comment: Are you referring to your friends and family?"
  },
  {
    "date": "2024-10-31",
    "event": "Recognition of Independence",
    "description": "You are so independent. You have your own IP address to fetch correct output and not rely on other opinions."
  },
  {
    "date": "2024-11-02",
    "event": "Boss Appreciation",
    "description": "You are number 1 at speed, still late at work but handle so quickly."
  },
  {
    "date": "2024-11-06",
    "event": "Mental Health Improvement",
    "description": "You’re not a child anymore. You know what’s best for your mental health, and I’m proud of you."
  },
  {
    "date": "2024-11-12",
    "event": "IT Education Completed",
    "description": "Completed foundational IT education, preparing for professional application. You have your IP as a safe environment."
  },
  {
    "date": "2024-11-19",
    "event": "Second Gmail",
    "description": "Follow-up message referencing feedback and impressive rating from your boss."
  },
  {
    "date": "2024-12-21",
    "event": "Request Credit",
    "description": "Faced issues verifying the netbank ID, unable to proceed with verification steps."
  },
  {
    "date": "2024-12-30",
    "event": "Request Credit Resolved",
    "description": "Netbank ID issue resolved after receiving clear instructions from Open University (inputting date of birth instead of a personal ID number)."
  },
  {
    "date": "2024-12-30",
    "event": "Transcript of Records & Completion",
    "description": "Received IT Master certificate. Officially marked course as completed. Felt confident and relieved after receiving the certificate."
  },
  {
    "date": "2025-01-06",
    "event": "Examination Pass",
    "description": "Successfully passed the exam at 15:41:33."
  },
  {
    "date": "2025-01-07",
    "event": "Present",
    "description": "Working on Project Work (10 credits). Preparing for job interviews after project completion."
  },
  {
    "date": "2025-01-09",
    "event": "Appointment",
    "description": "Discussion with authority to receive feedback on the project and application performance."
  },
];

// Helper function to convert the date to a Date object for comparison
const parseDate = (dateString) => {
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate)) {
    return new Date(dateString.split(' ').join('-'));
  }
  return parsedDate;
};

// Style cho các phần tử trong giao diện
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  timelineItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8,
  },
  timelineDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timelineEvent: {
    fontSize: 18,
    color: '#555',
    marginVertical: 5,
  },
  timelineDescription: {
    fontSize: 14,
    color: '#777',
  },
});

// Component chính để hiển thị dòng thời gian
const MyTimeline = () => {
  const [sortMethod, setSortMethod] = useState("Latest");

  // Function to sort events based on selected sort method
  const sortEvents = (events, method) => {
    switch (method) {
      case "Latest":
        return events.sort((a, b) => parseDate(b.date) - parseDate(a.date));
      case "Oldest":
        return events.sort((a, b) => parseDate(a.date) - parseDate(b.date));
      case "Highest":
        // Simulate sorting by some form of rating, let's assume for now the "Highest" is just a placeholder.
        return events.sort((a, b) => a.event.localeCompare(b.event));  // Just sorting by event name alphabetically
      default:
        return events;
    }
  };

  const sortedTimelineData = sortEvents([...timelineData], sortMethod);

  return (
    <View style={styles.container}>
      {/* Tiêu đề của màn hình */}
      <Text style={styles.title}>Timeline Events</Text>

      {/* Picker để chọn phương pháp sắp xếp */}
      <Picker
        selectedValue={sortMethod}
        style={styles.picker}
        onValueChange={(itemValue) => setSortMethod(itemValue)}
      >
        <Picker.Item label="Highest" value="Highest" />
        <Picker.Item label="Latest" value="Latest" />
        <Picker.Item label="Oldest" value="Oldest" />
      </Picker>

      {/* Danh sách hiển thị các sự kiện */}
      <FlatList
        data={sortedTimelineData}
        renderItem={({ item }) => (
          <View style={styles.timelineItem}>
            {/* Hiển thị ngày tháng của sự kiện */}
            <Text style={styles.timelineDate}>{item.date}</Text>
            {/* Hiển thị tên sự kiện */}
            <Text style={styles.timelineEvent}>{item.event}</Text>
            {/* Hiển thị mô tả chi tiết của sự kiện */}
            <Text style={styles.timelineDescription}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.date + item.event}
      />
    </View>
  );
};

export default MyTimeline;

