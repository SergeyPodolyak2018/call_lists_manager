import { combineReducers } from 'redux';
import { States } from '../constants';
import loginReducer from './loginReducer';
import campaignsReducer from './campaignsReducer';
import callingListsReducer from './callingListsReducer';
import scheduleListsReducer from './scheduleListsReducer';

export default combineReducers({
  [States.LOGIN]: loginReducer,
  [States.CAMPAIGN]: campaignsReducer,
  [States.CALLING_LISTS]: callingListsReducer,
  [States.SCHEDULE_LISTS]: scheduleListsReducer,
});
