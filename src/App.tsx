import Router from './routes/';
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeComponent from './views/HomeView';
import Page1 from './views/SidebarView';

export default class CustomDrawer extends Component {
	render() {
		return <Router />;
	}
}

// const App = createStackNavigator({
// 	Home:{
// 		screen: HomeComponent
// 	},
// 	Page1:{
// 		screen: Page1
// 	}
// })
// export default App;
