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

interface INewDateProps {
	newDate: string;
}

export const NewDate: React.FC<INewDateProps> = ({ newDate }) => {
	return (
		<View style={styles.newDateWrap}>
			<Text style={styles.newDate}>{newDate}</Text>
		</View>
	);
};
