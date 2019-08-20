import React, { Fragment } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	StatusBar
} from 'react-native';
import SvgUri from 'react-native-svg-uri';

import Test from './navigation';
import Header from './components/Header/Header';

const App = () => {
	return (
		<Fragment>
			<StatusBar />
			<SafeAreaView>
				<Header />
				<ScrollView contentInsetAdjustmentBehavior="automatic">
					<View>
						<SvgUri
							height={150}
							source={require('./assets/general/popcorn-logo.svg')}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Fragment>
	);
};

const styles = StyleSheet.create({});

export default App;
