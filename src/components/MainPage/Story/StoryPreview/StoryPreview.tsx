import React, { Component } from 'react';
import config from '../../../../config';
import { Text, View, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native'

interface IStoryListItemProps {
    imageUrl: string;
    avatar: string;
    caption: string;
    index: number;
    openStory: (index: number) => void
}

class StoryPreview extends Component<IStoryListItemProps> {
    renderContent(imageUrl, avatar, caption) {
        return (
            <View style={styles.storyWrapperPreview}>
                <View style={styles.storyImageWrapper}>
                    <ImageBackground style={styles.storyImage} source={{ uri: imageUrl }} resizeMode="contain">
                        <Image
                            style={styles.roundImagePreview}
                            source={{ uri: avatar || config.DEFAULT_AVATAR }}
                        />
                    </ImageBackground>
                </View>
                <Text style={styles.captionPreview}>
                    {caption}
                </Text>
            </View>
        );
    }

    render() {
        const { imageUrl, avatar, caption, index, openStory } = this.props;
        return (
            <TouchableOpacity onPress={() => openStory(index)} style={{ height: 240 }}>
                {
                    this.renderContent(imageUrl, avatar, caption)
                }
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    storyWrapperPreview: {
        height: 240,
        width: 140,
        marginHorizontal: 10,
    },
    roundImagePreview: {
        width: 20,
        height: 20,
        borderRadius: 20,
        margin: 6,
        backgroundColor: '#adadad'
    },
    storyImageWrapper: {
        flex: 1,
        backgroundColor: 'rgb(239, 239, 239)',
        marginBottom: 5,
    },
    storyImage: {
        height: '100%',
        width: '100%',
    },
    captionPreview: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: 0.4,
        color: 'rgb(18, 39, 55)'
    },
})
export default StoryPreview;
