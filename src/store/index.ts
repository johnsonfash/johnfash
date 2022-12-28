
import { legacy_createStore, applyMiddleware, AnyAction, combineReducers, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import type { } from 'redux-thunk/extend-redux'
import { EqualityFn, useSelector } from 'react-redux';
import account from './reducers/account';
import auth from './reducers/auth';

const appReducer = combineReducers({
  account,
  auth, 
});

export type State = ReturnType<typeof appReducer>

const rootReducer = (state: State, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case 'RESET_APP':
      state = undefined as any;
  }
  return appReducer(state, action);
};

const middleware = compose(applyMiddleware(thunkMiddleware));
// @ts-ignore
export const makeStore = () => legacy_createStore(rootReducer, middleware);
export const wrapper = createWrapper<Store<any>>(makeStore, { debug: false });

export const useAppSelector: <TState = State, Selected = unknown>(selector: (state: TState) => Selected, equalityFn?: EqualityFn<Selected> | undefined) => Selected = useSelector
