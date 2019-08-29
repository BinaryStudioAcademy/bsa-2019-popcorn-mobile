import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
import Spinner from '../../../Spinner/Spinner';
import Extra from './Extra';

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
}

class ChooseExtraOption extends React.Component<IProps> {
	render() {
		const { profileInfo } = this.props;
		const { option: type } = this.props.navigation.state.params;
		let message = '';

		if (this.props.loading) return <Spinner />;

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
									this.props.navigation.navigate('Basic', { option, type });
								}}
							/>
						))
					) : (
						<Text>{message}</Text>
					)}
				</ScrollView>
				{/*<View style={[styles.iconsWrp]}>*/}
				{/*    <TouchableOpacity onPress={() => this.props.navigation.pop()}>*/}
				{/*        <SvgUri height={48} width={48} source={arrow}/>*/}
				{/*    </TouchableOpacity>*/}
				{/*</View>*/}
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	profileInfo: rootState.authorization.profileInfo,
	events: rootState.userEvents.events,
	surveys: rootState.userEvents.surveys,
	tops: rootState.userEvents.tops,
	loading: rootState.userEvents.loading
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
