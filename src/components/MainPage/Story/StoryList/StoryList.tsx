import { FlatList } from 'react-native'
import React from 'react';
import Story from './../Story/Story';
import StoryPreview from './../StoryPreview/StoryPreview';
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
    openStory: () => void;
}

class StoryList extends React.Component<IProps> {
    renderStory({ item, index }) {
        const openCurrStory = this.props.openStory.bind(index);
        const { image_url, user: { avatar }, caption } = item;
        return (
            <StoryPreview 
                imageUrl={image_url} 
                caption={caption} 
                avatar={avatar} 
                index={index} 
                openStory={openCurrStory}
            />
        );
    }

    render() {
        const { stories } = this.props;
        return (
            <FlatList
                refreshing={false}
                data={stories}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => this.renderStory({ item, index })}
            />
        )
    };
};

export default StoryList
