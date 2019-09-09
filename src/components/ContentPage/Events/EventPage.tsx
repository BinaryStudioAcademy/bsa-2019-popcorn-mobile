import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEventById } from '../../../redux/routines';
import {
	createEventVisitor,
	updateEventVisitor,
	deleteEventVisitor
} from '../../../redux/routines';
import {
	ScrollView,
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import config from '../../../config';
import Spinner from '../../Spinner/Spinner';

interface IProps {
	navigation: any;
	event: any;
	fetchEventById: (string) => any;
	createEventVisitor: (visitor) => any;
	updateEventVisitor: (visitor) => any;
	deleteEventVisitor: (visitor) => any;
	currentUser: string;
}

const EventPage: React.FC<IProps> = props => {
	let event;
	if (props.navigation.state.params.eventId) {
		const eventId = props.navigation.state.params.eventId;
		if (!props.event || props.event.id !== eventId) {
			props.fetchEventById(props.navigation.state.params.eventId);
			return <Spinner />;
		} else event = props.event;
	}

	const visitor = props.event.eventVisitors.find(
		visitor => visitor.userId === props.currentUser
	);

	const setVisitor = (status: string) => {
		if (visitor) {
			if (visitor.status === status)
				props.deleteEventVisitor({
					visitorId: visitor.id, 
					eventId: event.id
				});
			else
				props.updateEventVisitor({
					id: visitor.id,
					eventId: event.id,
					userId: props.currentUser,
					status
				});
		} else {
			props.createEventVisitor({
				eventId: event.id,
				userId: props.currentUser,
				status
			});
		}
	};

	const {
		title,
		description,
		image,
		start_date,
		end_date,
		location_lat,
		location_lng,
		eventVisitors
	} = event;
	let timeStart = moment(start_date)
		.utc()
		.format('hh:mm A');
	let dayStart = moment(start_date)
		.utc()
		.format('DD');
	let monStart = moment(start_date)
		.utc()
		.format('MMM');
	let timeEnd = moment(end_date)
		.utc()
		.format('hh:mm A');
	let dayEnd = moment(end_date)
		.utc()
		.format('DD');
	let monEnd = moment(end_date)
		.utc()
		.format('MMM');
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
					</View>
				</View>
				<View style={styles.eventActionWrap}>
					<TouchableOpacity style={styles.eventAction} onPress={() => { 
						setVisitor('interested') 
					}}>
							{
								(!visitor || visitor.status !== 'interested') &&
								<Icon
									name="star"
									color={'#37393a'}
									size={14}
									style={[styles.eventIcon]}
								/>
							}
							{
								!!visitor && visitor.status === 'interested' &&
								<Icon
									name="check"
									color={'#37393a'}
									size={14}
									style={[styles.eventIcon]}
								/>
							}
						<Text style={styles.eventActionLabel}>Interested</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.eventAction} onPress={() => { 
						setVisitor('going') 
					}}>
						{
							(!visitor || visitor.status !== "going") &&
							<Icon
								name='user-plus'
								color='#37393a'
								size={14}
								style={styles.eventIcon}
							/>
						}
						{
							!!visitor && visitor.status === 'going' &&
							<Icon 
								name="check"
								color='#37393a'
								size={14}
								style={styles.eventIcon}
							/>
						}
						<Text style={styles.eventActionLabel}>Going</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.eventInfoWrap}>
					<Icon
						name="calendar"
						color={'#37393a'}
						size={14}
						style={styles.eventInfoIcon}
					/>
					<Text>
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
					<Text>
						{location_lat} {location_lng}
					</Text>
				</View>
				{
					!!description &&
					<View style={styles.eventDetailsWrap}>
						<View style={styles.eventDetails}>
							<Text style={styles.eventDetailsTitle}>About</Text>
							<Text style={styles.eventDetailsText}>{description}</Text>
						</View>
					</View>
				}
				<View style={styles.eventDetailsWrap}>
					<View style={styles.eventDetails}>
						<Text style={styles.eventDetailsTitle}>Interested</Text>
						<ScrollView horizontal={true}>
							{interestedUsers &&
								interestedUsers.map(user => (
									<Image
										key={user.id}
										source={{
											uri: user.user.avatar
												? user.user.avatar
												: config.DEFAULT_AVATAR
										}}
										style={styles.eventVisitorImg}
									/>
								))
							}
							{
								!interestedUsers.length &&
								<Text style={[styles.text, styles.eventCreatorLabel]}>Nobody is interested</Text>
							}
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
												? user.user.avatar
												: config.DEFAULT_AVATAR
										}}
										style={styles.eventVisitorImg}
									/>
								))
							}
							{
								!goingUsers.length &&
								<Text style={[styles.text, styles.eventCreatorLabel]}>Nobody is going</Text>
							}
						</ScrollView>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	event: rootState.events.currentEvent,
	loading: rootState.events.loading,
	currentUser: rootState.authorization.profileInfo.id
});

const actions = {
	fetchEventById,
	updateEventVisitor,
	deleteEventVisitor,
	createEventVisitor
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

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
		flex: 1,
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
		fontSize: 12,
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
		padding: 10,
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
		marginRight: 5,
		marginLeft: 5
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
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventPage);
