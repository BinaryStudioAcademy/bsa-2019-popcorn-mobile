import React, { Component, Fragment, useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	TextInput
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createMessage } from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'native-base';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
interface IProps {
	createMessage: (userId: string, chatId: string, body: string) => void;
	chatId: string;
	userId: string;
}

interface IState {
	newMessage: string;
}

const NewMessage: React.FC<IProps> = ({ chatId, userId, createMessage }) => {
	const [message, changeMessage] = useState('');

	const sendMessage = () => {
		if (message.trim() === '') return;
		changeMessage('');
		createMessage(userId, chatId, message);
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
						color={!message ? '#555' : '#1976d2'}
						size={20}
					/>
				</TouchableOpacity>
			</View>
			{/* <View style={styles.messageStroke}></View> */}
		</Fragment>
	);
};
const MY_MESSAGE_COLOR = 'rgba(102,255,153,0.3)';

const styles = StyleSheet.create({
	inputWrap: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	input: {
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
		marginTop: 10,
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
