import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import Survey from '../../Survey/Survey';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from './actions';
import { fetchSurveys } from './saga';
import Tabs from '../Tabs';

interface IProps {
	fetchSurveys: () => any;
	surveys: any;
	navigation: any;
}
interface IState {}

class SurveyList extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.fetchSurveys();
	}

	render() {
		const { surveys = [], navigation } = this.props;
		console.log(surveys);
		return (
			<View style={[styles.container]}>
				<ScrollView>
					<View style={styles.surveyList}>
						<Text style={styles.surveyTitle}>Surveys list</Text>
						{surveys.map((item, i) => (
							<Survey key={item.id} data={item} nav={navigation} user={false} />
						))}
					</View>
				</ScrollView>
				<Tabs active={'Surveys'} navigation={navigation} />
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	surveys: rootState.survey.surveys
});

const actions = {
	...action
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SurveyList);

const styles = StyleSheet.create({
	surveyList: {
		display: 'flex',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 30,
		paddingBottom: 30
	},
	surveyTitle: {
		fontSize: 24,
		paddingBottom: 30,
		fontWeight: '600'
	},
	surveyAdd: {
		marginBottom: 15,
		borderColor: 'rgba(0, 0, 0, 0.1)',
		borderWidth: 1,
		padding: 15,
		display: 'flex',
		justifyContent: 'center'
	},
	container: {
		flex: 1
	}
});
