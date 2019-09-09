import React, { Component } from 'react';
import UserProfileView from './UserProfileView';
import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
import { ScrollableTab, Tab, TabHeading, Tabs } from 'native-base';
import {
	Surveys,
	Events,
	Lists,
	Watched,
	Reviews,
	Tops
} from './UserPageViews';
import UserPosts from './UserPostsView';
import { ORANGE_PROFILE } from './styles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 69;
const PROFILE_HEIGHT = 300;
const FADED_THEME_COLOR = '#fff';
const TAB_HEIGHT = 49;

interface IProps {
	navigation: any;
}
interface IState {
	activeTab: number;
	height: number;
	profileHeight: number;
}

class UserPageTest1 extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.nScroll.addListener(
			Animated.event([{ value: this.scroll }], { useNativeDriver: false })
		);
		this.state = {
			activeTab: 0,
			height: SCREEN_HEIGHT - HEADER_HEIGHT,
			profileHeight: 0
		};
	}
	updateProfileHeight = height => {
		this.setState({ profileHeight: height });
	};
	nScroll = new Animated.Value(0);
	scroll = new Animated.Value(0);

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
				<View
					onLayout={({
						nativeEvent: {
							layout: { height }
						}
					}) => {
						let newHeight =
							height > this.state.height - TAB_HEIGHT
								? height
								: this.state.height - TAB_HEIGHT;
						this.heights[i] = newHeight;
					}}
				>
					<TabViewComponent navigation={this.props.navigation} />
				</View>
			</View>
		);
	};
	heights = [SCREEN_HEIGHT - HEADER_HEIGHT];

	render() {
		const tabY = this.nScroll.interpolate({
			inputRange: [0, this.state.profileHeight, this.state.profileHeight + 1],
			outputRange: [0, 0, 1]
		});

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
					<UserProfileView
						navigation={this.props.navigation}
						updateProfileHeight={this.updateProfileHeight.bind(this)}
					/>
					<Tabs
						prerenderingSiblingsNumber={7}
						onChangeTab={({ i }) => {
							this.setState({ height: this.heights[i], activeTab: i });
						}}
						renderTabBar={props => (
							<Animated.View
								style={{
									transform: [{ translateY: tabY }],
									zIndex: 1,
									width: '100%',
									backgroundColor: '#fff'
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
													height: TAB_HEIGHT,
													backgroundColor: FADED_THEME_COLOR,
													fontSize: 18,
													color: ORANGE_PROFILE
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
															color: ORANGE_PROFILE,
															fontSize: 16
														}}
													>
														{name}
													</Animated.Text>
												</TabHeading>
											</Animated.View>
										</TouchableOpacity>
									)}
									underlineStyle={{ backgroundColor: ORANGE_PROFILE }}
								/>
							</Animated.View>
						)}
					>
						<Tab heading="Posts">{this.tabContent('Posts', 0)}</Tab>
						<Tab heading="Surveys">{this.tabContent('Surveys', 1)}</Tab>
						<Tab heading="Tops">{this.tabContent('Tops', 2)}</Tab>
						<Tab heading="Events">{this.tabContent('Events', 3)}</Tab>
						<Tab heading="Reviews">{this.tabContent('Reviews', 4)}</Tab>
						<Tab heading="Lists">{this.tabContent('Lists', 5)}</Tab>
						<Tab heading="Watchlist">{this.tabContent('Watched', 6)}</Tab>
					</Tabs>
				</Animated.ScrollView>
			</View>
		);
	}
}

export default UserPageTest1;
