import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	messagesContainer: {
		justifyContent: 'center'
	},
	messageTitle: {
		fontFamily: 'Inter-Regular',
		fontSize: 20,
		padding: 10,
		width: '100%',
		backgroundColor: 'rgba(51,51,204,0.2)',
		textTransform: 'uppercase',
		textAlign: 'center'
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
	myMessage: {
		// backgroundColor: MY_MESSAGE_COLOR
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
		// marginLeft:5
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
		// marginRight: 15,
	},
	messageStroke: {
		backgroundColor: '#dadada',
		height: 2,
		width: '100%'
	},
	sendMessageWrap: {
		// flex: 1
		height: '10%'
	}
});
