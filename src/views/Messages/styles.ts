import { StyleSheet } from 'react-native';

export const INC_MESSAGE_BACKGROUND = '#fb8c00';
export const INC_MESSAGE_COLOR = '#fffde7';

export const OUT_MESSAGE_BACKGROUND = '#e0e0e0';
export const OUT_MESSAGE_COLOR = '#29434e';

export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	messagesContainer: {
		justifyContent: 'center',
		padding: 10,
		flex: 0.9,
		paddingBottom: 0,
		paddingTop: 0
	},

	messageInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 5
	},
	messageTime: {
		fontFamily: 'Inter-Regular',
		fontWeight: '300',
		color: '#555',
		fontSize: 12
	},
	messageItem: {
		flexDirection: 'row',
		padding: 10,
		paddingBottom: 0,
		paddingLeft: 5,
		alignItems: 'flex-start'
	},
	messageContent: {
		flex: 10
	},
	messageText: {
		fontFamily: 'Inter-Regular',
		fontSize: 13,
		width: '90%'
	},
	messageName: {
		fontFamily: 'Inter-Medium',
		fontSize: 14,
		fontWeight: '600'
	},
	messageAvatarWrap: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	messageAvatar: {
		width: 30,
		height: 30,
		borderRadius: 30 / 2
	},
	messageStroke: {
		backgroundColor: '#dadada',
		height: 2,
		width: '100%'
	},
	sendMessageWrap: {
		flex: 0.1
	},
	editWrap: {
		height: 20,
		width: 40,
		padding: 3,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	messageTimeWrap: {
		fontFamily: 'Inter-Regular',
		fontWeight: '300',
		fontSize: 11,
		flex: 2,
		textAlign: 'right'
	},
	outgoingWrap: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	messageWrap: {
		flexDirection: 'row',
		padding: 10,
		alignItems: 'flex-start',
		marginBottom: 10,
		width: '80%',
		borderRadius: 15
	},

	messageTextWrap: {
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		flex: 8,
		paddingTop: 0
	},
	newDateWrap: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10
	},
	newDate: {
		fontFamily: 'Inter-Regular',
		fontSize: 13,
		borderRadius: 5,
		color: '#fff',
		textAlign: 'center',
		backgroundColor: 'rgba(119,119,119,0.7)',
		width: '30%',
		fontWeight: '500'
	},
	partnerWrap: {
		flexDirection: 'row',
		padding: 10,
		marginBottom: 2,
		alignItems: 'center',
		width: '100%',
		backgroundColor: OUT_MESSAGE_BACKGROUND
	},
	messageTitle: {
		marginLeft: 10,
		color: OUT_MESSAGE_COLOR,
		fontFamily: 'Inter-Regular',
		fontSize: 18,
		textAlign: 'center',
		fontWeight: '500'
	}
});
