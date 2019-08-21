import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Tabs from '../Tabs';

interface IProps {
    navigation: any
}


const SurveyList: React.FC<IProps> = (props) => {
    return (
        <View style={[styles.container]}>
            <ScrollView>
                <Text>Surveys</Text>
            </ScrollView>
            <Tabs active={"Surveys"} navigation={props.navigation}/>
        </View>
    )
};

export default SurveyList;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});