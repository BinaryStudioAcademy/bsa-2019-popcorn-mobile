import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import {
    SafeAreaView,
    ScrollView,
    View,
    StatusBar,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import StoryComponent from './../../components/MainPage/Story/index';

interface IProps {
    store: Store
}

class Root extends Component<IProps> {
    render() {
        return (
            <Provider store={this.props.store}>
                <StoryComponent/>
            </Provider>
        )
    }
}


export default Root
