import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { NavigationActions } from 'react-navigation';

interface IProps {
	navigation: any;
}

class Footer extends React.Component<IProps> {
	render() {
		const { avatar } = this.props.userInfo;
		return (
			<View style={styles.footer}>
				<View style={styles.iconContainer}>
					<TouchableOpacity onPress={() => this.props.navigation('Home')}>
						<SvgUri
							style={styles.item}
							height={20}
							width={20}
							source={require('../assets/general/home.svg')}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.iconContainer}>
					<TouchableOpacity
						onPress={() => this.props.navigation('PostConstructor')}
					>
						<SvgUri
							style={styles.item}
							height={20}
							width={20}
							source={require('../assets/general/add.svg')}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.iconContainer}>
					<TouchableOpacity onPress={() => this.props.navigation('Profile')}>
						<Image
							source={{
								uri:
									avatar ||
									'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png'
							}}
							style={styles.avatar}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userInfo: rootState.authorization.profileInfo
});

const actions = {};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);

const styles = StyleSheet.create({
	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
		width: '100%',
		flexDirection: 'row',
		paddingBottom: 8,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 8,
		borderTopColor: 'rgba(0, 0, 0, 0.1)',
		borderTopWidth: 1
	},
	iconContainer: {
		position: 'relative'
	},
	avatar: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#adadad'
	}
});
