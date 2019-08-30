import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import idx from 'idx';

const HEADER_HEIGHT = 300;
import {
	UserPosts,
	Surveys,
	Events,
	Lists,
	Watched,
	Reviews,
	Tops
} from '../UserPageViews';

type IProps = {
	screenProps: any;
};

export default class Wrap extends Component<IProps> {
	render() {
		let animation = {};
		let transform: any = [];
		if (idx(this, _ => _.props.screenProps.scrollY)) {
			animation = {
				onScroll: Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: { y: this.props.screenProps.scrollY }
							}
						}
					],
					{ useNativeDriver: true }
				)
			};

			const translateY = this.props.screenProps.scrollY.interpolate({
				inputRange: [0, HEADER_HEIGHT],
				outputRange: [0, HEADER_HEIGHT],
				extrapolate: 'clamp'
			});
			transform.push({ translateY });
		}
		return (
			<View style={{ flex: 1 }}>
				<Animated.ScrollView
					contentContainerStyle={{ justifyContent: 'flex-start' }}
					scrollEventThrottle={1}
					{...animation}
				>
					<Animated.View style={{ paddingBottom: HEADER_HEIGHT }}>
						<Tops />
					</Animated.View>
				</Animated.ScrollView>
			</View>
		);
	}
}
