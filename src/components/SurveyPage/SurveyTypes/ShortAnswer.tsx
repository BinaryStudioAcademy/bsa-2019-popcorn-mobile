import React from 'react';
import {
	TextInput,
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native';

interface IReadyAnswer {
	id: string;
	question_id: string;
	option_id?: string;
	user_id: string;
	value: string;
}

interface IAnswer {
	questionId: string;
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
	disable?: boolean;
	answer?: IReadyAnswer;
	setAnswer?: (data: IAnswer) => void;
}

class ShortAnswer extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			answers: [],
			isDisabled: false,
			checked: false,
			value: ''
		};
	}

	inputText(e) {
		this.setState({
			value: e
		});
		if (!this.props.setAnswer) return;
		this.props.setAnswer({
			questionId: this.props.questionInfo.id,
			value: e
		});
	}

	render() {
		const { questionInfo, disable, answer } = this.props;
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
				<TextInput
					style={styles.itemInput}
					value={this.state.value}
					placeholder="Your answer"
					onChangeText={event => {
						this.inputText(event);
					}}
				/>
			</View>
		);
	}
}

export default ShortAnswer;

const styles = StyleSheet.create({
	itemInput: {
		height: 40,
		borderBottomColor: '#fb8700',
		borderBottomWidth: 1,
		marginBottom: 30
	}
});
