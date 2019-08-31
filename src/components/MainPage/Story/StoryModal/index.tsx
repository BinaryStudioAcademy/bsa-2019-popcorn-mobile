import React, { Component, Fragment } from 'react';
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

	validate(caption = this.state.newStory.caption) {
		const { image_url } = this.state.newStory;
		if (caption && caption.match(/^(?!\s*$).*/) && image_url) {
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
			newStory: this.state.newStory,
			data: this.props.data
		});
	}
	renderBasicOptions = () => {
		let gradientHeight = 28;
		let gradientBackground = this.state.newStory.backgroundColor
			? this.state.newStory.backgroundColor
			: 'purple';
		let bckgData = Array.from({ length: gradientHeight });
		return (
			<Fragment>
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
					<Icon name="camera" color={'#555'} size={30} />
				</ImageUploader>
				<TouchableOpacity
					onPress={() => {
						this.setState({ showInput: !this.state.showInput });
					}}
				>
					<Icon name="font" color={'#555'} size={30} />
				</TouchableOpacity>
			</Fragment>
		);
	};
	renderExtraOptions = () => {
		return (
			<Fragment>
				<TouchableOpacity
					onPress={() => {
						this.setState({ showExtraOptions: !this.state.showExtraOptions });
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
						this.setState({ showExtraOptions: !this.state.showExtraOptions });
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
						this.setState({ showExtraOptions: !this.state.showExtraOptions });
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
				placeholder={'Your text here'}
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
					{this.state.showExtraOptions
						? this.renderExtraOptions()
						: this.renderBasicOptions()}
					<TouchableOpacity
						onPress={() => {
							this.setState({ showExtraOptions: !this.state.showExtraOptions });
						}}
					>
						<Icon name="plus" color={'#555'} size={30} />
					</TouchableOpacity>
				</View>

				<View
					style={[
						styles.UploadWrp,
						{
							backgroundColor: this.state.newStory.backgroundColor
								? this.state.newStory.backgroundColor
								: '#dadada'
						}
					]}
				>
					<Image
						style={[styles.roundImage]}
						source={{ uri: image_url ? image_url : config.DEFAULT_IMAGE }}
					/>
					<View style={styles.imageOptionsWrap}>
						{image_url ? (
							<TouchableOpacity
								onPress={() => {
									this.setState(state => ({
										newStory: { ...state.newStory, image_url: '' }
									}));
								}}
							>
								<Icon name="trash" color={'#555'} size={30} />
							</TouchableOpacity>
						) : null}
						{this.state.showInput ? (
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
									size={30}
								/>
							</TouchableOpacity>
						) : null}
					</View>
					{this.state.showInput || caption
						? this.renderTextInput(caption)
						: null}
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
				<TouchableOpacity
					style={[
						styles.buttonWrp,
						this.state.disabled ? styles.disabledBtn : {}
					]}
					onPress={() => {
						this.onSave();
					}}
					disabled={this.state.disabled}
				>
					<Text style={styles.button}>Save</Text>
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
