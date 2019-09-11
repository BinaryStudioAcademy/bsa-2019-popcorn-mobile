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
interface IProps {
	updateState: (any, string) => void;
	setNewStory: (any) => void;
	data: any;
	backgroundColor: string;
	caption: string;
	areaWidth: number;
	areaHeight: number;
	newStory: INewStory;
	validate: any;
	voting: any;
	handleDisable: any;
	image_url: string | null;
	showInput: boolean;
	isExtra: boolean;
	validateStory: any;
}
interface IState {
	elementWidth: number;
	elementHeight: number;
	inputDisabled: boolean;
}
const DEFAULT_BACKGROUND = '#dadada';

export default class DraggableText extends Component<IProps, IState> {
	gestures: any;
	constructor(props: IProps) {
		super(props);
		this.state = {
			elementWidth: 0,
			elementHeight: 0,
			inputDisabled: false
		};
	}
	renderGestures = () => {
		const {
			caption,
			showInput,
			areaHeight,
			areaWidth,
			newStory,
			image_url
		} = this.props;
		const horiz_limit = (areaWidth - this.state.elementWidth) / 2;
		const vert_limit = areaHeight - this.state.elementHeight;
		return (
			<Gestures
				ref={c => {
					this.gestures = c;
				}}
				draggable={true}
				onStart={() => {
					this.setState({ inputDisabled: true });
				}}
				rotatable={false}
				onEnd={(event, styles) => {
					if (
						styles.top >= vert_limit ||
						styles.left >= horiz_limit ||
						styles.top < 0 ||
						styles.left < -horiz_limit
					) {
						this.gestures.reset(prevStyles => {});
					} else {
						this.props.setNewStory({
							newStory: {
								...newStory
							},
							data: this.props.data
						});
					}
					this.setState({ inputDisabled: true });
				}}
			>
				{!(!showInput && image_url) && (
					<TouchableOpacity
						onPress={() => {
							this.setState({ inputDisabled: false });
						}}
						onLayout={event => {
							var { width, height } = event.nativeEvent.layout;
							this.setState({ elementHeight: height, elementWidth: width });
						}}
						style={[
							{ alignSelf: 'center', marginTop: '50%' },
							!this.state.inputDisabled ? styles.inputActive : null
						]}
					>
						{this.state.inputDisabled ? (
							<Text
								style={[
									styles.input,
									{ color: newStory.fontColor ? newStory.fontColor : null }
								]}
							>
								{caption}
							</Text>
						) : (
							<TextInput
								textAlignVertical={'top'}
								multiline={false}
								placeholder={'YOUR TEXT HERE '}
								placeholderTextColor={'#383838'}
								maxLength={140}
								selectTextOnFocus={true}
								onEndEditing={() => {
									if (caption) {
										this.setState({ inputDisabled: true });
									} else {
										this.props.updateState(false, 'showInput');
									}
								}}
								style={[
									styles.input,
									{ color: newStory.fontColor ? newStory.fontColor : null }
								]}
								value={caption || ''}
								onChangeText={caption => {
									this.props.setNewStory({
										newStory: {
											...newStory,
											caption: caption
										},
										data: this.props.data
									});
									this.props.validateStory({
										caption: caption,
										newStory: this.props.newStory,
										data: this.props.data,
										voting: this.props.voting,
										handleDisable: this.props.handleDisable
									});
								}}
							/>
						)}
					</TouchableOpacity>
				)}
			</Gestures>
		);
	};
	render() {
		const {
			backgroundColor,
			isExtra,
			areaHeight,
			areaWidth,
			newStory,
			image_url
		} = this.props;
		return (
			<Fragment>
				{image_url ? (
					<ImageBackground
						source={{ uri: image_url }}
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: backgroundColor,
							overflow: 'hidden',
							position: 'absolute'
						}}
						resizeMode='contain'
					>
						{!isExtra && (
							<Fragment>
								{this.renderGestures()}
							</Fragment>
						)}
					</ImageBackground>
				) : (
					<View
						style={{
							width: areaWidth,
							height: areaHeight,
							overflow: 'hidden',
							backgroundColor: backgroundColor,
							position: 'absolute',
							zIndex: 9
						}}
					>
						{this.renderGestures()}
					</View>
				)}
			</Fragment>
		);
	}
}
const styles = StyleSheet.create({
	input: {
		fontWeight: '600',
		fontFamily: 'Courier',
		letterSpacing: 0.1,
		fontSize: 16,
		alignSelf: 'flex-start',
		flexDirection: 'row'
	},
	inputActive: {
		backgroundColor: 'rgba(255,255,255,0.2)',
		shadowColor: 'rgba(255,255,255,0.3)',
		shadowOpacity: 0.8,
		paddingRight: 5
	},
	dragImageArea: {
		width: '100%',
		height: '50%'
	},
	deleteImageOption: {
		position: 'absolute',
		top: 100,
		left: 5,
		zIndex: 14
	}
});
