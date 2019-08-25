import UserNavigator from '../../routes/TabNavigator/UserNavigator';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import PostComponent from '../../components/MainPage/Post';
import { StyleSheet, Image, ScrollView } from 'react-native';
import UserProfileView from './UserProfileView';
import {
	Animated,
	Dimensions,
	Platform,
	Text,
	TouchableOpacity,
	View,
	Alert,
	PixelRatio
} from 'react-native';
import {
	Body,
	Header,
	List,
	ListItem as Item,
	ScrollableTab,
	Tab,
	TabHeading,
	Tabs,
	Title
} from 'native-base';
import Posts from '../../components/MainPage/Post/';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_HEIGHT = 400;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 64 : 50;
const SCROLL_HEIGHT = 300;
const THEME_COLOR = 'rgba(251,135,0,.7)';
const FADED_THEME_COLOR = '#fff';
import {
	UserPosts,
	Surveys,
	Events,
	Lists,
	Watched,
	Reviews,
	Tops
} from './UserPageViews';

interface IProps {
	match: {
		path: string;
		params: any;
	};
	getSelectedUserInfo: (id: string) => any;
	selectedProfileInfo: any;
}

class UserPageView extends Component {
	nScroll = new Animated.Value(0);
	scroll = new Animated.Value(0);
	textColor = this.scroll.interpolate({
		inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
		outputRange: [THEME_COLOR, FADED_THEME_COLOR, 'white'],
		extrapolate: 'clamp'
	});
	tabBg = this.scroll.interpolate({
		inputRange: [0, SCROLL_HEIGHT],
		outputRange: ['white', THEME_COLOR],
		extrapolate: 'clamp'
	});
	tabY = this.nScroll.interpolate({
		inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
		outputRange: [0, 0, 1]
	});

	components = {
		Posts: UserPosts,
		Tops: Tops,
		Events: Events,
		Surveys: Surveys,
		Reviews: Reviews,
		Lists: Lists,
		Watched: Watched
	};
	tabContent = (tabView, i) => {
		let TabViewComponent = this.components[tabView];

		return (
			<View style={{ height: this.state.height }} key={i}>
				<List
					onLayout={({
						nativeEvent: {
							layout: { height }
						}
					}) => {
						this.heights[i] = height;
					}}
				>
					<TabViewComponent />
				</List>
			</View>
		);
	};
	heights = [500, 500];
	state = {
		activeTab: 0,
		height: 500
	};

	constructor(props) {
		super(props);
		this.nScroll.addListener(
			Animated.event([{ value: this.scroll }], { useNativeDriver: false })
		);
	}

	render() {
		return (
			<View>
				<Animated.ScrollView
					scrollEventThrottle={5}
					showsVerticalScrollIndicator={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: this.nScroll } } }],
						{ useNativeDriver: true }
					)}
					style={{ zIndex: 0 }}
				>
					<UserProfileView />
					<Tabs
						prerenderingSiblingsNumber={7}
						onChangeTab={({ i }) => {
							this.setState({ height: this.heights[i], activeTab: i });
						}}
						renderTabBar={props => (
							<Animated.View
								style={{
									transform: [{ translateY: this.tabY }],
									zIndex: 1,
									width: '100%',
									backgroundColor: 'white'
								}}
							>
								<ScrollableTab
									{...props}
									renderTab={(name, page, active, onPress, onLayout) => (
										<TouchableOpacity
											key={page}
											onPress={() => onPress(page)}
											onLayout={onLayout}
											activeOpacity={0.4}
										>
											<Animated.View
												style={{
													flex: 1,
													height: 100,
													backgroundColor: FADED_THEME_COLOR,
													fontSize: 18,
													color: THEME_COLOR
												}}
											>
												<TabHeading
													style={{
														backgroundColor: 'transparent',
														width: SCREEN_WIDTH / 3
													}}
												>
													<Animated.Text
														style={{
															fontWeight: active ? 'bold' : 'normal',
															color: THEME_COLOR,
															fontSize: 16
														}}
													>
														{name}
													</Animated.Text>
												</TabHeading>
											</Animated.View>
										</TouchableOpacity>
									)}
									underlineStyle={{ backgroundColor: THEME_COLOR }}
								/>
							</Animated.View>
						)}
					>
						<Tab heading="Posts" style={{ minHeight: SCREEN_HEIGHT - 140 }}>
							{this.tabContent('Posts', 0)}
						</Tab>
						<Tab heading="Surveys" style={{ minHeight: SCREEN_HEIGHT - 140 }}>
							{this.tabContent('Surveys', 1)}
						</Tab>
						<Tab heading="Tops" style={{ minHeight: SCREEN_HEIGHT - 140 }}>
							{this.tabContent('Tops', 2)}
						</Tab>
						<Tab heading="Events" style={{ minHeight: SCREEN_HEIGHT - 140 }}>
							{this.tabContent('Events', 3)}
						</Tab>
						<Tab heading="Reviews" style={{ minHeight: SCREEN_HEIGHT - 140 }}>
							{this.tabContent('Reviews', 4)}
						</Tab>
						<Tab heading="Lists" style={{ minHeight: SCREEN_HEIGHT - 140 }}>
							{this.tabContent('Lists', 5)}
						</Tab>
						<Tab heading="Watched" style={{ minHeight: SCREEN_HEIGHT - 140 }}>
							{this.tabContent('Watched', 6)}
						</Tab>
					</Tabs>
				</Animated.ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	selectedProfileInfo: rootState.authorization.profileInfo
});

export default connect(mapStateToProps)(UserPageView);
