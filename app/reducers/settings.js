import { UPDATE_SETTING } from '../constants/actions';

const defaultState = {
  inputLang: 'en',
  outputLang: 'zh',
  theme: 'light',
  primaryColorId: 'green',
  realtime: true,
  bigTextFontSize: 50,
  recentLanguages: ['en', 'zh'],
  preventScreenLock: false,
  launchTime: 0,
  translateWhenPressingEnter: true,
};

const getInitialValue = (name) => {
  /* global localStorage */
  const localValue = localStorage.getItem(`mt-${name}`);
  if (localValue === null) {
    return defaultState[name];
  }
  return JSON.parse(localValue);
};

const initialState = {};
Object.keys(defaultState).forEach((key) => {
  initialState[key] = getInitialValue(key);
});

const settings = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SETTING: {
      const { name, value } = action;
      const newState = {};
      newState[name] = action.value;
      localStorage.setItem(`mt-${name}`, JSON.stringify(value));
      return Object.assign({}, state, newState);
    }
    default:
      return state;
  }
};

export default settings;
