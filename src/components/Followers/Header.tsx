import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

interface IProps {
    navigation: any;
}

const Header: React.FC<IProps> = ({ navigation }) => {
    const getActiveRouteName = (navigationState) => {
        if (!navigationState) {
          return null;
        }
        const route = navigationState.routes[navigationState.index];
        if (route.routes) {
          return getActiveRouteName(route);
        }
        return route.routeName;
      }

    const currentRoute = getActiveRouteName(navigation.state);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {navigation.navigate('Followers')}}>
                <Text
                    style={[currentRoute === 'Followers' && { color: 'red' }]}
                >
                    Followers
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Followed')}}>
                <Text
                    style={[currentRoute === 'Followed' && { color: 'red' }]}
                >
                    Following
                </Text>
            </TouchableOpacity>
        </View>
    )
};

const mapStateToProps = (rootState, props) => ({
	currentUser: rootState.authorization.profileInfo,
    amount: rootState.followers.followersCount,
	selectedProfileInfo: rootState.userProfile.selectedUser
});

export default connect(mapStateToProps)(Header);

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    }
});