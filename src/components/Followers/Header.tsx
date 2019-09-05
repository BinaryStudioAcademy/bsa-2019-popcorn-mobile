import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

interface IProps {
	navigation: any;
	followedCount: number;
	followersCount: number;
}

const Header: React.FC<IProps> = ({
	navigation,
	followedCount,
	followersCount
}) => {
	const getActiveRouteName = navigationState => {
		if (!navigationState) {
			return null;
		}
		const route = navigationState.routes[navigationState.index];
		if (route.routes) {
			return getActiveRouteName(route);
		}
		return route.routeName;
	};

	const currentRoute = getActiveRouteName(navigation.state);
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Followers');
				}}
			>
				<Text style={[currentRoute === 'Followers' && { color: 'red' }]}>
					{followersCount} Followers
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Followed');
				}}
			>
				<Text style={[currentRoute === 'Followed' && { color: 'red' }]}>
					{followedCount} Following
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const mapStateToProps = (rootState, props) => ({
	currentUser: rootState.authorization.profileInfo,
	followersCount: rootState.followers.followersCount,
	followedCount: rootState.followers.followedCount,
	selectedProfileInfo: rootState.userProfile.selectedUser
});

export default connect(mapStateToProps)(Header);

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});
