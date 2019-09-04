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

export const TextButton = (props: IProps) => {
	const {
		newStory,
		handleDisable,
		validateStory,
		setNewStory,
		data,
		clearExtra,
		voting,
		handleUpdateState,
		showInput
	} = props;
	return (
		<TouchableOpacity
			onPress={() => {
				handleUpdateState(null, 'voting');
				handleUpdateState(false, 'showVoting');
				handleUpdateState(newStory.caption ? true : !showInput, 'showInput');
			}}
		>
			<Fontisto name="font" color={'#555'} size={30} />
		</TouchableOpacity>
	);
};

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
							newStory: { ...this.props.newStory, image_url, caption: '' },
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
					handleDisable={this.props.handleDisable}
					handleUpdateState={this.props.handleUpdateState}
					voting={this.props.voting}
					clearExtra={this.props.clearExtra}
					setNewStory={this.props.setNewStory}
					validateStory={this.props.validateStory}
					data={this.props.data}
					showInput={this.props.showInput}
				/>
			</Fragment>
		);
	}
}
