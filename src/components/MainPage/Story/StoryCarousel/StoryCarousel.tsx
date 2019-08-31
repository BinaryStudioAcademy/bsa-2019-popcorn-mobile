import { Dimensions, StyleSheet, Text } from 'react-native';
import React from 'react';
import Story from './../Story/Story';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';

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
	navigation: any;
}

class StoryCarousel extends React.Component<IProps> {
	renderStory(item) {
		const { navigation } = this.props;
		const {
			image_url,
			user: { name, avatar },
			caption,
			backgroundColor,
			fontColor
		} = item;
		return (
			<Story
				key={item.id}
				imageUrl={image_url}
				caption={caption}
				avatar={avatar}
				name={name}
				navigation={navigation}
				backgroundColor={backgroundColor}
				fontColor={fontColor}
			/>
		);
	}
	render() {
		const { stories, navigation } = this.props;
		const index = navigation.getParam('index');
		return (
			<Swiper
				loop={false}
				index={index}
				autoplay={true}
				showsPagination={false}
				autoplayTimeout={4}
			>
				{stories.map((story, index) => this.renderStory(story))}
			</Swiper>
		);
	}
}

const styles = StyleSheet.create({});

const mapStateToProps = (rootState, props) => ({
	...props,
	stories: rootState.story.stories
});

export default connect(mapStateToProps)(StoryCarousel);
