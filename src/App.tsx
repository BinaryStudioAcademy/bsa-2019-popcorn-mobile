import React from 'react';
import Root from './containers/Root/root'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

class App extends React.Component {
  render () {
    return (
      <PersistGate loading={null} persistor={persistor}>
        <Root store={store} />
      </PersistGate>
    )
  }
}
