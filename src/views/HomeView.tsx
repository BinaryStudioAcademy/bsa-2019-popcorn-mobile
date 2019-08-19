import React from 'react';
import {
	ImageBackground,
	ScrollView,
	View,
	Text,
	Button,
	Image
} from 'react-native';
import styles from '../assets/style';
import { RightDrawer } from '../routes/RightDrawer';
import { HeaderView } from './Header';

const HomeView = ({ navigation }) => (
	<ImageBackground
		style={styles.imgBackground}
		resizeMode="cover"
		source={{ uri: '' }}
	>
		<HeaderView navigation={navigation} />
		<ScrollView>
			<Text style={styles.home_title}>Home</Text>
			<Image
				source={{
					uri:
						'https://images-gmi-pmc.edge-generalmills.com/33b7f0bf-2845-4200-a781-7a8ccc4bd10e.jpg'
				}}
				style={styles.homeImg}
			/>
			<Text style={styles.home_title}>Post</Text>
			<Image
				source={{
					uri:
						'https://images-gmi-pmc.edge-generalmills.com/33b7f0bf-2845-4200-a781-7a8ccc4bd10e.jpg'
				}}
				style={styles.homeImg}
			/>
		</ScrollView>
	</ImageBackground>
);

export default HomeView;
