import { FlatList } from 'react-native';
import React from 'react';
import StoryPreview from './../StoryPreview/StoryPreview';

interface IStoryListItem {
	id: string;
	caption: string;
	backgroundColor: string;
	fontColor: string;
	image_url: string;
	user: {
		avatar: string;
		id: string;
		name: string;
		any;
	};
	type: string;
	voting?: {
		backColor: string;
		backImage: string;
		deltaPositionHeadX: number;
		deltaPositionHeadY: number;
		deltaPositionOptionBlockX: number;
		deltaPositionOptionBlockY: number;
		header: string;
		id: string;
		options: Array<{
			body: string;
			voted: number;
		}>;
	};
}

interface IProps {
	stories: Array<IStoryListItem>;
	navigation: any;
}

class StoryList extends React.Component<IProps> {
	renderStory({ item, index }, navigation) {
		const {
			image_url,
			backgroundColor,
			fontColor,
			user: { avatar },
			caption
		} = item;
		return (
			<StoryPreview
				imageUrl={image_url}
				caption={caption}
				avatar={avatar}
				index={index}
				navigation={navigation}
				backgroundColor={backgroundColor}
				fontColor={fontColor}
			/>
		);
	}

	render() {
		const { stories, navigation } = this.props;
		return (
			<FlatList
				refreshing={false}
				data={stories}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item.id}
				renderItem={({ item, index }) =>
					this.renderStory({ item, index }, navigation)
				}
			/>
		);
	}
}

export default StoryList;
