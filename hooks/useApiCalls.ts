import { useQuery } from '@tanstack/react-query';
import { apiGet } from 'lib/api';
import { StoreInfo } from 'lib/interfaces';

export function useGetStoreData(merchantSlug: string = 'demo') {
  return useQuery({
    queryKey: ['storeInfo', merchantSlug],
    queryFn: async () => {
      sessionStorage.clear();
      if (!merchantSlug) throw new Error('Merchant slug is required');
      const response = (await apiGet(`/account/store-website/public/${merchantSlug}/`)) as {
        status: number;
        data: StoreInfo;
      };

      if (response.status === 200) {
        // updateStoreInfo(response.data);
        console.log('Store info fetched successfully:', response.data);
        return response.data;
      } else {
        console.error('Fetch store info failed.');
        // router.push({ name: 'NotFound' });
      }
    },
  });
}
