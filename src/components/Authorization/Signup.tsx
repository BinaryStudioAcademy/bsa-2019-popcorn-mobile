import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

interface IProps {
    navigation: any
}

interface IState {
    email: string,
    name: string,
    password: string
}

export default class Signup extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  onChangeEmail = value => {
    this.setState({email: value});
  };

  onChangePassword = value => {
    this.setState({password: value});
  };

  onChangeName = value => {
    this.setState({name: value});
  };

  onLogin = () => {
    this.props.navigation.goBack();
  };

  onPress = () => {}

  render() {
    const {email, password, name} = this.state;
    return (
      <View style={styles.container}>
        <Text style={[ styles.text, styles.header ]}>Join Pop Corn!</Text>
        <TextInput
          style={[ styles.text, styles.input ]}
          placeholder="First and Last name"
          value={name}
          onChangeText={this.onChangeName}
        />
        <TextInput
          style={[ styles.text, styles.input ]}
          placeholder="Email address"
          value={email}
          onChangeText={this.onChangeEmail}
        />
        <TextInput
          style={[ styles.text, styles.input ]}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={this.onChangePassword}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={[ styles.text, styles.button ]}>Sign up</Text>
        </TouchableOpacity>
        <View style={styles.message}>
          <Text style={[ styles.text, styles.secondaryText ]}>Already have an account? </Text>
          <TouchableOpacity onPress={this.onLogin}>
            <Text style={[styles.text, styles.link]}>Login </Text>
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
    margin: 10,
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
    fontFamily: 'Inter-SemiBold'
  }
});