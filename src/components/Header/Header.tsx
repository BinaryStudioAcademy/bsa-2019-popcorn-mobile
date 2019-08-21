import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const Header = props => {
	return (
		<View style={styles.header}>
			<View style={styles.headerLogo}>
				<SvgUri
					height={25}
					width={17}
					source={require('../../assets/general/popcorn-logo.svg')}
				/>
			</View>
			<View style={styles.headerNav}>
				<View style={styles.iconContainer}>
					<SvgUri
						// style={[styles.item, styles.alert]}
						height={23}
						width={20}
						source={require('../../assets/general/profile.svg')}
					/>
				</View>
				<View style={styles.iconContainer}>
					<SvgUri
						// style={styles.item}
						height={25}
						width={35}
						source={require('../../assets/general/message.svg')}
					/>
					<Text style={styles.iconAlert}></Text>
				</View>
				<View style={styles.iconContainer}>
					<SvgUri
						// style={styles.item}
						height={24}
						width={24}
						source={require('../../assets/general/new.svg')}
					/>
					<Text style={styles.iconAlert}></Text>
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
		width: '50%',
		paddingLeft: 11
	},
	headerNav: {
		display: 'flex',
		justifyContent: 'flex-end',
		flexDirection: 'row',
		alignItems: 'center',
		width: '50%',
		paddingRight: 23
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
