import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';

import * as ArrowIcon from '../../../../assets/general/arrow-circle-o-left.svg';
const options = ['survey', 'top', 'event'];

interface IProps {
	navigation: any;
	param: any;
}

class ChooseExtra extends React.Component<IProps> {
	chooseExtraOption(option: string) {
		this.props.navigation.navigate('ChooseExtraOption', { option });
	}

	render() {
		return (
			<View style={[styles.extraItemWrp, { paddingTop: 50 }]}>
				{options.map(option => (
					<TouchableOpacity onPress={() => this.chooseExtraOption(option)}>
						<Text style={styles.extraItem}>Add {option}</Text>
					</TouchableOpacity>
				))}
				<View style={styles.iconsWrp}>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('Basic')}
					>
						<SvgUri height={48} width={48} svgXmlData={ArrowIcon} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default ChooseExtra;
