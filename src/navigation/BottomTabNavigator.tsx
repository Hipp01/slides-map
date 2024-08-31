import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import InfoScreen from '../screens/InfoScreen';
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
            } else if (route.name === 'Map') {
              iconName = 'map-outline';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }
            
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Profile" options={{
            header: (props) => <CustomHeader {...props} title="Profile" />,
          }} component={ProfileScreen} 
        />
        <Tab.Screen name="Info" options={{
            header: (props) => <CustomHeader {...props} title="Informations" />,
          }} component={InfoScreen}
        />
        <Tab.Screen name="Map" options={{
            header: (props) => <CustomHeader {...props} title="Map" />,
          }} component={MapScreen}
        />
        <Tab.Screen name="Settings" options={{
            header: (props) => <CustomHeader {...props} title="Settings" />,
          }}component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;