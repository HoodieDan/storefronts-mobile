import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TrashIcon from '../icons/trash-icon';
import { Ionicons } from '@expo/vector-icons';
import ProductImagePlaceholder from '../common/product-image-placeholder';
import TextInput from '../common/text-input';
import useCartStore from '../../store/cart';
import PText from 'components/common/text-utils/ptext';
import AppButton from '../common/app-button';
import H6Text from 'components/common/text-utils/h6text';
import { formatNaira } from 'utils/format-naira';

const schema = Yup.object().shape({
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .integer('Quantity must be an integer')
    .positive('Enter a valid quantity')
    .required('Quantity is required'),
});

const CartItemCard = ({ item }) => {
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    increaseSelectionQuantity,
    decreaseSelectionQuantity,
    updateSelectionQuantity,
    removeSelection,
  } = useCartStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { quantity: item.selected_quantity },
    resolver: yupResolver(schema),
  });

  const onFormSubmit = ({ quantity }) => {
    if (quantity > item.variant_total_stock) {
      return;
    }
    updateSelectionQuantity(item, quantity);
    setShowQuantityModal(false);
  };

  return (
    <View className="mb-5 flex-row gap-2">
      <View className="h-24 w-24 rounded-sm bg-gray-200">
        {item.images?.length ? (
          <Image source={{ uri: item.images[0].image }} className="h-full w-full rounded-md" />
        ) : (
          <ProductImagePlaceholder />
        )}
      </View>

      <View className="flex-1 justify-between">
        <View className="flex-row justify-between">
          <View className="w-2/3">
            <PText className="font-medium">{item.product_name}</PText>
            <PText className="text-gray-500">
              {[item.selected_variant1, item.selected_variant2, item.selected_variant3]
                .filter(Boolean)
                .join(', ')}
            </PText>
          </View>
          <View className="w-1/3 items-end">
            <PText className="font-bold">
              {formatNaira(item.variant_price * item.selected_quantity)}
            </PText>
          </View>
        </View>

        <View className="mt-2 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => decreaseSelectionQuantity(item)}
              className="h-6 w-6 items-center justify-center rounded-sm bg-gray-300">
              <Ionicons name="remove-outline" size={16} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowQuantityModal(true)}
              className="rounded-sm bg-antiFlashWhite px-3 py-2">
              <Text>{item.selected_quantity}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => increaseSelectionQuantity(item)}
              className="h-6 w-6 items-center justify-center rounded-sm bg-gray-300">
              <Ionicons name="add-outline" size={16} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
            <TrashIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quantity Modal */}
      <Modal visible={showQuantityModal} transparent animationType="slide">
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-11/12 rounded-lg bg-white p-4">
            <H6Text className="mb-3 text-lg font-semibold">Enter Quantity</H6Text>
            <PText className="mb-2">In Stock: {item.variant_total_stock}</PText>

            <Controller
              control={control}
              name="quantity"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  keyboardType="numeric"
                  value={String(value)}
                  onChangeText={(text) => onChange(Number(text))}
                  error={
                    typeof errors.quantity === 'object' &&
                    errors.quantity !== null &&
                    'message' in errors.quantity
                      ? (errors.quantity.message as string)
                      : undefined
                  }
                />
              )}
            />

            <View className="mt-4 w-full flex-row justify-end gap-2">
              <AppButton
                onPress={() => setShowQuantityModal(false)}
                className="flex-1 rounded-md bg-gray-200 px-4 py-2"
                buttonText="Cancel"
                textClass="text-black"
              />
              <AppButton
                onPress={handleSubmit(onFormSubmit)}
                className="flex-1 rounded-md bg-black px-4 py-2"
                buttonText="Submit"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Modal */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-10/12 rounded-lg bg-white p-4">
            <H6Text className="mb-4 text-lg font-semibold">Confirm Removal</H6Text>
            <PText className='mb-2'>Are you sure you want to remove this item from your cart?</PText>

            <View className="mt-4 w-full flex-row justify-end gap-2">
              <AppButton
                onPress={() => setShowDeleteModal(false)}
                className="flex-1 rounded-md bg-gray-200 px-4 py-2"
                buttonText="Cancel"
                textClass="text-black"
              />
              <AppButton
                onPress={() => {
                  removeSelection(item);
                  setShowDeleteModal(false);
                }}
                className="flex-1 rounded-md bg-red-600 px-4 py-2"
                buttonText="Remove"
                textClass="text-white"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CartItemCard;
