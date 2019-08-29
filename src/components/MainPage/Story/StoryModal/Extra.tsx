import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import IUser from '../../../UserPage/IUser';

interface IProps {
	clearExtra: () => any;
	navigation: any;
	data: any;
	type: string;
	user: IUser;
}

const Extra = (props: IProps) => {
	const { type, data, user } = props;

	const viewActivity = () => {
		switch (type) {
			case 'event':
				props.navigation.navigate('StoryEventPage', {
					event: { ...data, ...user }
				});
				break;
		}
	};

	return (
		<View style={styles.extra}>
			<TouchableOpacity onPress={viewActivity}>
				<Text>{data.title}</Text>
			</TouchableOpacity>
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
