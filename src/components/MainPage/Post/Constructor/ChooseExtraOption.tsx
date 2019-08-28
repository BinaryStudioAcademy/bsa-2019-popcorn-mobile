import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import {
	fetchUserEvents,
	fetchUserSurveys,
	fetchUserTops
} from '../../../../redux/routines';
import SvgUri from 'react-native-svg-uri';
import IUser from '../../../UserPage/IUser';

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
}

class ChooseExtraOption extends React.Component<IProps> {
	render() {
		const { profileInfo } = this.props;
		const { option: type } = this.props.navigation.state.params;

		let options: any = [];

		switch (type) {
			case 'event':
				const { events, fetchUserEvents } = this.props;
				if (!events || events.length === 0) fetchUserEvents(profileInfo.id);
				else options = events;
				break;
			case 'survey':
				const { surveys, fetchUserSurveys } = this.props;
				if (!surveys || surveys.length === 0) fetchUserSurveys(profileInfo.id);
				else options = surveys;
				break;
			case 'tops':
				const { tops, fetchUserTops } = this.props;
				if (!tops || tops.length === 0) fetchUserTops(profileInfo.id);
				else options = tops;
				break;
		}

		return (
			<View style={styles.extraItemWrp}>
				{options.map(option => (
					<TouchableOpacity
						onPress={() =>
							this.props.navigation.navigate('Basic', { option, type })
						}
					>
						<Text style={styles.extraItem}>{option.title}</Text>
					</TouchableOpacity>
				))}
				<View style={styles.iconsWrp}>
					<TouchableOpacity onPress={() => this.props.navigation.pop()}>
						<SvgUri height={48} width={48} source={arrow} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	profileInfo: rootState.authorization.profileInfo,
	events: rootState.userEvents.events,
	surveys: rootState.userEvents.surveys,
	tops: rootState.userEvents.tops
});

const actions = {
	fetchUserEvents,
	fetchUserSurveys,
	fetchUserTops
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChooseExtraOption);
