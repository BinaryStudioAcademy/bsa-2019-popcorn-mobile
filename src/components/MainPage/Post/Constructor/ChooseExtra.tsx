import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';

const arrow = require('../../../../assets/general/arrow-circle-o-left.svg');
const options = ['survey', 'top', 'event'];

interface IProps {
	navigation: any;
	param: any;
}

class ChooseExtra extends React.Component<IProps> {
	chooseExtraOption(option: string) {
		console.warn(option);
		this.props.navigation.navigate('ChooseExtraOption', { option });
	}

	render() {
		// const { param } = this.props.navigation.state.params;

		return (
			<View style={[styles.extraItemWrp, { paddingTop: 50 }]}>
				{options.map(option => (
					<TouchableOpacity onPress={() => this.chooseExtraOption(option)}>
						<Text style={styles.extraItem}>Add {option}</Text>
					</TouchableOpacity>
				))}
				<View style={styles.iconsWrp}>
					<TouchableOpacity onPress={() => this.props.navigation.pop()}>
						<SvgUri height={48} width={48} source={arrow} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default ChooseExtra;
