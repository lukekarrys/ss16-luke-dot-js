import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

export default (initialState = {}) => {
  const middleware = [thunk];
  const storeEnhancers = [];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(require('redux-logger').createLogger({
      collapsed: true
    }));

    storeEnhancers.push(
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...storeEnhancers
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
};
