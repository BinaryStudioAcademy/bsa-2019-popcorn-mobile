import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const Header = () => {
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
				<SvgUri
					style={styles.item}
					height={23}
					width={20}
					source={require('../../assets/general/profile.svg')}
				/>
				<SvgUri
					style={styles.item}
					height={25}
					width={35}
					source={require('../../assets/general/message.svg')}
				/>
				<SvgUri
					style={styles.item}
					height={24}
					width={24}
					source={require('../../assets/general/new.svg')}
				/>
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
	}
});

export default Header;
