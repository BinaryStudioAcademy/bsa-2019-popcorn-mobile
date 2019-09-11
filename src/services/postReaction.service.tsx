import React from 'react';
import SvgUri from 'react-native-svg-uri';

export const getIcon = (reactionType, size) => {
	switch (reactionType) {
		case 'like':
			return (
				<SvgUri
					height={size}
					width={size}
					source={require(`./../assets/reactions/like.svg`)}
				/>
			);
		case 'dislike':
			return (
				<SvgUri
					height={size}
					width={size}
					source={require(`./../assets/reactions/dislike.svg`)}
				/>
			);
		case 'popcorn':
			return (
				<SvgUri
					height={size}
					width={size}
					source={require(`./../assets/reactions/popcorn.svg`)}
				/>
			);
		case 'haha':
			return (
				<SvgUri
					height={size}
					width={size}
					source={require(`./../assets/reactions/haha.svg`)}
				/>
			);
		case 'wow':
			return (
				<SvgUri
					height={size}
					width={size}
					source={require(`./../assets/reactions/wow.svg`)}
				/>
			);
		case 'sad':
			return (
				<SvgUri
					height={size}
					width={size}
					source={require(`./../assets/reactions/sad.svg`)}
				/>
			);
		case 'angry':
			return (
				<SvgUri
					height={size}
					width={size}
					source={require(`./../assets/reactions/angry.svg`)}
				/>
			);
	}
};
