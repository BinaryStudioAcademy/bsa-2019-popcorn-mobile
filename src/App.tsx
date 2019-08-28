import React from 'react';
import Root from './containers/Root/root';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { Alert } from 'react-native';

class App extends React.Component {

	render() {
		return (
			<PersistGate loading={null} persistor={persistor}>
				<Root store={store} />
			</PersistGate>
		);
	}
}

export default App;
