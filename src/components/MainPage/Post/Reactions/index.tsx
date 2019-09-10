import React from 'react';
import { StyleSheet } from 'react-native';
import SvgUri from 'react-native-svg-uri';

interface IProps {
	postId: string;
	reactPost: (postId: string) => any;
	toggleModal: () => any;
}

const reactions = [
	{
		id: 1,
		reactionType: 'like',
		value: '🤣'
	},
	{
		id: 2,
		reactionType: 'dislike',
		value: '🔥'
	},
	{
		id: 3,
		reactionType: 'popcorn',
		value: '👏🏻'
	},
	{
		id: 4,
		reactionType: 'haha',
		value: '🤩'
	},
	{
		id: 5,
		reactionType: 'wow',
		value: '😢'
	},
	{
		id: 6,
		reactionType: 'sad',
		value: '😳'
	},
	{
		id: 7,
		reactionType: 'angry',
		value: '😡'
	},
	{
		id: 8,
		reactionType: 'fire',
		value: '🥳'
	}
];

const PostReactions = (props: IProps) => {
	const getIcon = reactionType => {
		switch (reactionType) {
			case 'like':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/like.svg`)}
					/>
				);
			case 'dislike':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/dislike.svg`)}
					/>
				);
			case 'popcorn':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/popcorn.svg`)}
					/>
				);
			case 'haha':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/haha.svg`)}
					/>
				);
			case 'wow':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/wow.svg`)}
					/>
				);
			case 'sad':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/sad.svg`)}
					/>
				);
			case 'angry':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/angry.svg`)}
					/>
				);
			case 'fire':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/fire.svg`)}
					/>
				);
		}
	};
	return <></>;
};

const styles = StyleSheet.create({});

export default PostReactions;
