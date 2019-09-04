import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFollowed } from '../../redux/routines';
import Spinner from '../Spinner/Spinner';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            <View>
                {this.props.followed.map(followed => 
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('UserPage', {
                            userId: followed.user.id
                        });
                        this.props.navigation.navigate('Profile');
                    }}>
                        <Text>{followed.user.name}</Text>
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