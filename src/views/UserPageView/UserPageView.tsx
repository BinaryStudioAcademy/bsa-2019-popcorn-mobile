import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import TabApp from '../routes/TabNavigator/UserNavigator';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

class UserPageView extends Component {
	render() {
		return <TabApp />;
	}
}
export default UserPageView;
