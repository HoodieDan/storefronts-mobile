import { View, Text, TextInput } from 'react-native';
import clsx from 'clsx';
import PText from './text-utils/ptext';
import { responsiveFont } from './responsive-text';

import React from 'react';

type TextInputFieldProps = {
  label?: string;
  error?: string;
  className?: string;
  icon?: React.ReactElement<{ width: number; height: number }> | null;
  [key: string]: any;
};

const TextInputField = ({
  label = '',
  error = '',
  className = '',
  icon = null,
  ...props
}: TextInputFieldProps) => {
  const fontSize = responsiveFont(16);
  const lineHeight = fontSize * 1.2;
  const iconSize = fontSize * 1.5; // Icon size relative to input

  return (
    <View className={clsx('mb-4', className)}>
      {label ? <PText className="mb-1">{label}</PText> : null}
      <View
        className="w-full flex-row items-center rounded-md border bg-antiFlashWhite px-3 py-4"
        style={{
          borderColor: error ? '#ef4444' : 'transparent',
        }}>
        {icon ? (
          <View
            style={{
              width: iconSize,
              height: iconSize,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 8,
            }}>
            {React.cloneElement(icon, { width: iconSize, height: iconSize })}
          </View>
        ) : null}
        <TextInput
          className=""
          style={{ flex: 1, fontSize, lineHeight }}
          placeholderTextColor="#97a1ac"
          {...props}
        />
      </View>
      {error ? <Text className="mt-1 text-red-500">{error}</Text> : null}
    </View>
  );
};

export default TextInputField;
