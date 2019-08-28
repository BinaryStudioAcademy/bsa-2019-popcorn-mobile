import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

interface IProps {
	link: string;
	title: string;
	clearExtra: () => any;
}

const Extra = (props: IProps) => {
	return (
		<View style={styles.extra}>
			<Text>{props.title}</Text>
			<TouchableOpacity
				onPress={() => props.clearExtra()}
				style={styles.timesCircle}
			>
				<SvgUri
					width={16}
					height={16}
					source={require('../../../../assets/general/times-circle-o.svg')}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default Extra;
