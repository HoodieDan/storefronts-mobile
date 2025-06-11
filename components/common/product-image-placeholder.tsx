import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ProductImagePlaceholder = () => {
  return (
    <View className="bg-spanishViridian/10 flex h-full w-full items-center justify-center rounded-sm">
      <Svg
        width="33%" // w-1/3
        height="auto"
        viewBox="0 0 24 24"
        fill="none"
        style={{ aspectRatio: 1 }}>
        <Path
          fill="#008060"
          d="M20.23 7.24L12 12L3.77 7.24a2 2 0 0 1 .7-.71L11 2.76c.62-.35 1.38-.35 2 0l6.53 3.77c.29.173.531.418.7.71"
          opacity="0.25"
        />
        <Path
          fill="#008060"
          d="M12 12v9.5a2.1 2.1 0 0 1-.91-.21L4.5 17.48a2 2 0 0 1-1-1.73v-7.5a2.06 2.06 0 0 1 .27-1.01z"
          opacity="0.5"
        />
        <Path
          fill="#008060"
          d="M20.5 8.25v7.5a2 2 0 0 1-1 1.73l-6.62 3.82c-.275.13-.576.198-.88.2V12l8.23-4.76c.175.308.268.656.27 1.01"
        />
      </Svg>
    </View>
  );
};

export default ProductImagePlaceholder;
