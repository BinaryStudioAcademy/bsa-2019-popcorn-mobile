import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import {
	fetchEvents,
	fetchTops,
	fetchUserSurveys
} from '../../../../redux/routines';
import SvgUri from 'react-native-svg-uri';
import IUser from '../../../UserPage/IUser';
import Spinner from '../../../Spinner/Spinner';
import Extra from './Extra';
import { fetchSurveys } from '../../../ContentPage/Surveys/actions';

interface IProps {
	events: any;
	surveys: any;
	tops: any;
	profileInfo: IUser;
	fetchUserEvents: () => any;
	fetchUserSurveys: () => any;
	fetchUserTops: () => any;
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
				if (!events || events.length === 0) {
					fetchUserEvents();
				} else options = events;
				break;
			case 'survey':
				const { surveys, fetchUserSurveys } = this.props;
				if (!surveys) {
					fetchUserSurveys();
				} else options = surveys;
				break;
			case 'top':
				const { tops, fetchUserTops } = this.props;
				if (!tops || tops.length === 0) fetchUserTops();
				options = tops;
				break;
		}

		if (!options || options.length === 0)
			message = "You don't have any " + type;
		return (
			<View style={[styles.extraItemWrp, styles.grid, { flex: 1 }]}>
				<ScrollView style={{ flex: 1 }}>
					{options && options.length > 0 ? (
						options.map(option => (
							<Extra
								navigation={this.props.navigation}
								data={option}
								type={type}
								user={profileInfo}
								onSave={() => {
									this.props.navigation.navigate('Basic', { option, type });
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
	surveys: rootState.survey.surveys,
	tops: rootState.tops.tops,
	loading: rootState.userEvents.loading,
	loadingEvent: rootState.events.loading,
	loadingTop: rootState.tops.loading
});

const actions = {
	fetchUserEvents: fetchEvents,
	fetchUserSurveys: fetchSurveys,
	fetchUserTops: fetchTops
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChooseExtraOption);
