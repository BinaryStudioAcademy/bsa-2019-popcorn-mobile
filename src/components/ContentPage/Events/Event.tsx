import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	StyleSheet,
	Image,
	Dimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faCheck,
	faUsers,
	faStar,
	faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import {
	IEventFormatDataBase,
	IEventFormatClient,
	formatToClient
} from '../../../services/event.service';
import Moment from 'moment';
const { width } = Dimensions.get('window');

interface IVisitor {
	event: string;
	status: string;
	isNew?: boolean;
}

interface IProps {
	event: IEventFormatDataBase;
	navigation: any;
	setVisitor: (IVisitor) => any;
	currentUser: string;
}

const Event: React.FC<IProps> = ({
	event,
	navigation,
	setVisitor,
	currentUser
}) => {
	const visitor = event.eventVisitors.find(
		visitor => visitor.userId === currentUser
	);

	const setVisitorStatus = (status: string) => {
		if (visitor) {
			if (visitor.status === status)
				setVisitor({ status: '', visitorId: visitor.id, event: event.id });
			else
				setVisitor({
					status,
					event: event.id,
					isNew: false,
					visitorId: visitor.id
				});
		} else {
			setVisitor({ status, event: event.id, isNew: true });
		}
	};

	const data: IEventFormatClient = formatToClient(event);
	Moment.locale('en');
	return (
		<TouchableOpacity
			style={styles.main}
			onPress={() => {
				navigation.navigate('EventPage', { eventId: event.id });
			}}
		>
			<View style={styles.container}>
				<View style={{ marginRight: 10 }}>
					<Image
						source={{
							uri:
								data.image ||
								'https://blog.hootsuite.com/wp-content/uploads/2017/06/social-media-content-calendar-940x470.jpg'
						}}
						style={{ width: 110, height: 80 }}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.column}>
					<View style={styles.horizontalContainer}>
						<Text numberOfLines={2} style={[styles.text, styles.title]}>
							{data.title}
						</Text>
						<View style={[styles.visitors]}>
							<FontAwesomeIcon
								style={{ ...styles.icon, color: '#122737' }}
								icon={faUsers}
							/>
							<Text>{data.eventVisitors.length}</Text>
						</View>
					</View>
					<View>
						<Text>
							{Moment(data.dateRange.startDate).format('D MMM HH:mm')} -
							{Moment(data.dateRange.endDate).format(' D MMM HH:mm')}
						</Text>
					</View>
					{!!data.description && (
						<Text numberOfLines={1} style={[styles.text, styles.description]}>
							{data.description}
						</Text>
					)}
					<View style={[styles.horizontalContainer, { justifyContent: "flex-start" }]}>
						<TouchableWithoutFeedback>
							<TouchableOpacity
								style={[styles.button, { marginRight: 10 } ]}
								onPress={() => setVisitorStatus('interested')}
							>
								{!!visitor && visitor.status === 'interested' && (
									<FontAwesomeIcon style={styles.icon} icon={faCheck} />
								)}
								{(!visitor || visitor.status !== 'interested') && (
									<FontAwesomeIcon style={styles.icon} icon={faStar} />
								)}
								<Text style={[styles.text, styles.buttonText]}>Interested</Text>
							</TouchableOpacity>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback>
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									setVisitorStatus('going');
								}}
							>
								{!!visitor && visitor.status === 'going' && (
									<FontAwesomeIcon style={styles.icon} icon={faCheck} />
								)}
								{(!visitor || visitor.status !== 'going') && (
									<FontAwesomeIcon style={styles.icon} icon={faUserPlus} />
								)}
								<Text style={[styles.text, , styles.buttonText]}>Going</Text>
							</TouchableOpacity>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Event;

const styles = StyleSheet.create({
	main: {
		margin: 10
	},
	container: {
		padding: 10,
		borderColor: 'rgba(0, 0, 0, .1)',
		borderWidth: 1,
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center'
	},
	horizontalContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		flex: 1,
		width: '100%'
	},
	imageContainer: {
		width: 110,
		height: '100%',
		marginRight: 5
	},
	button: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		height: 25,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FF6501',
		marginTop: 5,
		borderRadius: 55,
		padding: 10,
		alignSelf: 'flex-end'
	},
	text: {
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		color: '#122737'
	},
	title: {
		fontFamily: 'Inter-SemiBold',
		fontSize: 16,
		marginBottom: 3,
		width: '75%'
	},
	buttonText: {
		fontFamily: 'Inter-Medium',
		color: 'white'
	},
	icon: {
		color: 'white',
		marginRight: 4
	},
	column: {
		width: width - 165
	},
	visitors: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '20%',
		alignSelf: 'flex-start'
	},
	description: {
		marginTop: 5,
		fontSize: 12
	}
});
