import React from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import CampaignCard from '../components/CampaignCard';
import Icon from 'react-native-vector-icons/MaterialIcons'; // FontAwesome Icon
import {useNavigation} from '@react-navigation/native'; // Navigation hook

const FavoritesScreen = ({navigation}) => {
  const favorites = useSelector(state => state.provider.favoriteItems);
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>My Wishlist ❤️</Text>
      </View>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet.</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favorites}
          keyExtractor={item => item.id.toString()}
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
                isfavorites={item.isfavorites}
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
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoritesScreen;
