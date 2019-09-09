import { addStory } from './actions';
import { fetchStories } from '../../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { Fragment } from 'react';
import StoryList from './StoryList/StoryList';
import SocketService from './../../../helpers/socket.helper';
import ISelectedProfileInfo from '../../../views/UserPageView/SelectedProfileInterfase';

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
	navigation: any;
	profileInfo: ISelectedProfileInfo;
}

interface IState {
	showModal: boolean;
}

class StoryComponent extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.addSocketEvents(props.addStory);
		this.state = { showModal: false };
	}

	componentDidMount() {
		this.props.fetchStories();
	}

	addSocketEvents = addStory => {
		SocketService.join(this.props.profileInfo.id);
		SocketService.on('new-story', addStory);
	};
	render() {
		const { stories, navigation, profileInfo } = this.props;
		return (
			<View style={styles.container}>
				<View>
					{stories && (
						<StoryList
							navigation={navigation}
							currUser={profileInfo}
							stories={stories}
						/>
					)}
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: 180
	}
});

const mapStateToProps = (rootState, props) => ({
	...props,
	stories: rootState.story.stories,
	error: rootState.story.error,
	loading: rootState.story.loading,

	profileInfo: rootState.authorization.profileInfo
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
