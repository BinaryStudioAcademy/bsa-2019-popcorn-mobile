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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 69;
const SCROLL_HEIGHT = 300;
const THEME_COLOR = 'rgba(251,135,0,.7)';
const FADED_THEME_COLOR = '#fff';
const TAB_HEIGHT = 49;

interface IProps {
	navigation: any
}

class UserPageTest1 extends Component<IProps> {
	constructor(props) {
		super(props);
		this.nScroll.addListener(
			Animated.event([{ value: this.scroll }], { useNativeDriver: false })
		);
	}
	nScroll = new Animated.Value(0);
	scroll = new Animated.Value(0);

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
						console.log(`i = ${i}, layout.height=${height}, minheight=${newHeight},
					screen_height = ${SCREEN_HEIGHT}`);
						this.heights[i] = newHeight;
					}}
				>
					<TabViewComponent />
				</View>
			</View>
		);
	};
	heights = [SCREEN_HEIGHT - HEADER_HEIGHT];
	state = {
		activeTab: 0,
		height: SCREEN_HEIGHT - HEADER_HEIGHT
	};

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
					<UserProfileView navigation={this.props.navigation}/>
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
						<Tab heading="Posts">{this.tabContent('Posts', 0)}</Tab>
						<Tab heading="Surveys">{this.tabContent('Surveys', 1)}</Tab>
						<Tab heading="Tops">{this.tabContent('Tops', 2)}</Tab>
						<Tab heading="Events">{this.tabContent('Events', 3)}</Tab>
						<Tab heading="Reviews">{this.tabContent('Reviews', 4)}</Tab>
						<Tab heading="Lists">{this.tabContent('Lists', 5)}</Tab>
						<Tab heading="Watched">{this.tabContent('Watched', 6)}</Tab>
					</Tabs>
				</Animated.ScrollView>
			</View>
		);
	}
}

export default UserPageTest1;
