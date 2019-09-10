import React, { Component } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IProps {
	data: any;
	nav: any;
	user: boolean;
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
		const { data, user } = this.props;
		console.log(data);
		return (
			<TouchableOpacity
				onPress={() => this.props.nav.navigate('SurveyPage', { id: data.id })}
			>
				<View style={styles.container}>
					<View>
						<Image
							source={{
								uri:
									data.image ||
									'https://www.checkmarket.com/wp-content/uploads/2016/08/survey-checklist.png'
							}}
							style={{ width: 140, height: 100 }}
						/>
					</View>
					<View style={styles.column}>
						<View style={{ width: '80%' }}>
							<Text numberOfLines={2} style={[styles.text, styles.title]}>
								{data.title}
							</Text>
							{!!data.description && (
								<Text
									numberOfLines={3}
									style={[styles.text, styles.description]}
								>
									{data.description}
								</Text>
							)}
						</View>
						<View style={styles.userInfo}>
							<Image
								source={{
									uri:
										data.user.avatar ||
										'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png'
								}}
								style={styles.roundImage}
							/>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props
});

const actions = {};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Survey);

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderColor: 'rgba(0, 0, 0, .1)',
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		alignItems: 'flex-start',
		marginBottom: 20
	},
	column: {
		width: '58%',
		paddingLeft: 10,
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
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
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		color: '#122737'
	},
	title: {
		fontFamily: 'Inter-SemiBold',
		fontSize: 16,
		marginBottom: 10,
		width: '75%'
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
	},
	userInfo: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '20%'
	},
	roundImage: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#adadad'
	}
});
