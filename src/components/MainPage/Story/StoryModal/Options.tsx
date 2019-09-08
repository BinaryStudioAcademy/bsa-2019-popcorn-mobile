import React, { Component, Fragment } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TextInput
} from 'react-native';
import ImageUploader from '../../../ImageUploader';
import IVoting from '../Voting/IVoting';
import INewStory from '../INewStory';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextButton from './TextButton';

interface IProps {
	newStory: INewStory;
	handleDisable: (boolean) => any;
	validateStory: (any) => any;
	setNewStory: ({ newStory, data }: { newStory: INewStory; data: any }) => void;
	data: any;
	clearExtra: () => any;
	voting: any;
	handleUpdateState: (any, string) => any;
	showInput: boolean;
}

interface IState {
	modalVisible: boolean;
	loading: boolean;
	showInput: boolean;
	uploadWrapHeight: number;
	uploadWrapWidth: number;
	showVoting: boolean;
	voting: IVoting | null;
}

interface IOpenButtonProps {
	newStory: INewStory;
	handleDisable: (boolean) => any;
	validateStory: (any) => any;
	data: any;
	clearExtra: () => any;
	voting: any;
	handleUpdateState: (any, string) => any;
	showVoting: boolean;
}

export const OpenButton = (props: IOpenButtonProps) => {
	const {
		showVoting,
		newStory,
		handleDisable,
		validateStory,
		data,
		clearExtra,
		voting,
		handleUpdateState
	} = props;
	return (
		<TouchableOpacity
			onPress={() => {
				clearExtra();
				validateStory({
					caption: '',
					newStory: newStory,
					data: data,
					voting: voting,
					handleDisable: handleDisable
				});
				handleUpdateState(showVoting ? null : voting, 'voting');
				handleUpdateState(!showVoting, 'showVoting');
			}}
		>
			<MaterialCommunityIcons name="cloud-question" color={'#555'} size={40} />
		</TouchableOpacity>
	);
};

interface IExtraProps {
	handleUpdateState: (any, string) => any;
	navigation: any;
	extraName: string;
}

export const ExtraButton = (props: IExtraProps) => {
	const { extraName, handleUpdateState, navigation } = props;

	let icon;
	if (extraName === 'survey') icon = 'clipboard';
	else if (extraName === 'top') icon = 'trophy';
	else if (extraName === 'event') icon = 'calendar';
	return (
		<TouchableOpacity
			onPress={() => {
				handleUpdateState(false, 'showVoting');
				handleUpdateState(null, 'voting');
				navigation.navigate('ChooseExtraOption', {
					option: extraName
				});
			}}
		>
			<Icon name={icon} color={'#555'} size={30} />
		</TouchableOpacity>
	);
};

export default class Options extends Component<IProps, IState> {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Fragment>
				<ImageUploader
					startUpload={() => this.props.handleUpdateState(true, 'loading')}
					saveUrl={(image_url: string) => {
						this.props.clearExtra();
						this.props.handleUpdateState(null, 'voting');
						this.props.setNewStory({
							newStory: { ...this.props.newStory, image_url },
							data: this.props.data
						});
						this.props.handleUpdateState(false, 'loading');
						this.props.handleUpdateState(false, 'showVoting');
						this.props.validateStory({
							newStory: this.props.newStory,
							data: this.props.data,
							voting: this.props.voting,
							handleDisable: this.props.handleDisable
						});
					}}
				>
					<Icon name="camera" color={'#555'} size={30} />
				</ImageUploader>
				<TextButton
					newStory={this.props.newStory}
					handleUpdateState={this.props.handleUpdateState}
					showInput={this.props.showInput}
				/>
			</Fragment>
		);
	}
}
