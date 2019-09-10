import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Platform
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import NotificationIcon from './NotificationIcon';

interface IProps {
	data: any;
	nav: any;
}

const HEADER_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

const Header = props => {
	return (
		<View style={[styles.header, { paddingTop: HEADER_HEIGHT }]}>
			<View style={styles.headerMenu}>
				<TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
					<SvgUri
						height={30}
						width={30}
						source={require('../../assets/general/menu.svg')}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.headerLogo}>
				<TouchableOpacity onPress={() => props.navigation.navigate('First')}>
					<SvgUri
						height={25}
						width={17}
						source={require('../../assets/general/popcorn-logo.svg')}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.headerNav}>
				<View style={styles.iconContainer}>
					<SvgUri
						style={[styles.item, styles.alert]}
						height={23}
						width={20}
						source={require('../../assets/general/profile.svg')}
					/>
				</View>
				<View style={styles.iconContainer}>
					<TouchableOpacity onPress={() => props.navigation.navigate('Second')}>
						<SvgUri
							style={styles.item}
							height={25}
							width={35}
							source={require('../../assets/general/message.svg')}
						/>
						<Text style={styles.iconAlert}></Text>
					</TouchableOpacity>
				</View>
				<View style={styles.iconContainer}>
					<TouchableOpacity
						onPress={() => {
							props.navigation.navigate('Seventh');
						}}
					>
						<NotificationIcon />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
		width: '100%',
		flexDirection: 'row',
		paddingTop: 8,
		paddingBottom: 8,
		borderBottomColor: 'rgba(0, 0, 0, 0.1)',
		borderBottomWidth: 1
	},
	headerLogo: {
		width: '35%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerMenu: {
		width: '30%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: 15
	},
	headerNav: {
		display: 'flex',
		justifyContent: 'flex-end',
		flexDirection: 'row',
		alignItems: 'center',
		width: '35%',
		paddingRight: 15
	},
	item: {
		marginLeft: 11
	},
	iconContainer: {
		position: 'relative'
	},
	iconAlert: {
		width: 10,
		height: 10,
		backgroundColor: 'red',
		position: 'absolute',
		top: -5,
		right: -5,
		borderRadius: 5
	}
});

export default Header;
