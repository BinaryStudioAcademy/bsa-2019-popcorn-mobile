import React, { Component } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IProps {
	data: any;
	nav: any;
}
interface IState {
	active: boolean;
}

class Survey extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {};
	}
	toggleStatus() {
		this.setState({
			active: !this.state.active
		});
	}

	render() {
		const { data } = this.props;

		return (
			<View style={styles.survey}>
				<TouchableOpacity
					onPress={() => this.props.nav.navigate('SurveyPage', { id: data.id })}
					style={styles.surveyTitle}
				>
					<Text>{data.title}</Text>
				</TouchableOpacity>
				<View style={styles.surveyControls}>
					<TouchableOpacity
						style={styles.surveyBtn}
						onPress={() => this.toggleStatus()}
					>
						{data.type === 'Open' ? (
							<SvgUri
								height={20}
								width={20}
								source={require('../../assets/general/hide.svg')}
							/>
						) : (
							<SvgUri
								height={20}
								width={20}
								source={require('../../assets/general/view.svg')}
							/>
						)}
					</TouchableOpacity>
					<TouchableOpacity style={[styles.surveyBtn, styles.delete]}>
						<SvgUri
							height={15}
							width={15}
							source={require('../../assets/general/del.svg')}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props
	// loginError: rootState.authorization.loginError
});

const actions = {
	// login
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Survey);

const styles = StyleSheet.create({
	survey: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		marginBottom: 15,
		borderColor: 'rgba(0, 0, 0, 0.1)',
		borderWidth: 1,
		padding: 15
	},
	button: {
		width: 75,
		height: 38,
		backgroundColor: '#FF6501',
		marginTop: 22,
		borderRadius: 18,
		textAlign: 'center',
		lineHeight: 36,
		fontSize: 18,
		color: 'white',
		fontFamily: 'Inter-SemiBold'
	},
	text: {
		letterSpacing: 0.4,
		fontFamily: 'Inter-Regular'
	},
	surveyTitle: {
		width: '75%',
		fontSize: 18
	},
	surveyControls: {
		width: '25%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	surveyBtn: {
		marginLeft: 30
	},
	delete: {
		color: 'red'
	}
});
