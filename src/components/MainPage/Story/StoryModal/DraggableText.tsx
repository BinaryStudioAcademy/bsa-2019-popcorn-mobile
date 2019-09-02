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
	update: (newestStory: INewStory) => void;
	backgroundColor: string;
	caption: string;
	areaWidth: number;
	areaHeight: number;
	newStory: INewStory;
	validate: any;
	image_url: string | null;
	showInput: boolean;
	isExtra: boolean;
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
						this.props.update({
							...newStory,
							textPositionX: styles.left,
							textPositionY: styles.top
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
							{ alignSelf: 'center', zIndex: 100, position: 'absolute' },
							!this.state.inputDisabled ? styles.inputActive : null
						]}
					>
						{this.state.inputDisabled ? (
							<Text
								style={[
									styles.input,
									{
										color: newStory.fontColor ? newStory.fontColor : null
									}
								]}
							>
								{caption}
							</Text>
						) : (
							<TextInput
								textAlignVertical={'top'}
								multiline={true}
								numberOfLines={8}
								placeholder={'YOUR TEXT HERE'}
								placeholderTextColor={'#383838'}
								maxLength={140}
								selectTextOnFocus={false}
								onEndEditing={() => {
									if (caption) {
										this.setState({ inputDisabled: true });
									}
								}}
								style={[
									styles.input,
									{
										color: newStory.fontColor ? newStory.fontColor : null
									}
								]}
								value={caption || ''}
								onChangeText={caption => {
									this.props.update({ ...newStory, caption: caption });
									this.props.validate(caption);
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
							width: areaWidth,
							height: areaHeight,
							overflow: 'hidden',
							backgroundColor: backgroundColor,
							position: 'absolute'
						}}
					>
						{!isExtra && (
							<Fragment>
								{this.renderGestures()}
								<TouchableOpacity
									onPress={() => {
										this.props.update({
											...newStory,
											image_url: '',
											backgroundColor: DEFAULT_BACKGROUND,
											caption: ''
										});
										this.props.validate('');
									}}
									style={styles.deleteImageOption}
								>
									<Icon name="times" color={'#555'} size={25} />
								</TouchableOpacity>
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
							position: 'absolute'
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
		fontSize: 18,
		alignSelf: 'flex-start'
	},
	inputActive: {
		backgroundColor: 'rgba(255,255,255,0.2)',
		shadowColor: 'rgba(255,255,255,0.3)',
		shadowOffset: { width: 4, height: 3 },
		shadowOpacity: 0.8,
		borderRadius: 5,
		padding: 2,
		shadowRadius: 3,
		elevation: 8
	},
	dragImageArea: {
		width: '100%',
		height: '50%'
	},
	deleteImageOption: {
		position: 'absolute',
		top: 5,
		left: 5
	}
});
