import { View, SafeAreaView, FlatList } from "react-native";
import H1Text from "../components/common/text-utils/h1text";
import H4Text from "components/common/text-utils/h4text";
import useProductStore from "store/product";
import ProductCard from "components/store-home/product-card";
import { useEffect } from "react";

function StoreHome() {
  const { filteredProducts, syncWithStoreInfo } = useProductStore()
  console.log(JSON.stringify(filteredProducts(), null, 2));
  
  useEffect(() => {
    syncWithStoreInfo();
  }, [syncWithStoreInfo]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <H4Text>Logo</H4Text>
      </View>
      <View className="flex-1 p-4">
        <H1Text className="my-3">Shop</H1Text>

        <FlatList
          data={filteredProducts()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={3}
          key={'flatlist-numColumns-3'}
          columnWrapperStyle={{ gap: 4, justifyContent: 'space-between' }}
          contentContainerStyle={{ gap: 4 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

export default StoreHome;