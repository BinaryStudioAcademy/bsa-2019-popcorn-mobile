import React from 'react';
import SvgUri from 'react-native-svg-uri';

export function getIcon(name: string) {
	switch (name) {
		case 'like':
			return (
				<SvgUri
					source={require('../assets/reactions/like.svg')}
					height={26}
					width={26}
				/>
			);
		case 'dislike':
			return (
				<SvgUri
					source={require('../assets/reactions/dislike.svg')}
					height={26}
					width={26}
				/>
			);
		case 'popcorn':
			return (
				<SvgUri
					source={require('../assets/reactions/popcorn.svg')}
					height={26}
					width={26}
				/>
			);
		case 'haha':
			return (
				<SvgUri
					source={require('../assets/reactions/haha.svg')}
					height={26}
					width={26}
				/>
			);
		case 'wow':
			return (
				<SvgUri
					source={require('../assets/reactions/wow.svg')}
					height={26}
					width={26}
				/>
			);
		case 'sad':
			return (
				<SvgUri
					source={require('../assets/reactions/sad.svg')}
					height={26}
					width={26}
				/>
			);
		case 'angry':
			return (
				<SvgUri
					source={require('../assets/reactions/angry.svg')}
					height={26}
					width={26}
				/>
			);
	}
}
