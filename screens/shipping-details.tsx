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
import H1Text from 'components/common/text-utils/h1text';
import H6Text from 'components/common/text-utils/h6text';

const schema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string(),
  email: Yup.string().required('Email Address is required'),
  phoneNumber: Yup.string()
    .required('Phone Number is required')
    .matches(/^\d{11}$/, 'Must be 11 digits'),
});

const ShippingForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    Alert.alert('Shipping Info', JSON.stringify(data, null, 2));
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
                <H1Text className='mb-2'>Shipping Detail</H1Text>
                <H6Text className='mb-10 text-manatee'>kindly input your information</H6Text>
                <View className="w-full flex-row gap-4">
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
                    />
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
