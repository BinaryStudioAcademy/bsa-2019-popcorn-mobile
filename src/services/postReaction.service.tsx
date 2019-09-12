import React from 'react';
import SvgUri from 'react-native-svg-uri';

import * as LikeIcon from './../assets/reactions/like.svg';
import * as DislikeIcon from './../assets/reactions/dislike.svg';
import * as PopcornIcon from './../assets/reactions/popcorn.svg';
import * as AngryIcon from './../assets/reactions/angry.svg';
import * as HahaIcon from './../assets/reactions/haha.svg';
import * as WowIcon from './../assets/reactions/wow.svg';
import * as SadIcon from './../assets/reactions/sad.svg';
import * as FireIcon from './../assets/reactions/fire.svg';

export const getIcon = (reactionType, size, height?: number) => {
	switch (reactionType) {
		case 'like':
			return (
				<SvgUri height={height || size} width={size} svgXmlData={LikeIcon} />
			);
		case 'dislike':
			return (
				<SvgUri height={height || size} width={size} svgXmlData={DislikeIcon} />
			);
		case 'popcorn':
			return (
				<SvgUri height={height || size} width={size} svgXmlData={PopcornIcon} />
			);
		case 'haha':
			return (
				<SvgUri height={height || size} width={size} svgXmlData={AngryIcon} />
			);
		case 'wow':
			return (
				<SvgUri height={height || size} width={size} svgXmlData={HahaIcon} />
			);
		case 'sad':
			return (
				<SvgUri height={height || size} width={size} svgXmlData={WowIcon} />
			);
		case 'angry':
			return (
				<SvgUri height={height || size} width={size} svgXmlData={SadIcon} />
			);
		case 'fire':
			return (
				<SvgUri height={height || size} width={size} svgXmlData={FireIcon} />
			);
	}
};
