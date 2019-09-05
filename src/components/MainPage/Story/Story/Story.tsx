import React, { Component } from 'react';
import config from '../../../../config';
import {
	Text,
	View,
	ImageBackground,
	Image,
	StyleSheet,
	TouchableOpacity,
	Platform,
	NativeModules,
	TextInput,
	FlatList
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { captionFont } from '../StoryModal/styles';
const { StatusBarManager } = NativeModules;
interface IStoryListItemProps {
	imageUrl: string;
	backgroundColor: string;
	fontColor: string;
	avatar: string;
	name: string;
	caption: string;
	navigation: any;
}

const reactions = [
	{
		id: 1,
		value: '😹'
	},
	{
		id: 2,
		value: '🍿'
	},
	{
		id: 3,
		value: '😍'
	},
	{
		id: 4,
		value: '😮'
	},
	{
		id: 5,
		value: '🔥'
	},
	{
		id: 6,
		value: '👏🏻'
	},
	{
		id: 7,
		value: '🎉'
	},
	{
		id: 8,
		value: '🙈'
	}
];
interface IState {
	showReactions: boolean;
	message?: string;
}
class StoryListItem extends Component<IStoryListItemProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			showReactions: false
		};
	}
	renderControls(navigation) {
		return (
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<SvgUri
					height={30}
					source={require('./../../../../assets/general/x.svg')}
				/>
			</TouchableOpacity>
		);
	}
	renderReactions(item) {
		return (
			<View style={styles.reactionWrapper}>
				<Text style={styles.reactionBody}>{item.value}</Text>
			</View>
		);
	}

	changeMessageValue(value) {
		this.setState({
			message: value
		});
	}
	renderContent(
		imageUrl,
		avatar,
		caption,
		name,
		navigation,
		backgroundColor,
		fontColor,
		showReactions,
		message
	) {
		return (
			<View style={[styles.storyWrapper, { backgroundColor: backgroundColor }]}>
				<View style={styles.storyImageWrapper}>
					{showReactions && <View style={styles.overlay}></View>}
					<View style={styles.userBlock}>
						<Image
							style={styles.roundImage}
							source={{ uri: avatar || config.DEFAULT_AVATAR }}
						/>
						<Text style={styles.userName}>{name}</Text>
						<View style={styles.closeWrapper}>
							{this.renderControls(navigation)}
						</View>
					</View>
					<ImageBackground
						style={styles.storyImage}
						source={{ uri: imageUrl }}
						resizeMode="contain"
					></ImageBackground>
					<Text style={[styles.renderCaption, { color: fontColor }]}>
						{caption}
					</Text>
					{showReactions && (
						<View style={styles.reactionsListWrapper}>
							<Text style={styles.reactionTitle}>Quick Reactions</Text>
							<FlatList
								style={styles.reactionsList}
								horizontal={false}
								numColumns={4}
								data={reactions}
								// keyExtractor={item => item.id}
								renderItem={({ item }) => this.renderReactions(item)}
							/>
						</View>
					)}

					<View style={styles.reactionInputWrapper}>
						<TextInput
							onFocus={() => this.setState({ showReactions: true })}
							onBlur={() => this.setState({ showReactions: false })}
							placeholderTextColor={'rgb(252, 252, 252)'}
							onChange={value => this.changeMessageValue(value)}
							value={message}
							style={[styles.reactionInput, styles.reactionInputText]}
							placeholder={`Message ${name}`}
						/>
						{message && (
							<Text style={[styles.reactionInputText, styles.bold]}>Send</Text>
						)}
					</View>
				</View>
			</View>
		);
	}
	render() {
		const {
			imageUrl,
			avatar,
			caption,
			name,
			navigation,
			backgroundColor,
			fontColor
		} = this.props;
		const { showReactions, message } = this.state;
		return this.renderContent(
			imageUrl,
			avatar,
			caption,
			name,
			navigation,
			backgroundColor,
			fontColor,
			showReactions,
			message
		);
	}
}

const HEADER_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0, 0.5)'
	},
	storyWrapper: {
		flex: 1
	},
	roundImage: {
		width: 35,
		height: 35,
		borderRadius: 20,
		margin: 9
	},
	storyImageWrapper: {
		flex: 1,
		position: 'relative',
		justifyContent: 'center'
	},
	storyImage: {
		flex: 1
		// height: '100%',
		// width: '100%'
	},
	renderCaption: {
		fontFamily: captionFont,
		fontWeight: '600',
		fontSize: 20,
		lineHeight: 20,
		letterSpacing: 0.4,
		padding: 5,
		position: 'absolute',
		bottom: '10%',
		left: 'auto',
		textAlign: 'center',
		width: '100%'
	},
	userBlock: {
		position: 'relative',
		zIndex: 5,
		paddingTop: HEADER_HEIGHT + 5,
		flexDirection: 'row',
		backgroundColor: 'rgba(246,246,246,0.5)',
		alignItems: 'center'
	},
	userName: {
		fontFamily: 'Inter-Regular',
		fontSize: 17,
		lineHeight: 20,
		letterSpacing: 0.4,
		padding: 5,
		color: 'rgb(18, 39, 55)'
	},
	closeWrapper: {
		marginLeft: 'auto',
		marginRight: 9
	},
	reactionInputWrapper: {
		zIndex: 5,
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		bottom: 10,
		left: 8,
		right: 8,
		borderRadius: 20,
		borderWidth: 0.8,
		borderColor: 'rgba(252, 252, 252, 0.7)',
		backgroundColor: 'rgba(0, 0, 0, 0.1)'
	},
	bold: {
		fontFamily: 'Inter-Bold'
	},
	reactionInputText: {
		color: 'rgb(252, 252, 252)',
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		lineHeight: 20,
		letterSpacing: 0.4,
		padding: 13,
		paddingTop: 7,
		paddingBottom: 7
	},
	reactionInput: {
		flex: 1
	},
	reactionsListWrapper: {
		position: 'absolute',
		zIndex: 5,
		top: '35%',
		width: '100%',
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	},
	reactionsList: {},
	reactionTitle: {
		color: 'rgb(252, 252, 252)',
		fontFamily: 'Inter-Regular',
		fontSize: 20,
		lineHeight: 25,
		letterSpacing: 0.4,
		marginBottom: 15
	},
	reactionWrapper: {
		margin: 13
	},
	reactionBody: {
		fontSize: 35,
		lineHeight: 35
	}
});

export default StoryListItem;
