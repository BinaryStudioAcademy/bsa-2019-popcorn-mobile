import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';

const close = require('../../../../assets/general/times-circle-o.svg');
const arrow = require('../../../../assets/general/arrow-circle-o-left.svg');
const options = ['survey', 'top', 'event'];

class ChooseExtra extends React.Component {
	render() {
		return (
			<View style={[styles.extraItemWrp, { marginTop: 50 }]}>
				{options.map(option => (
					<Text style={styles.extraItem}>Add {option}</Text>
				))}
				<View style={styles.iconsWrp}>
					<SvgUri height={48} width={48} source={arrow} />
					<SvgUri height={48} width={48} source={close} />
				</View>
			</View>
		);
	}
}

export default ChooseExtra;
