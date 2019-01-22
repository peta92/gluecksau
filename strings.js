import LocalizedStrings from 'react-native-localization';
 
// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');
 
let strings = new LocalizedStrings({
 en:{
   rules:"rules",
   history:"history",
   softBoiledEgg:"Soft-boiled egg",
   choice:"How to choose the egg"
 },
 de: {
    rules:"Regeln",
    history:"Verlauf"
 }
});