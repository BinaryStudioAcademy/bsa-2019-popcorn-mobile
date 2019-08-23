import React from 'react';
import {
	TextInput,
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	CheckBox
} from 'react-native';
import { threadId } from 'worker_threads';

interface IAnswer {
	questionId: string;
	optionId: string;
	value: boolean;
}
interface IState {
	checked: boolean;
	answers: any;
	isDisabled: boolean;
}

interface IReadyAnswer {
	id: string;
	question_id: string;
	option_id?: string;
	user_id: string;
	value: string;
}

interface IProps {
	questionInfo: {
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
	};
	setAnswer?: (data: IAnswer) => void;
	disable?: boolean;
	answers?: Array<IReadyAnswer>;
}

class Checkboxes extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			answers: [],
			isDisabled: false,
			checked: false
		};
	}

	render() {
		const { questionInfo, disable, answers } = this.props;
		const {
			id,
			title,
			surveysQuestionOption,
			required,
			image_link
		} = questionInfo;

		return (
			<View>
				<Text>{title}</Text>
				{image_link && <Text>{image_link}</Text>}
				{surveysQuestionOption !== undefined &&
					surveysQuestionOption.map((option, i) => (
						<View key={i}>
							<View style={{ flexDirection: 'row' }}>
								{/* <CheckBox
								value={option.value}
								disabled={disable || false}
								checked={
									answers &&
									answers.some(answer => answer.option_id === option.id)
								}
								onValueChange={event => {
									console.log(event);
									if (!props.setAnswer) return;
									props.setAnswer({
										questionId: id,
										optionId: option.id,
										value: event.target.checked
									});
								}}
							/> */}
								<View style={{ flexDirection: 'column' }}>
									<View style={{ flexDirection: 'row' }}>
										<TouchableOpacity
											onPress={() => {
												this.props.setAnswer({
													questionId: id,
													optionId: option.id,
													value: !this.state.checked
												});
											}}
										>
											<CheckBox
												style={{ width: 10, height: 10 }}
												value={this.state.checked}
												onValueChange={() => {
													console.log('lol');
													this.setState({
														checked: !this.state.checked
													});
												}}
											/>
											<Text style={{ marginTop: 5 }}> {option.title}</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
							<Text>{option.value}</Text>
						</View>
					))}
			</View>
		);
	}
}

export default Checkboxes;
