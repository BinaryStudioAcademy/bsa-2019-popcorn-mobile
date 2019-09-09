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

interface IStoryListItemProps {
	imageUrl: string;
	backgroundColor: string;
	fontColor: string;
	avatar: string;
	caption: string;
	index: number;
	navigation: any;
}

class StoryPreview extends Component<IStoryListItemProps> {
	renderContent(imageUrl, avatar, caption, backgroundColor, fontColor) {
		return (
			<View style={styles.storyWrapperPreview}>
				<View style={styles.storyImageWrapper}>
					<ImageBackground
						style={[styles.storyImage, { backgroundColor: backgroundColor }]}
						source={{ uri: imageUrl }}
						resizeMode="contain"
					>
						<Image
							style={styles.roundImagePreview}
							source={{ uri: avatar || config.DEFAULT_AVATAR }}
						/>
					</ImageBackground>
				</View>
				<Text style={styles.captionPreview} numberOfLines={1}>
					{caption}
				</Text>
			</View>
		);
	}

	render() {
		const {
			imageUrl,
			avatar,
			caption,
			index,
			navigation,
			backgroundColor,
			fontColor
		} = this.props;
		return (
			<TouchableOpacity
				onPress={() => navigation.navigate('Story', { index })}
				style={{ height: 170 }}
			>
				{this.renderContent(
					imageUrl,
					avatar,
					caption,
					backgroundColor,
					fontColor
				)}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	storyWrapperPreview: {
		height: 172,
		width: 100,
		marginHorizontal: 6
	},
	roundImagePreview: {
		width: 25,
		height: 25,
		borderRadius: 25,
		margin: 6
	},
	storyImageWrapper: {
		height: 153,
		flex: 1,
		backgroundColor: 'rgb(239, 239, 239)',
		marginBottom: 5
	},
	storyImage: {
		height: '100%',
		width: '100%'
	},
	captionPreview: {
		fontFamily: 'Inter-Regular',
		fontSize: 12,
		lineHeight: 15,
		letterSpacing: 0.4,
		color: 'rgb(18, 39, 55)'
	}
});
export default StoryPreview;
