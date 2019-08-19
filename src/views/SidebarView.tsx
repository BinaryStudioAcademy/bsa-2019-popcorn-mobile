import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import styles from '../assets/style';

const SidebarView = ({ navigation }) => (
	<ScrollView contentContainerStyle={styles.sidebar}>
		<View>
			<Text style={styles.sidebar_title}>Tops</Text>
			<Image
				source={{
					uri:
						'https://blog.radware.com/wp-content/uploads/2016/12/popcorn-time.jpg'
				}}
				style={styles.rightSideBarImg}
			/>
			<Text style={styles.sidebar_title}>Surveys</Text>
			<Image
				source={{
					uri:
						'https://blog.radware.com/wp-content/uploads/2016/12/popcorn-time.jpg'
				}}
				style={styles.rightSideBarImg}
			/>
		</View>
	</ScrollView>
);

export default SidebarView;
