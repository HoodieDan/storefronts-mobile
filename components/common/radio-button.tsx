import clsx from 'clsx';
import { View, TouchableOpacity, Text } from 'react-native';
import PText from './text-utils/ptext';
import CheckCircle from 'components/icons/check-circle';
import type { ReactNode } from 'react';

interface RadioButtonProps {
  label: string | ReactNode;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  description?: string;
  className?: string;
  showDemarcation?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

const RadioButton = ({
  label,
  value,
  selected,
  onSelect,
  description = '',
  className = '',
  showDemarcation = false,
  isFirst = false,
  isLast = false,
}: RadioButtonProps) => {
  const roundedClass = clsx({
    'rounded-t-md': isFirst,
    'rounded-b-md': isLast,
  });

  return (
    <TouchableOpacity
      onPress={() => onSelect(value)}
      className={clsx(
        'flex-1 bg-antiFlashWhite p-3',
        showDemarcation && 'border-b border-platinum',
        roundedClass,
        className
      )}>
      <View
        className={clsx(
          'w-full flex-row items-center justify-between',
          description === '' && 'px-2 py-2'
        )}>
        {/* 🔥 Accepts string or JSX for label */}
        <PText className="font-bold">{typeof label === 'string' ? label : label}</PText>

        <View className="h-5 w-5 items-center justify-center rounded-full">
          {!selected && <View className="h-full w-full rounded-full bg-crayola" />}
          {selected && <CheckCircle />}
        </View>
      </View>

      {description !== '' && (
        <View className="mt-2">
          <Text className="text-manatee">{description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RadioButton;
