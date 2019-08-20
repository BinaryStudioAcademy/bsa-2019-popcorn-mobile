import {createStackNavigator} from 'react-navigation';
import Login from '../../components/Authorization/Login';
import Signup from '../../components/Authorization/Signup';

const AuthNavigation = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null,
    },
  },
});

export default AuthNavigation;