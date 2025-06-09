import { Text, SafeAreaView } from "react-native";
import H1Text from "../components/common/text-utils/h1text";

function StoreHome() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Hello, Expo with Tailwind CSS!</Text>
      <Text className="text-lg text-gray-700">This is a simple setup type shee.</Text>
      <H1Text>Hello</H1Text>
    </SafeAreaView>
  );
}

export default StoreHome;