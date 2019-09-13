import React, { Component, Fragment } from 'react';
import { TouchableOpacity, View, ScrollView, Keyboard } from 'react-native';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendStory, sendVoting } from '../actions';
import { hideFooter, showFooter } from '../../../../views/Footer/actions';
import INewStory from '../INewStory';
import Spinner from '../../../Spinner/Spinner';
import Extra from './Extra';
import IUser from '../../../UserPage/IUser';
import DraggableText from './DraggableText';
import Voting from '../Voting/Voting';
import IVoting from '../Voting/IVoting';
import ColorPicker from './ColorPicker';
import Options, { ExtraButton, OpenButton } from './Options';
const DEFAULT_BACKGROUND = '#C0C0C0';
import config from './../../../../config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface IProps {
	sendStory: (newStory: INewStory) => any;
	sendVoting: (any) => any;
	newVoting: any;
	profileInfo: IUser;
	navigation: any;
	resetStory: (any) => any;
	hideFooter: () => void;
	showFooter: () => void;
}

interface IState {
	loading: boolean;
	showInput: boolean;
	uploadWrapHeight: number;
	uploadWrapWidth: number;
	showVoting: boolean;
	voting: IVoting | null;
	newStory: INewStory;
	disabled: boolean;
	data: any;
	isBackgroundVisible: boolean;
	isKeyboardVisible: boolean
}

const newStoryDefault: INewStory = {
	activityId: '',
	backgroundColor: '#C0C0C0',
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
	updateState: (value: any, statePropery: any) => void;
	keyboardDidShowListener: any;
	keyboardDidHideListener: any;
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			showInput: false,
			uploadWrapHeight: 0,
			uploadWrapWidth: 0,
			showVoting: false,
			voting: null,
			newStory: newStoryDefault,
			disabled: true,
			data: null,
			isBackgroundVisible: false,
			isKeyboardVisible: false
		};
		this.updateState = this.handleUpdateState.bind(this);
		this.willBlurSubscribe();
		this.willFocusSubscribe();
	}

	willBlurSubscribe = () => {
		this.props.navigation.addListener('willBlur', () => {
			this.props.showFooter();
		});
	};

	willFocusSubscribe = () => {
		this.props.navigation.addListener('willFocus', () => {
			this.props.hideFooter();
		});
	};

	getDefaultImage = type => {
		switch (type) {
			case 'event':
				return config.DEFAULT_EVENT_IMAGE;
			case 'survey':
				return config.DEFAULT_SURVEY_IMAGE;
			case 'top':
				return config.DEFAULT_TOP_IMAGE;
			default:
				return '';
		}
	};

	handleUpdateState(value, statePropery) {
		this.setState(() => ({
			[statePropery]: value
		}));
	}

	handleDisable = (value: boolean) => {
		this.setState({ disabled: value });
	}

	setNewStory = ({ newStory, data }) => {
		this.setState({
			newStory,
			data
		})
	}

	componentDidMount() {
		this.validateStory({
			caption: undefined,
			newStory: this.state.newStory,
			data: this.state.data,
			voting: this.state.voting,
			handleDisable: this.handleDisable
		});
		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this.keyboardDidShow.bind(this)
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this.keyboardDidHide.bind(this)
		);
	}

	keyboardDidShow = () => {
		this.setState({ isKeyboardVisible: true })
	}

	keyboardDidHide = () => {
		this.setState({ isKeyboardVisible: false });
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	validateStory = ({ caption, newStory, data, voting, handleDisable }) => {
		caption = caption === undefined ? newStory.caption : caption;
		const { image_url, backgroundColor } = newStory;
		if (
			(caption && caption.match(/^(?!\s*$).*/) && image_url) ||
			(caption && caption.match(/^(?!\s*$).*/) && backgroundColor) ||
			(data && image_url) ||
			voting
		) {
			handleDisable(false);
		} else {
			handleDisable(true);
		}
	};

	toogleBackgroundColor = () => {
		this.setState({ isBackgroundVisible: !this.state.isBackgroundVisible });
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.data !== prevState.data) {
			this.validateStory({
				caption: undefined,
				newStory: this.state.newStory,
				data: this.state.data,
				voting: this.state.voting,
				handleDisable: this.handleDisable
			});
		}
	}

	onSave() {
		const { voting, data, newStory } = this.state;
		if (voting) {
			this.props.sendVoting({
				voting,
				newStory,
				userId: this.props.profileInfo.id
			});
		} else {
			this.props.sendStory({
				...this.state.newStory,
				caption: data ? '' : this.state.newStory.caption,
				activity: data ? { id: data.option.id, name: data.option.title } : null,
				activityId: data ? data.option.id : '',
				type: data ? data.type : '',
				userId: this.props.profileInfo.id
			});
		}
		this.setNewStory({ newStory: newStoryDefault, data: null });
		this.props.navigation.navigate('First');
	}
	renderColorPicker = paletteType => {
		return (
			<ColorPicker
				toogleBackgroundColor={this.toogleBackgroundColor}
				setNewStory={this.setNewStory}
				newStory={this.state.newStory}
				data={this.state.data}
				paletteType={paletteType}
				isVisible={this.state.isBackgroundVisible}
			/>
		);
	};

	clearExtra = () => {
		this.setNewStory({
			newStory: {
				...this.state.newStory,
				image_url: '',
				caption: '',
				backgroundColor: DEFAULT_BACKGROUND
			},
			data: null
		});
	};

	renderExtraOptions = () => {
		const extraItems = ['survey', 'top', 'event'];
		return (
			<Fragment>
				{extraItems.map(item => (
					<ExtraButton
						handleUpdateState={this.updateState}
						navigation={this.props.navigation}
						extraName={item}
					/>
				))}
				<OpenButton
					newStory={this.state.newStory}
					handleDisable={this.handleDisable}
					handleUpdateState={this.updateState}
					voting={this.state.voting}
					clearExtra={() => {
						this.clearExtra();
					}}
					validateStory={this.validateStory}
					data={this.state.data}
					showVoting={this.state.showVoting}
				/>
			</Fragment>
		);
	};

	render() {
		const { navigation, profileInfo } = this.props;
		const { newStory, data } = this.state;
		if (this.state.loading) return <Spinner />;
		if (navigation.state.params) {
			const { option, type } = navigation.state.params;
			navigation.state.params = null;
			if (!data || data.id !== option.id) {
				let extraImage = this.getDefaultImage(type);
				this.setNewStory({
					newStory: {
						...newStory,
						image_url: option.image ? option.image : extraImage,
						caption: ''
					},
					data: { option, type }
				});
			}
		}
		const { image_url, caption, backgroundColor } = this.state.newStory;
		const { option, type } = this.state.data || { option: null, type: null };
		return (
			<View style={{ height: '100%' }}>
				<View style={styles.mainView}>
					<View style={styles.imageEditWrap}>
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
									backgroundColor: backgroundColor ? backgroundColor : 'red'
								}
							]}
						>
							<View style={styles.iconsWrp}>
								<TouchableOpacity onPress={() => navigation.navigate('First')}>
									<MaterialCommunityIcons 
										name="close" 
										style={[styles.shadow, { marginLeft: 7.5, marginRight: 50 } ]} 
										color={'#fff'} 
										size={30}
									 />
								</TouchableOpacity>
								<Options
									newStory={this.state.newStory}
									handleDisable={this.handleDisable}
									handleUpdateState={this.updateState}
									voting={this.state.voting}
									clearExtra={() => {
										this.clearExtra();
									}}
									setNewStory={this.setNewStory}
									validateStory={this.validateStory}
									data={this.state.data}
									showInput={this.state.showInput}
								/>
								{this.renderExtraOptions()}
							</View>
							{this.state.showVoting ? (
								<Voting
									newStory={this.state.newStory}
									areaWidth={this.state.uploadWrapWidth}
									areaHeight={this.state.uploadWrapHeight}
									profileInfo={this.props.profileInfo}
									updateState={this.updateState}
									data={this.state.data}
									handleDisable={this.handleDisable}
									voting={this.state.voting}
									validate={this.validateStory}
									validateStory={this.validateStory}
								/>
							) : null}
							{!this.state.showVoting &&
							(this.state.showInput || caption || image_url) ? (
								<DraggableText
									updateState={this.updateState}
									setNewStory={this.setNewStory}
									validateStory={this.validateStory}
									data={this.state.data}
									handleDisable={this.handleDisable}
									validate={this.validateStory}
									voting={this.state.voting}
									newStory={this.state.newStory}
									caption={caption ? caption : ''}
									backgroundColor={backgroundColor}
									areaWidth={this.state.uploadWrapWidth}
									areaHeight={this.state.uploadWrapHeight}
									image_url={image_url ? image_url : null}
									showInput={this.state.showInput}
									isExtra={type ? true : false}
								/>
							) : null}
							{type ? (
								<ScrollView contentContainerStyle={styles.renderExtraWrap}>
									<Extra
										user={profileInfo}
										type={type}
										data={option}
										navigation={navigation}
										clearExtra={() => {
											this.clearExtra();
										}}
									/>
								</ScrollView>
							) : null}
							{
								!this.state.isKeyboardVisible &&
								this.renderColorPicker('backgroundColor')
							}
							{
								!this.state.isKeyboardVisible &&
								<TouchableOpacity
									onPress={() => {
										this.onSave();
									}}
									disabled={this.state.disabled}
									style={{ position: 'absolute', bottom: 15, right: 15, zIndex: 14 }}
								>
									<FontAwesome
										name="send"
										color={this.state.disabled ? '#555' : '#fff'}
										style={styles.shadow}
										size={25}
									/>
								</TouchableOpacity>
							}
							{
								this.state.isKeyboardVisible &&
								this.renderColorPicker('fontColor')
							}
						</View>
					</View>
				</View>
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
	sendVoting,
	hideFooter, 
	showFooter
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoryModal);
