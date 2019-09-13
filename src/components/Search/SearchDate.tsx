import React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {}

class SearchDate extends React.Component<IProps> {
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
