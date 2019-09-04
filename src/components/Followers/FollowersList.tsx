import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFollowers } from '../../redux/routines';
import Spinner from '../Spinner/Spinner';
import styles from './ListStyles';

interface IProps {
    followers: any;
    fetchFollowers: (id: string) => void;
    selectedUser: any;
    loading: boolean;
    navigation: any;
}

class followersList extends Component<IProps> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchFollowers(this.props.selectedUser.id);
    }

    render() {
        if (this.props.loading || !this.props.followers) return <Spinner />
        
        return (
            <View style={styles.mainContainer}>
                {this.props.followers.map(follower => 
                    <TouchableOpacity style={styles.follower} key={follower.follower.id} onPress={() => { 
                        this.props.navigation.navigate('UserPage', { 
                            userId: follower.follower.id 
                        });
                        this.props.navigation.navigate('Profile');
                    }}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: follower.follower.avatar || 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png'}} style={styles.avatar} />
                        </View>
                        <Text style={styles.name}>{follower.follower.name}</Text>
                    </TouchableOpacity>
                )}
            </View>   
        );
    }
}

const actions = {
    fetchFollowers
};

const mapStateToProps = (rootState, props) => ({
    ...props,
    followers: rootState.followers.followers,
    loading: rootState.followers.loading,
    selectedUser: rootState.userProfile.selectedUser,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(followersList);

