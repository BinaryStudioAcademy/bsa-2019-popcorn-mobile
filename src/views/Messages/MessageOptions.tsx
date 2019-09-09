import React, { Fragment } from 'react';
import { View, TouchableOpacity } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles, INC_MESSAGE_BACKGROUND } from './styles';

interface IOptionsProps {
	deleteMessage: (id: string) => void;
	outgoingMessage: any;
	editing: boolean;
	toggleEditing: (boolean) => void;
	disableSend: boolean;
	toggleOptions: (boolean) => void;
	optionsEnabled: boolean;
	editMessage: () => void;
	changeMessage: (string) => void;
	body: string;
}
const MessageOptions = (props: IOptionsProps) => {
	const {
		body,
		changeMessage,
		editMessage,
		optionsEnabled,
		toggleOptions,
		disableSend,
		deleteMessage,
		editing,
		outgoingMessage,
		toggleEditing
	} = props;

	return (
		<View style={styles.editWrap}>
			{!editing ? (
				<Fragment>
					<TouchableOpacity
						onPress={() => {
							deleteMessage(outgoingMessage.id);
						}}
					>
						<FontAwesome5 name="times" color={'#555'} size={15} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							toggleEditing(!editing);
						}}
					>
						<FontAwesome5 name="pencil-alt" color={'#555'} size={15} />
					</TouchableOpacity>
				</Fragment>
			) : (
				<Fragment>
					<TouchableOpacity
						disabled={disableSend}
						onPress={() => {
							toggleEditing(!editing);
							toggleOptions(!optionsEnabled);
							editMessage();
						}}
					>
						<FontAwesome
							name="check"
							color={disableSend ? '#555' : INC_MESSAGE_BACKGROUND}
							size={15}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							changeMessage(body);
							toggleEditing(!editing);
							toggleOptions(!optionsEnabled);
						}}
					>
						<MaterialCommunityIcons name="cancel" color={'#555'} size={15} />
					</TouchableOpacity>
				</Fragment>
			)}
		</View>
	);
};

export default MessageOptions;
