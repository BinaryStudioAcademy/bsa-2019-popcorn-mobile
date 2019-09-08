import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Text,
	ScrollView
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { fetchMovies } from '../../redux/routines';
import SearchQuickShow from './SearchQuickShow';
import style from '../../assets/style';

interface IProps {
	showFilter: boolean;
	value?: string;
	quickEvent?: (data: string) => any;
	quickShowBlock?: boolean;
}

let timerId;

class SearchInput extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			value: this.props.value,
			setTimerOn: false,
			inputData: '',
			focus: false,
			setFocus: false,
			isTimerOn: false
		};
	}

	inputText(e) {
		this.setState({
			value: e
		});

		if (timerId) {
			clearTimeout(timerId);
		}
		const inputData = e;
		if (inputData.trim().length !== 0) {
			this.setState({
				setTimerOn: true
			});
			timerId = setTimeout(() => {
				this.props.action(inputData);
				this.setState({
					setTimerOn: false
				});
			}, 550);
		} else {
			this.setState({
				quickShow: false
			});
			this.props.action('');
		}
	}
	closeResult() {
		setTimeout(() => {
			this.setState({
				quickShow: false
			});
		}, 1000);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ postion: 'relative', flexGrow: 1 }}>
					<TextInput
						style={styles.searchInput}
						value={this.state.value}
						placeholder="Search..."
						onBlur={() => {
							this.setState({
								quickShow: true
							});
							this.closeResult();
						}}
						onChangeText={event => {
							this.inputText(event);
							this.setState({ quickShow: true });
						}}
					/>
					<SvgUri
						style={styles.searchBtn}
						height={20}
						width={20}
						source={require('../../assets/general/search.svg')}
					/>
				</View>
				{this.props.showFilter ? (
					<TouchableOpacity
						style={styles.filterBtn}
						onPress={() => this.props.navigation.navigate('AdvancedSearch')}
					>
						<SvgUri
							height={20}
							width={20}
							source={require('../../assets/general/options.svg')}
						/>
					</TouchableOpacity>
				) : null}
				{this.state.quickShow && this.props.quickShowBlock ? (
					<ScrollView style={styles.quickShow}>
						<SearchQuickShow action={this.props.quickEvent} />
					</ScrollView>
				) : null}
			</View>
		);
	}
}

export default SearchInput;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15
	},
	quickShow: {
		position: 'absolute',
		top: '100%',
		left: 0,
		maxHeight: 300
	},
	searchInput: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
		padding: 15
	},
	searchBtn: {
		position: 'absolute',
		right: 15,
		top: 15
	},
	filterBtn: {
		marginLeft: 15
	}
});
