import {
    addStory,
} from './actions';
import { fetchStories } from '../../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native'
import React from 'react';
import StoryList from './StoryList/StoryList';
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
    navigation: any;
}

class StoryComponent extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.addSocketEvents(props.addStory);
    }

    componentDidMount() {
        this.props.fetchStories();
    }

    addSocketEvents = addStory => {
        // SocketService.on('new-story', addStory);
    };

    render() {
        const { stories, navigation } = this.props;
        return (
            <View style={{ height: 240 }}>
                {
                    stories && (
                        <StoryList
                            navigation={navigation}
                            stories={stories}
                        />
                    )
                }
            </View>
        )
    };
};

const mapStateToProps = (rootState, props) => ({
    ...props,
    stories: rootState.story.stories,
    error: rootState.story.error,
    loading: rootState.story.loading,
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
