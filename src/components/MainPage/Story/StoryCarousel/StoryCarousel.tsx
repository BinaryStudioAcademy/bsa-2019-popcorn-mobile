import React from 'react';
import Story from './../Story/Story';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	fetchChats,
	createChat,
	createMessage
} from './../../../../views/Messages/actions';
import { hideFooter, showFooter } from '../../../../views/Footer/actions';

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
	userId: string;
	chats: any;
	fetchChats: (userId) => void;
	createMessage: (userId: string, chatId: string, body: any) => void;
	createChat: (userId1: string, chatId2: string) => void;
	hideFooter: () => void;
	showFooter: () => void;
}

class StoryCarousel extends React.Component<IProps> {
	componentDidMount() {
		this.props.fetchChats(this.props.userId);
		this.willBlurSubscribe();
		this.willFocusSubscribe();
	}

	willBlurSubscribe = () => {
		this.props.navigation.addListener('willBlur', () => {
			this.props.showFooter();
		});
	};

	willFocusSubscribe = () => {
		this.props.navigation.addListener('willFocus', () => {
			this.props.hideFooter();
		});
	};

	renderStory(item) {
		const { navigation, chats, createMessage, createChat, userId } = this.props;
		return (
			<Story
				key={item.id}
				story={item}
				navigation={navigation}
				createMessage={createMessage}
				createChat={createChat}
				userId={userId}
				chats={chats}
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
				autoplay={false}
				showsPagination={false}
				autoplayTimeout={4}
			>
				{stories.map((story, index) => this.renderStory(story))}
			</Swiper>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	stories: rootState.story.stories,
	userId: rootState.authorization.profileInfo.id,
	chats: rootState.chat.chats
});
const actions = {
	fetchChats,
	createChat,
	createMessage,
	hideFooter, 
	showFooter
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoryCarousel);
