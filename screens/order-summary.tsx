import { useMemo } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SummaryItem from '../components/order-summary/summary-item';
import ShippingSummary from '../components/order-summary/shipping-summary';
import ShippingMethod from '../components/order-summary/shipping-method';
import SummaryTotal from '../components/order-summary/summary-total';
import H5Text from '../components/common/text-utils/h5text';
import AppButton from '../components/common/app-button';
import useOrderStore from '../store/order';
import useCartStore from '../store/cart';
import useStoreInfo from '../store/storeinfo';
import { generateOrderRef, variantNames } from '../utils/order-helpers';
import type { StoreInfo } from '../lib/interfaces';
import { useCreateOrder } from '../hooks/useApiCalls';

const OrderSummaryScreen = () => {
  const navigation = useNavigation() as any;

  const { shippingDetails, deliveryFee } = useOrderStore();
  const { cart, cartLength, cartTotal } = useCartStore();
  const { storeInfo } = useStoreInfo();
  const { mutate: createOrder, isPending } = useCreateOrder();

  const totalAmount = useMemo(() => {
    return shippingDetails.shippingMethod === 'delivery' ? deliveryFee() + cartTotal() : cartTotal();
  }, [deliveryFee, cartTotal, shippingDetails.shippingMethod]);

  const totalProducts = useMemo(
    () => cart.reduce((sum, item) => sum + item.selected_quantity, 0),
    [cart]
  );

  const orderRef = useMemo(
    () => generateOrderRef((storeInfo as StoreInfo)?.store ?? '', cart),
    [cart, storeInfo]
  );

  const orderDate = new Date().toISOString().split('T')[0];

  const uniqueProductCount = () => {
    const uniqueIds = new Set(cart.map((item) => item.id));
    return uniqueIds.size;
  };

  const payloadItems = cart.map((item, i) => {
    const variants = variantNames(item);
    const payloadItem = {
      has_feedback: false,
      index: i,
      lead_time: 5,
      note: '',
      product: item.id,
      productid: item.id,
      sku: item.selected_sku,
      qty: item.selected_quantity,
      price_sold: item.variant_price || item.price,
      status: 1,
      sub_total: item.itemTotal,
      selected_position: i + 1,
      is_returned: false,
    };
    variants.forEach((variantName: any, index: number) => {
      payloadItem[`var${index + 1}name`] = variantName;
      payloadItem[`selected_option${index + 1}`] = item[`selected_variant${index + 1}`];
    });
    return payloadItem;
  });

  const handleCheckout = () => {
    const payload = {
      channel: 3,
      customer_info: {
        address: shippingDetails.address,
        email: shippingDetails.email,
        first_name: shippingDetails.firstName,
        last_name: shippingDetails.lastName,
        line1: shippingDetails.address,
        phone: shippingDetails.phoneNumber,
        city: shippingDetails.location,
      },
      fulfilled: 0,
      has_customer: false,
      items_count: cartLength,
      order_ref: orderRef,
      order_date: orderDate,
      paid_amount: 0,
      payment_mode: 1,
      payment_status: 0,
      products_total: cartTotal,
      shipping_price: shippingDetails.shippingMethod === 'delivery' ? deliveryFee() * 100 : 0,
      shipping_company: 0,
      shipping_mode: false,
      shipping_paid: false,
      store: (storeInfo as StoreInfo).store,
      total_amount:
        shippingDetails.shippingMethod === 'delivery'
          ? deliveryFee() * 100 + cartTotal()
          : cartTotal,
      unique_items: uniqueProductCount(),
      items: [...payloadItems],
      redirect_url: `hppts://shop.leyyow.com/${'demo'}/store/order-successful/${orderRef}`,
    };

    createOrder(payload);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-16 flex-row items-center justify-between px-4">
        <H5Text className="font-normal">Order Summary</H5Text>
        <AppButton
          buttonText="Edit All"
          className="bg-transparent"
          textClass="text-black underline text-xs"
          onPress={() => navigation.navigate('Cart')}
        />
      </View>

      <ScrollView className="flex-1 px-4 pb-4 pt-2">
        {cart.map((item) => (
          <SummaryItem key={item.id} item={item} />
        ))}

        <ShippingSummary shippingDetails={shippingDetails} />
        <ShippingMethod shippingDetails={shippingDetails} storeInfo={storeInfo as StoreInfo} />
      </ScrollView>

      <SummaryTotal
        totalProducts={totalProducts}
        cartTotal={cartTotal()}
        deliveryFee={deliveryFee()}
        totalAmount={totalAmount.toLocaleString()}
        shippingDetails={shippingDetails}
        isPending={isPending}
        onCheckout={handleCheckout}
      />
    </SafeAreaView>
  );
};

export default OrderSummaryScreen;
