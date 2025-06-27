import React from 'react';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const TrashIcon = (props: { width?: number; height?: number }) => {
  const { width = 20, height = 20 } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none">
      <Path
        d="M17.5574 4.35817C16.2157 4.22484 14.8741 4.12484 13.5241 4.04984V4.0415L13.3407 2.95817C13.2157 2.1915 13.0324 1.0415 11.0824 1.0415H8.89907C6.95741 1.0415 6.77407 2.1415 6.64074 2.94984L6.46574 4.0165C5.69074 4.0665 4.91574 4.1165 4.14074 4.1915L2.44074 4.35817C2.09074 4.3915 1.84074 4.69984 1.87407 5.0415C1.90741 5.38317 2.20741 5.63317 2.55741 5.59984L4.25741 5.43317C8.62407 4.99984 13.0241 5.1665 17.4407 5.60817C17.4657 5.60817 17.4824 5.60817 17.5074 5.60817C17.8241 5.60817 18.0991 5.3665 18.1324 5.0415C18.1574 4.69984 17.9074 4.3915 17.5574 4.35817Z"
        fill="url(#paint0_linear)"
      />
      <Path
        opacity="0.3991"
        d="M16.0245 6.7835C15.8245 6.57516 15.5495 6.4585 15.2661 6.4585H4.7328C4.44947 6.4585 4.16613 6.57516 3.97447 6.7835C3.7828 6.99183 3.67447 7.27516 3.69113 7.56683L4.2078 16.1168C4.29947 17.3835 4.41613 18.9668 7.32447 18.9668H12.6745C15.5828 18.9668 15.6995 17.3918 15.7911 16.1168L16.3078 7.57516C16.3245 7.27516 16.2161 6.99183 16.0245 6.7835Z"
        fill="url(#paint1_linear)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.98242 14.1665C7.98242 13.8213 8.26224 13.5415 8.60742 13.5415H11.3824C11.7276 13.5415 12.0074 13.8213 12.0074 14.1665C12.0074 14.5117 11.7276 14.7915 11.3824 14.7915H8.60742C8.26224 14.7915 7.98242 14.5117 7.98242 14.1665Z"
        fill="url(#paint2_linear)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.29102 10.8335C7.29102 10.4883 7.57084 10.2085 7.91602 10.2085H12.0827C12.4279 10.2085 12.7077 10.4883 12.7077 10.8335C12.7077 11.1787 12.4279 11.4585 12.0827 11.4585H7.91602C7.57084 11.4585 7.29102 11.1787 7.29102 10.8335Z"
        fill="url(#paint3_linear)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1="10.0026"
          y1="1.0415"
          x2="10.0026"
          y2="5.60817"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#EA291E" />
          <Stop offset="1" stopColor="#CD1C13" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear"
          x1="9.99947"
          y1="6.4585"
          x2="9.99947"
          y2="18.9668"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#EA291E" />
          <Stop offset="1" stopColor="#CD1C13" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear"
          x1="9.99492"
          y1="13.5415"
          x2="9.99492"
          y2="14.7915"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#EA291E" />
          <Stop offset="1" stopColor="#CD1C13" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear"
          x1="9.99935"
          y1="10.2085"
          x2="9.99935"
          y2="11.4585"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#EA291E" />
          <Stop offset="1" stopColor="#CD1C13" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default TrashIcon;
