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

const renderTopView = data => {
	const movie = data.movieInTop
		.filter((movie, index) => index < 3)
		.map((movie, index) => (
			<Text>{`${index + 1}. ${movie.movie.original_title}`}</Text>
		));
	console.warn(
		'movie',
		JSON.stringify(data.movieInTop[0].movie.original_title)
	);
	return (
		<View>
			<Text>{data.title}</Text>
			{movie}
		</View>
	);
};

const Extra = (props: IProps) => {
	const { type, data, user } = props;

	const viewActivity = () => {
		switch (type) {
			case 'event':
				props.navigation.navigate('EventPage', { event: { ...data, ...user } });
				break;
			case 'top':
				props.navigation.navigate('TopPage', {
					top: { ...data, user: { ...user } }
				});
				break;
		}
	};

	let renderView = (data: any) => <Text>{data.title}</Text>;

	switch (type) {
		case 'top':
			renderView = renderTopView;
	}
	console.warn(data);
	return (
		<View style={styles.extra}>
			<TouchableOpacity onPress={viewActivity}>
				{renderView(data)}
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
