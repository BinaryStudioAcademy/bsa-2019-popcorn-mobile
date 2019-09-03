import React, { Component, Fragment, useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	TextInput,
	TouchableWithoutFeedback
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import config from '../../config';

import { deleteMessage, updateMessage } from './actions';
import moment from 'moment';

interface IProps {
	createMessage: (userId: string, chatId: string, body: string) => void;
	deleteMessage: (id: string) => void;
	updateMessage: (id: string, body: string) => void;
	outgoingMessage: any;
}

interface IState {
	newMessage: string;
}

const OutgoingMessage: React.FC<IProps> = ({
	outgoingMessage,
	deleteMessage,
	updateMessage
}) => {
	console.log('outgoingMessage', outgoingMessage);
	const [message, changeMessage] = useState('');
	const [editing, toggleEditing] = useState(false);
	let { avatar, name } = outgoingMessage.user;
	let { body, created_at } = outgoingMessage;
	let time = moment(created_at)
		.utc()
		.format('hh:mm A');
	return (
		<View style={styles.messageItem}>
			<View style={styles.messageAvatarWrap}>
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
		</View>
	);
};

const styles = StyleSheet.create({
	messagesContainer: {
		justifyContent: 'center'
		// flex: 6
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
	editWrap: {
		position: 'absolute',
		height: 20,
		right: 20,
		width: 200,
		top: -20,
		backgroundColor: 'rgba(17,17,17,0.5)',
		padding: 5
	},
	editButton: {
		marginBottom: 8
	}
});

const mapStateToProps = (rootState, props) => ({
	...props,
	isLoadingMessages: rootState.chat.isLoadingMessages
});

const actions = {
	deleteMessage,
	updateMessage
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OutgoingMessage);

// 		admin@gmail.com
