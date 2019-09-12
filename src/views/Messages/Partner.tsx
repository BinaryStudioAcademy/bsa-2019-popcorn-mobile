import React, { Component, Fragment } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import config from '../../config';
import { StackActions, NavigationActions } from 'react-navigation';

interface IPartnerProps {
	user: any;
	navigation: any;
}
export const Partner: React.FC<IPartnerProps> = ({ user, navigation }) => {
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate({
					routeName: 'UserPage',
					params: {
						userId: user.id,
						name: 'UserPage'
					},
					key: 'UserPage' + Math.random() * 10000
				});
				navigation.navigate({
					routeName: 'Profile',
					params: {
						userId: user.id,
						name: 'UserPage'
					},
					key: Math.random() * 10000
				});
			}}
		>
			<View style={styles.partnerWrap}>
				<Image
					source={{ uri: user.avatar ? user.avatar : config.DEFAULT_AVATAR }}
					style={styles.messageAvatar}
				/>

				<Text style={styles.messageTitle}>{user.name}</Text>
			</View>
		</TouchableOpacity>
	);
};
