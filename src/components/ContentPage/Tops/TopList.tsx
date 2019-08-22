import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { fetchTops } from '../../../redux/routines';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../Spinner/Spinner';
import Top from './Top';

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
        const { loading, tops, navigation } = this.props;
        if (loading && !tops.length) return <Spinner />
        console.log(this.props.tops);
        return (
            <ScrollView style={styles.container}>
                {
                    tops.map((top, id) => <Top 
                        navigation={navigation}
                        top={top}
                        key={id}
                    />)
                }
            </ScrollView>
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
