import {Dimensions} from 'react-native'

export const colors  = {
  primary: '#226B74',
  secondary: '#254B5A',
  tertiary: '#5DA6A7',
  darkPink: "#ff6a83"
}

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
}

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  primary: 'Cochin'
}

const {height, width} = Dimensions.get('window');
export const responsiveFontSize = (f) => {
    const tempHeight = (16/9)*width;
    return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2))*(f/100);
};   