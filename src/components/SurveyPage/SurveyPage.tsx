import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

// import Survey from '../UserPage/Survey/Survey';
import { connect } from 'react-redux';
import * as actions from '../ContentPage/Surveys/actions';
import Spinner from '../shared/Spinner';

interface ISurveyPageProps {
	survey: any;
	getSurveyById: (data?: any) => any;
}

class SurveyPage extends React.Component<ISurveyPageProps> {
	componentDidMount() {
		const surveyId = this.props.navigation.state.params.id;
		this.props.getSurveyById(surveyId);
	}

	render() {
		const { survey = {} } = this.props;
		console.log(survey);
		return (
			<>
				{true ? (
					<Text>Loading</Text>
				) : (
					// <div>
					// 	<Survey
					// 		surveyInfo={{
					// 			...survey,
					// 			user_id: profileInfo.id,
					// 			user: {
					// 				name: profileInfo.name,
					// 				image_link: profileInfo.avatar
					// 			}
					// 		}}
					// 		isPreview={false}
					// 	/>
					// </div>
					<Text>Allready loading</Text>
				)}
			</>
		);
	}
}

const mapStateToProps = rootState => ({
	survey: rootState.survey.survey
});

const mapDispatchToProps = {
	...actions
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SurveyPage);
