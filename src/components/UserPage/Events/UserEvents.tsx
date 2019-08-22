import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../Spinner/Spinner';
import { View, Text, StyleSheet } from 'react-native';
import {
	IEventFormatDataBase,
	IEventFormatClient,
	formatToClient
} from '../../../services/event.service';
import { fetchUserEvents } from '../../../redux/routines';

interface IProps {
	events: IEventFormatDataBase[];
	fetchUserEvents: (id: string) => any;
	currentUser: string;
	loading: boolean;
}

class EventList extends Component<IProps> {
	componentDidMount() {
		this.props.fetchUserEvents(this.props.currentUser);
	}

	render() {
		const { loading, events, currentUser } = this.props;
		const ownEvents: IEventFormatClient[] = [];
		const subscribeEvents: IEventFormatClient[] = [];

		events.forEach(event => {
			event.userId === currentUser
				? ownEvents.push(formatToClient(event))
				: subscribeEvents.push(formatToClient(event));
		});

		if (loading) return <Spinner />;
		return (
			<View style={{ flex: 1 }}>
				<View style={[styles.container]}>
					<Text style={[styles.title]}>Your events</Text>
					{!ownEvents.length && (
						<Text style={[styles.text]}>You don't have any events.</Text>
					)}
				</View>
				<View style={[styles.container]}>
					<Text style={[styles.title]}>Upcoming events</Text>
					{!subscribeEvents.length && (
						<Text style={[styles.text]}>
							There aren't any events coming up.
						</Text>
					)}
				</View>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	events: rootState.userEvents.events,
	currentUser: rootState.authorization.profileInfo.id,
	loading: rootState.userEvents.loading
});

const actions = {
	fetchUserEvents
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventList);

const styles = StyleSheet.create({
	container: {
		margin: 10,
		marginTop: 20,
		alignItems: 'center'
	},
	title: {
		fontSize: 18,
		fontFamily: 'Inter-SemiBold',
		color: '#122737',
		marginBottom: 10
	},
	text: {
		fontFamily: 'Inter-Regular',
		color: '#122737'
	}
});
