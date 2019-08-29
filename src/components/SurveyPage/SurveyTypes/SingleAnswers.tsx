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

interface IAnswer {
	questionId: string;
	optionId: string;
	value: boolean;
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
interface IState {
	answers: string;
}

class SingleAnswers extends React.Component<IProps, IState> {
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
		const { questionInfo, disable, answers, setAnswer } = this.props;
		const { id, title, options, required, image_link } = questionInfo;

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
			</View>
		);
	}
}

export default SingleAnswers;

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
	}
});
