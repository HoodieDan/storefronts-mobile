import clsx from 'clsx';
import { View, TouchableOpacity } from 'react-native';
import H6Text from './text-utils/h6text';
import PText from './text-utils/ptext';
import CheckCircle from 'components/icons/check-circle';

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
}) => {
  const roundedClass = clsx({
    'rounded-t-md': isFirst,
    'rounded-b-md': isLast,
  });

  return (
    <TouchableOpacity
      onPress={() => onSelect(value)}
      className={clsx(
        'bg-antiFlashWhite flex-1 p-3',
        showDemarcation && 'border-platinum border-b',
        roundedClass,
        className
      )}>
      <View
        className={clsx(
          'w-full flex-row items-center justify-between',
          desciption === '' && 'px-2 py-2'
        )}>
        <H6Text className="font-bold">{label}</H6Text>
        <View className="h-5 w-5 items-center justify-center rounded-full">
          {!selected && <View className="bg-crayola h-full w-full rounded-full" />}
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
