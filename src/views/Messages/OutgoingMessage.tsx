import React, { Fragment, useState } from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { styles, OUT_MESSAGE_BACKGROUND, OUT_MESSAGE_COLOR } from './styles';
import { deleteMessage, updateMessage } from './actions';
import moment from 'moment';
import MessageOptions from './MessageOptions';

interface IProps {
	createMessage: (userId: string, chatId: string, body: string) => void;
	deleteMessage: (id: string) => void;
	updateMessage: (id: string, body: string) => void;
	outgoingMessage: any;
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
	let { body, created_at } = outgoingMessage;
	let time = moment(created_at)
		.utc()
		.format('hh:mm A');

	const editMessage = () => {
		updateMessage(outgoingMessage.id, message);
	};
	return (
		<Fragment>
			<TouchableWithoutFeedback
				disabled={editing}
				onPress={() => {
					toggleOptions(!optionsEnabled);
				}}
			>
				<View style={styles.outgoingWrap}>
					{optionsEnabled && (
						<MessageOptions
							deleteMessage={deleteMessage}
							outgoingMessage={outgoingMessage}
							editing={editing}
							toggleEditing={toggleEditing}
							disableSend={disableSend}
							toggleOptions={toggleOptions}
							optionsEnabled={optionsEnabled}
							editMessage={editMessage}
							changeMessage={changeMessage}
							body={body}
						/>
					)}
					<View
						style={[
							styles.messageWrap,
							optionsEnabled ? { marginTop: 8, marginBottom: 8 } : null,
							,
							{
								backgroundColor: optionsEnabled
									? '#555'
									: OUT_MESSAGE_BACKGROUND,
								alignSelf: 'flex-end'
							}
						]}
					>
						{!editing ? (
							<Text
								style={[
									styles.messageTextWrap,
									{ color: optionsEnabled ? '#fff' : OUT_MESSAGE_COLOR }
								]}
							>
								{body}
							</Text>
						) : (
							<TextInput
								textAlignVertical={'top'}
								multiline={true}
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
									changeMessage(text);
								}}
							/>
						)}
						<Text
							style={[
								styles.messageTimeWrap,
								{ color: optionsEnabled ? '#fff' : OUT_MESSAGE_COLOR }
							]}
						>
							{time}
						</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
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
