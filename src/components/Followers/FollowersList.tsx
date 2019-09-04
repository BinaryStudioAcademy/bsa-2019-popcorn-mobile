import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFollowers } from '../../redux/routines';
import Spinner from '../Spinner/Spinner';

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
            <View>
                {this.props.followers.map(follower => 
                    <TouchableOpacity key={follower.follower.id} onPress={() => { 
                        this.props.navigation.navigate('UserPage', { 
                            userId: follower.follower.id 
                        });
                        this.props.navigation.navigate('Profile');
                    }}>
                        <Text>{follower.follower.name}</Text>
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

