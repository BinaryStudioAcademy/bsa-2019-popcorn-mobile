import React from 'react';
import { View, StyleSheet } from 'react-native';
import Tabs from '../Tabs';
import SurveyNavigator from '../../../routes/StackNavigator/SurveyNavigator';

interface IProps {
	navigation: any;
}

const SurveyTab: React.FC<IProps> = props => {
	return (
		<View style={[styles.container]}>
			<SurveyNavigator />
			<Tabs active={'Surveys'} navigation={props.navigation} />
		</View>
	);
};

export default SurveyTab;

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
