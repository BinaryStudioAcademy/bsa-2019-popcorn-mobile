import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	ScrollView,
	ImageBackground,
	Image
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../ContentPage/Surveys/actions';
import Moment from 'moment';
import Spinner from '../Spinner/Spinner';
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
	loading: boolean;
	navigation: any;
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

	componentDidMount() {
		const surveyId = this.props.navigation.state.params.id;
		this.props.getSurveyById(surveyId);
	}

	static getDerivedStateFromProps(props, state) {
		if (!props.surveyInfo) return;
		if (props.surveyInfo.questions) {
			return {
				answers: props.surveyInfo.questions.map(question => ({
					questionId: question.id,
					options: [],
					value: ''
				}))
			};
		}
		return null;
	}

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
		if (this.props.loading) return <Spinner />;

		const { surveyInfo } = this.props;

		if (!surveyInfo) return <Spinner />;

		const {
			user,
			created_at,
			title,
			image,
			description,
			questions = []
		} = surveyInfo;

		return (
			<ScrollView>
				<ImageBackground
					source={{
						uri:
							image ||
							'https://www.checkmarket.com/wp-content/uploads/2016/08/survey-checklist.png'
					}}
					style={styles.imageBackground}
				>
					<View style={styles.background}>
						<View style={styles.horizontalContainer}>
							<Image
								source={{
									uri:
										user.avatar ||
										'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png'
								}}
								style={styles.avatar}
							/>
							<Text style={[styles.text, styles.imageText]}>{user.name}</Text>
							<Text style={[styles.text, styles.imageText, styles.date]}>
								{Moment(created_at).format('ll')}
							</Text>
						</View>
						<Text style={[styles.imageText, styles.title]}>{title}</Text>
					</View>
				</ImageBackground>
				<View style={styles.container}>
					<View style={styles.surveyBody}>
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
				</View>
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
		paddingLeft: 10,
		paddingRight: 10
	},
	imageBackground: {
		width: '100%',
		height: 210
	},
	background: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		padding: 10
	},
	horizontalContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: 10,
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#adadad'
	},
	imageText: {
		color: 'white',
		fontFamily: 'Inter-Medium'
	},
	title: {
		marginTop: 'auto',
		fontFamily: 'Inter-Black',
		fontSize: 32,
		letterSpacing: 0.4,
		marginBottom: 40
	},
	poster: {
		height: 200,
		width: 134
	},
	text: {
		fontFamily: 'Inter-Regular',
		color: '#122737',
		letterSpacing: 0.4
	},
	date: {
		marginLeft: 'auto'
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
		marginTop: -30,
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
