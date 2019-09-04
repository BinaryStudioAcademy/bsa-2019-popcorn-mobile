import Gestures from 'react-native-easy-gestures';
import React, { Component, Fragment } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import INewStory from '../INewStory';
import IUser from '../../../UserPage/IUser';
import IVoting from './IVoting';

interface IProps {
	newStory: INewStory;
	areaWidth: number;
	areaHeight: number;
	profileInfo: IUser;
	validate: any;
	voting: any;
	data: any;
	handleDisable: any;
	updateState: (any, string) => void;
	// updateVoting: (newVoting: IVoting | null, disabled: boolean) => void;
	validateStory: any;
}
interface IState {
	voteOptions: any;
	voting: IVoting;
	allowAddOption: boolean;
}
const DEFAULT_BACKGROUND = '#dadada';
const MATERIAL_GREY = '#757575';
const MATERIAL_LIGHT_GREY = 'rgba(170,170,170,0.7)';
const TITLE_COLOR = '#c63f17';

export default class Voting extends Component<IProps, IState> {
	gestures: any;
	constructor(props: IProps) {
		super(props);
		this.state = {
			voteOptions: [{ id: 1, body: 'Yes' }, { id: 2, body: 'No' }],
			allowAddOption: true,
			voting: {
				userId: this.props.profileInfo.id,
				header: '',
				backColor: DEFAULT_BACKGROUND,
				backImage: '',
				deltaPositionHeadX: 50,
				deltaPositionHeadY: 50,
				deltaPositionOptionBlockX: 70,
				deltaPositionOptionBlockY: 70,
				options: [
					{
						body: '',
						voted: 0
					}
				]
			}
		};
	}
	addOption = () => {
		let tempOptions = this.state.voteOptions;
		tempOptions.push({
			id: Number(Math.random() * (100 - 3) + 3),
			body: 'Yes, but'
		});
		console.log('tempOptions', tempOptions);
		this.setState({
			voteOptions: tempOptions,
			allowAddOption: tempOptions.length < 5
		});
	};
	deleteOption = id => {
		let tempOptions = this.state.voteOptions.filter(item => item.id != id);
		this.setState({
			voteOptions: tempOptions,
			allowAddOption: tempOptions.length < 5
		});
	};
	renderOption = () => {
		return this.state.voteOptions.map(option => (
			<View style={styles.optionWrap}>
				<TextInput
					key={option.id}
					textAlignVertical={'top'}
					multiline={true}
					numberOfLines={8}
					placeholder={'Option here...'}
					placeholderTextColor={MATERIAL_GREY}
					maxLength={60}
					selectTextOnFocus={true}
					onEndEditing={() => {}}
					style={[styles.voteOption]}
					value={option.body}
					onChangeText={optionBody => {
						let tempOptions = this.state.voteOptions.map(mapOption => {
							if (mapOption.id == option.id) {
								mapOption.body = optionBody;
							}
							return mapOption;
						});
						let bodyValues = tempOptions.map(value => value.body);
						let newOptions = bodyValues.map(value => ({
							body: value,
							voted: 0
						}));
						this.setState(state => ({
							voteOptions: tempOptions,
							voting: { ...state.voting, options: newOptions }
						}));
						let someIsEmpty =
							bodyValues.some(item => !item) || !this.state.voting.header;
						this.props.updateState(
							!someIsEmpty
								? { ...this.state.voting, options: newOptions }
								: null,
							'voting'
						);
						this.props.handleDisable(someIsEmpty);
					}}
				/>
				{option.id > 2 && (
					<TouchableOpacity
						onPress={() => {
							this.deleteOption(option.id);
						}}
						style={styles.deleteOptionWrap}
					>
						<Icon name="times" color={MATERIAL_GREY} size={20} />
					</TouchableOpacity>
				)}
			</View>
		));
	};
	render() {
		console.log('voting.state', this.state);
		const { areaWidth, areaHeight, newStory } = this.props;
		return (
			<View
				style={[
					styles.votingContainer,
					{ width: areaWidth, height: areaHeight }
				]}
			>
				<TextInput
					textAlignVertical={'top'}
					multiline={true}
					numberOfLines={8}
					placeholder={'Question'}
					placeholderTextColor={TITLE_COLOR}
					maxLength={60}
					selectTextOnFocus={true}
					onEndEditing={text => {
						if (text) {
							// this.props.validate();
							this.props.validateStory({
								newStory: this.props.newStory,
								data: this.props.data,
								voting: this.props.voting,
								handleDisable: this.props.handleDisable
							});
						}
					}}
					style={[styles.voteTitle, { color: newStory.fontColor }]}
					value={this.state.voting.header}
					onChangeText={text => {
						this.setState(state => ({
							voting: { ...state.voting, header: text }
						}));
						let tempOptions = this.state.voteOptions;
						let bodyValues = tempOptions.map(value => value.body);
						let newOptions = bodyValues.map(value => ({
							body: value,
							voted: 0
						}));
						let someIsEmpty = !text;

						this.props.updateState(
							!someIsEmpty
								? { ...this.state.voting, options: newOptions, header: text }
								: null,
							'voting'
						);
						this.props.handleDisable(someIsEmpty);
					}}
				/>
				{this.renderOption()}
				{this.state.allowAddOption && (
					<TouchableOpacity
						onPress={() => {
							this.addOption();
						}}
						style={styles.addOptionWrap}
					>
						<Icon name="plus" color={MATERIAL_LIGHT_GREY} size={30} />
					</TouchableOpacity>
				)}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	votingContainer: {
		position: 'absolute',
		paddingTop: 20
	},
	voteTitle: {
		fontFamily: 'Inter-Regular',
		width: '100%',
		fontSize: 18,
		color: '#c2185b',
		textTransform: 'uppercase',
		textAlign: 'center'
	},
	addOptionWrap: {
		marginTop: 15,
		width: 40,
		height: 40,
		paddingTop: 2,
		borderWidth: 3,
		borderRadius: 40 / 2,
		borderColor: MATERIAL_LIGHT_GREY,
		marginLeft: 'auto',
		marginRight: 'auto',
		justifyContent: 'center',
		alignItems: 'center'
	},
	voteOption: {
		width: '80%',
		marginLeft: 'auto',
		marginRight: 'auto',
		fontFamily: 'Inter-SemiBold',
		fontSize: 15,
		height: 31,
		color: MATERIAL_GREY,
		alignSelf: 'flex-start',
		justifyContent: 'flex-start',
		padding: 5,
		borderWidth: 2,
		borderColor: MATERIAL_LIGHT_GREY,
		backgroundColor: 'rgba(255,255,255,0.6)',
		position: 'relative'
	},
	optionWrap: {
		width: '80%',
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: 15
	},
	deleteOptionWrap: {
		top: 5,
		right: -5,
		position: 'absolute'
	}
});
