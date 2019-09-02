import React, { Component, Fragment } from 'react';
import {
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert,
	ScrollView
} from 'react-native';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendStory } from '../actions';
import INewStory from '../INewStory';
import Spinner from '../../../Spinner/Spinner';
import Extra from './Extra';
import IUser from '../../../UserPage/IUser';
import ImageUploader from '../../../ImageUploader';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ColorPalette from 'react-native-color-palette';
import DraggableText from './DraggableText';
import Voting from './Voting';
import IVoting from '../IVoting';
const DEFAULT_BACKGROUND = '#dadada';
interface IProps {
	sendStory: (newStory: INewStory) => any;
	profileInfo: IUser;
	navigation: any;
	newStory: INewStory;
	setNewStory: ({ newStory, data }: { newStory: INewStory; data: any }) => void;
	data: any;
	showModal: (open: boolean) => any;
}

interface IState {
	newStory: INewStory;
	modalVisible: boolean;
	disabled: boolean;
	loading: boolean;
	data: any;
	showInput: boolean;
	uploadWrapHeight: number;
	uploadWrapWidth: number;
	showVoting: boolean;
	voting: {} | null;
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
	update: (newestStory: any) => void;
	updateVoting: (newVoting: IVoting | null, disabled: boolean) => void;
	constructor(props) {
		super(props);
		this.state = {
			newStory: props.newStory,
			modalVisible: false,
			disabled: true,
			loading: false,
			data: props.data,
			showInput: false,
			uploadWrapHeight: 0,
			uploadWrapWidth: 0,
			showVoting: false,
			voting: null
		};
		this.update = this.handleUpdateStory.bind(this);
		this.updateVoting = this.handleUpdateVoting.bind(this);
	}
	handleUpdateStory(newestStory) {
		this.setState(state => ({
			newStory: newestStory
		}));
	}
	handleUpdateVoting(newVoting, value) {
		this.setState(state => ({
			voting: newVoting,
			disabled: value
		}));
	}

	validate(caption = this.state.newStory.caption) {
		const { image_url, backgroundColor } = this.state.newStory;
		// console.log('THIS PROPS', this.props, 'this.state', this.state);
		// console.log(`imageurl=${image_url}, this.props=${this.props}`);
		if (
			(caption && caption.match(/^(?!\s*$).*/) && image_url) ||
			(caption && caption.match(/^(?!\s*$).*/) && backgroundColor) ||
			(this.props.data && image_url) ||
			this.state.voting
		) {
			this.setState({ disabled: false });
		} else {
			this.setState({ disabled: true });
		}
	}

	componentDidMount() {
		this.validate();
	}
	componentDidUpdate(prevState, prevProps) {
		console.log('this.props', this.props, 'prevprops', prevProps);
		if (
			prevState.data &&
			this.state.data !== prevState.data &&
			prevState.data.option &&
			this.state.newStory.image_url != prevState.data.option.image
		) {
			this.setState(state => ({
				newStory: {
					...state.newStory,
					image_url: prevState.data.option.image,
					caption: ''
				}
			}));
			this.validate();
		}
	}
	onSave() {
		const { data } = this.state;
		console.log('[ONSAVE]this.state.newstory', this.state.newStory);
		this.props.sendStory({
			...this.state.newStory,
			caption: data ? '' : this.state.newStory.caption,
			activity: data ? { id: data.option.id, name: data.option.title } : null,
			activityId: data ? data.option.id : '',
			type: data ? data.type : '',
			userId: this.props.profileInfo.id
		});
		this.props.setNewStory({ newStory: newStoryDefault, data: null });
		this.props.showModal(false);
	}

	componentWillUnmount(): void {
		// this.props.setNewStory({
		// 	newStory: this.state.newStory,
		// 	data: this.props.data
		// });
	}
	renderColorPicker = itemColor => {
		return (
			<ScrollView>
				<ColorPalette
					onChange={color =>
						this.setState(state => ({
							newStory: {
								...state.newStory,
								[itemColor]: color
							}
						}))
					}
					value={this.state.newStory[itemColor]}
					colors={[
						'#fff8e1',
						'#C0392B',
						'#E74C3C',
						'#ff9e80',
						'#9B59B6',
						'#8eacbb',
						'#2980B9',
						'#f06292',
						'#ff94c2',
						'#0077c2',
						'#00675b',
						'#8bc34a',
						'#ffa000',
						'#34515e',
						'#78909c'
					]}
					title={null}
					icon={
						<Icon name={'circle'} size={20} color={'rgba(255,255,255,0.2)'} />
					}
					paletteStyles={styles.colorPicker}
				/>
			</ScrollView>
		);
	};

	renderFontColorPalette = () => {
		return (
			<View style={styles.colorPaletteWrap}>
				<TouchableOpacity style={styles.colorPalette}>
					<FontAwesome5
						name="brush"
						color={'#555'}
						size={20}
						style={styles.colorIcon}
					/>
				</TouchableOpacity>
				{this.renderColorPicker('fontColor')}
			</View>
		);
	};

	renderBackgroundPalette = () => {
		return (
			<View style={styles.colorPaletteWrap}>
				<TouchableOpacity style={styles.colorPalette}>
					<FontAwesome5
						name="palette"
						color={'#555'}
						size={20}
						style={styles.colorIcon}
					/>
				</TouchableOpacity>
				{this.renderColorPicker('backgroundColor')}
			</View>
		);
	};

	clearExtra = () => {
		this.props.setNewStory({
			newStory: { ...this.state.newStory, image_url: '', caption: '' },
			data: null
		});
	};

	renderBasicOptions = () => {
		return (
			<Fragment>
				<ImageUploader
					startUpload={() => this.setState({ loading: true })}
					saveUrl={(image_url: string) => {
						this.clearExtra();
						this.setState(state => ({
							newStory: { ...state.newStory, image_url, caption: '' },
							loading: false,
							showVoting: false
						}));
						this.validate();
					}}
				>
					<Icon name="camera" color={'#555'} size={30} />
				</ImageUploader>
				<TouchableOpacity
					onPress={() => {
						this.setState({ showInput: !this.state.showInput });
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
						this.props.navigation.navigate('ChooseExtraOption', {
							option: 'survey'
						});
					}}
				>
					<Icon name="clipboard" color={'#555'} size={30} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('ChooseExtraOption', {
							option: 'top'
						});
					}}
				>
					<Icon name="trophy" color={'#555'} size={30} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('ChooseExtraOption', {
							option: 'event'
						});
					}}
				>
					<Icon name="calendar" color={'#555'} size={30} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
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
						color: this.state.newStory.fontColor
							? this.state.newStory.fontColor
							: null
					}
				]}
				value={caption || ''}
				onChangeText={caption => {
					this.setState(state => ({
						newStory: {
							...state.newStory,
							caption
						}
					}));
					this.validate(caption);
				}}
			/>
		);
	};
	render() {
		if (this.state.loading) return <Spinner />;
		console.log('render this.props', this.props);
		const { image_url, caption, backgroundColor } = this.state.newStory;
		const { option, type } = this.props.data || { option: null, type: null };
		const { navigation, profileInfo } = this.props;
		return (
			<View style={styles.mainView}>
				<View style={styles.iconsWrp}>
					{this.renderBasicOptions()}
					{this.renderExtraOptions()}
				</View>
				<View style={styles.imageEditWrap}>
					{this.renderBackgroundPalette()}

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
							newStory={this.state.newStory}
							areaWidth={this.state.uploadWrapWidth}
							areaHeight={this.state.uploadWrapHeight}
							profileInfo={this.props.profileInfo}
							updateVoting={this.updateVoting}
							validate={this.validate.bind(this)}
							voting={this.state.voting}
						/>
					) : null}
					{!this.state.showVoting &&
					(this.state.showInput || caption || image_url) ? (
						<DraggableText
							update={this.update}
							newStory={this.state.newStory}
							caption={caption ? caption : ''}
							backgroundColor={backgroundColor}
							areaWidth={this.state.uploadWrapWidth}
							areaHeight={this.state.uploadWrapHeight}
							validate={this.validate.bind(this)}
							image_url={image_url ? image_url : null}
							showInput={this.state.showInput}
							isExtra={type ? true : false}
						/>
					) : null}
					{this.renderFontColorPalette()}
				</View>

				{type ? (
					<View style={styles.renderExtraWrap}>
						<Extra
							user={profileInfo}
							type={type}
							data={option}
							navigation={navigation}
							clearExtra={() => {
								this.props.setNewStory({
									newStory: this.state.newStory,
									data: null
								});
							}}
						/>
					</View>
				) : null}

				<TouchableOpacity
					style={[styles.buttonWrap]}
					onPress={() => {
						this.onSave();
					}}
					disabled={this.state.disabled}
				>
					<Icon
						name="check-circle-o"
						color={this.state.disabled ? '#555' : '#fff'}
						size={50}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	profileInfo: rootState.authorization.profileInfo
});

const actions = {
	sendStory
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoryModal);
