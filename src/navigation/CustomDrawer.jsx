import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // <- Icon package

const CustomDrawer = props => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const getRole = async () => {
      const role = await AsyncStorage.getItem('userRole');
      setRole(role);
    };

    getRole();
  }, []); // Added dependency array to avoid continuous re-renders

  const DrawerItem = ({icon, label, onPress}) => (
    <TouchableOpacity style={styles.link} onPress={onPress}>
      <Icon name={icon} size={18} color="#333" style={styles.icon} />
      <Text style={styles.linkText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🗳 Influxio</Text>
      </View>

      {role !== 'Admin' && (
        <>
          <DrawerItem
            icon="home"
            label="Home"
            onPress={() => props.navigation.navigate('HOME')}
          />
          <DrawerItem
            icon="search"
            label="Search with AI"
            onPress={() => props.navigation.navigate('AICampaignList')}
          />
          <DrawerItem
            icon="star"
            label="Favorites"
            onPress={() => props.navigation.navigate('FavoritesScreen')}
          />
          <DrawerItem
            icon="user"
            label="Know About Developer"
            onPress={() => props.navigation.navigate('AboutDeveloper')}
          />
          {/* <DrawerItem
            icon="bell"
            label="NotificationScreen"
            onPress={() => props.navigation.navigate('NotificationScreen')}
          /> */}
        </>
      )}

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>App Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(235, 226, 226)',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 10,
  },
  linkText: {
    fontSize: 18,
    color: '#333',
  },
  versionContainer: {
    marginTop: 'auto',
    paddingVertical: 20,
    alignItems: 'center',
  },
  versionText: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default CustomDrawer;
