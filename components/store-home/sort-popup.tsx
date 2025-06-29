import { Pressable, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SelectInput from '../common/select-input';
import AppButton from '../common/app-button';
import PText from '../common/text-utils/ptext';
import CheckCircle from '../icons/check-circle';
import useProductStore from 'store/product';
import AntDesign from '@expo/vector-icons/AntDesign';
import H6Text from 'components/common/text-utils/h6text';

const sortOptions = [
  { label: 'Lowest - Highest Price', value: 'asc' },
  { label: 'Highest - Lowest Price', value: 'desc' },
];

const schema = yup.object({
  order: yup
    .string()
    .oneOf(['asc', 'desc', 'def'], 'Please select a valid order')
    .required('Please select a valid order'),
});

type SortFormValues = {
  order: 'asc' | 'desc' | 'def';
};

const SortPopup = ({ onClose }: { onClose: () => void }) => {
  const { selectSortOrder, resetSort, sortOrder } = useProductStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SortFormValues>({
    defaultValues: { order: sortOrder },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SortFormValues) => {
    selectSortOrder(data.order);
    onClose();
  };

  const handleReset = () => {
    resetSort();
    onClose();
  };

  return (
    <View className="w-full rounded-lg bg-white px-4 py-5">
      <View className="mb-4 w-full flex-row justify-between items-center">
        <H6Text>Sorting by</H6Text>
        <Pressable onPress={onClose}>
          <AntDesign name="close" size={20} color="black" />
        </Pressable>
      </View>
      <View className="mb-4 flex-row items-center justify-between rounded-md bg-antiFlashWhite px-3 py-4">
        <PText>Price</PText>
        <CheckCircle />
      </View>

      <PText className="mb-2">Sorting Direction</PText>

      <Controller
        control={control}
        name="order"
        render={({ field: { value, onChange } }) => (
          <SelectInput
            value={value}
            onValueChange={onChange}
            options={sortOptions}
            error={errors.order?.message}
            placeholder="Select sorting order"
          />
        )}
      />

      <View className="mt-4 flex-row gap-3">
        <AppButton
          onPress={handleReset}
          className="w-1/3 rounded-md bg-antiFlashWhite py-3"
          textClass="text-black"
          buttonText="Reset"
        />
        <AppButton
          onPress={handleSubmit(onSubmit)}
          className="flex-1 rounded-md bg-black py-3"
          textClass="text-white"
          buttonText="Apply"
        />
      </View>
    </View>
  );
};

export default SortPopup;
