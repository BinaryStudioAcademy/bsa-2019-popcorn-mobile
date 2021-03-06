import React from 'react';
import {
	TextInput,
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import SelectType from './SelectType';

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
					{required ? <Text style={{ color: 'red' }}>*</Text> : null}
				</Text>
				{image_link ? <Text>{image_link}</Text> : null}
				{options.map((option, i) => (
					<SelectType
						key={option.id}
						id={option.id}
						label={option.value}
						questionId={this.props.questionInfo.id}
						send={this.props.setAnswer}
					/>
				))}
			</View>
		);
	}
}

export default Checkboxes;
