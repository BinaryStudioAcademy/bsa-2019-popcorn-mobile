import React, { Component, Fragment } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	TextInput
} from 'react-native';
import { styles } from './styles';
import config from '../../config';

interface IPartnerProps {
	user: any;
}
export const Partner: React.FC<IPartnerProps> = ({ user }) => {
	return (
		<View style={styles.partnerWrap}>
			<Image
				source={{ uri: user.avatar ? user.avatar : config.DEFAULT_AVATAR }}
				style={styles.messageAvatar}
			/>
			<Text style={styles.messageTitle}>{user.name}</Text>
		</View>
	);
};
