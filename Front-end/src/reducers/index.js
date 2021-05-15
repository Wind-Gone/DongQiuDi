import { combineReducers } from 'redux';
import playoffReducers from './playoffReducers';

export default combineReducers({
  playoff: playoffReducers
});