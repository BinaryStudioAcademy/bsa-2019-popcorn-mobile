import React, { Component } from 'react';
import config from '../../../../config';
import {
	Text,
	View,
	ImageBackground,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import SvgUri from 'react-native-svg-uri';

interface IStoryListItemProps {
	imageUrl: string;
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

	renderContent(imageUrl, avatar, caption, name, navigation) {
		return (
			<View style={styles.storyWrapper}>
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
					<Text style={styles.caption}>{caption}</Text>
					<ImageBackground
						style={styles.storyImage}
						source={{ uri: imageUrl }}
						resizeMode="contain"
					></ImageBackground>
				</View>
			</View>
		);
	}
	render() {
		const { imageUrl, avatar, caption, name, navigation } = this.props;
		return this.renderContent(imageUrl, avatar, caption, name, navigation);
	}
}

const styles = StyleSheet.create({
	storyWrapper: {
		flex: 1,
		paddingTop: 10,
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
		backgroundColor: 'rgb(239, 239, 239)'
	},
	storyImage: {
		flex: 1,
		height: '100%',
		width: '100%'
	},
	caption: {
		fontFamily: 'Inter-Regular',
		fontSize: 17,
		lineHeight: 20,
		letterSpacing: 0.4,
		padding: 5,
		color: 'rgb(18, 39, 55)'
	},
	userBlock: {
		flexDirection: 'row',
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
