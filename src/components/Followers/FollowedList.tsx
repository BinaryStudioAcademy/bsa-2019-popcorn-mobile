import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFollowed } from '../../redux/routines';
import Spinner from '../Spinner/Spinner';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './ListStyles';

interface IProps {
    followed: any;
    fetchFollowed: (id: string) => void;
    selectedUser: any;
    loading: boolean;
    navigation: any;
}

class followedList extends Component<IProps> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchFollowed(this.props.selectedUser.id);
    }

    render() {
        if (this.props.loading || !this.props.followed) return <Spinner />

        return (
            <View style={styles.mainContainer}>
                {this.props.followed.map(followed => 
                    <TouchableOpacity style={styles.follower} onPress={() => {
                        this.props.navigation.navigate('UserPage', {
                            userId: followed.user.id
                        });
                        this.props.navigation.navigate('Profile');
                    }}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: followed.user.avatar || 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png'}} style={styles.avatar} />
                        </View>
                        <Text style={styles.name}>{followed.user.name}</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }   
}

const actions = {
    fetchFollowed
};

const mapStateToProps = (rootState, props) => ({
    ...props,
    followed: rootState.followers.followed,
    loading: rootState.followers.loading,
    selectedUser: rootState.userProfile.selectedUser,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(followedList);