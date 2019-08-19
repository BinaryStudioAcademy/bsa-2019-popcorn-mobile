import React, {Component} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';

interface IProps {
    navigation: any
}

interface IState {
    email: string,
    password: string,
    emailError: string,
    passwordError: string,
    emailFocus: boolean,
    passwordFocus: boolean,
}

export default class Login extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      emailFocus: false,
      passwordFocus: false,
    };
  }

  onChangeEmail = value => {
    this.setState({email: value});
  };

  onChangePassword = value => {
    this.setState({password: value});
  };

  onPress = () => {};

  onSignup = () => {
    this.props.navigation.navigate('Signup');
  };

  onEmailFocus = () => {
    this.setState({ emailError: '' });
  }

  onPasswordFocus = () => {
    this.setState({ passwordError: '' });
  }

  validateEmail = () => {
    const { email } = this.state;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) 
    this.setState({ emailError: 'Email is invalid' });
    if (email.trim() === '') 
    this.setState({ emailError: 'Email is required' });
  }

  validatePassword = () => {
    const { password } = this.state;
    if (password.length < 6) 
    this.setState({ passwordError: 'Password must be at least 6 characters' });
    if (password.trim() === '')
    this.setState({ passwordError: 'Password is required' })
  }

  render() {
    const { 
      password, 
      email, 
      emailError, 
      passwordError,
      passwordFocus,
      emailFocus
    } = this.state;
    return (
      <View style={styles.container}>
        <Text style={[ styles.text, styles.header ]}>Welcome back!</Text>
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
            this.setState({ emailFocus: false })
          }}
          onFocus={() => {
            this.setState({ emailError: '', emailFocus: true });
          }}
        />
        {
            !!emailError &&
            <Text style={[ styles.text, styles.error ]}>{emailError}</Text>
        }
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
          maxLength={64}
          onBlur={() => { 
            this.validatePassword();
            this.setState({ passwordFocus: false });
          }}
          onFocus={() => { 
            this.setState({ passwordError: '', passwordFocus: true }); 
          }}
        />
        {
            !!passwordError &&
            <Text style={[ styles.text, styles.error ]}>{passwordError}</Text>
        }
        <TouchableOpacity onPress={this.onPress}>
          <Text style={[ styles.text, styles.button ]}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.message}>
          <Text style={[ styles.text, styles.secondaryText]}>Don't have an account? </Text>
          <TouchableOpacity onPress={this.onSignup} style={styles.linkContainer}>
            <Text style={[styles.text, styles.link]}>Register </Text>
            <SvgUri source={require('../../assets/general/arrow.svg')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    fontFamily: 'Inter-Black',
    fontWeight: '600',
    lineHeight: 100,
  },
  input: {
    width: '80%',
    marginBottom: 20,
    borderColor: 'rgba(0, 0, 0, 0.11)',
    borderWidth: 1,
    padding: 12,
    paddingLeft: 15,
    fontSize: 16,
    borderRadius: 3,
  },
  button: {
    width: 175,
    height: 37  ,
    backgroundColor: '#FF6501',
    marginTop: 22,
    borderRadius: 55,
    textAlign: 'center',
    lineHeight: 36,
    fontSize: 18,
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },
  message: {
    marginTop: 19,
    flexDirection: 'row',
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
    marginBottom: 1,
    borderWidth: 1,
  },
  error: {
    color: 'rgba(255, 0, 0, .6)',
  },
  inputFocus: {
    borderColor: 'rgba(0, 0, 0, 0.4)',
  }
});