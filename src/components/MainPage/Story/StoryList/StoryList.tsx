import { FlatList, View, StyleSheet, Alert } from 'react-native';
import React from 'react';
import StoryPreview from './../StoryPreview/StoryPreview';
import ConstructorPreview from './../StoryConstructorPreview';

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
	currUser: any;
}

const StoryList = (props: IProps) => {
	const renderStory = ({ item, index }, navigation) => {
		const { image_url, backgroundColor, fontColor, caption } = item;
		const avatar = item.user.avatar;
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
	};

	const { stories, navigation, currUser } = props;
	return (
		<>
			<View style={styles.storyListContainer}>
				<ConstructorPreview navigation={navigation} user={currUser} />
				<FlatList
					refreshing={false}
					data={stories}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					keyExtractor={item => item.id}
					renderItem={({ item, index }) =>
						renderStory({ item, index }, navigation)
					}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	storyListContainer: {
		marginLeft: 20,
		flexDirection: 'row'
	}
});

export default StoryList;
