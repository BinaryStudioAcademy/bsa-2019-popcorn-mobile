import React, { Component, Fragment } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendStory, sendVoting } from '../actions';
import INewStory from '../INewStory';
import Spinner from '../../../Spinner/Spinner';
import Extra from './Extra';
import IUser from '../../../UserPage/IUser';
import ImageUploader from '../../../ImageUploader';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DraggableText from './DraggableText';
import Voting from '../Voting/Voting';
import IVoting from '../Voting/IVoting';
import ColorPicker from './ColorPicker';
const DEFAULT_BACKGROUND = '#dadada';
interface IProps {
	sendStory: (newStory: INewStory) => any;
	sendVoting: (any) => any;
	newVoting: any;
	profileInfo: IUser;
	navigation: any;
	newStory: INewStory;
	setNewStory: ({ newStory, data }: { newStory: INewStory; data: any }) => void;
	data: any;
	showModal: (open: boolean) => any;
	handleDisable: (boolean) => any;
	disabled: boolean;
	validateStory: (any) => any;
	resetStory: (any) => any;
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

const newStoryDefault: INewStory = {
	activityId: '',
	backgroundColor: '#dadada',
	fontColor: '#000',
	movieId: null,
	movieOption: '',
	image_url: '',
	caption: null,
	activity: null,
	textPositionX: 0,
	textPositionY: 0,
	type: ''
};
class StoryModal extends Component<IProps, IState> {
	updateInput: (newestStory: any) => void;
	updateVoting: (newVoting: IVoting | null, disabled: boolean) => void;
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			loading: false,
			showInput: false,
			uploadWrapHeight: 0,
			uploadWrapWidth: 0,
			showVoting: false,
			voting: null
		};
		this.updateInput = this.handleUpdateStory.bind(this);
		this.updateVoting = this.handleUpdateVoting.bind(this);
	}
	handleUpdateStory(value) {
		this.setState(state => ({
			showInput: value
		}));
	}
	handleUpdateVoting(newVoting, value) {
		this.props.handleDisable(value);
		this.setState(state => ({
			voting: newVoting
		}));
	}
	componentDidMount() {
		this.props.validateStory({
			newStory: this.props.newStory,
			data: this.props.data,
			voting: this.state.voting,
			handleDisable: this.props.handleDisable
		});
	}
	componentDidUpdate(prevProps) {
		if (this.props.data !== prevProps.data) {
			this.props.validateStory({
				newStory: this.props.newStory,
				data: this.props.data,
				voting: this.state.voting,
				handleDisable: this.props.handleDisable
			});
		}
	}
	onSave() {
		const { data, newStory } = this.props;
		const { voting } = this.state;
		if (voting) {
			this.props.sendVoting({
				voting,
				newStory,
				userId: this.props.profileInfo.id
			});
		} else {
			this.props.sendStory({
				...this.props.newStory,
				caption: data ? '' : this.props.newStory.caption,
				activity: data ? { id: data.option.id, name: data.option.title } : null,
				activityId: data ? data.option.id : '',
				type: data ? data.type : '',
				userId: this.props.profileInfo.id
			});
		}
		this.props.setNewStory({ newStory: newStoryDefault, data: null });
		this.props.showModal(false);
	}
	renderColorPicker = paletteType => {
		return (
			<ColorPicker
				setNewStory={this.props.setNewStory}
				newStory={this.props.newStory}
				data={this.props.data}
				paletteType={paletteType}
			/>
		);
	};

	clearExtra = () => {
		this.props.setNewStory({
			newStory: {
				...this.props.newStory,
				image_url: '',
				caption: '',
				backgroundColor: DEFAULT_BACKGROUND
			},
			data: null
		});
		this.setState({ showInput: false });
	};

	renderBasicOptions = () => {
		const { caption } = this.props.newStory;
		return (
			<Fragment>
				<ImageUploader
					startUpload={() => this.setState({ loading: true })}
					saveUrl={(image_url: string) => {
						this.clearExtra();
						this.setState({
							voting: null,
							showVoting: false
						});
						this.props.setNewStory({
							newStory: { ...this.props.newStory, image_url, caption: '' },
							data: this.props.data
						});
						this.setState(state => ({
							loading: false,
							showVoting: false
						}));
						this.props.validateStory({
							newStory: this.props.newStory,
							data: this.props.data,
							voting: this.state.voting,
							handleDisable: this.props.handleDisable
						});
					}}
				>
					<Icon name="camera" color={'#555'} size={30} />
				</ImageUploader>
				<TouchableOpacity
					onPress={() => {
						this.setState({
							voting: null,
							showVoting: false
						});
						this.setState({
							showInput: caption ? true : !this.state.showInput
						});
					}}
				>
					<Fontisto name="font" color={'#555'} size={30} />
				</TouchableOpacity>
			</Fragment>
		);
	};
	renderExtraOptions = () => {
		return (
			<Fragment>
				<TouchableOpacity
					onPress={() => {
						this.setState({
							voting: null,
							showVoting: false
						});
						this.props.navigation.navigate('ChooseExtraOption', {
							option: 'survey'
						});
					}}
				>
					<Icon name="clipboard" color={'#555'} size={30} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.setState({
							voting: null,
							showVoting: false
						});
						this.props.navigation.navigate('ChooseExtraOption', {
							option: 'top'
						});
					}}
				>
					<Icon name="trophy" color={'#555'} size={30} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.setState({
							voting: null,
							showVoting: false
						});
						this.props.navigation.navigate('ChooseExtraOption', {
							option: 'event'
						});
					}}
				>
					<Icon name="calendar" color={'#555'} size={30} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.clearExtra();
						this.props.validateStory({
							caption: '',
							newStory: this.props.newStory,
							data: this.props.data,
							voting: this.state.voting,
							handleDisable: this.props.handleDisable
						});
						this.setState({
							voting: this.state.showVoting ? null : this.state.voting,
							showVoting: !this.state.showVoting
						});
					}}
				>
					<MaterialCommunityIcons
						name="cloud-question"
						color={'#555'}
						size={40}
					/>
				</TouchableOpacity>
			</Fragment>
		);
	};
	renderTextInput = caption => {
		return (
			<TextInput
				textAlignVertical={'top'}
				multiline={true}
				numberOfLines={4}
				placeholder={'YOUR TEXT HERE'}
				placeholderTextColor={'#383838'}
				maxLength={40}
				style={[
					styles.input,
					{
						color: this.props.newStory.fontColor
							? this.props.newStory.fontColor
							: null
					}
				]}
				value={caption || ''}
				onChangeText={caption => {
					this.props.setNewStory({
						newStory: { ...this.props.newStory, caption },
						data: this.props.data
					});
					this.props.validateStory({
						newStory: this.props.newStory,
						data: this.props.data,
						voting: this.state.voting,
						handleDisable: this.props.handleDisable
					});
				}}
			/>
		);
	};
	static getDerivedStateFromProps(props, state) {
		return {
			...state,
			newStory: { ...props.newStory, image_url: props.newStory.image_url }
		};
	}
	render() {
		if (this.state.loading) return <Spinner />;
		const { image_url, caption, backgroundColor } = this.props.newStory;
		const { option, type } = this.props.data || { option: null, type: null };
		const { navigation, profileInfo } = this.props;
		return (
			<View style={styles.mainView}>
				<View style={styles.iconsWrp}>
					{this.renderBasicOptions()}
					{this.renderExtraOptions()}
				</View>
				<View style={styles.imageEditWrap}>
					{this.renderColorPicker('backgroundColor')}

					<View
						onLayout={event => {
							var { width, height } = event.nativeEvent.layout;
							this.setState({
								uploadWrapHeight: height,
								uploadWrapWidth: width
							});
						}}
						style={[
							styles.uploadWrap,
							{
								backgroundColor: backgroundColor
									? backgroundColor
									: DEFAULT_BACKGROUND
							}
						]}
					></View>
					{this.state.showVoting ? (
						<Voting
							newStory={this.props.newStory}
							areaWidth={this.state.uploadWrapWidth}
							areaHeight={this.state.uploadWrapHeight}
							profileInfo={this.props.profileInfo}
							updateVoting={this.updateVoting}
							data={this.props.data}
							handleDisable={this.props.handleDisable}
							validate={this.props.validateStory}
							voting={this.state.voting}
							validateStory={this.props.validateStory}
						/>
					) : null}
					{!this.state.showVoting &&
					(this.state.showInput || caption || image_url) ? (
						<DraggableText
							updateInput={this.updateInput}
							setNewStory={this.props.setNewStory}
							data={this.props.data}
							handleDisable={this.props.handleDisable}
							validate={this.props.validateStory}
							voting={this.state.voting}
							newStory={this.props.newStory}
							caption={caption ? caption : ''}
							backgroundColor={backgroundColor}
							areaWidth={this.state.uploadWrapWidth}
							areaHeight={this.state.uploadWrapHeight}
							// validate={this.validate.bind(this)}
							image_url={image_url ? image_url : null}
							showInput={this.state.showInput}
							isExtra={type ? true : false}
							validateStory={this.props.validateStory}
						/>
					) : null}
					{this.renderColorPicker('fontColor')}
				</View>

				{type ? (
					<View style={styles.renderExtraWrap}>
						<Extra
							user={profileInfo}
							type={type}
							data={option}
							navigation={navigation}
							clearExtra={() => {
								this.clearExtra();
							}}
						/>
					</View>
				) : null}

				<TouchableOpacity
					style={[styles.buttonWrap]}
					onPress={() => {
						this.onSave();
					}}
					disabled={this.props.disabled}
				>
					<Icon
						name="check-circle-o"
						color={this.props.disabled ? '#555' : '#fff'}
						size={50}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	profileInfo: rootState.authorization.profileInfo,
	newVoting: rootState.story.newVoting
});

const actions = {
	sendStory,
	sendVoting
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoryModal);
