import React from 'react';
import {
	ScrollView,
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
	navigation: any;
}

const EventPage: React.FC<IProps> = props => {
	const {
		title,
		description,
		image,
		start_date,
		end_date,
		location_lat,
		location_lng,
		eventVisitors
	} = props.navigation.state.params.event;
	let dayStart = start_date.split('-')[2].split('T')[0];
	let monStart = start_date.split('-')[1];
	let timeStart =
		start_date
			.split('-')[2]
			.split('T')[1]
			.split(':')[0] +
		':' +
		start_date
			.split('-')[2]
			.split('T')[1]
			.split(':')[1];
	let dayEnd = end_date.split('-')[2].split('T')[0];
	let monEnd = end_date.split('-')[1];
	let timeEnd =
		end_date
			.split('-')[2]
			.split('T')[1]
			.split(':')[0] +
		':' +
		end_date
			.split('-')[2]
			.split('T')[1]
			.split(':')[1];
	let interestedUsers = eventVisitors.filter(
		user => user.status === 'interested'
	);
	let goingUsers = eventVisitors.filter(user => user.status === 'going');
	return (
		<ScrollView>
			<Image
				source={{
					uri: image
				}}
				style={styles.eventImage}
			/>

			<View style={styles.container}>
				<View style={styles.eventMainInfo}>
					<View style={styles.eventDateStart}>
						<Text style={styles.eventDay}>{monStart}</Text>
						<Text style={styles.eventDayNum}>{dayStart}</Text>
					</View>
					<View style={styles.eventTitleWrap}>
						<Text style={styles.eventTitle}>{title}</Text>
						<View style={styles.eventCreatorWrap}>
							<Text style={styles.eventCreatorLabel}>Creator</Text>
							<Text style={styles.eventCreator}>Millie Bobbie Brown</Text>
						</View>
					</View>
				</View>
				<View style={styles.eventActionWrap}>
					<View style={styles.eventAction}>
						<Icon
							name="star"
							color={'#37393a'}
							size={14}
							style={styles.eventIcon}
						/>
						<Text style={styles.eventActionLabel}>Interested</Text>
					</View>
					<View style={styles.eventAction}>
						<Icon
							name="check"
							color={'#37393a'}
							size={14}
							style={styles.eventIcon}
						/>
						<Text style={styles.eventActionLabel}>Going</Text>
					</View>
					<View style={styles.eventAction}>
						<Icon
							name="share"
							color={'#37393a'}
							size={14}
							style={styles.eventIcon}
						/>
						<Text style={styles.eventActionLabel}>Share</Text>
					</View>
					<View style={styles.eventAction}>
						<Icon
							name="ellipsis-h"
							color={'#37393a'}
							size={14}
							style={styles.eventIcon}
						/>
						<Text style={styles.eventActionLabel}>More</Text>
					</View>
				</View>
				<View style={styles.eventInfoWrap}>
					<Icon
						name="calendar"
						color={'#37393a'}
						size={14}
						style={styles.eventInfoIcon}
					/>
					<Text style={styles.eventDate}>
						{dayStart} {monStart} {timeStart} - {dayEnd} {monEnd} {timeEnd}
					</Text>
				</View>
				<View style={styles.eventInfoWrap}>
					<Icon
						name="map-marker"
						color={'#37393a'}
						size={14}
						style={styles.eventInfoIcon}
					/>
					<Text style={styles.eventDate}>
						{location_lat} {location_lng}
					</Text>
				</View>
				<View style={styles.eventDetailsWrap}>
					<View style={styles.eventDetails}>
						<Text style={styles.eventDetailsTitle}>About</Text>
						<Text style={styles.eventDetailsText}>{description}</Text>
					</View>
					<View style={styles.eventDetails}>
						<Text style={styles.eventDetailsTitle}>Discussion</Text>
						<Text style={styles.eventDetailsText}>
							Lorem ipsum dolor sit amet, eiusmod tempor incididunt ut labore et
							aliqua.
						</Text>
					</View>
				</View>
				<View style={styles.eventDetailsWrap}>
					<View style={styles.eventDetails}>
						<Text style={styles.eventDetailsTitle}>Interested</Text>
						<ScrollView horizontal={true}>
							{interestedUsers &&
								interestedUsers.map(user => (
									<Image
										source={{
											uri: user.user.avatar
										}}
										style={styles.eventVisitorImg}
									/>
								))}
						</ScrollView>
					</View>
					<View style={styles.eventDetails}>
						<Text style={styles.eventDetailsTitle}>Going</Text>
						<ScrollView horizontal={true}>
							{goingUsers &&
								goingUsers.map(user => (
									<Image
										source={{
											uri: user.user.avatar
										}}
										style={styles.eventVisitorImg}
									/>
								))}
						</ScrollView>
					</View>
				</View>
			</View>
			<TouchableOpacity
				style={styles.buttonWrap}
				onPress={() => {
					props.navigation.navigate('EventList');
				}}
			>
				<Text style={[styles.text, styles.button]}>Go back</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: '3%'
	},
	eventImage: {
		width: '100%',
		height: 200
	},
	eventMainInfo: {
		padding: '3%',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	eventDateStart: {
		marginRight: 20,
		justifyContent: 'center'
	},
	eventDayNum: {
		fontSize: 22,
		fontFamily: 'Inter-Regular'
	},
	eventDay: {
		color: 'tomato',
		fontFamily: 'Inter-Regular'
	},
	eventTitleWrap: {
		justifyContent: 'center'
	},
	eventTitle: {
		fontSize: 22,
		fontFamily: 'Inter-Regular'
	},
	eventCreatorWrap: {
		flexDirection: 'row',
		fontFamily: 'Inter-Regular',
		marginTop: 5
	},
	eventCreatorLabel: {
		fontSize: 14,
		marginRight: 5,
		color: '#37393a',
		fontWeight: '400'
	},
	eventCreator: {
		fontSize: 14,
		color: '#37393a',
		fontWeight: '600'
	},
	eventActionWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20
	},
	eventAction: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		flex: 1
	},
	eventActionLabel: {
		color: '#37393a',
		marginTop: 3
	},
	eventIcon: {
		color: '#37393a',
		fontSize: 18,
		width: 20,
		textAlign: 'center'
	},
	eventInfoIcon: {
		width: 20,
		fontSize: 18,
		textAlign: 'center',
		color: '#37393a',
		marginRight: 9
	},
	eventInfoWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: '3%',
		fontFamily: 'Inter-Regular'
	},
	eventDate: {},
	eventDetailsWrap: {
		flexDirection: 'row'
	},
	eventDetails: {
		flex: 1,
		padding: '3%'
	},
	eventDetailsTitle: {
		fontWeight: '600',
		fontSize: 17,
		borderBottomWidth: 2,
		borderBottomColor: '#37393a',
		marginBottom: 10
	},
	eventDetailsText: {
		fontSize: 13
	},
	eventVisitorsWrap: {
		padding: '3%'
	},
	eventVisitorImg: {
		width: 30,
		height: 30,
		marginRight: 10
	},
	buttonWrap: {
		alignItems: 'center'
	},
	button: {
		width: 125,
		backgroundColor: '#838383',
		marginTop: 10,
		borderRadius: 10,
		textAlign: 'center',
		padding: 3,
		fontWeight: '400',
		fontSize: 18,
		color: 'white',
		fontFamily: 'Inter-SemiBold'
	},
	text: {
		letterSpacing: 0.4,
		fontFamily: 'Inter-Regular'
	}
});
export default EventPage;
