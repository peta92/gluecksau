import * as Localization  from 'expo-localization';
import i18n from 'i18n-js';


function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

let de = require('./strings/de.json');
let en = require('./strings/en.json');

i18n.fallbacks = true;
i18n.defaultLocale = "en";
i18n.translations = {en, de};
i18n.locale = Localization.locale; 

export {i18n, Capitalize }; 