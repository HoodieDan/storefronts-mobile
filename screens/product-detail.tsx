import { SafeAreaView, FlatList, Image, View, Share } from 'react-native';
import useProductStore from 'store/product';
import useCartStore from 'store/cart';
import ProductImagePlaceholder from 'components/common/product-image-placeholder';
import { Product, Sku } from 'lib/interfaces';
import { useState, useRef } from 'react';
import ProductVariantForm from '../components/product-detail/product-variant-form';
import ProductInfo from '../components/product-detail/product-info';
import type { FlatList as FlatListType } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CartButton from 'components/common/cart-button';

const ProductDetail = () => {
  const { filteredProducts } = useProductStore();
  const { isInStock, addToCart } = useCartStore();
  const flatListRef = useRef<FlatListType<Product>>(null);

  const route = useRoute();
  const { productId } = route.params as { productId: number };

  // Ensure products is always an array
  const products = filteredProducts() ?? [];
  const initialIndexRef = useRef(products.findIndex((p) => p.id === productId));

  const [formState, setFormState] = useState<
    Record<
      number | string,
      { variant1: string; variant2: string; variant3: string; quantity: number }
    >
  >({
    default: { variant1: '', variant2: '', variant3: '', quantity: 1 },
  });

  const getInitialValues = (productId: number) => {
    if (!formState[productId]) {
      formState[productId] = {
        variant1: '',
        variant2: '',
        variant3: '',
        quantity: 1,
      };
    }
    return formState[productId];
  };

  const variantNames = (product: Product) => {
    const names = product.variants.split(',').filter(Boolean);
    return names;
  };

  const optionsArray = (option: string) => {
    if (!option) {
      console.warn('optionsArray called with undefined');
      return;
    }
    const options = option.split(',').filter(Boolean);
    return options;
  };

  const price = (product: Product) => {
    getInitialValues(product.id);
    let skuObject: Sku | undefined = undefined;

    if (variantNames(product).length) {
      skuObject = product.sku.find((item) => {
        return (
          item.option1 === formState[product.id].variant1 &&
          item.option2 === formState[product.id].variant2 &&
          item.option3 === formState[product.id].variant3
        );
      });
    }

    return skuObject ? skuObject.price : product.price;
  };

  const stock = (product: Product) => {
    getInitialValues(product.id);
    let skuObject: Sku | undefined = undefined;

    if (variantNames(product).length) {
      skuObject = (product.sku || []).find((item) => {
        return (
          item.option1 === formState[product.id].variant1 &&
          item.option2 === formState[product.id].variant2 &&
          item.option3 === formState[product.id].variant3
        );
      });
    }

    return skuObject ? skuObject.qty : product.total_stock;
  };

  const sku = (product: Product) => {
    getInitialValues(product.id);
    let skuObject: Sku | undefined = undefined;

    if (variantNames(product).length) {
      skuObject = (product.sku || []).find((item) => {
        return (
          item.option1 === formState[product.id].variant1 &&
          item.option2 === formState[product.id].variant2 &&
          item.option3 === formState[product.id].variant3
        );
      });
    } else {
      skuObject = product.sku[0];
    }

    return skuObject?.id;
  };

  const shareUrl = (productId: number) => {
    const baseUrl = `https://shop.leyyow.com/demo/store/product#${productId}`;

    Share.share({
      title: 'Check out this product',
      message: `Check out this product: ${baseUrl}`,
      url: baseUrl,
    })
      .then((result) => {
        if (result.action === Share.sharedAction) {
          console.log('Successfully shared');
        }
      })
      .catch((error) => console.error('Error sharing', error));
  };

  const isVariantSelectionComplete = (product: Product) => {
    const variants = variantNames(product);
    const form = formState[product.id] || {};
    if (variants.length === 0) return true;
    if (variants.length === 1) return !!form.variant1;
    if (variants.length === 2) return !!form.variant1 && !!form.variant2;
    if (variants.length === 3) return !!form.variant1 && !!form.variant2 && !!form.variant3;
    return false;
  };

  const onFormSubmit = (product: Product, variantPrice: number, stockLeft: number, sku: number) => {
    if (stockLeft === 0) {
      console.log('Item is not available in stock');
      return;
    } else if (isInStock(product, formState[product.id])) {
      console.log('Item added to cart', formState[product.id], variantPrice, stockLeft, sku);
      addToCart(product, formState[product.id], variantPrice, stockLeft, sku);
    } else {
      console.log('All available stock are in your cart');
    }
  };

  // Define getItemLayout using fixed heights
  const getItemLayout = (
    data: ArrayLike<Product> | null | undefined,
    index: number
  ): { length: number; offset: number; index: number } => {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      const item = data?.[i];
      offset +=
        item && typeof item.variants === 'string' && item.variants.trim() === '' ? 570 : 650;
    }
    const item = data?.[index];
    const length =
      item && typeof item.variants === 'string' && item.variants.trim() === '' ? 570 : 650;
    return { length, offset, index };
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <FlatList
        ref={flatListRef}
        data={products}
        keyExtractor={(product) => product.id.toString()}
        initialScrollIndex={initialIndexRef.current}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={({ index }) => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index, animated: false });
          }, 500);
        }}
        renderItem={({ item: product }) => (
          <View
            className="p-4"
            style={{
              height:
                typeof product.variants === 'string' && product.variants.trim() === '' ? 570 : 650,
            }}
            key={product.id}>
            <View className="h-96">
              {product.images?.length ? (
                <Image
                  source={{ uri: product.images[0].image }}
                  className="h-full w-full rounded-md"
                  resizeMode="cover"
                />
              ) : (
                <ProductImagePlaceholder />
              )}
            </View>

            {/* Product Info and Variant Form */}
            <ProductInfo
              filteredProduct={product}
              price={price(product)}
              hasVariants={variantNames(product).length > 0}
              stockLeft={stock(product)}
              showStock={isVariantSelectionComplete(product)}
              onShareClicked={() => shareUrl(product.id)}
            />

            <ProductVariantForm
              filteredProduct={product}
              getInitialValues={getInitialValues}
              setFormState={setFormState}
              variantNames={variantNames}
              optionsArray={optionsArray}
              price={price}
              stock={stock}
              sku={sku}
              onFormSubmit={onFormSubmit}
              disabled={isVariantSelectionComplete(product) && stock(product) === 0}
            />
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      <View
        className="h-15 flex items-center p-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
          backgroundColor: '#fff',
        }}>
        <View className="w-full flex-row items-center justify-end">
          <CartButton
            totalProducts={useCartStore((state) =>
              state.cart.reduce((sum, item) => sum + item.selected_quantity, 0)
            )}
            style={{ height: 47, width: 47 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
