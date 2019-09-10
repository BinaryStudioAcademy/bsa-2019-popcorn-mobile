import React, { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View, StyleSheet } from 'react-native';
import {
	faComment,
	faPlusCircle,
	faUserFriends,
	faStar
} from '@fortawesome/free-solid-svg-icons';
import webApi from '../helpers/webApi.helper';
import config from '../config';
import { getIcon } from './postReaction.service';

export const generateIcon = (type: string): any => {
	const styles = StyleSheet.create({
		icon: {
			fontSize: 15,
			color: 'white'
		},
		containerStyle: {
			position: 'absolute',
			bottom: 0,
			right: 0,
			width: 26,
			height: 26,
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: 13,
			backgroundColor: '#FF6501'
		}
	});

	switch (type) {
		case 'comment':
			return (
				<View style={styles.containerStyle}>
					<FontAwesomeIcon icon={faComment} style={styles.icon} />
				</View>
			);
		case 'follower':
			return (
				<View style={styles.containerStyle}>
					<FontAwesomeIcon icon={faUserFriends} style={styles.icon} />
				</View>
			);
		case 'new post from followed':
			return (
				<View style={styles.containerStyle}>
					<FontAwesomeIcon icon={faPlusCircle} style={styles.icon} />
				</View>
			);
		case 'new story from followed':
			return (
				<View style={styles.containerStyle}>
					<FontAwesomeIcon icon={faPlusCircle} style={styles.icon} />
				</View>
			);
		case 'review':
			return (
				<View style={styles.containerStyle}>
					<FontAwesomeIcon icon={faStar} style={styles.icon} />
				</View>
			);

		default:
			return getIcon(type, 26);
	}
};

export const sendDeviceToken = async token => {
	await webApi({
		endpoint: config.API_URL + '/api/notification',
		method: 'PUT',
		body: {
			token,
			type: 'mobile'
		}
	});
};
