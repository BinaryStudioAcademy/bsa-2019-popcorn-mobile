import { createStackNavigator, createAppContainer } from 'react-navigation';

import Profile from './screens/Profile';

const Test = createStackNavigator({
	Prof: Profile
});

export default createAppContainer(Test);
