import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChannelList, Profile } from '../screens';
import { MaterialIcons } from '@expo/vector-icons';
// 현재선택된 화면의 이름을 알려줌
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const TabIcon = ({ name, focused }) => {
  const theme = useContext(ThemeContext);
  return (
    <MaterialIcons
      name={name}
      size={26}
      color={focused ? theme.tabBtnActive : theme.tabBtnInactive}
    />
  );
};

const Tab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
  //console.log(route);
  useEffect(() => {
    const screenName = getFocusedRouteNameFromRoute(route) || 'List';
    navigation.setOptions({
      headerTitle: screenName,
      headerRight: () =>
        //  화면의 이름이 List 일때만 아이콘이 보여짐
        screenName === 'List' && (
          <MaterialIcons
            name="add"
            size={26}
            style={{ margin: 10 }}
            onPress={() => navigation.navigate('ChannelCreation')}
          />
        ),
    });
  });

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="목록"
        component={ChannelList}
        options={{
          tabBarIcon: ({ focused }) =>
            TabIcon({
              name: focused ? 'chat-bubble' : 'chat-bubble-outline',
              focused,
            }),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            TabIcon({
              name: focused ? 'person' : 'person-outline',
              focused,
            }),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;

/*

const TabIcon = ({ name, focused }) => {
  const theme = useContext(ThemeContext);
  return (
    <MaterialIcons
      name={name}
      size={26}
      color={focused ? theme.tabBtnActive : theme.tabBtnInactive}
    />
  );
};

const Tab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
  useEffect(() => {
    const screenName = getFocusedRouteNameFromRoute(route) || 'List';
    navigation.setOptions({
      headerTitle: screenName,
      headerRight: () =>
        screenName === 'List' && (
          <MaterialIcons
            name="add"
            size={26}
            style={{ margin: 10 }}
            onPress={() => navigation.navigate('ChannelCreation')}
          />
        ),
    });
  });
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="List"
        component={ChannelList}
        options={{
          tabBarIcon: ({ focused }) =>
            TabIcon({
              name: focused ? 'chat-bubble' : 'chat-bubble-outline',
              focused,
            }),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            TabIcon({
              name: focused ? 'person' : 'person-outline',
              focused,
            }),
        }}
      />
    </Tab.Navigator>
  );
};

*/
