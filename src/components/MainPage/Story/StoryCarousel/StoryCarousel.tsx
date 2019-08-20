import { Dimensions, StyleSheet, Text } from 'react-native';
import React from 'react';
import Story from './../Story/Story';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');
interface IStoryListItem {
	id: string;
	caption: string;
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
	index: number;
	closeStory: () => void;
}

class StoryCarousel extends React.Component<IProps> {
	renderStory(item, index) {
		const { closeStory } = this.props;
		const {
			image_url,
			user: { name, avatar },
			caption
		} = item;
		return (
			<Story
				key={item.id}
				imageUrl={image_url}
				caption={caption}
				avatar={avatar}
				name={name}
				index={index}
				closeStory={closeStory}
			/>
		);
	}
	render() {
		const { stories, index } = this.props;
		return (
			<Swiper
				loop={false}
				index={index}
				autoplay={true}
				showsPagination={false}
				autoplayTimeout={4}
			>
				{stories.map((story, index) => this.renderStory(story, index))}
			</Swiper>
		);
	}
}

const styles = StyleSheet.create({});

export default StoryCarousel;
