import React from 'react';
import {
	TextInput,
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import style from '../../../assets/style';

interface IState {
	checked: boolean;
}

interface IProps {
	label: string;
	id: string;
	send: (data: any) => void;
}

class SelectType extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			checked: false
		};
	}

	toggleItem() {
		this.setState({
			checked: !this.state.checked
		});

		if (!this.props.send) return;
		this.props.send({
			questionId: this.props.questionId,
			optionId: this.props.id,
			value: true
		});
	}

	render() {
		return (
			<TouchableOpacity
				onPress={() => this.toggleItem()}
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					marginBottom: 15
				}}
			>
				<Text
					style={this.state.checked ? styles.checked : styles.unchecked}
				></Text>
				<Text>{this.props.label}</Text>
			</TouchableOpacity>
		);
	}
}

export default SelectType;

const styles = StyleSheet.create({
	unchecked: {
		width: 20,
		height: 20,
		borderColor: '#ffab07',
		borderWidth: 1,
		marginRight: 15
	},
	checked: {
		width: 20,
		height: 20,
		borderColor: '#ffab07',
		borderWidth: 1,
		marginRight: 15,
		backgroundColor: '#ffab07'
	}
});
