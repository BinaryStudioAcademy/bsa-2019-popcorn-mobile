import React, { Component } from 'react';
import config from '../../../../config';
import { Text, View, ImageBackground, Image, StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window');

interface IStoryListItemProps {
    imageUrl: string;
    avatar: string;
    caption: string;
}

class StoryListItem extends Component<IStoryListItemProps> {
    render() {
        const { imageUrl, avatar, caption } = this.props;
        return (
            <View style={styles.storyWrapper}>
                <View style={styles.storyImageWrapper}>
                    <ImageBackground style={styles.storyImage} source={{ uri: imageUrl }} resizeMode="contain">
                        <Image
                            style={styles.roundImage}
                            source={{ uri: avatar || config.DEFAULT_AVATAR }}
                        />
                    </ImageBackground>
                </View>
                <Text style={styles.caption}>{caption}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    storyWrapper: {
        height: 250,
        width: 140,
        marginHorizontal: 10,
    },
    roundImage: {
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
    caption: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: 0.4,
        color: 'rgb(18, 39, 55)'
    }
})
export default StoryListItem;
