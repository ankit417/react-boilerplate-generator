import React from 'react';
import {AppContainer} from './navigation';
import {Provider} from 'react-redux';
import {store} from './store';

export default function () {
  return (
    <Provider {...{store}}>
      <AppContainer />
    </Provider>
  );
}
