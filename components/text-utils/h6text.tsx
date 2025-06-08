import { Text } from 'react-native';
import { responsiveFont, HeadingProps } from '../common/responsive-text';

export default function H6Text({
  children,
  color = '#000',
  fontWeight = '500',
  style = {},
}: HeadingProps) {
  const fontSize = responsiveFont(20);
  const lineHeight = fontSize * 1.2;

  return <Text style={[{ fontSize, lineHeight, color, fontWeight }, style]}>{children}</Text>;
}
