import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LinearGradient} from 'react-native-linear-gradient';
// import {mockCampaignData} from '../utils/mockCampaignData';
import Carousel from 'react-native-reanimated-carousel';
import {Picker} from '@react-native-picker/picker';
import CampaignCard from '../components/CampaignCard';
import CampaignCardSlider from '../components/CampaignCardSlider';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const mockCampaignData = useSelector(state => state.provider.items);
  // console.log(mockCampaignData);

  const [searchText, setSearchText] = useState('');
  const [sortedData, setSortedData] = useState(mockCampaignData);
  const [filteredData, setFilteredData] = useState(mockCampaignData);
  const [displayMode, setDisplayMode] = useState(false);

  const handleSearchTextChange = text => {
    setSearchText(text);
    const res = mockCampaignData.filter(item => {
      const brandName = item.brandName?.toLowerCase() || '';
      const status = item.status?.toLowerCase() || '';
      const searchText = text.toLowerCase();

      return brandName.includes(searchText) || status.includes(searchText);
    });
    setFilteredData(res);
  };

  const sortdata = value => {
    let sorted = [...mockCampaignData];
    if (value === 'name') {
      sorted = sorted.sort((a, b) => a.brandName.localeCompare(b.brandName));
    } else if (value === 'price') {
      sorted = sorted.sort((a, b) => a.spend - b.spend);
    }
    setSortedData(sorted);
  };

  const data = searchText.length > 0 ? filteredData : sortedData;

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('CampaignDetailsScreen', {item});
        }}>
        <CampaignCardSlider
          id={item.id}
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
          isfavorites={item.isfavorites}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0.5, y: 0}}
        colors={['rgba(201, 4, 76, 0.43)', 'rgb(22, 8, 15)']}
        style={styles.Searchcontainer}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.openDrawer()}>
          <Icon name="segment" size={20} color="#fff" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Search Brands..."
          placeholderTextColor="gray"
          value={searchText}
          onChangeText={handleSearchTextChange}
        />
        <TouchableOpacity style={styles.icon}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.buttonText, {color: '#fff', fontSize: 12}]}>
          {searchText ? filteredData.length : mockCampaignData.length}
        </Text>
      </LinearGradient>

      <View style={styles.sortContainer}>
        <View style={styles.SortButton}>
          <Picker
            selectedValue={sortedData}
            style={styles.Picker}
            onValueChange={value => sortdata(value)}
            dropdownIconColor="#fff"
            mode="dropdown">
            <Picker.Item label="Sort" value="" />
            <Picker.Item label="a to z" value="name" />
            <Picker.Item label="Sort by Price" value="price" />
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.SortButton, {alignItems: 'center'}]}
          onPress={() => setDisplayMode(!displayMode)}>
          <Text style={{color: '#fff'}}>
            {displayMode ? 'stack' : 'card'} mode
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.AIButton]}
        onPress={() => navigation.navigate('AICampaignList')}>
        <Icon name="auto-awesome" size={20} color="#fff" />
        <Text style={{color: '#fff'}}>
          Get Campaigns Near Your Location Using AI{' '}
        </Text>
      </TouchableOpacity>

      {filteredData.length === 0 && searchText.length > 0 && (
        <Text style={[styles.buttonText, {color: '#fff', fontSize: 12}]}>
          NO Brand found
        </Text>
      )}

      {displayMode ? (
        <Carousel
          data={data}
          renderItem={renderItem}
          pagingEnabled={true}
          snapEnabled={true}
          width={width - 20}
          height={hp(95)}
          autoPlay={true}
          style={styles.carousel}
          mode={'horizontal-stack'}
          modeConfig={{
            snapDirection: 'left',
            stackInterval: 18,
          }}
          // customConfig={() => ({type: 'positive', viewCount: 5})}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={campaign => campaign.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate('CampaignDetailsScreen', {item});
              }}>
              <CampaignCard
                id={item.id}
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
                isfavorites={item.isfavorites}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgb(0, 0, 0)',
  },
  Searchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 5,
    borderRadius: 30,
    gap: 10,
    paddingHorizontal: 20,
  },
  icon: {
    paddingVertical: 5,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  SortButton: {
    backgroundColor: '#212121',
    width: '45%',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
  },
  AIButton: {
    backgroundColor: '#212121',
    gap: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  Picker: {
    color: '#fff',
    fontSize: 14,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    borderRadius: 5,
    marginHorizontal: 10,
    color: '#fff',
  },
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
  },
});
