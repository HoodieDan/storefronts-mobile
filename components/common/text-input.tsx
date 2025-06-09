import { View, Text, TextInput } from 'react-native';
import clsx from 'clsx';
import PText from './text-utils/ptext';
import { responsiveFont } from './responsive-text';

const FormInput = ({ label, error, className = '', ...props }) => {
  const fontSize = responsiveFont(16);
  const lineHeight = fontSize * 1.2;

  return (
    <View className={clsx('mb-4', className)}>
      <PText className="mb-1">{label}</PText>
      <TextInput
        className={clsx(
          'bg-antiFlashWhite w-full rounded-md border px-3 py-4',
          error ? 'border-red-500' : 'border-transparent'
        )}
        style={{ fontSize, lineHeight }}
        placeholderTextColor='#97a1ac'
        {...props}
      />
      {error && <Text className="mt-1 text-red-500">{error}</Text>}
    </View>
  );
};

export default FormInput;
