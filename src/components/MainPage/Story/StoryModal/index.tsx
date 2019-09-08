import React, { Component, Fragment } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendStory, sendVoting } from '../actions';
import INewStory from '../INewStory';
import Spinner from '../../../Spinner/Spinner';
import Extra from './Extra';
import IUser from '../../../UserPage/IUser';
import Icon from 'react-native-vector-icons/FontAwesome';
import DraggableText from './DraggableText';
import Voting from '../Voting/Voting';
import IVoting from '../Voting/IVoting';
import ColorPicker from './ColorPicker';
import Options, { ExtraButton, OpenButton } from './Options';
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
	updateState: (value: any, statePropery: any) => void;
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
		this.updateState = this.handleUpdateState.bind(this);
	}

	handleUpdateState(value, statePropery) {
		this.setState(state => ({
			[statePropery]: value
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

	static getDerivedStateFromProps(props, state) {
		return {
			...state,
			newStory: { ...props.newStory, image_url: props.newStory.image_url }
		};
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
					newStory={this.props.newStory}
					handleDisable={this.props.handleDisable}
					handleUpdateState={this.updateState}
					voting={this.state.voting}
					clearExtra={() => {
						this.clearExtra();
					}}
					validateStory={this.props.validateStory}
					data={this.props.data}
					showVoting={this.state.showVoting}
				/>
			</Fragment>
		);
	};

	render() {
		if (this.state.loading) return <Spinner />;
		const { image_url, caption, backgroundColor } = this.props.newStory;
		const { option, type } = this.props.data || { option: null, type: null };
		const { navigation, profileInfo } = this.props;
		return (
			<Fragment>
				<View style={styles.btnNavigate}>
					<TouchableOpacity onPress={() => this.props.showModal(false)}>
						<Icon name="arrow-circle-o-left" color={'#fff'} size={50} />
					</TouchableOpacity>
					<TouchableOpacity
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
				<View style={styles.mainView}>
					<View style={styles.iconsWrp}>
						<Options
							newStory={this.props.newStory}
							handleDisable={this.props.handleDisable}
							handleUpdateState={this.updateState}
							voting={this.state.voting}
							clearExtra={() => {
								this.clearExtra();
							}}
							setNewStory={this.props.setNewStory}
							validateStory={this.props.validateStory}
							data={this.props.data}
							showInput={this.state.showInput}
						/>
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
									backgroundColor: backgroundColor ? backgroundColor : 'red'
								}
							]}
						>
							{this.state.showVoting ? (
								<Voting
									newStory={this.props.newStory}
									areaWidth={this.state.uploadWrapWidth}
									areaHeight={this.state.uploadWrapHeight}
									profileInfo={this.props.profileInfo}
									updateState={this.updateState}
									data={this.props.data}
									handleDisable={this.props.handleDisable}
									voting={this.state.voting}
									validate={this.props.validateStory}
									validateStory={this.props.validateStory}
								/>
							) : null}
							{!this.state.showVoting &&
							(this.state.showInput || caption || image_url) ? (
								<DraggableText
									updateState={this.updateState}
									setNewStory={this.props.setNewStory}
									validateStory={this.props.validateStory}
									data={this.props.data}
									handleDisable={this.props.handleDisable}
									validate={this.props.validateStory}
									voting={this.state.voting}
									newStory={this.props.newStory}
									caption={caption ? caption : ''}
									backgroundColor={backgroundColor}
									areaWidth={this.state.uploadWrapWidth}
									areaHeight={this.state.uploadWrapHeight}
									image_url={image_url ? image_url : null}
									showInput={this.state.showInput}
									isExtra={type ? true : false}
								/>
							) : null}
						</View>
						{this.renderColorPicker('fontColor')}
					</View>

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
				</View>
			</Fragment>
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
