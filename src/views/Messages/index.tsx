import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
	fetchChats,
	addMessage,
	deleteMessageStore,
	updateMessageStore,
	addUnreadMessage
} from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'native-base';
import config from '../../config';
import moment from 'moment';
import SocketService from '../../helpers/socket.helper';
import { INC_MESSAGE_BACKGROUND, INC_MESSAGE_COLOR } from './styles';

interface IProps {
	fetchChats: (userId) => void;
	chats: any;
	userProfile: any;
	isLoadingList: boolean;
	addMessage: (any) => void;
	deleteMessageStore: (chatId, messageId) => void;
	updateMessageStore: (chatId, message) => void;
	addUnreadMessage: (chatId) => void;

	navigation: any;
}
interface IState {}
const mockMessages = [
	{
		mesId: 1,
		mesBody: 'Message',
		mesFrom: { id: '1', name: 'Victor' }
	}
];

class ChatPage extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.addSocketEvents();
	}
	addSocketEvents = () => {
		// SocketService.join(this.props.userProfile.id);
		const { chats } = this.props;
		if (Object.keys(chats).length > 0) {
			Object.keys(chats).forEach(SocketService.join);
			SocketService.on('new-message', message => {
				const chatId = message.chat.id;
				this.props.addMessage(message);
				if (message.user.id !== this.props.userProfile.id) {
					this.props.addUnreadMessage(chatId);
				}
			});
			SocketService.on('delete-message', ({ chatId, messageId }) =>
				this.props.deleteMessageStore(chatId, messageId)
			);
			SocketService.on('update-message', ({ chatId, message }) =>
				this.props.updateMessageStore(chatId, message)
			);
		}
	};
	componentDidMount() {
		this.props.fetchChats(this.props.userProfile.id);
	}
	render() {
		if (
			this.props.isLoadingList ||
			!Object.keys(this.props.chats).length ||
			!this.props.chats
		)
			return <Spinner />;
		const chats = Object.values(this.props.chats);
		console.log('[INDEX] CHATS = ', chats);
		return (
			<ScrollView contentContainerStyle={styles.container}>
				{chats.map((chat: any, id) => {
					let isOwn = chat.lastMessage.user.id === this.props.userProfile.id;
					let { avatar } = chat.user;
					// let avatar = isOwn ? this.props.userProfile.avatar : chat.user.avatar;
					let name = isOwn ? 'You' : chat.user.name;
					let { body, created_at, isRead } = chat.lastMessage;
					let time = moment(created_at)
						.utc()
						.format('D.MM.YY');
					return (
						<Fragment key={chat.id}>
							<TouchableOpacity
								style={styles.chatItem}
								onPress={() =>
									this.props.navigation.navigate('Messages', {
										chatId: chat.id
									})
								}
							>
								<View style={styles.chatAvatarWrap}>
									<Image
										source={{ uri: avatar ? avatar : config.DEFAULT_AVATAR }}
										style={styles.messageAvatar}
									/>
								</View>
								<View style={styles.messageContent}>
									<View style={styles.messageInfo}>
										<Text
											style={[
												styles.messageName,
												!isRead && !isOwn ? { fontWeight: '700' } : null
											]}
										>
											{name}
										</Text>
										<Text
											style={[
												styles.messageTime,
												!isRead && !isOwn ? { fontWeight: '700' } : null
											]}
										>
											{time}
										</Text>
									</View>

									<Text
										numberOfLines={2}
										style={[
											styles.messageText,
											!isRead && !isOwn ? { fontWeight: '700' } : null
										]}
									>
										{body.length < 35
											? `${body}`
											: `${body.substring(0, 92)}...`}
									</Text>
								</View>
								{!isRead && !isOwn && (
									<View style={styles.notification}>
										<Text style={styles.notificationNum}>
											{chat.unreadMessagesCount}
										</Text>
									</View>
								)}
							</TouchableOpacity>
							<View style={styles.chatStroke}></View>
						</Fragment>
					);
				})}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center'
	},
	notificationNum: {
		color: INC_MESSAGE_COLOR,
		fontSize: 12
	},
	notification: {
		width: 25,
		height: 25,
		borderRadius: 25 / 2,
		backgroundColor: INC_MESSAGE_BACKGROUND,
		position: 'absolute',
		right: 15,
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 5
	},
	chatAvatarWrap: {
		flex: 1
	},
	chatTitle: {
		fontFamily: 'Inter-Regular',
		fontSize: 20,
		padding: 10,
		width: '100%',
		backgroundColor: 'rgba(51,51,204,0.2)',
		textTransform: 'uppercase',
		textAlign: 'center'
	},
	chatItem: {
		flexDirection: 'row',
		padding: 13,
		alignItems: 'center'
	},
	chatContent: {},
	chatMessage: {
		fontFamily: 'Inter-Regular',
		fontSize: 13
	},
	messageContent: {
		flex: 7,
		position: 'relative'
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

		fontSize: 13,
		paddingRight: 10
	},
	messageText: {
		fontFamily: 'Inter-Regular',
		fontSize: 13,
		fontWeight: '400'
	},
	messageName: {
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		fontWeight: '500'
	},
	messageAvatarWrap: {
		flex: 1
	},
	messageAvatar: {
		width: 30,
		height: 30,
		borderRadius: 30 / 2,
		marginRight: 15
	},
	chatStroke: {
		backgroundColor: '#dadada',
		height: 2,
		width: '100%'
	}
});

const mapStateToProps = (rootState, props) => ({
	...props,
	chats: rootState.chat.chats,
	userProfile: rootState.authorization.profileInfo,
	isLoadingList: rootState.chat.isLoadingList
});

const actions = {
	fetchChats,
	addMessage,
	deleteMessageStore,
	updateMessageStore,
	addUnreadMessage
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatPage);

// admin@gmail.com
