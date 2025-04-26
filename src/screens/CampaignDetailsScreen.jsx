import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Share,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome Icon
import notifee, {AndroidStyle} from '@notifee/react-native';

const CampaignDetailsScreen = ({route}) => {
  const {item} = route.params;

  console.log(item);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `🎉 Check out "${item.campaignName}" by ${item.brandName}!\n\n${item.description} APK: https://drive.google.com/drive/folders/1Raz9yw7XZ4UZ2Yq66sVnUWj6rbdDekh3?usp=drive_link`,
      });
      if (result.action === Share.sharedAction && !result.activityType) {
        console.log('Campaign shared successfully!');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    // await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    console.log('hit 2');

    // Display a notification
    await notifee.displayNotification({
      title: 'Wooo',
      body: `${item.campaignName} campain is live grab the oportunety`,
      android: {
        channelId,
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: item.brandImg,
        },
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  // async function onDisplayNotification() {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();
  //   console.log('hit 2');

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //   });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: 'Notification Title',
  //     body: 'Main body content of the notification',
  //     android: {
  //       channelId,
  //       smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: 'default',
  //       },
  //     },
  //   });
  // }

  useEffect(() => {
    if (item.status === 'Live' || item.status === 'live') {
      console.log('hit 1');

      onDisplayNotification();
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Brand Logo and Title Section */}
      <View style={styles.brandSection}>
        <Image source={{uri: item.brandLogo}} style={styles.brandLogo} />
        <Text style={styles.brandName}>{item.brandName}</Text>
        <Text style={styles.status}>
          {/* <Icon name="circle" size={10} color="#f39c12" /> */}
          {item.status}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <View style={styles.section}>
            <Text style={styles.heading}>
              <Icon name="bullhorn" size={16} color="rgb(252, 252, 252)" />{' '}
              Campaign Name
            </Text>
            <Text style={styles.infoText}>{item.campaignName}</Text>

            <Text style={styles.heading}>
              <Icon name="tag" size={16} color="rgb(252, 252, 252)" /> Campaign
              Type
            </Text>
            <Text style={styles.infoText}>{item.campaignType}</Text>

            <Text style={styles.heading}>
              <Icon name="info-circle" size={16} color="rgb(252, 252, 252)" />{' '}
              Campaign Description
            </Text>
            <Text style={styles.infoText}>{item.description}</Text>

            <Text style={styles.heading}>
              <Icon name="calendar" size={16} color="rgb(252, 252, 252)" />{' '}
              Campaign Timeline
            </Text>
            <Text style={styles.infoText}>
              {item.startDate} To {item.endDate}
            </Text>
            {item.location && (
              <>
                <Text style={styles.heading}>
                  <Icon name="calendar" size={16} color="rgb(252, 252, 252)" />{' '}
                  Location
                </Text>
                <Text style={styles.timelineText}>
                  <Icon name="map-marker" size={14} color="#fff" /> :{' '}
                  {item.location}
                </Text>
              </>
            )}
          </View>

          {/* Target Audience Section */}
          <View style={styles.section}>
            <Text style={styles.heading}>
              <Icon name="rupee" size={16} color="rgb(252, 252, 252)" /> Erning
              Capecity
            </Text>
            <Text style={styles.infoText}>Up to {item.spend}</Text>
          </View>

          {/* Target Audience Section */}
          <View style={styles.section}>
            <Text style={styles.heading}>
              <Icon name="users" size={16} color="rgb(252, 252, 252)" /> Target
              Audience
            </Text>
            <Text style={styles.infoText}>{item.targetAudience}</Text>

            <Text style={styles.heading}>
              <Icon name="television" size={16} color="rgb(252, 252, 252)" />{' '}
              Channels
            </Text>
            <Text style={styles.infoText}>{item.channel.join(', ')}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Share Button */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={onShare}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="share-alt"
            size={20}
            color="#fff"
            style={{marginRight: 10}}
          />
          <Text style={styles.buttonText}>Share this Campaign</Text>
        </View>
      </TouchableOpacity>

      {/* {item.status === 'Live' && (
        <ConfettiCannon count={400} origin={{x: -10, y: 0}} fadeOut={true} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  brandSection: {
    paddingTop: 20,
    alignItems: 'center',
  },
  brandLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#f39c12',
    marginTop: 4,
  },
  detailsContainer: {
    marginTop: 10,
    backgroundColor: 'rgb(252, 252, 252)',
    padding: 20,
    paddingBottom: 65,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  section: {
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
    padding: 20,
    borderRadius: 18,
  },
  heading: {
    fontSize: 18,
    marginBottom: 4,
    color: '#868646',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 15,
  },
  timelineText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#0C944B',
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 40,
    borderRadius: 6,
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CampaignDetailsScreen;
