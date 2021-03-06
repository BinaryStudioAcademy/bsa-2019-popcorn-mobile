import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import styles from './styles';
import IUser from '../../../UserPage/IUser';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as CrossIcon from '../../../../assets/general/times-circle-o.svg';
interface IProps {
	clearExtra?: () => any;
	navigation: any;
	data: any;
	type: string;
	user: IUser;
	onSave?: () => any;
}

const renderTopView = data => {
	const movie = data.movieInTop
		.filter((movie, index) => index < 3)
		.map((movie, index) => <Text>{`${index + 1}. ${movie.movie.title}`}</Text>);
	return (
		<View>
			<View style={{ maxHeight: 200 }}>
				<Text numberOfLines={1} style={styles.bigFont}>
					{data.title}
				</Text>
				{movie}
			</View>
		</View>
	);
};

const renderEventView = data => {
	return (
		<View>
			<View>
				<View style={styles.horizontalContainer}>
					<Text numberOfLines={2} style={[styles.text, styles.title]}>
						{data.title}
					</Text>
					<View style={[styles.visitors]}>
						<FontAwesomeIcon style={{ color: '#122737' }} icon={faUsers} />
						<Text>{data.eventVisitors.length}</Text>
					</View>
				</View>
				<View>
					<Text>
						{Moment(data.startDate).format('D MMM HH:mm')} -
						{Moment(data.endDate).format(' D MMM HH:mm')}
					</Text>
				</View>
				{!!data.description && (
					<Text numberOfLines={1} style={[styles.text]}>
						{data.description}
					</Text>
				)}
			</View>
		</View>
	);
};

const renderSurveyView = data => {
	return (
		<View>
			<Text style={styles.bigFont}>{data.title}</Text>
			<Text>{data.description}</Text>
		</View>
	);
};

const Extra = (props: IProps) => {
	const { type, data, user, onSave } = props;

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
			case 'survey':
				props.navigation.navigate('SurveyPage', { id: data.id });
		}
	};

	let renderView = (data: any) => (
		<Text style={styles.bigFont}>{data.title}</Text>
	);

	switch (type) {
		case 'top':
			renderView = renderTopView;
			break;
		case 'event':
			renderView = renderEventView;
			break;
		case 'survey':
			renderView = renderSurveyView;
	}
	return (
		<View style={styles.extra}>
			<ScrollView>
				<TouchableOpacity onPress={() => (onSave ? onSave() : viewActivity())}>
					{renderView(data)}
				</TouchableOpacity>
				{props.clearExtra && (
					<TouchableOpacity
						onPress={() => props.clearExtra && props.clearExtra()}
						style={styles.timesCircle}
					>
						<SvgUri width={16} height={16} svgXmlData={CrossIcon} />
					</TouchableOpacity>
				)}
			</ScrollView>
		</View>
	);
};

export default Extra;
