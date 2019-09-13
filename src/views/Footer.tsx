import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import * as HomeIcon from './../assets/general/home.svg';
import * as AddIcon from './../assets/general/add.svg';

interface IProps {
	navigation: any;
	userInfo: any;
	isShown: boolean;
}

class Footer extends React.Component<IProps> {
	render() {
		const { avatar } = this.props.userInfo;
		return (
			<>
				{
					this.props.isShown &&
					<View style={styles.footer}>
						<View style={styles.iconContainer}>
							<TouchableOpacity onPress={() => this.props.navigation('Home')}>
								<SvgUri height={23} width={23} svgXmlData={HomeIcon} />
							</TouchableOpacity>
						</View>
						<View style={styles.iconContainer}>
							<TouchableOpacity
								onPress={() => this.props.navigation('PostConstructor')}
							>
								<SvgUri height={23} width={23} svgXmlData={AddIcon} />
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
				}
			</>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userInfo: rootState.authorization.profileInfo,
	isShown: rootState.footer.isShown
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
		paddingHorizontal: 100,
		paddingTop: 8,
		borderTopColor: 'rgba(0, 0, 0, 0.1)',
		borderTopWidth: 1
	},
	iconContainer: {
		position: 'relative'
	},
	avatar: {
		width: 23,
		height: 23,
		borderRadius: 13,
		backgroundColor: '#adadad'
	}
});
