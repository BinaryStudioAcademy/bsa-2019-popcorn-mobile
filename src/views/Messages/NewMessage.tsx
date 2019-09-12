import React, { Fragment, useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createMessage } from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { INC_MESSAGE_BACKGROUND } from './styles';

interface IProps {
	createMessage: (userId: string, chatId: string, body: string) => void;
	chatId: string;
	userId: string;
	scrollToEnd: () => any;
	updateState: (boolean, string) => void;
}

interface IState {
	newMessage: string;
}

const NewMessage: React.FC<IProps> = ({
	chatId,
	userId,
	createMessage,
	scrollToEnd,
	updateState
}) => {
	const [message, changeMessage] = useState('');

	React.useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			() => {
				updateState(true, 'isKeyboardVisible');
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				updateState(false, 'isKeyboardVisible');
			}
		);
		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);
	const sendMessage = () => {
		if (message.trim() === '') return;
		createMessage(userId, chatId, message);
		changeMessage('');
		scrollToEnd();
	};

	const onMessageChange = text => {
		changeMessage(text);
	};
	return (
		<Fragment>
			<View style={styles.messageStroke}></View>
			<View style={styles.inputWrap}>
				<TextInput
					textAlignVertical={'top'}
					multiline={true}
					numberOfLines={4}
					placeholder={'Enter a message'}
					placeholderTextColor={'#383838'}
					selectTextOnFocus={false}
					onEndEditing={() => {}}
					style={[styles.input]}
					value={message}
					onChangeText={text => {
						onMessageChange(text);
					}}
				/>
				<TouchableOpacity
					style={styles.inputButton}
					onPress={sendMessage}
					disabled={!message}
				>
					<FontAwesome
						name="send"
						color={!message ? '#555' : INC_MESSAGE_BACKGROUND}
						size={20}
					/>
				</TouchableOpacity>
			</View>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	inputWrap: {
		padding: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	input: {
		paddingTop: 0,
		fontSize: 15,
		width: '80%',
		fontFamily: 'Inter-Regular'
	},
	inputButton: {
		justifyContent: 'center',
		width: '100%',
		marginRight: 10
	},
	messageStroke: {
		backgroundColor: '#dadada',
		height: 2,
		width: '100%'
	}
});

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.authorization.profileInfo.id
});

const actions = {
	createMessage
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewMessage);
