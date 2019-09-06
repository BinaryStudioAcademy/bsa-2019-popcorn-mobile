import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from '../assets/style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    fetchCollections
} from '../redux/routines';
import Spinner from '../components/Spinner/Spinner';
import CollectionListItem from '../components/Collections/CommonListItem';

interface IProps {
	collections: any,
	loading: boolean,
	fetchCollections: () => void;
	navigation: any;
}

class CollectionsView extends Component<IProps> {
	componentDidMount() {
		this.props.fetchCollections();
	}

	render () {
		if (this.props.loading || !this.props.collections) return <Spinner />
		return (
			<View style={styles.container}>
				<View style={styles.container}>
					<FlatList
                	    refreshing={false}
                	    data={this.props.collections}
                	    keyExtractor={(item: any) => item.id}
                	    renderItem={({ item }) =>
                	        <CollectionListItem 
                	            navigation={this.props.navigation} 
                	            preview={item} 
                	        />
                	    }
                	/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
    ...props,
    loading: rootState.collections.loading,
	collections: rootState.collections.collections
});

const actions = {
	fetchCollections
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsView);