import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  SafeAreaView,
  View,
} from 'react-native';
import AppButton from '../components/common/app-button';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInputField from '../components/common/text-input';
import RadioButton from '../components/common/radio-button';
import H1Text from 'components/common/text-utils/h1text';
import H6Text from 'components/common/text-utils/h6text';
import H5Text from 'components/common/text-utils/h5text';
import useOrderStore from 'store/order';
import useStoreInfo from 'store/storeinfo';
import { StoreInfo } from 'lib/interfaces';
import { formatNaira } from 'utils/format-naira';

const schema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string(),
  email: Yup.string().required('Email Address is required'),
  phoneNumber: Yup.string()
    .required('Phone Number is required')
    .matches(/^\d{11}$/, 'Must be 11 digits'),
  shippingMethod: Yup.string().required('Please select a shipping method'),
  location: Yup.string().when('shippingMethod', {
    is: 'delivery',
    then: (schema) => schema.required('Delivery location is required'),
    otherwise: (schema) => schema,
  }),
  address: Yup.string().when('shippingMethod', {
    is: 'delivery',
    then: (schema) => schema.required('Address is required'),
    otherwise: (schema) => schema,
  }),
});

const ShippingForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const updateShippingDetails = useOrderStore((state) => state.updateShippingDetails);
  const storeInfo = useStoreInfo((state) => state.storeInfo) as StoreInfo | undefined;

  const onSubmit = (data: any) => {
    Alert.alert('Shipping Info', JSON.stringify(data, null, 2));
    updateShippingDetails(data);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-white">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
            <View className="mt-4 flex-1 justify-between">
              <View className="space-y-4">
                <H1Text className="mb-2">Shipping Detail</H1Text>
                <H6Text className="mb-10 text-manatee">kindly input your information</H6Text>
                <View className="w-full flex-row gap-4 mb-4">
                  <Controller
                    control={control}
                    name="firstName"
                    render={({ field: { onChange, value } }) => (
                      <TextInputField
                        label="First Name"
                        value={value}
                        onChangeText={onChange}
                        error={errors.firstName?.message}
                        className="flex-1"
                        placeholder="Daniel"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field: { onChange, value } }) => (
                      <TextInputField
                        label="Last Name"
                        value={value}
                        onChangeText={onChange}
                        error={errors.lastName?.message}
                        className="flex-1"
                        placeholder="Obode"
                      />
                    )}
                  />
                </View>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <TextInputField
                      label="Email Address"
                      value={value}
                      onChangeText={onChange}
                      error={errors.email?.message}
                      placeholder="example@gmail.com"
                      className="mb-4"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, value } }) => (
                    <TextInputField
                      label="Phone Number"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      error={errors.phoneNumber?.message}
                      placeholder="090312345678"
                      className="mb-4"
                    />
                  )}
                />

                <H5Text className="my-3">Shipping Method</H5Text>
                <Controller
                  control={control}
                  name="shippingMethod"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <View className="flex-row gap-4">
                        <RadioButton
                          label="Delivery"
                          desciption="Delivered to your door, hassle free"
                          value="delivery"
                          selected={value === 'delivery'}
                          onSelect={onChange}
                          className="rounded-md"
                        />
                        <RadioButton
                          label="Pickup"
                          desciption="Pick up your order at your convenience"
                          value="pickup"
                          selected={value === 'pickup'}
                          onSelect={onChange}
                          className="rounded-md"
                        />
                      </View>
                      {value === 'pickup' && (
                        <H6Text className="mt-2">
                          <H6Text className="font-bold">Pickup at:</H6Text>{' '}
                          {storeInfo && 'address' in storeInfo ? storeInfo.address : 'N/A'}
                        </H6Text>
                      )}
                      {value === 'delivery' && (
                        <>
                          <Controller
                            control={control}
                            name="location"
                            rules={{ required: 'Please select a delivery option' }}
                            render={({
                              field: { onChange: onDeliveryChange, value: deliveryValue },
                            }) => (
                              <View className="mt-4">
                                {Array.isArray(storeInfo?.shipping_prices) &&
                                  storeInfo.shipping_prices.map(
                                    (location: { area: string; amount: string }, index: number) => (
                                      <RadioButton
                                        key={location.area}
                                        label={
                                          <View className="flex-row items-center">
                                            <H6Text className="font-bold">
                                              {location.area} -{' '}
                                            </H6Text>
                                            {formatNaira(+location.amount)}
                                          </View>
                                        }
                                        value={location.area}
                                        selected={deliveryValue === location.area}
                                        onSelect={onDeliveryChange}
                                        showDemarcation={true}
                                        isFirst={index === 0}
                                        isLast={index === storeInfo.shipping_prices.length - 1}
                                      />
                                    )
                                  )}
                              </View>
                            )}
                          />
                          <Controller
                            control={control}
                            name="address"
                            render={({ field: { onChange, value } }) => (
                              <TextInputField
                                label="Delivery Address"
                                value={value}
                                onChangeText={onChange}
                                error={errors.address?.message}
                                placeholder="Enter your delivery address"
                                className="mt-4"
                              />
                            )}
                          />
                        </>
                      )}
                    </>
                  )}
                />
              </View>
              <View className="mt-4">
                <AppButton
                  buttonText="Proceed to Checkout"
                  onPress={handleSubmit(onSubmit)}
                  className="rounded-md bg-black py-4"
                  textClass="text-white text-lg font-semibold"
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ShippingForm;
