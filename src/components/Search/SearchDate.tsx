import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Text
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import DatePicker from 'react-native-date-picker';

interface IProps {}

class SearchDate extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}
	state = { date: new Date() };
	render() {
		return (
			<View style={styles.container}>
				{/* <DatePicker
					date={this.state.date}
					onDateChange={date => this.setState({ date })}
				/> */}
			</View>
		);
	}
}

export default SearchDate;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15
	}
});
