import {
    addStory,
} from './actions';
import { fetchStories } from '../../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View, FlatList, Button } from 'react-native'
import React from 'react';
import Story from './Story/Story';

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

class StoryComponent extends React.Component<IProps> {
    componentDidMount() {
        this.props.fetchStories();
    }

    renderStory({ item }) {
        const { image_url, user: { avatar }, caption } = item;
        return (
            <Story imageUrl={image_url} caption={caption} avatar={avatar}/>
        );
    }
    render() {
        const { stories } = this.props;
        return (
            <View>
                {
                    stories && (
                        <FlatList
                            refreshing={false}
                            data={stories}
                            horizontal={true}
                            keyExtractor={(item) => item.id}
                            renderItem={this.renderStory}
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
