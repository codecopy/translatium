import {
  UPDATE_SETTING,
} from '../constants/actions';

import { isOutput } from '../libs/languageUtils';

const translate = () => {};
const clearHome = () => {};

export const updateSetting = (name, value) => ({
  type: UPDATE_SETTING,
  name,
  value,
});

export const toggleSetting = name => ((dispatch, getState) => {
  const value = !getState().settings[name];
  dispatch(updateSetting(name, value));
});


const runAfterLanguageChange = language => ((dispatch, getState) => {
  const { settings } = getState();
  const { realtime, recentLanguages } = settings;

  if (realtime === true) {
    dispatch(translate());
  } else {
    dispatch(clearHome());
  }

  if (!language) return;

  if (recentLanguages.indexOf(language) < 0 && language !== 'auto') {
    recentLanguages.unshift(language);
  }

  dispatch(updateSetting('recentLanguages', recentLanguages.slice(0, 6)));
});

export const updateInputLang = value => ((dispatch) => {
  dispatch(updateSetting('inputLang', value));
  dispatch(runAfterLanguageChange(value));
});

export const updateOutputLang = value => ((dispatch) => {
  dispatch(updateSetting('outputLang', value));
  dispatch(runAfterLanguageChange(value));
});

export const swapLanguages = () => ((dispatch, getState) => {
  const { inputLang, outputLang } = getState().settings;

  if (isOutput(inputLang) === false) return;

  dispatch(updateSetting('inputLang', outputLang));
  dispatch(updateSetting('outputLang', inputLang));

  dispatch(runAfterLanguageChange());
});
