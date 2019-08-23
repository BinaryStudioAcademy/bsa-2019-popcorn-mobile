import React from 'react';
import { View, Text, Button } from 'react-native';

interface IProps {
	navigation: any;
}

const EventPage: React.FC<IProps> = props => {
	return (
		<View>
			<Text>{props.navigation.state.params.event.title}</Text>
			<Button
				title="go back"
				onPress={() => {
					props.navigation.navigate('EventList');
				}}
			/>
		</View>
	);
};

export default EventPage;
