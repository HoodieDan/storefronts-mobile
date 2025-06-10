import clsx from 'clsx';
import { View, TouchableOpacity } from 'react-native';
import H6Text from './text-utils/h6text';
import PText from './text-utils/ptext';
import CheckCircle from 'components/icons/check-circle';
import type { ReactNode } from 'react';

interface RadioButtonProps {
  label: string | ReactNode;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  desciption?: string;
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
  desciption = '',
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
          desciption === '' && 'px-2 py-2'
        )}>
        {/* 🔥 Accepts string or JSX for label */}
        <H6Text className="font-bold">{typeof label === 'string' ? label : label}</H6Text>

        <View className="h-5 w-5 items-center justify-center rounded-full">
          {!selected && <View className="h-full w-full rounded-full bg-crayola" />}
          {selected && <CheckCircle />}
        </View>
      </View>

      {desciption !== '' && (
        <View className="mt-2">
          <PText className="text-manatee">{desciption}</PText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RadioButton;
