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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import config from '../../config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
	styles,
	OUT_MESSAGE_BACKGROUND,
	OUT_MESSAGE_COLOR,
	INC_MESSAGE_BACKGROUND
} from './styles';
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
	const [message, changeMessage] = useState(outgoingMessage.body);
	const [disableSend, handleChangeDisable] = useState(false);
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
		updateMessage(outgoingMessage.id, message);
	};

	const onMessageChange = text => {
		changeMessage(text);
	};
	return (
		<Fragment>
			<TouchableWithoutFeedback
				disabled={editing}
				onPress={() => {
					toggleOptions(!optionsEnabled);
				}}
			>
				<View
					style={[
						styles.messageWrap,
						{
							backgroundColor: editing ? '#555' : OUT_MESSAGE_BACKGROUND,
							position: 'relative',
							alignSelf: 'flex-end'
						}
					]}
				>
					{!editing ? (
						<Text
							style={[styles.messageTextWrap, { color: OUT_MESSAGE_COLOR }]}
						>
							{body}
						</Text>
					) : (
						<TextInput
							textAlignVertical={'top'}
							multiline={true}
							// numberOfLines={4}
							placeholder={'Edit a message'}
							placeholderTextColor={'#383838'}
							selectTextOnFocus={true}
							onEndEditing={() => {}}
							value={message}
							style={[
								styles.messageTextWrap,
								editing ? { color: '#fff' } : null
							]}
							onChangeText={text => {
								handleChangeDisable(!text);
								onMessageChange(text);
							}}
						/>
					)}
					<Text style={[styles.messageTimeWrap, { color: OUT_MESSAGE_COLOR }]}>
						{time}
					</Text>
				</View>
			</TouchableWithoutFeedback>
			{optionsEnabled && (
				<View style={styles.editWrap}>
					{!editing ? (
						<Fragment>
							<TouchableOpacity
								style={styles.editButton}
								onPress={() => {
									deleteMessage(outgoingMessage.id);
								}}
							>
								<FontAwesome5 name="times" color={'#fff'} size={20} />
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.editButton}
								onPress={() => {
									toggleEditing(!editing);
								}}
							>
								<FontAwesome5 name="pencil-alt" color={'#fff'} size={20} />
							</TouchableOpacity>
						</Fragment>
					) : (
						<Fragment>
							<TouchableOpacity
								disabled={disableSend}
								style={styles.editButton}
								onPress={() => {
									// alert('ALERT');
									toggleEditing(!editing);
									toggleOptions(!optionsEnabled);
									editMessage();
								}}
							>
								<FontAwesome
									name="send"
									color={disableSend ? '#fff' : INC_MESSAGE_BACKGROUND}
									size={20}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.editButton}
								onPress={() => {
									onMessageChange(body);
									toggleEditing(!editing);
									toggleOptions(!optionsEnabled);
								}}
							>
								<MaterialCommunityIcons
									name="cancel"
									color={'#fff'}
									size={20}
								/>
							</TouchableOpacity>
						</Fragment>
					)}
				</View>
			)}
		</Fragment>
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

// 		admin@gmail.com
