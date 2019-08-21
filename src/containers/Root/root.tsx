import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import  App from '../Root';
interface IProps {
    store: Store
}

class Root extends Component<IProps> {
    render() {
        return (
            <Provider store={this.props.store}>
                <App />
            </Provider>
        )
    }
}


export default Root
