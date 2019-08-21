import {
    addPost,
} from './actions';
import { fetchPosts } from '../../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatList } from 'react-native'
import React from 'react';
import Post from './Post/Post';
import SocketService from '../../../helpers/socket.helper';
import IPost from './IPost';


interface IProps {
    posts?: null | Array<IPost>;
    error: null | Error;
    loading: boolean;
    fetchPosts: () => any;
    addPost: (post: any) => any;
}

class PostComponent extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.addSocketEvents(props.addPost);
    }

    componentDidMount() {
        this.props.fetchPosts();
    }


    addSocketEvents = addPost => {
        // SocketService.on('new-post', addPost);
    };

    renderPost({ item }){
        return (
            <Post post={item}/>
        );
    }

    render() {
        const { posts } = this.props;
        return (
            posts && (
                <FlatList
                    refreshing={false}
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => this.renderPost({ item })}
                />
            )
        );
    }
};

const mapStateToProps = (rootState, props) => ({
    ...props,
    posts: rootState.post.posts,
    error: rootState.post.error,
    loading: rootState.post.loading,
});

const actions = {
    fetchPosts,
    addPost
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostComponent);
