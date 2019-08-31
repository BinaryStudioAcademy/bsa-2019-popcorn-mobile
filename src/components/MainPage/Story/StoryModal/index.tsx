import React, { Component, Fragment } from 'react';
import {
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendStory } from '../actions';
import INewStory from '../INewStory';
import Spinner from '../../../Spinner/Spinner';
import Extra from './Extra';
import IUser from '../../../UserPage/IUser';
import config from '../../../../config';
import ImageUploader from '../../../ImageUploader';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ColorPalette from 'react-native-color-palette';
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
	checkedFontColor: [];
}

class StoryModal extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			newStory: props.newStory,
			modalVisible: false,
			disabled: true,
			loading: false,
			data: props.data,
			showInput: false,
			checkedFontColor: []
		};
	}

	validate(caption = this.state.newStory.caption) {
		const { image_url, backgroundColor, type } = this.state.newStory;
		if (
			(caption && caption.match(/^(?!\s*$).*/) && image_url) ||
			(caption && caption.match(/^(?!\s*$).*/) && backgroundColor) ||
			(type && image_url)
		) {
			this.setState({ disabled: false });
		} else {
			this.setState({ disabled: true });
		}
	}

	addExtra(item, option) {
		this.setState(state => ({
			newStory: {
				...state.newStory,
				type: option,
				data: item
			}
		}));
	}

	onSave() {
		const { data } = this.state;
		this.props.sendStory({
			...this.state.newStory,
			activity: data ? { id: data.option.id, name: data.option.title } : null,
			activityId: data ? data.option.id : '',
			type: data ? data.type : '',
			userId: this.props.profileInfo.id
		});
		this.props.showModal(false);
	}

	componentWillUnmount(): void {
		this.props.setNewStory({
			newStory: { ...this.state.newStory },
			data: this.props.data
		});
	}
	renderColorPicker = () => {
		// let selectedColor = '#C0392B';
		return (
			<ColorPalette
				onChange={color =>
					this.setState(state => ({
						newStory: {
							...state.newStory,
							fontColor: color
						}
					}))
				}
				value={this.state.newStory.fontColor}
				colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
				title={null}
				icon={
					<Icon name={'circle'} size={20} color={'rgba(255,255,255,0.2)'} />
				}
				paletteStyles={styles.colorPicker}
			/>
		);
	};

	renderFontColorPalette = () => {
		return (
			<View style={styles.colorPaletteWrap}>
				<TouchableOpacity onPress={() => {}} style={styles.colorPalette}>
					<FontAwesome5 name="brush" color={'#555'} size={20} />
				</TouchableOpacity>
				{this.renderColorPicker()}
			</View>
		);
	};
	renderBackgroundPalette = () => {
		return (
			<View style={styles.colorPaletteWrap}>
				<TouchableOpacity
					style={styles.colorPalette}
					onPress={() => {
						this.props.navigation.navigate('ColorPicker', {
							setColor: color =>
								this.setState(state => ({
									newStory: {
										...state.newStory,
										backgroundColor: color
									}
								}))
						});
					}}
				>
					<FontAwesome5 name="palette" color={'#555'} size={20} />
				</TouchableOpacity>
			</View>
		);
	};
	clearExtra = () => {
		this.props.setNewStory({
			newStory: this.state.newStory,
			data: null
		});
	};
	renderBasicOptions = () => {
		return (
			<Fragment>
				<ImageUploader
					startUpload={() => this.setState({ loading: true })}
					saveUrl={(image_url: string) => {
						this.setState(state => ({
							newStory: { ...state.newStory, image_url },
							loading: false
						}));
						this.validate();
						this.clearExtra();
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
							addExtra: this.addExtra,
							option: 'survey'
						});
					}}
				>
					<Icon name="clipboard" color={'#555'} size={30} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('ChooseExtraOption', {
							addExtra: this.addExtra,
							option: 'top'
						});
					}}
				>
					<Icon name="trophy" color={'#555'} size={30} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('ChooseExtraOption', {
							addExtra: this.addExtra,
							option: 'event'
						});
					}}
				>
					<Icon name="calendar" color={'#555'} size={30} />
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

		const { image_url, caption } = this.state.newStory;
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
						style={[
							styles.uploadWrap,
							{
								backgroundColor: this.state.newStory.backgroundColor
									? this.state.newStory.backgroundColor
									: DEFAULT_BACKGROUND
							}
						]}
					>
						<Image
							style={[styles.roundImage]}
							source={{ uri: image_url ? image_url : config.DEFAULT_IMAGE }}
						/>
						{image_url ? (
							<TouchableOpacity
								onPress={() => {
									this.setState(state => ({
										newStory: {
											...state.newStory,
											image_url: '',
											backgroundColor: DEFAULT_BACKGROUND
										}
									}));
								}}
								style={styles.deleteImageOption}
							>
								<Icon name="times" color={'#555'} size={25} />
							</TouchableOpacity>
						) : null}
						{this.state.showInput || caption
							? this.renderTextInput(caption)
							: null}
					</View>
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
						color={this.state.disabled ? '#fff' : 'green'}
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
