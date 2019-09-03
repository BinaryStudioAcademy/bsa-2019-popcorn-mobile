import React, { Component, Fragment, useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	TextInput,
	TouchableWithoutFeedback,
	TouchableOpacity
} from 'react-native';
// import {  } from 'react-native-gesture-handler';
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
	const [optionsEnabled, toggleOptions] = useState(false);
	const [editing, toggleEditing] = useState(false);
	let { avatar, name } = outgoingMessage.user;
	let { body, created_at } = outgoingMessage;
	let time = moment(created_at)
		.utc()
		.format('hh:mm A');

	const sendMessage = () => {
		if (message.trim() === '') return;
		changeMessage('');
		// updateMessage(chatId, message);
	};
	const editMessage = () => {
		updateMessage(outgoingMessage.id, '');
	};

	const onMessageChange = text => {
		changeMessage(text);
	};
	return (
		<View style={styles.editWrap}>
			<TouchableOpacity
				style={styles.editButton}
				onPress={() => {
					deleteMessage(outgoingMessage.id);
				}}
			>
				<FontAwesome name="times" color={'#fff'} size={20} />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.editButton}
				onPress={() => {
					toggleEditing(!editing);
				}}
			>
				<FontAwesome name="pencil-alt" color={'#fff'} size={20} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	editWrap: {
		position: 'absolute',
		height: 30,
		right: 10,
		width: 60,
		bottom: 0,
		backgroundColor: 'rgba(17,17,17,0.5)',
		padding: 5,
		zIndex: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	editButton: {
		// marginBottom: 8
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
