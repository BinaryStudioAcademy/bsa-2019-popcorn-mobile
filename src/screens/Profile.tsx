import React, { Fragment } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	StatusBar
} from 'react-native';
import SvgUri from 'react-native-svg-uri';

const Profile = () => {
	return (
		<View>
			<SvgUri
				height={150}
				source={require('./assets/general/popcorn-logo.svg')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Profile;
