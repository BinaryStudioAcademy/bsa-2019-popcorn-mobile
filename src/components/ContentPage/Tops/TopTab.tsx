import React from 'react';
import { View, StyleSheet } from 'react-native';
import Tabs from '../Tabs';
import TopNavigator from '../../../routes/StackNavigator/TopsNavigator';

interface IProps {
    navigation: any
}


const TopsTab: React.FC<IProps> = (props) => {
    return (
        <View style={[styles.container]}>
            <TopNavigator />
            <Tabs active={"Tops"} navigation={props.navigation}/>
        </View>
    )
};

export default TopsTab;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});