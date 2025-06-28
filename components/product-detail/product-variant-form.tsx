import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import SelectInput from '../../components/common/select-input'; // You'll need to create this
import AppButton from '../../components/common/app-button';
import useCartStore from '../../store/cart';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const VariantForm = ({
  filteredProduct,
  getInitialValues,
  setFormState,
  variantNames,
  optionsArray,
  price,
  stock,
  sku,
  onFormSubmit,
  disabled,
}) => {
  const cartStore = useCartStore();

  const schema = Yup.object().shape(
    Object.fromEntries(
      variantNames(filteredProduct).map((name) => [
        name,
        Yup.string().required(`${name} is required`),
      ])
    )
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: getInitialValues(filteredProduct.id),
    mode: 'onChange',
  });

  const productVariants = variantNames(filteredProduct);

  const handleAddToCart = () => {
    onFormSubmit(
      filteredProduct,
      price(filteredProduct),
      stock(filteredProduct),
      sku(filteredProduct)
    );
  };

  return (
    <View className="w-full py-4">
      <View className="flex w-full flex-row flex-wrap gap-2">
        {productVariants.slice(0, 2).map((variant, index) => {
          const widthClass =
            productVariants.length === 1
              ? 'w-full'
              : 'w-[48%]';

          return (
            <View key={index} className={`flex flex-col gap-1 ${widthClass}`}>
              <Text className="mb-1">{variant}</Text>
              <Controller
                control={control}
                name={variant}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    value={value}
                    onValueChange={(selected) => {
                      // Update react-hook-form value
                      onChange(selected);

                      // ✅ Sync to parent formState
                      setFormState((prev) => ({
                        ...prev,
                        [filteredProduct.id]: {
                          ...getInitialValues(filteredProduct.id),
                          [`variant${index + 1}`]: selected,
                        },
                      }));
                    }}
                    options={optionsArray(filteredProduct[`options${index + 1}`]).map((option) => ({
                      label: option,
                      value: option,
                    }))}
                    placeholder={variant}
                    error={
                      typeof errors[variant]?.message === 'string'
                        ? errors[variant]?.message
                        : undefined
                    }
                  />
                )}
              />
            </View>
          );
        })}
      </View>

      <View className="mt-4">
        <AppButton
          onPress={handleSubmit(handleAddToCart)}
          disabled={disabled}
          className="rounded-md bg-black py-4"
          textClass="text-white text-lg font-semibold"
          buttonText=
          {disabled
            ? 'Out of Stock'
            : cartStore.getCartItemQuantity(filteredProduct)
              ? `${cartStore.getCartItemQuantity(filteredProduct)} in Basket 🛒`
              : 'Add to Basket 🛒'}
        />
      </View>
    </View>
  );
};

export default VariantForm;
