import { Dimensions, TextStyle, StyleProp } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const responsiveFont = (baseFontSize: number, baseWidth = 375) =>
  (screenWidth / baseWidth) * baseFontSize;

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

export interface HeadingProps {
  children: React.ReactNode;
  color?: string;
  fontWeight?: FontWeight;
  style?: StyleProp<TextStyle>;
}
