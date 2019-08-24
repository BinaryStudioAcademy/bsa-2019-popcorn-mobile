import React, { Component } from 'react';
import UserProfileView from '../../views/UserPageView/UserProfileView';
import {
	createBottomTabNavigator,
	createAppContainer,
	createMaterialTopTabNavigator
} from 'react-navigation';
import { View, Text } from 'react-native';
import UserPosts from '../../views/UserPageView/UserPostsView';

class Tops extends Component {
	render() {
		return (
			<View>
				<Text>Tops</Text>
				<Text>Tops</Text>
			</View>
		);
	}
}
class Reviews extends Component {
	render() {
		return (
			<View>
				<Text>Reviews</Text>
			</View>
		);
	}
}
class Events extends Component {
	render() {
		return (
			<View>
				<Text>Events</Text>
			</View>
		);
	}
}
class Surveys extends Component {
	render() {
		return (
			<View>
				<Text>Surveys</Text>
			</View>
		);
	}
}

class Lists extends Component {
	render() {
		return (
			<View>
				<Text>Lists</Text>
			</View>
		);
	}
}
class Watched extends Component {
	render() {
		return (
			<View>
				<Text>Watched</Text>
			</View>
		);
	}
}

const UserNavigator = createMaterialTopTabNavigator(
	{
		Tops: {
			screen: Tops
			// tabBarLabel: () => <Text>Tops</Text>
		},
		Reviews: {
			screen: Reviews
			// tabBarLabel: () => <Text>Reviews</Text>
		},
		Events: {
			screen: Events
			// tabBarLabel: () => <Text>Events</Text>
		},
		Surveys: {
			screen: Surveys
			// tabBarLabel: () => <Text>Surveys</Text>
		},
		Posts: {
			screen: UserPosts
			// tabBarLabel: () => <Text>UserPosts</Text>
		},
		Lists: {
			screen: Lists
			// tabBarLabel: () => <Text>Watched</Text>
		},
		Watched: {
			screen: Watched
			// tabBarLabel: () => <Text>Watched</Text>
		}
	},
	// {
	// 	tabBarPosition: 'bottom',
	// 	swipeEnabled: true,
	// 	tabBarOptions: {
	// 		activeTintColor: '#fff',
	// 		activeBackgroundColor: '#FF9800',
	// 		inactiveTintColor: '#666',
	// 		style: {
	// 			alignItems: 'center',
	// 			borderTopColor: '#fff'
	// 		},
	// 		labelStyle: {
	// 			fontSize: 14,
	// 			padding: 12
	// 		}
	// 	}
	// }
	{
		tabBarPosition: 'top',
		tabBarOptions: {
			scrollEnabled: true,
			activeTintColor: '#fff',
			activeBackgroundColor: '#FF9800',
			inactiveTintColor: '#666',
			// inactiveTintColor: "#000",
			pressColor: '#000',
			labelStyle: {
				color: '#000',
				fontSize: 14,
				// padding: 3,
				fontFamily: 'Inter-Bold'
				// borderBottomWidth: 2,
				// borderBottomColor: 'orange'
			},
			tabStyle: {
				// position: 'absolute',
				width: 110,
				alignItems: 'center',
				justifyContent: 'center'
			},
			style: {
				backgroundColor: 'transparent'
				// width: 100,
			},
			showIcon: false,
			indicatorStyle: {
				width: 0
			}
		}
	}
);

export default createAppContainer(UserNavigator);
