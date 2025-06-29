import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Linking } from 'react-native';
import { apiGet, apiPost } from 'lib/api';
import { StoreInfo } from 'lib/interfaces';
import useStoreInfo from '../store/storeinfo';
import { Toast } from 'toastify-react-native';

export function useGetStoreData(merchantSlug: string = 'demo') {
  const updateStoreInfo = useStoreInfo((state) => state.updateStoreInfo);

  return useQuery({
    queryKey: ['storeInfo', merchantSlug],
    queryFn: async () => {
      if (!merchantSlug) throw new Error('Merchant slug is required');
      const response = (await apiGet(`/account/store-website/public/${merchantSlug}/`)) as {
        status: number;
        data: StoreInfo;
      };

      if (response.status === 200) {
        updateStoreInfo(response.data);
        // console.log('Store info fetched successfully:', JSON.stringify(response.data, null, 2));
        return response.data;
      } else {
        console.error('Fetch store info failed.');
        // router.push({ name: 'NotFound' });
      }
    },
  });
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createOrder'],
    mutationFn: async (data: any) => {
      return await apiPost('/inventory/orders/public/', data);
    },
    onSuccess: async (orderData: any) => {
      queryClient.refetchQueries({ queryKey: ['storeInfo'] });

      const accessCode = orderData?.data?.access_code;
      if (accessCode) {
        const paystackUrl = `https://checkout.paystack.com/${accessCode}`;
        const supported = await Linking.canOpenURL(paystackUrl);
        if (supported) {
          Linking.openURL(paystackUrl);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Unable to open Paystack checkout link.',
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'No Access code returned.',
        });
      }
    },
    onError: (err: any) => {
      Toast.show({
        type: 'error',
        text1: err?.response?.data?.message || err?.AxiosError || 'Something went wrong.',
        position: 'top',
      });
    },
  });
};
