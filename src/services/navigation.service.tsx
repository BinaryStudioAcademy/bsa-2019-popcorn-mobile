import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
	navigator = navigatorRef;
}

function navigate(routeName, params?) {
	if (navigator) {
		navigator.dispatch(
			NavigationActions.navigate({
				routeName,
				params
			})
		);
	}
}

let homeNavigator;

function setMainNavigator(navigatorRef) {
	homeNavigator = navigatorRef;
}

function mainNavigate(routeName, params?) {
	if (homeNavigator) {
		homeNavigator.dispatch(
			NavigationActions.navigate({
				routeName,
				params
			})
		);
	}
}

export default {
	navigate,
	setTopLevelNavigator,
	mainNavigate,
	setMainNavigator
};
