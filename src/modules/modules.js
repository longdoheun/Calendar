import { combineReducers } from 'redux';
import pivot from './pivot';
import event from './event';
import env from './env';

const rootReducer = combineReducers({
  pivot,
  event,
  env,
});

export default rootReducer;