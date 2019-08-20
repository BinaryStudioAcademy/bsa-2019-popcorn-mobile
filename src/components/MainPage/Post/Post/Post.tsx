import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native'
import IPost from './../IPost';

interface IPostProps {
    post: IPost;
}

class Post extends Component<IPostProps> {

    render() {
        return (
            <View></View>
        );
    }
}

const styles = StyleSheet.create({
   
})
export default Post;
