import { addStory } from './actions';
import { fetchStories } from '../../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { Fragment } from 'react';
import StoryList from './StoryList/StoryList';
import SocketService from './../../../helpers/socket.helper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StoryModal from './StoryModal/index';
import INewStory from './INewStory';
import Spinner from '../../Spinner/Spinner';

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
		SocketService.on('new-story', addStory);
	};
	render() {
		console.log('render this.state = ', this.props);
		const { stories, navigation } = this.props;
		return (
			<View style={styles.container}>
				<View style={{ height: 280 }}>
					{stories && <StoryList navigation={navigation} stories={stories} />}
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
		height: 280
	}
});

const mapStateToProps = (rootState, props) => ({
	...props,
	stories: rootState.story.stories,
	error: rootState.story.error,
	loading: rootState.story.loading,
	newStory: rootState.story.newStory
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
