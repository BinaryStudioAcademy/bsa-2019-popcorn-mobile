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
import { styles, INC_MESSAGE_BACKGROUND, INC_MESSAGE_COLOR } from './styles';

import { deleteMessage, updateMessage } from './actions';
import moment from 'moment';

interface IProps {
	createMessage: (userId: string, chatId: string, body: string) => void;
	outgoingMessage: any;
}

interface IState {
	newMessage: string;
}

const OutgoingMessage: React.FC<IProps> = ({ outgoingMessage }) => {
	let { body, created_at } = outgoingMessage;
	let time = moment(created_at)
		.utc()
		.format('hh:mm A');
	return (
		<View
			style={[styles.messageWrap, { backgroundColor: INC_MESSAGE_BACKGROUND }]}
		>
			<Text style={[styles.messageTextWrap, { color: INC_MESSAGE_COLOR }]}>
				{body}
			</Text>
			<Text style={[styles.messageTimeWrap, { color: INC_MESSAGE_COLOR }]}>
				{time}
			</Text>
		</View>
	);
};

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
