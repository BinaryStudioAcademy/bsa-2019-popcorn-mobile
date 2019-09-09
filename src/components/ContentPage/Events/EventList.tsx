import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEqual } from 'lodash';
import Spinner from '../../Spinner/Spinner';
import {
	fetchEvents,
	createEventVisitor,
	updateEventVisitor,
	deleteEventVisitor
} from '../../../redux/routines';
import {
	IEventFormatDataBase,
	IVisitor
} from '../../../services/event.service';
import Event from './Event';

interface IProps {
	navigation: any;
	events: IEventFormatDataBase[];
	loading: boolean;
	fetchEvents: () => any;
	currentUser: string;
	createEventVisitor: (IVisitor) => any;
	updateEventVisitor: (IVisitor) => any;
	deleteEventVisitor: (string) => any;
}

interface IState {
	events: IEventFormatDataBase[];
}

class EventList extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = { events: [] };
	}

	componentDidMount() {
		this.props.fetchEvents();
	}

	componentWillReceiveProps(nextProps) {
		const events = nextProps.events.filter(event => !event.isPrivate);
		if (!isEqual(events, this.state.events)) {
			this.setState({ events });
		}
	}

	setVisitor = ({ event, status, isNew, visitorId }) => {
		const { currentUser } = this.props;
		if (status === '') {
			this.props.deleteEventVisitor({visitorId, eventId: event});
			return;
		}
		if (isNew)
			this.props.createEventVisitor({
				eventId: event,
				userId: currentUser,
				status
			});
		else
			this.props.updateEventVisitor({
				id: visitorId,
				eventId: event,
				userId: currentUser,
				status
			});
	};

	render() {
		const { events } = this.state;
		const { navigation, currentUser, loading } = this.props;
		if (!events.length && loading) return <Spinner />;
		return (
			<ScrollView style={[styles.container]}>
				{events.map((event, id) => (
					<Event
						navigation={navigation}
						key={id}
						event={event}
						setVisitor={this.setVisitor}
						currentUser={currentUser}
					/>
				))}
			</ScrollView>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	events: rootState.events.events,
	currentUser: rootState.authorization.profileInfo.id,
	loading: rootState.events.loading
});

const actions = {
	fetchEvents,
	createEventVisitor,
	updateEventVisitor,
	deleteEventVisitor
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventList);

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
