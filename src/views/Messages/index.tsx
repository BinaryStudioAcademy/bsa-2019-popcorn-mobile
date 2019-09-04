import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
	fetchChats,
	addMessage,
	deleteMessageStore,
	updateMessageStore
} from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'native-base';
import config from '../../config';
import moment from 'moment';
import SocketService from '../../helpers/socket.helper';

interface IProps {
	fetchChats: (userId) => void;
	chats: any;
	userId: string;
	isLoadingList: boolean;
	addMessage: (any) => void;
	deleteMessageStore: (chatId, messageId) => void;
	updateMessageStore: (chatId, message) => void;
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
		SocketService.join(this.props.userId);
		const { chats } = this.props;
		if (Object.keys(chats).length > 0) {
			Object.keys(chats).forEach(SocketService.join);
			SocketService.on('new-message', this.props.addMessage);
			SocketService.on('delete-message', ({ chatId, messageId }) =>
				this.props.deleteMessageStore(chatId, messageId)
			);
			SocketService.on('update-message', ({ chatId, message }) =>
				this.props.updateMessageStore(chatId, message)
			);
		}
	};
	componentDidMount() {
		this.props.fetchChats(this.props.userId);
	}
	render() {
		if (
			this.props.isLoadingList ||
			!Object.keys(this.props.chats).length ||
			!this.props.chats
		)
			return <Spinner />;
		const { navigation } = this.props;
		const chats = Object.values(this.props.chats);

		const messages = mockMessages;
		return (
			<View style={styles.container}>
				{/* <Text style={styles.chatTitle}>Chats Screen</Text> */}
				{chats.map((chat: any, id) => {
					let { avatar, name } = chat.user;
					let { body, created_at } = chat.lastMessage;
					let time = moment(created_at)
						.utc()
						.format('hh:mm A');
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
										<Text style={styles.messageName}>{name}</Text>
										<Text style={styles.messageTime}>{time}</Text>
									</View>
									<Text style={styles.messageText}>{body}</Text>
								</View>
							</TouchableOpacity>
							<View style={styles.chatStroke}></View>
						</Fragment>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center'
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
		padding: 15,
		alignItems: 'center'
	},
	chatContent: {},
	chatMessage: {
		fontFamily: 'Inter-Regular',
		fontSize: 13
	},
	messageContent: {
		flex: 7
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
		fontSize: 13
	},
	messageText: {
		fontFamily: 'Inter-Regular',
		fontSize: 13
	},
	messageName: {
		fontFamily: 'Inter-Medium',
		fontSize: 14,
		fontWeight: '600'
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
	userId: rootState.authorization.profileInfo.id,
	isLoadingList: rootState.chat.isLoadingList
});

const actions = {
	fetchChats,
	addMessage,
	deleteMessageStore,
	updateMessageStore
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatPage);

// admin@gmail.com
