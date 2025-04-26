import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import notifee, {AndroidStyle} from '@notifee/react-native';
const SECRET_CODE = '1234'; // Predefined secret code

const NotificationScreen = () => {
  const [codeInput, setCodeInput] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleCodeSubmit = () => {
    if (codeInput === SECRET_CODE) {
      setIsCodeValid(true);
    } else {
      Alert.alert('Invalid Code', 'The secret code you entered is incorrect.');
    }
  };

  const handleSendNotification = () => {
    if (title && message) {
      // Replace this with your actual notification logic
      Alert.alert('Notification Sent', `Title: ${title}\nMessage: ${message}`);
      // Reset fields
      setTitle('');
      setMessage('');
    } else {
      Alert.alert('Missing Fields', 'Please enter both title and message.');
    }
  };

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        smallIcon: 'ic_launcher_round',
        color: '#9c27b0',
        largeIcon: 'https://picsum.photos/512/512',

        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
        ],
      },
    });
  }

  return (
    <View style={styles.container}>
      {!isCodeValid ? (
        <>
          <Text style={styles.label}>Enter Secret Code:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Secret Code"
            value={codeInput}
            onChangeText={setCodeInput}
          />
          <Button title="Submit Code" onPress={handleCodeSubmit} />
          <Button
            title="Display Notification"
            onPress={() => onDisplayNotification()}
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>Notification Title:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.label}>Notification Message:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter message"
            value={message}
            onChangeText={setMessage}
          />
          <Button title="Send Notification" onPress={handleSendNotification} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default NotificationScreen;
