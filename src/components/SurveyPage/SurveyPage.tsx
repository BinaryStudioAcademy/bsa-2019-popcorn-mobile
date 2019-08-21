import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../ContentPage/Surveys/actions';
import Spinner from '../Spinner/Spinner';
// import Survey from '../UserPage/Survey/Survey';

interface ISurveyPageProps {
	survey: any;
	navigation: any;
	loading: boolean;
	getSurveyById: (data?: any) => any;
}

class SurveyPage extends React.Component<ISurveyPageProps> {
	componentDidMount() {
		const surveyId = this.props.navigation.state.params.id;
		this.props.getSurveyById(surveyId);
	}

	render() {
		const { survey = {}, navigation, loading = true } = this.props;
		console.log(this.props);

		return (
			<View>
				{loading ? (
					<Spinner />
				) : (
					<>
						<View style={styles.surveyHeader}></View>
						<TouchableOpacity
							style={styles.surveyBack}
							onPress={() => {
								navigation.goBack();
							}}
						>
							<Text> Back </Text>
						</TouchableOpacity>
						<View style={styles.container}>
							<View style={styles.surveyHeader}></View>
							<View style={styles.surveyBody}>
								<Text style={styles.surveyTitle}>{survey.title}</Text>
								<Text style={styles.surveyDesc}>{survey.description}</Text>
								<View style={styles.questionBlock}>
									<Text style={styles.questionTitle}>{survey.title}</Text>
								</View>
							</View>
						</View>
					</>
				)}
			</View>
		);
	}
}

const mapStateToProps = rootState => ({
	survey: rootState.survey.survey,
	loading: rootState.survey.loading
});

const mapDispatchToProps = {
	...actions
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SurveyPage);

const styles = StyleSheet.create({
	container: {
		paddingLeft: 15,
		paddingRight: 15
	},
	surveyBack: {
		position: 'absolute',
		top: 15,
		left: 15,
		zIndex: 2
	},
	surveyHeader: {
		position: 'absolute',
		width: '100%',
		height: 250,
		backgroundColor: '#fc9',
		marginBottom: 40
	},
	surveyBody: {
		backgroundColor: '#fff',
		marginTop: 100,
		borderRadius: 4,
		borderTopColor: '#ffab07',
		borderTopWidth: 8,
		padding: 15
	},
	surveyTitle: {
		fontSize: 36,
		marginBottom: 20,
		fontWeight: '500'
		// 	font-size: 36px;
		// font-weight: 500;
		// letter-spacing: .2px;
		// margin-bottom: 20px;
		// padding-bottom: 10px;
		// font-family: Inter,sans-serif;
		// word-break: break-word;
	},
	surveyDesc: {
		fontSize: 14,
		marginBottom: 15
	},
	questionBlock: {
		marginBottom: 40
	},
	questionTitle: {
		fontSize: 20,
		marginBottom: 15,
		fontWeight: '500'
	}
});
