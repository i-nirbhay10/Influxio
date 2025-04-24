// AICampaignList.js

import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  BackHandler,
} from 'react-native';
import CampaignCard from '../components/CampaignCard';
import Geolocation from '@react-native-community/geolocation';
import AndroidOpenSettings from 'react-native-android-open-settings';

const AICampaignList = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [geminiResult, setGeminiResult] = useState([]);
  const [LocationPermission, setLocationPermission] = useState(false);
  const [liveDetails, setLiveDetails] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getCurrentLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude} = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          const res = await fetch(url, {
            headers: {
              Accept: 'application/json',
              'User-Agent': 'YourAppName/1.0',
            },
          });

          const data = await res.json();

          if (data?.address) {
            setLiveDetails(data.address);
            callGeminiAPI(data.address);
          } else {
            console.warn('No address found in location data');
          }

          console.log('Location:', position);
        },
        error => {
          console.log(error);
          if (error.code === 1) {
            Alert.alert(
              'Permission Required',
              'Location permission is denied. Go to Settings -> Permissions -> Location and allow access.',
              [
                {
                  text: 'Open Settings',
                  onPress: () => {
                    navigation.navigate('Home');
                    Linking.openSettings();
                  },
                },
              ],
            );
          }
          if (error.code === 2) {
            // GPS is off, prompt user to turn it on
            Alert.alert(
              'GPS is off',
              'Please turn on your GPS to take image.',
              [
                {
                  text: 'ok',
                  onPress: () => {
                    if (Platform.OS === 'android') {
                      // Open location source settings menu
                      AndroidOpenSettings.locationSourceSettings();
                    } else if (Platform.OS === 'ios') {
                      // For iOS, you can prompt the user to go to Settings
                      Alert.alert(
                        'Go to Settings',
                        'Please enable location services in your device settings.',
                      );
                    }
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            console.error('Error getting location:', error);
          }
        },
      );
    } catch (error) {
      console.error('Error fetching location:', error);
      setErrorMsg('Error getting location: ' + error.message);
    }
  };

  const callGeminiAPI = async locationData => {
    console.log('Calling Gemini API...');

    if (!locationData) {
      console.log('liveDetails not exist');
      return;
    }
    let {
      state = 'NA',
      city = 'NA',
      country = 'NA',
      county = 'NA',
      town = 'NA',
      village = 'NA',
      postcode = 'NA',
    } = locationData || {};
    console.log(state, city, country, county, town, village, postcode);
    console.log(locationData);

    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyArEFj24YL2yiqKXNWFOTzjlw1Ya5lgezI',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a valid JSON array containing of at least 20 detailed campaign objects that represent current active or upcoming influencer campaigns relevant to earning opportunities for influencers in **${city}, ${state}, ${country}**.
                     Each campaign must be centered around influencer participation, specifically targeting regional creators, and must include the following fields:
                    "id" (string): A unique identifier in the format PLATFORM_YYYYMMDD_UNIQUEID.
                    "platform" (string): The influencer marketing platform hosting the campaign (e.g., "Chtrbox", "InfluGlue", "Kofluence", "Findinfluencer.in", "Collabstr", "Heepsy", "FindCollab" ,others).
                    "brandName" (string): Name of the brand behind the campaign.
                    "campaignName" (string): The official title of the campaign.
                    "status" (string): The current status of the campaign ("active" or "upcoming").
                    "description" (string): A short summary of the campaign's purpose and what type of influencers are needed.
                    "startDate" (string): Campaign start date in YYYY-MM-DD format.
                    "endDate" (string): Campaign end date in YYYY-MM-DD format.
                    "targetAudience" (string): The key demographic(s) or audience targeted.
                    "compensation" (string): Details on influencer payment or rewards (e.g., "₹X per post", "Product gifting + ₹Y", "Commission-based").
                    "deliverables" (array of strings): List of specific content or tasks required from the influencer (e.g., ["1 Instagram reel", "3 Story mentions"]).
                    "participationProcess" (string): Instructions on how an influencer can discover and apply for the campaign on the specified platform.
                    "brandLogo" (string): URL to the brand's logo (can be a placeholder or descriptive if unknown).
                    "channel" (array of strings): Platforms relevant to the campaign (e.g., ["Instagram", "YouTube", "TikTok", "Facebook"]).
                    "location" (string): Primary geographic focus of the campaign (e.g., "Patna, Bihar", "Bihar", "Pan India").
                    "campaignType" (string): Type of campaign (e.g., "Promotional", "Product Review", "Awareness", "Affiliate Marketing").
                    Return only a valid and Authentic JSON array of campaign objects without any explanation, formatting, markdown or code blocks.`,

                    // "brandImg" (string): URL to the campaign's promotional image/banner (can be a placeholder or descriptive if unknown).
                    // text: `Generate a JSON response containing an array of at least 20 detailed campaign objects representing current active or upcoming brand campaigns relevant to **${city}, ${state}, ${country}**.

                    // Each campaign object must include the following fields:
                    // "id" (string): Unique identifier of the campaign.
                    // "brandName" (string): Name of the brand running the campaign.
                    // "campaignName" (string): Title of the campaign.
                    // "status" (string): Current status of the campaign (e.g., "active", "upcoming").
                    // "description" (string): A brief explanation of the campaign purpose.
                    // "startDate" (string): Campaign start date in YYYY-MM-DD format.
                    // "endDate" (string): Campaign end date in YYYY-MM-DD format.
                    // "targetAudience" (string): The main audience the campaign is targeting.
                    // "brandLogo" (string): URL to the brand's logo image.
                    // "brandImg" (string): URL to the campaign image/banner.
                    // "channel" (array of strings): Platforms where the campaign is running (e.g., ["Instagram", "YouTube"]).
                    // "location" (string): The primary location/region where the campaign is targeted.
                    // "campaignType" (string): Type of campaign (e.g., "Promotional", "Awareness", "CSR").
                    //    Return only a valid JSON array of campaign objects without any explanation, formatting, markdown or code blocks.`,
                  },
                ],
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log(data);

      const generatedText = data.candidates[0].content.parts[0].text;

      const cleanedText =
        generatedText.startsWith('```json\n') && generatedText.endsWith('\n```')
          ? generatedText.slice(7, -4)
          : generatedText.startsWith('`') && generatedText.endsWith('`')
          ? generatedText.slice(1, -1)
          : generatedText;

      try {
        const parsed = JSON.parse(cleanedText);
        if (Array.isArray(parsed)) {
          setGeminiResult(parsed);
        } else if (parsed && Array.isArray(parsed.campaigns)) {
          setGeminiResult(parsed.campaigns);
        } else {
          console.warn('Unexpected format:', parsed);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        console.log('Raw response:', cleanedText);
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    // callGeminiAPI();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('CampaignDetailsScreen', {item})}>
      <CampaignCard
        title={item.brandName}
        brandLogo={item.brandLogo}
        brandImg={item.brandImg}
        promotionPlatformIcon={item.promotionPlatformIcon}
        platform={item.platform}
        status={item.status}
        spend={item.spend}
        closingDate={item.closingDate}
        openingDate={item.openingDate}
        description={item.description}
      />
    </TouchableOpacity>
  );

  return (
    <>
      {isLoading ? (
        <View style={{backgroundColor: '#190C40'}}>
          <Image
            source={require('./assets/cosmos.gif')}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>AI Campaigns in {liveDetails.city}</Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={geminiResult}
            keyExtractor={item => item.id?.toString()}
            renderItem={renderItem}
          />
        </View>
      )}
    </>
  );
};

export default AICampaignList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: 'rgb(0, 0, 0)',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
});
