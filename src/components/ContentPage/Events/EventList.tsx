import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Tabs from '../Tabs';

interface IProps {
    navigation: any
}

const EventList: React.FC<IProps> = (props) => {
    return (
        <View style={[styles.container]}>
            <ScrollView>
                <Text>Events</Text>
            </ScrollView>
            <Tabs active={"Events"} navigation={props.navigation}/>
        </View>
    )
};

export default EventList;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});