// import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import {
	fetchEvents,
	fetchUserEvents,
	fetchUserSurveys,
	fetchUserTops
} from '../../../../redux/routines';
import SvgUri from 'react-native-svg-uri';
import IUser from '../../../UserPage/IUser';
import Spinner from '../../../Spinner/Spinner';
import Extra from './Extra';
import React from 'react';

const arrow = require('../../../../assets/general/arrow-circle-o-left.svg');

interface IProps {
	events: any;
	surveys: any;
	tops: any;
	profileInfo: IUser;
	fetchUserEvents: (id: string) => any;
	fetchUserSurveys: (id: string) => any;
	fetchUserTops: (id: string) => any;
	navigation: any;
	loading: boolean;
	loadingEvent: boolean;
}

class ChooseExtraOption extends React.Component<IProps> {
	render() {
		const { profileInfo } = this.props;
		const { option: type } = this.props.navigation.state.params;
		let message = '';

		if (this.props.loading || this.props.loadingEvent) return <Spinner />;

		let options: any = [];

		switch (type) {
			case 'event':
				const { events, fetchUserEvents } = this.props;
				if (!events) fetchUserEvents(profileInfo.id);
				else options = events;
				break;
			case 'survey':
				const { surveys, fetchUserSurveys } = this.props;
				if (!surveys) {
					fetchUserSurveys(profileInfo.id);
				} else options = surveys;
				break;
			case 'top':
				const { tops, fetchUserTops } = this.props;
				if (!tops) fetchUserTops(profileInfo.id);
				options = tops;
				break;
		}

		if (!options || options.length === 0)
			message = "You don't have any " + type;
		return (
			<View style={[styles.extraItemWrp, styles.grid]}>
				<ScrollView>
					{options && options.length > 0 ? (
						options.map(option => (
							<Extra
								navigation={this.props.navigation}
								data={option}
								type={type}
								user={profileInfo}
								onSave={() => {
									this.props.navigation.navigate('First', { option, type });
								}}
							/>
						))
					) : (
						<Text>{message}</Text>
					)}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	profileInfo: rootState.authorization.profileInfo,
	events: rootState.events.events,
	surveys: rootState.userEvents.surveys,
	tops: rootState.userEvents.tops,
	loading: rootState.userEvents.loading,
	loadingEvent: rootState.events.loading
});

const actions = {
	fetchUserEvents: fetchEvents,
	fetchUserSurveys,
	fetchUserTops
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChooseExtraOption);
