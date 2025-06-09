import { Text } from 'react-native';
import { responsiveFont, HeadingProps } from '../responsive-text';
import clsx from 'clsx';

export default function PText({
  children,
  fontWeight = '500',
  style = {},
  className = '',
}: HeadingProps) {
  const fontSize = responsiveFont(16);
  const lineHeight = fontSize * 1.2;

  return (
    <Text className={clsx(className)} style={[{ fontSize, lineHeight, fontWeight }, style]}>
      {children}
    </Text>
  );
}
