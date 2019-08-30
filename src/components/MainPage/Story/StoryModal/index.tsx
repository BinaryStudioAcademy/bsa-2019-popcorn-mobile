import React, { Component } from 'react';
import {
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert
} from 'react-native';
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

const poll = require('../../../../assets/general/Poll-01.svg');
const camera = require('../../../../assets/general/camera.svg');
const cup = require('../../../../assets/general/trophy.svg');
const calendar = require('../../../../assets/general/calendar.svg');
const paint = require('../../../../assets/general/paint.svg');
const uuid = require('uuid/v4');

interface IProps {
	sendStory: (newStory: INewStory) => any;
	profileInfo: IUser;
	navigation: any;
	newStory: INewStory;
	setNewStory: ({ newStory, data }: { newStory: INewStory; data: any }) => void;
	data: any;
}

interface IState {
	newStory: INewStory;
	modalVisible: boolean;
	disabled: boolean;
	loading: boolean;
	data: any;
	showExtraOptions: boolean;
	showInput: boolean;
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
			showExtraOptions: false,
			showInput: false
		};
	}

	validate() {
		const { caption, image_url } = this.state.newStory;
		if (caption && image_url) this.setState({ disabled: false });
		else this.setState({ disabled: true });
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
	}

	componentWillUnmount(): void {
		this.props.setNewStory({
			newStory: this.state.newStory,
			data: this.props.data
		});
	}
	renderExtraOptions = () => {
		return (
			<View style={styles.iconsWrp}>
				<TouchableOpacity
					onPress={() =>
						this.props.navigation.navigate('ChooseExtraOption', {
							addExtra: this.addExtra,
							option: 'survey'
						})
					}
				>
					<SvgUri width={35} height={35} source={poll} fill={'black'} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>
						this.props.navigation.navigate('ChooseExtraOption', {
							addExtra: this.addExtra,
							option: 'top'
						})
					}
				>
					<SvgUri width={35} height={35} source={cup} fill={'black'} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>
						this.props.navigation.navigate('ChooseExtraOption', {
							addExtra: this.addExtra,
							option: 'event'
						})
					}
				>
					<SvgUri width={35} height={35} source={calendar} fill={'black'} />
				</TouchableOpacity>
			</View>
		);
	};
	renderTextInput = caption => {
		return (
			<View style={styles.sendInputWrp}>
				<TextInput
					textAlignVertical={'top'}
					multiline={true}
					numberOfLines={4}
					style={styles.input}
					value={caption || ''}
					onChangeText={caption => {
						this.setState(state => ({
							newStory: {
								...state.newStory,
								caption
							}
						}));
						this.validate();
					}}
				/>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('ColorPicker', {
							setColor: color =>
								this.setState(state => ({
									newStory: {
										...state.newStory,
										fontColor: color
									}
								}))
						});
					}}
				>
					<Icon
						name="paint-brush"
						color={this.state.newStory.fontColor}
						size={35}
					/>
				</TouchableOpacity>
			</View>
		);
	};
	render() {
		if (this.state.loading) return <Spinner />;

		const { image_url, caption } = this.state.newStory;
		const { option, type } = this.props.data || { option: null, type: null };
		const { navigation, profileInfo } = this.props;
		const gradientHeight = 34;
		const gradientBackground = this.state.newStory.backgroundColor
			? this.state.newStory.backgroundColor
			: 'purple';
		const bckgData = Array.from({ length: gradientHeight });
		return (
			<View style={styles.mainView}>
				<View style={styles.iconsWrp}>
					<TouchableOpacity
						style={styles.colorIcon}
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
						<View style={styles.colorIcon}>
							{bckgData.map((_, i) => (
								<View
									key={i}
									style={{
										position: 'absolute',
										backgroundColor: gradientBackground,
										height: 1,
										bottom: gradientHeight - i,
										right: 0,
										left: 0,
										zIndex: 2,
										opacity: (1 / gradientHeight) * (i + 1)
									}}
								/>
							))}
						</View>
					</TouchableOpacity>
					<ImageUploader
						startUpload={() => this.setState({ loading: true })}
						saveUrl={(image_url: string) => {
							this.setState(state => ({
								newStory: { ...state.newStory, image_url },
								loading: false
							}));
							this.validate();
						}}
					>
						<Icon name="camera" color={'#000'} size={35} />
					</ImageUploader>
					<TouchableOpacity
						onPress={() => {
							this.setState({ showInput: !this.state.showInput });
						}}
					>
						<Icon name="font" color={'#000'} size={35} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							this.setState({ showExtraOptions: !this.state.showExtraOptions });
						}}
					>
						<Icon name="plus" color={'#000'} size={35} />
					</TouchableOpacity>
				</View>

				{this.state.showExtraOptions && this.renderExtraOptions()}
				<View
					style={[
						styles.UploadWrp,
						{ backgroundColor: this.state.newStory.backgroundColor }
					]}
				>
					<Image
						style={[styles.roundImage, { height: image_url ? 200 : 300 }]}
						source={{ uri: image_url ? image_url : config.DEFAULT_IMAGE }}
					/>
					{image_url ? (
						<TouchableOpacity
							onPress={() => {
								this.setState(state => ({
									newStory: { ...state.newStory, image_url: '' }
								}));
							}}
							style={styles.deleteImageIcon}
						>
							<Icon name="trash" color={'#000'} size={35} />
						</TouchableOpacity>
					) : null}
				</View>
				{type ? (
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
				) : null}

				<View style={styles.sendWrap}>
					{this.state.showInput && this.renderTextInput(caption)}

					<TouchableOpacity
						style={styles.buttonWrp}
						onPress={() => {
							this.onSave();
						}}
						disabled={this.state.disabled}
					>
						<Text
							style={[
								styles.button,
								this.state.disabled ? styles.disabledBtn : {}
							]}
						>
							Save
						</Text>
					</TouchableOpacity>
				</View>
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
