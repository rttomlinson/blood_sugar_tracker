//need to connect all the reducers
import {
    combineReducers
}
from 'redux';

import authReducer from './auth_reducer';
import infoReducer from './info_reducer';
import vaccineReducer from './vaccineReducer';
import {
    reducer as formReducer
}
from 'redux-form';

const rootReducer = combineReducers({
    userVaccines: vaccineReducer,
    auth: authReducer,
    form: formReducer,
    info: infoReducer
});

export default rootReducer;
