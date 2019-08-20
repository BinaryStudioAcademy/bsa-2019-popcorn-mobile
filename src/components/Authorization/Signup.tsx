import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { register } from '../../redux/routines';

interface IRegister {
	email: string;
	password: string;
	name: string;
	location: string;
	aboutMe: string;
}

interface IProps {
	navigation: any;
	register: (IRegister) => any;
	registerError: string;
}

interface IState {
	email: string;
	name: string;
	password: string;
	passwordError: string;
	emailError: string;
	nameError: string;
	emailFocus: boolean;
	passwordFocus: boolean;
	nameFocus: boolean;
}

class Signup extends Component<IProps, IState> {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			name: '',
			passwordError: '',
			emailError: '',
			nameError: '',
			emailFocus: false,
			passwordFocus: false,
			nameFocus: false
		};
	}

	onChangeEmail = value => {
		this.setState({ email: value });
	};

	onChangePassword = value => {
		this.setState({ password: value });
	};

	onChangeName = value => {
		this.setState({ name: value });
	};

	onLogin = () => {
		this.props.navigation.goBack();
	};

	validateEmail = () => {
		const { email } = this.state;
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email.trim() === '') this.setState({ emailError: 'Email is required' });
		else if (!re.test(String(email).toLowerCase()))
			this.setState({ emailError: 'Email is invalid' });
		else return true;
	};

	validatePassword = () => {
		const { password } = this.state;
		if (password.trim() === '')
			this.setState({ passwordError: 'Password is required' });
		else if (password.length < 6)
			this.setState({
				passwordError: 'Password must be at least 6 characters'
			});
		else return true;
	};

	validateName = () => {
		const { name } = this.state;
		if (name.trim() === '') this.setState({ nameError: 'Name is required' });
		else return true;
	};

	onPress = () => {
		const { email, name, password } = this.state;
		if (this.validateEmail && this.validateName && this.validatePassword)
			this.props.register({
				email: email.trim(),
				name: name.trim(),
				password: password.trim(),
				location: '',
				aboutMe: ''
			});
	};

	render() {
		const {
			email,
			password,
			name,
			emailError,
			passwordError,
			passwordFocus,
			nameError,
			emailFocus,
			nameFocus
		} = this.state;
		return (
			<View style={styles.container}>
				<Text style={[styles.text, styles.header]}>Join Pop Corn!</Text>
				<TextInput
					style={[
						styles.text,
						styles.input,
						!!nameError && styles.borderError,
						nameFocus && styles.inputFocus
					]}
					placeholder="First and Last name"
					value={name}
					onChangeText={this.onChangeName}
					onFocus={() => {
						this.setState({ nameFocus: true, nameError: '' });
					}}
					onBlur={() => {
						this.validateName();
						this.setState({ nameFocus: false });
					}}
				/>
				{!!nameError && (
					<Text style={[styles.text, styles.error]}>{nameError}</Text>
				)}
				<TextInput
					style={[
						styles.text,
						styles.input,
						!!emailError && styles.borderError,
						emailFocus && styles.inputFocus
					]}
					placeholder="Email address"
					value={email}
					onChangeText={this.onChangeEmail}
					onBlur={() => {
						this.validateEmail();
						this.setState({ emailFocus: false });
					}}
					onFocus={() => {
						this.setState({ emailError: '', emailFocus: true });
					}}
				/>
				{!!emailError && (
					<Text style={[styles.text, styles.error]}>{emailError}</Text>
				)}
				<TextInput
					style={[
						styles.text,
						styles.input,
						!!passwordError && styles.borderError,
						passwordFocus && styles.inputFocus
					]}
					placeholder="Password"
					secureTextEntry={true}
					value={password}
					onChangeText={this.onChangePassword}
					onBlur={() => {
						this.validatePassword();
						this.setState({ passwordFocus: false });
					}}
					onFocus={() => {
						this.setState({ passwordError: '', passwordFocus: true });
					}}
					maxLength={64}
				/>
				{!!passwordError && (
					<Text style={[styles.text, styles.error]}>{passwordError}</Text>
				)}
				{!!this.props.registerError && (
					<View>
						<Text style={[styles.text, styles.error]}>
							{this.props.registerError}
						</Text>
					</View>
				)}
				<TouchableOpacity onPress={this.onPress}>
					<Text style={[styles.text, styles.button]}>Sign up</Text>
				</TouchableOpacity>
				<View style={styles.message}>
					<Text style={[styles.text, styles.secondaryText]}>
						Already have an account?{' '}
					</Text>
					<TouchableOpacity onPress={this.onLogin} style={styles.linkContainer}>
						<Text style={[styles.text, styles.link]}>Login </Text>
						<SvgUri source={require('../../assets/general/arrow.svg')} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	isAuthorized: !!rootState.authorization.profileInfo,
	loginError: rootState.authorization.loginError,
	registerError: rootState.authorization.registerError
});

const actions = {
	register
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	header: {
		fontSize: 36,
		fontFamily: 'Inter-Black',
		fontWeight: '600',
		lineHeight: 100
	},
	input: {
		width: '80%',
		marginBottom: 20,
		borderColor: 'rgba(0, 0, 0, 0.11)',
		borderWidth: 1,
		padding: 12,
		paddingLeft: 15,
		fontSize: 16,
		borderRadius: 3
	},
	button: {
		width: 175,
		height: 37,
		backgroundColor: '#FF6501',
		marginTop: 22,
		borderRadius: 55,
		textAlign: 'center',
		lineHeight: 36,
		fontSize: 18,
		color: 'white',
		fontFamily: 'Inter-SemiBold'
	},
	message: {
		marginTop: 19,
		flexDirection: 'row'
	},
	text: {
		letterSpacing: 0.4,
		fontFamily: 'Inter-Regular'
	},
	secondaryText: {
		color: 'rgba(0, 0, 0, 0.8)'
	},
	link: {
		textTransform: 'uppercase',
		fontFamily: 'Inter-SemiBold',
		marginRight: 5
	},
	linkContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	borderError: {
		borderColor: 'rgba(255, 0, 0, .6)',
		marginBottom: 1
	},
	error: {
		color: 'rgba(255, 0, 0, .6)'
	},
	inputFocus: {
		borderColor: 'rgba(0, 0, 0, 0.4)'
	}
});
