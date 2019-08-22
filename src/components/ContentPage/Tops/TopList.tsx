import React, { Component } from 'react';
import { Text, ScrollView, Button, View } from 'react-native';
import { fetchTops } from '../../../redux/routines';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../Spinner/Spinner';

interface IProps {
    navigation: any;
    fetchTops: () => any;
    tops: Array<any>;
    loading: boolean;
}

class TopList extends Component<IProps> {
    componentDidMount() {
        this.props.fetchTops();
    }

    render() {
        if (this.props.loading) return <Spinner />
        console.log(this.props.tops);
        return (
            <View>
               <Text>
                    lalala
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (rootState, props) => ({
    ...props,
    tops: rootState.tops.tops,
    currentUser: rootState.authorization.profileInfo.id,
    loading: rootState.tops.loading
});

const actions = {
    fetchTops
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopList);
