import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Tabs from '../Tabs';
import EventNavigator from '../../../routes/StackNavigator/EventsNavigator';

interface IProps {
	navigation: any;
}

const EventsTab: React.FC<IProps> = props => {
	return (
		<View style={[styles.container]}>
			<EventNavigator />

			<Tabs active={'Events'} navigation={props.navigation} />
		</View>
	);
};

export default EventsTab;

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
