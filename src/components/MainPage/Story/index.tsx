import { addStory } from './actions';
import { fetchStories } from '../../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native';
import React from 'react';
import Story from './Story/Story';
import StoryList from './StoryList/StoryList';
import StoryCarousel from './StoryCarousel/StoryCarousel';
import SocketService from './../../../helpers/socket.helper';

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
	stories: null | Array<IStoryListItem>;
	error: null | Error;
	loading: boolean;
	fetchStories: () => any;
	addStory: (story: any) => any;
}

interface IState {
	carouselIsShown: boolean;
	storyIndex: number;
}

class StoryComponent extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.addSocketEvents(props.addStory);
		this.state = {
			carouselIsShown: false,
			storyIndex: 0
		};
	}

	componentDidMount() {
		this.props.fetchStories();
	}

	toggleStoryCarousel(index?) {
		const { carouselIsShown } = this.state;
		this.setState({
			storyIndex: index || 0,
			carouselIsShown: !carouselIsShown
		});
	}

	addSocketEvents = addStory => {
		// SocketService.on('new-story', addStory);
	};

	render() {
		const { stories } = this.props;
		const { carouselIsShown, storyIndex } = this.state;
		return (
			<View style={{ flex: 1 }}>
				{stories &&
					(carouselIsShown ? (
						<StoryCarousel
							closeStory={() => this.toggleStoryCarousel()}
							stories={stories}
							index={storyIndex}
						/>
					) : (
						<StoryList
							stories={stories}
							openStory={(index?) => this.toggleStoryCarousel(index)}
						/>
					))}
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	stories: rootState.story.stories,
	error: rootState.story.error,
	loading: rootState.story.loading
});

const actions = {
	fetchStories,
	addStory
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoryComponent);
