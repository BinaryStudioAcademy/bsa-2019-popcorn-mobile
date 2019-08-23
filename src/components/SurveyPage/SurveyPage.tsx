import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../ContentPage/Surveys/actions';
import Spinner from '../Spinner/Spinner';
import SvgUri from 'react-native-svg-uri';
import { postAnswers } from '../ContentPage/Surveys/actions';
// import SurveyMultipleAnswers from './SurveyTypes/SurveySingleAnswer';
import Checkboxes from './SurveyTypes/Checkboxes';
// import console = require('console');
// import SurveyShortAnswer from './SurveyTypes/SurveyShortAnswer';
// import SurveyLinearScale from './SurveyTypes/SurveyLinearScale';
// import Survey from '../UserPage/Survey/Survey';

const survey = {
	id: 'a850c5d7-5db3-48ed-bde5-03d784ba43bb',
	title: 'Batman Actors',
	description: 'Choose best batman actor',
	type: 'Open',
	created_at: '2019-08-20T13:45:59.287Z',
	updated_at: '2019-08-20T13:45:59.287Z',
	surveysQuestion: [
		{
			id: '00b03774-9246-4b12-8629-4b4ccd986685',
			index: 0,
			title: '1. Which batman do you like more',
			firstLabel: '',
			lastLabel: '',
			type: 'Checkboxes',
			image: '',
			required: true,
			surveysQuestionOption: [
				{
					id: '260b6207-318b-46a5-b355-aa4014d02d71',
					index: 0,
					title: '1) George Clooney'
				},
				{
					id: '8ebbfb07-14d7-4309-ae12-35049bfce397',
					index: 4,
					title: '5) Christian Bale'
				},
				{
					id: 'd69a4c30-154e-451a-ad99-1faedfe3ceb6',
					index: 3,
					title: '4) Adam West'
				},
				{
					id: 'd354af23-4768-425a-a150-13e81f0c203c',
					index: 2,
					title: '3) Michael Keaton'
				},
				{
					id: '9378c424-8bd2-4613-ba38-de841c7ab928',
					index: 1,
					title: '2) Ben Affleck'
				}
			],
			surveysQuestionAnswer: [
				{
					id: 'a9b6b62c-ca0d-4f4b-8c5e-f88e6f4285e4',
					value: '',
					user: {
						id: '88e7c14a-bd0f-492e-b9d1-b0fc0ef356a6',
						name: 'Admin',
						email: 'admin@gmail.com',
						role: 'admin',
						password: 'admin1',
						location: 'Lviv',
						aboutMe: 'Study in Binary Studio Academy',
						male: true,
						female: null,
						avatar: 'https://imgur.com/1NYENtx.jpg',
						reset_token: ''
					},
					surveysQuestionOption: {
						id: '9378c424-8bd2-4613-ba38-de841c7ab928',
						index: 1,
						title: '2) Ben Affleck'
					}
				},
				{
					id: 'fd2b5b09-9972-4d70-87b8-08312205df60',
					value: '',
					user: {
						id: '40c0098a-5268-4c31-86be-e1cdcdd56a4d',
						name: 'Hubbard Sykes',
						email: 'hubbardsykes@rodeology.com',
						role: 'user',
						password: '5d5440e1e48fee3713eb74ea',
						location: 'Western Sahara',
						aboutMe: 'Work in Acrodance',
						male: true,
						female: null,
						avatar: 'https://imgur.com/vuUqpeH.png',
						reset_token: ''
					},
					surveysQuestionOption: {
						id: '8ebbfb07-14d7-4309-ae12-35049bfce397',
						index: 4,
						title: '5) Christian Bale'
					}
				},
				{
					id: '80de7e95-d07f-47a8-b264-8d355f110e89',
					value: '',
					user: {
						id: '425b6ec6-a664-44ff-b821-5398af190b46',
						name: 'Ola Hogan',
						email: 'olahogan@acrodance.com',
						role: 'user',
						password: '5d5440e1e5e832aa4ec157d1',
						location: 'Oman',
						aboutMe: 'Work in Filodyne',
						male: null,
						female: true,
						avatar: 'https://imgur.com/DrU0qgd.png',
						reset_token: ''
					},
					surveysQuestionOption: {
						id: 'd354af23-4768-425a-a150-13e81f0c203c',
						index: 2,
						title: '3) Michael Keaton'
					}
				},
				{
					id: 'f4ad2bd0-b36f-4dc5-a733-deec176fac98',
					value: '',
					user: {
						id: '6ec93685-1a5a-48ff-af91-9eab8aaf35dc',
						name: 'Shawn Leonard',
						email: 'shawnleonard@comstar.com',
						role: 'user',
						password: '5d5440e1271362283b0bae72',
						location: 'Spain',
						aboutMe: 'Work in Phormula',
						male: true,
						female: null,
						avatar: 'https://imgur.com/G1km9tV.png',
						reset_token: ''
					},
					surveysQuestionOption: {
						id: '260b6207-318b-46a5-b355-aa4014d02d71',
						index: 0,
						title: '1) George Clooney'
					}
				},
				{
					id: 'ea54b0f0-390e-4905-b42c-4b86cb3085d5',
					value: '',
					user: {
						id: '2a3feb1a-cd6f-4ffa-a827-a18a3144a58c',
						name: 'admin',
						email: 'test@gmail.com',
						role: 'user',
						password: 'admin1',
						location: 'Lebanon',
						aboutMe: 'Work in Canopoly',
						male: true,
						female: null,
						avatar: 'https://imgur.com/fvLQf0V.png',
						reset_token: ''
					},
					surveysQuestionOption: {
						id: '9378c424-8bd2-4613-ba38-de841c7ab928',
						index: 1,
						title: '2) Ben Affleck'
					}
				},
				{
					id: '3f20e198-1d72-4b89-abaf-d143ab1c725f',
					value: '',
					user: {
						id: 'cfb94da7-c469-4d41-b6cb-caccfaa81acd',
						name: 'Ramos Fernandez',
						email: 'ramosfernandez@comtract.com',
						role: 'user',
						password: '5d5440e13d63211446c43b29',
						location: 'Israel',
						aboutMe: 'Work in Remotion',
						male: true,
						female: null,
						avatar: 'https://imgur.com/un80lX2.png',
						reset_token: ''
					},
					surveysQuestionOption: {
						id: '260b6207-318b-46a5-b355-aa4014d02d71',
						index: 0,
						title: '1) George Clooney'
					}
				},
				{
					id: 'b29e5eb7-c5a3-4b1a-a03a-b50095f2368c',
					value: '',
					user: {
						id: 'ebc36828-8697-469d-a578-18d96d983b21',
						name: 'Marshall Solis',
						email: 'marshallsolis@remotion.com',
						role: 'user',
						password: '5d5440e181a79e6ca28ca608',
						location: 'Solomon Islands',
						aboutMe: 'Work in Ecratic',
						male: true,
						female: null,
						avatar: 'https://imgur.com/eTPLhuF.png',
						reset_token: ''
					},
					surveysQuestionOption: {
						id: '260b6207-318b-46a5-b355-aa4014d02d71',
						index: 0,
						title: '1) George Clooney'
					}
				},
				{
					id: '484fd9f3-3d25-450f-b246-c5650eb2d34d',
					value: '',
					user: {
						id: '877ef25d-ec98-4825-b060-dcdd42d1d717',
						name: 'Christi Scott',
						email: 'christiscott@ecratic.com',
						role: 'user',
						password: '5d5440e1fed85750693e7404',
						location: 'Jordan',
						aboutMe: 'Work in Rodeology',
						male: null,
						female: true,
						avatar: 'https://imgur.com/FzZAFGj.png',
						reset_token: ''
					},
					surveysQuestionOption: {
						id: '8ebbfb07-14d7-4309-ae12-35049bfce397',
						index: 4,
						title: '5) Christian Bale'
					}
				},
				{
					id: 'b6f7cdd3-0b0f-4156-a145-f743070679fd',
					value: '',
					user: {
						id: '0ac0456f-66c4-4bb1-b981-0202a77074db',
						name: 'Brittany Herring',
						email: 'brittanyherring@zosis.com',
						role: 'user',
						password: '5d5440e1f5a75940f1a4a804',
						location: 'Qatar',
						aboutMe: 'Work in Comtract',
						male: null,
						female: true,
						avatar: 'https://imgur.com/JfqF1lO.png',
						reset_token: ''
					},
					surveysQuestionOption: {
						id: 'd354af23-4768-425a-a150-13e81f0c203c',
						index: 2,
						title: '3) Michael Keaton'
					}
				},
				{
					id: '33de291c-62eb-48f3-aa4e-abb6bda04779',
					value: '',
					user: {
						id: 'cd92e68f-7d2f-4c97-b944-ae1920672bd9',
						name: 'Peterson Hull',
						email: 'petersonhull@phormula.com',
						role: 'user',
						password: '5d5440e187d0336c0de0c33b',
						location: 'Guyana',
						aboutMe: 'Work in Zosis',
						male: true,
						female: null,
						avatar: 'https://imgur.com/MViYeqK.png',
						reset_token: ''
					},
					surveysQuestionOption: {
						id: '9378c424-8bd2-4613-ba38-de841c7ab928',
						index: 1,
						title: '2) Ben Affleck'
					}
				}
			]
		}
	],
	user: {
		id: '6ec93685-1a5a-48ff-af91-9eab8aaf35dc',
		name: 'Shawn Leonard',
		email: 'shawnleonard@comstar.com',
		role: 'user',
		password: '5d5440e1271362283b0bae72',
		location: 'Spain',
		aboutMe: 'Work in Phormula',
		male: true,
		female: null,
		avatar: 'https://imgur.com/G1km9tV.png',
		reset_token: ''
	}
};
interface IProps {
	survey: any;
	navigation: any;
	loading: boolean;
	getSurveyById: (data?: any) => any;
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
	constructor(props: IProps) {
		super(props);
		this.state = {
			answers: [],
			isDisabled: false
		};
	}

	// static getDerivedStateFromProps(props, state) {
	// 	if (survey.surveysQuestion) {
	// 		return {
	// 			answers: survey.surveysQuestion.surveysQuestionAnswer.map(question => ({
	// 				questionId: question.id,
	// 				options: [],
	// 				value: ''
	// 			}))
	// 		};
	// 	}
	// 	return null;
	// }
	componentDidMount() {
		const surveyId = this.props.navigation.state.params.id;
		this.props.getSurveyById(surveyId);
	}

	setMultipleAnswer = answerInfo => {
		const { questionId, optionId, value } = answerInfo;
		console.log(answerInfo);
		const index = this.state.answers.findIndex(
			answer => answer.questionId === questionId
		);
		console.log(index);
		if (value === true) {
			this.state.answers[index].options.push({ id: optionId });
		} else {
			this.state.answers[index].options.splice(index, 1);
		}
	};

	validate = () => {
		const { surveysQuestion } = survey;
		const { answers } = this.state;
		console.log(this.state.answers);
		const requiredQuestions = surveysQuestion.filter(
			question => question.required === true
		);
		const validate = !requiredQuestions.some(question => {
			const answer: any = answers.find(
				answer => answer.questionId === question.id
			);
			if (surveysQuestion.type !== 'Short Answer') {
				if (answer.options.length === 0) return true;
			} else {
				if (answer.value.trim() === '') return true;
			}
			return false;
		});
		return validate;
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
			this.props.currentUserId
		);
		this.props.postAnswers(formattedAnswers);
	};

	render() {
		const { navigation, loading = true } = this.props;

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
							<SvgUri
								height={20}
								width={20}
								source={require('../../assets/general/back.svg')}
							/>
						</TouchableOpacity>
						<View style={styles.container}>
							<View style={styles.surveyHeader}></View>
							<View style={styles.surveyBody}>
								<Text style={styles.surveyTitle}>{survey.title}</Text>
								<Text style={styles.surveyDesc}>{survey.description}</Text>
								<View style={styles.questionBlock}>
									<Text style={styles.questionTitle}>{survey.title}</Text>
									{survey.surveysQuestion.map((question, i) => {
										if (question.type === 'Multiple choice') {
											return <Text style={styles.surveyTitle}>Multiple</Text>;
										} else if (question.type === 'Checkboxes') {
											return (
												<Checkboxes
													key={i}
													questionInfo={question}
													setAnswer={this.setMultipleAnswer}
												/>
											);
										} else if (question.type === 'Short Answer') {
											return <Text style={styles.surveyTitle}>Short</Text>;
										} else return <Text style={styles.surveyTitle}>else</Text>;
									})}
								</View>
							</View>
							<View style={styles.surveyFooter}>
								{this.state.isDisabled && (
									<Text>Please, answer all required questions.</Text>
								)}
								{!this.props.isPreview && (
									<TouchableOpacity onPress={this.sendAnswer}>
										<Text>Send</Text>
									</TouchableOpacity>
								)}
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
	surveyFooter: {},
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
