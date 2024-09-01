import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import InfoScreen from '../screens/InfoScreen';
import ListSlidesScreen from '@/screens/ListSlidesScreen';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../components/CustomHeader';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string = '';
            if (route.name === 'Profile') {
              iconName = 'person-outline';
            } else if (route.name === 'Info') {
              iconName = 'information-circle-outline'; 
            } else if (route.name === 'Liste') {
              iconName = 'list-outline';
            } else if (route.name === 'Carte') {
              iconName = 'map-outline';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }
            
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Info" options={{
            header: (props) => <CustomHeader {...props} title="Informations" />,
          }} component={InfoScreen}
        />
        <Tab.Screen name="Liste" options={{
            header: (props) => <CustomHeader {...props} title="Liste des Toboggans" />,
          }} component={ListSlidesScreen}
        />
        <Tab.Screen name="Carte" options={{
            header: (props) => <CustomHeader {...props} title="Map" />,
          }} component={MapScreen}
        />
        <Tab.Screen name="Profile" options={{
            header: (props) => <CustomHeader {...props} title="Profile" />,
          }} component={ProfileScreen} 
        />
        {/* <Tab.Screen name="Settings" options={{
            header: (props) => <CustomHeader {...props} title="Settings" />,
          }}component={SettingsScreen}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;