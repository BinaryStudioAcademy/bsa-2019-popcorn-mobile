import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Tabs from '../Tabs';

interface IProps {
	navigation: any;
}

const TopList: React.FC<IProps> = props => {
	return (
		<View style={[styles.container]}>
			<ScrollView>
				<Text>Tops</Text>
			</ScrollView>
			<Tabs active={'Tops'} navigation={props.navigation} />
		</View>
	);
};

export default TopList;

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
