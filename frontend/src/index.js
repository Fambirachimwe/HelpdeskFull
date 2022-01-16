import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './stateManagement/store';
// import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
// import {Loading} from './components/loading.component';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {/* <PersistGate loading={(<Loading />)} persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
      </Provider>

    </QueryClientProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
