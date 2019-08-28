import React from 'react';
import {
	TextInput,
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import { threadId } from 'worker_threads';
import style from '../../../assets/style';

interface IReadyAnswer {
	id: string;
	question_id: string;
	option_id?: string;
	user_id: string;
	value: string;
}

interface IAnswer {
	questionId: string;
	optionId: string;
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
	answer?: IReadyAnswer;
}

class SurveyLinearScale extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			answers: '',
			isDisabled: false,
			checked: false
		};
	}

	send(id) {
		if (!this.props.setAnswer) return;
		this.setState({
			answers: id
		});

		this.props.setAnswer({
			questionId: this.props.questionInfo.id,
			optionId: id,
			value: true
		});
	}

	render() {
		const { questionInfo, disable, answer } = this.props;
		const {
			id,
			title,
			options,
			lastLabel,
			firstLabel,
			required,
			image_link
		} = questionInfo;

		const sortedOptions =
			options &&
			options.sort((a, b) =>
				a.index > b.index ? 1 : b.index > a.index ? -1 : 0
			);

		return (
			<View>
				<Text
					style={{
						fontSize: 20,
						fontWeight: 'bold',
						marginBottom: 15
					}}
				>
					{title}
				</Text>

				<Text style={styles.label}>{firstLabel}</Text>
				{options.map((option, i) => (
					<TouchableOpacity
						key={option.id}
						style={styles.itemWrapper}
						onPress={() => this.send(option.id)}
					>
						<Text
							style={
								this.state.answers === option.id
									? styles.checked
									: styles.unchecked
							}
						></Text>
						<Text>{option.value}</Text>
					</TouchableOpacity>
				))}
				<Text style={styles.label}>{lastLabel}</Text>
			</View>
		);
	}
}

export default SurveyLinearScale;

const styles = StyleSheet.create({
	itemWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15
	},
	unchecked: {
		width: 20,
		height: 20,
		borderColor: '#ffab07',
		borderWidth: 1,
		marginRight: 15,
		borderRadius: 10
	},
	checked: {
		width: 20,
		height: 20,
		borderColor: '#ffab07',
		borderWidth: 1,
		marginRight: 15,
		backgroundColor: '#ffab07',
		borderRadius: 10
	},
	label: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15
	}
});
