import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface IProps {
	active: string;
	navigation: any;
}

const Tabs: React.FC<IProps> = ({ active, navigation }) => {
	const onTops = () => {
		navigation.navigate('Tops');
	};

	const onEvents = () => {
		navigation.navigate('Events');
	};

	const onSurveys = () => {
		navigation.navigate('Surveys');
	};

	return (
		<View style={[styles.container]}>
			<TouchableOpacity onPress={onEvents} style={[styles.tabContainer]}>
				<View style={[styles.tab, active === 'Events' && styles.activeTab]}>
					<Text style={[styles.text, active === 'Events' && styles.activeText]}>
						Events
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={onTops} style={[styles.tabContainer]}>
				<View style={[styles.tab, active === 'Tops' && styles.activeTab]}>
					<Text style={[styles.text, active === 'Tops' && styles.activeText]}>
						Tops
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={onSurveys} style={[styles.tabContainer]}>
				<View style={[styles.tab, active === 'Surveys' && styles.activeTab]}>
					<Text
						style={[styles.text, active === 'Surveys' && styles.activeText]}
					>
						Surveys
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Tabs;

const styles = StyleSheet.create({
	container: {
		borderTopColor: 'rgba(0, 0, 0, 0.1)',
		borderTopWidth: 1,
		width: '100%',
		height: 40,
		flexDirection: 'row'
	},
	tabContainer: {
		alignItems: 'center',
		height: '100%',
		justifyContent: 'center',
		flex: 1
	},
	tab: {
		height: '100%',
		alignContent: 'center',
		justifyContent: 'center',
		paddingRight: 3,
		paddingLeft: 3
	},
	text: {
		fontSize: 16,
		fontFamily: 'Inter-SemiBold',
		color: 'rgba(18, 39, 55, 0.5)'
	},
	activeText: {
		color: '#122737'
	},
	activeTab: {
		borderBottomColor: '#ff6501',
		borderBottomWidth: 2
	}
});
