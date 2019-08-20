import React from 'react';
import styles from '../assets/style';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';

export const HeaderView = ({ navigation }) => (
	<View style={styles.header}>
		<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
			<View>
				<SvgUri
					height={30}
					width={30}
					source={require('../assets/general/popcorn-logo.svg')}
				/>
			</View>
		</TouchableOpacity>
		<Text>Header</Text>
		<TouchableOpacity onPress={() => navigation.toggleRightDrawer()}>
			<View>
				<SvgUri
					height={30}
					width={30}
					source={require('../assets/general/popcorn-logo.svg')}
				/>
			</View>
		</TouchableOpacity>
	</View>
);
