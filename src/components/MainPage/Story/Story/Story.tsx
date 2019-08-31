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
	StatusBar,
	NativeModules
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

class StoryListItem extends Component<IStoryListItemProps> {
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

	renderContent(
		imageUrl,
		avatar,
		caption,
		name,
		navigation,
		backgroundColor,
		fontColor
	) {
		return (
			<View style={[styles.storyWrapper, { backgroundColor: backgroundColor }]}>
				<View style={styles.storyImageWrapper}>
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
		return this.renderContent(
			imageUrl,
			avatar,
			caption,
			name,
			navigation,
			backgroundColor,
			fontColor
		);
	}
}

const HEADER_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const styles = StyleSheet.create({
	storyWrapper: {
		flex: 1,
		paddingBottom: 10
	},
	roundImage: {
		width: 35,
		height: 35,
		borderRadius: 20,
		margin: 9,
		backgroundColor: '#adadad'
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
	}
});

export default StoryListItem;
