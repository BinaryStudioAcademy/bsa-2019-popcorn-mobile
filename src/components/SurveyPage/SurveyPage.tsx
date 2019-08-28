import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../ContentPage/Surveys/actions';
import Spinner from '../Spinner/Spinner';
import SvgUri from 'react-native-svg-uri';
import { postAnswers } from '../ContentPage/Surveys/actions';
import Checkboxes from './SurveyTypes/Checkboxes';
import SingleAnswers from './SurveyTypes/SingleAnswers';
import { transformAnswers } from './SurveyService';

import ShortAnswer from './SurveyTypes/ShortAnswer';
import SurveyLinearScale from './SurveyTypes/SurveyLinearScale';

interface IProps {
	surveyInfo: {
		id: string;
		created_at: Date;
		title: string;
		type: string;
		description: string;
		user_id: string;
		user: {
			name: string;
			image_link: string;
		};
		participants: number;
		questions: Array<{
			id: string;
			survey_id: string;
			title: string;
			firstLabel?: string;
			lastLabel?: string;
			type: string;
			image_link?: string;
			required: boolean;
			options?: Array<{
				index: number;
				id: string;
				question_id: string;
				value: string;
			}>;
		}>;
	};
	isPreview?: boolean;
	currentUserId: string;
	postAnswers: (any) => any;
}

interface IState {
	answers: Array<
		| {
				questionId: string;
				options: Array<{
					id: string;
				}>;
				value?: string;
		  }
		| any
	>;
	isDisabled: boolean;
}

class SurveyPage extends React.Component<IProps, IState> {
	componentDidMount() {
		const surveyId = this.props.navigation.state.params.id;
		this.props.getSurveyById(surveyId);
	}

	constructor(props: IProps) {
		super(props);
		this.state = {
			answers: [],
			isDisabled: false
		};
	}

	// static getDerivedStateFromProps(props, state) {
	// 	if (props.surveyInfo.questions) {
	// 		return {
	// 			answers: props.surveyInfo.questions.map(question => ({
	// 				questionId: question.id,
	// 				options: [],
	// 				value: ''
	// 			}))
	// 		};
	// 	}
	// 	return null;
	// }

	validate = () => {
		const { questions } = this.props.surveyInfo;
		const { answers } = this.state;
		const requiredQuestions = questions.filter(
			question => question.required === true
		);
		const validate = !requiredQuestions.some(question => {
			const answer: any = answers.find(
				answer => answer.questionId === question.id
			);
			if (question.type !== 'Short Answer') {
				if (answer.options.length === 0) return true;
			} else {
				if (answer.value.trim() === '') return true;
			}
			return false;
		});
		return validate;
	};

	setSingleAnswer = answerInfo => {
		const { questionId, optionId } = answerInfo;
		const index = this.state.answers.findIndex(
			answer => answer.questionId === questionId
		);
		this.state.answers.splice(index, 1);
		this.state.answers.push({
			questionId,
			value: '',
			options: [{ id: optionId }]
		});
	};

	setShortAnswer = answerInfo => {
		const { questionId, value } = answerInfo;
		const index = this.state.answers.findIndex(
			answer => answer.questionId === questionId
		);
		this.state.answers.splice(index, 1);
		this.state.answers.push({ questionId, value, options: [] });
	};

	setMultipleAnswer = answerInfo => {
		const { questionId, optionId, value } = answerInfo;
		const index = this.state.answers.findIndex(
			answer => answer.questionId === questionId
		);
		if (value === true) {
			this.state.answers[index].options.push({ id: optionId });
		} else {
			this.state.answers[index].options.splice(index, 1);
		}
	};

	sendAnswer = () => {
		this.setState({ isDisabled: false });
		const validate = this.validate();

		if (!validate) {
			this.setState({ isDisabled: true });
			return;
		}
		const formattedAnswers = transformAnswers(
			this.state.answers,
			this.props.profileInfo.id
		);
		this.props.postAnswers(formattedAnswers);
		this.props.navigation.goBack();
	};

	render() {
		if (
			!this.state.answers ||
			!this.props.surveyInfo ||
			!this.props.surveyInfo.questions
		)
			return <Spinner />;

		const { surveyInfo, navigation } = this.props;
		const {
			user,
			created_at,
			participants,
			title,
			description,
			questions = []
		} = surveyInfo;

		return (
			<ScrollView>
				<>
					<View style={styles.surveyHeader}></View>
					<TouchableOpacity
						style={styles.surveyBack}
						onPress={() => {
							navigation.goBack();
						}}
					>
						<SvgUri
							height={20}
							width={20}
							source={require('../../assets/general/back.svg')}
						/>
					</TouchableOpacity>
					<View style={styles.container}>
						<View style={styles.surveyHeader}></View>
						<View style={styles.surveyBody}>
							<Text style={styles.surveyTitle}>{title}</Text>
							<Text style={styles.surveyDesc}>{description}</Text>
							<View style={styles.questionBlock}>
								{questions.map((question, i) => {
									if (question.type === 'Multiple choice') {
										return (
											<SingleAnswers
												key={i}
												questionInfo={question}
												setAnswer={this.setSingleAnswer}
											/>
										);
									} else if (question.type === 'Checkboxes') {
										return (
											<Checkboxes
												key={i}
												questionInfo={question}
												setAnswer={this.setMultipleAnswer}
											/>
										);
									} else if (question.type === 'Short Answer') {
										return (
											<ShortAnswer
												key={i}
												questionInfo={question}
												setAnswer={this.setShortAnswer}
											/>
										);
									} else
										return (
											<SurveyLinearScale
												key={i}
												questionInfo={question}
												setAnswer={this.setSingleAnswer}
											/>
										);
								})}
							</View>
						</View>
						<View>
							{this.state.isDisabled && (
								<Text style={styles.surveyFooter}>
									Please, answer all required questions.
								</Text>
							)}
							{!this.props.isPreview && (
								<TouchableOpacity
									onPress={this.sendAnswer}
									style={styles.surveyBtn}
								>
									<Text style={styles.surveyBtnText}>Send</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</>
			</ScrollView>
		);
	}
}

const mapStateToProps = rootState => ({
	surveyInfo: rootState.survey.survey,
	loading: rootState.survey.loading,
	profileInfo: rootState.authorization.profileInfo
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
	surveyBtn: {
		backgroundColor: '#ff6501',
		height: 43,
		borderRadius: 55,
		width: 100,
		marginBottom: 45,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	surveyBtnText: {
		color: '#fff',
		textTransform: 'uppercase',
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 'bold'
	},
	surveyFooter: {
		color: 'red',
		textAlign: 'center',
		marginBottom: 15
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
