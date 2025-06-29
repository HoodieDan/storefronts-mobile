import { StatusBar } from 'expo-status-bar';
import AppContent from 'components/app-content';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastManager from 'toastify-react-native';
import { View } from 'react-native';
import CheckCircle from 'components/icons/check-circle';
import PText from 'components/common/text-utils/ptext';
import AntDesign from '@expo/vector-icons/AntDesign';

import './global.css';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

type ToastTextType =
  | string
  | number
  | bigint
  | boolean
  | ReactElement<unknown, string | JSXElementConstructor<any>>
  | Iterable<ReactNode>
  | ReactPortal
  | Promise<
      | string
      | number
      | bigint
      | boolean
      | ReactPortal
      | ReactElement<unknown, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | null
      | undefined
    >
  | null
  | undefined;

const toastConfig: {
  success: (props: { text1: ToastTextType }) => React.ReactNode;
  error: (props: { text1: ToastTextType }) => React.ReactNode;
  info: (props: { text1: ToastTextType }) => React.ReactNode;
} = {
  success: (props: { text1: ToastTextType }) => (
    <View className="w-full items-center justify-center bg-transparent">
      <View className="w-auto rounded-full border border-platinum bg-white px-3 py-2">
        <View className="flex-row items-center justify-between gap-2">
          <View className="h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-antiFlashWhite">
            <View className="bg-spanish-viridian/30 h-6 w-6 items-center justify-center rounded-full">
              <CheckCircle />
            </View>
          </View>
          <PText className="pe-2 text-center">{props.text1}</PText>
        </View>
      </View>
    </View>
  ),
  error: (props: { text1: ToastTextType }) => (
    <View className="w-full items-center justify-center bg-transparent">
      <View className="w-auto rounded-full border border-platinum bg-white px-3 py-2">
        <View className="flex-row items-center justify-between gap-2">
          <View className="h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-antiFlashWhite">
            <View className="bg-red-500/30 h-6 w-6 items-center justify-center rounded-full">
              <AntDesign name="closecircle" size={20} color="#E53935" />
            </View>
          </View>
          <PText className="pe-2 text-center">{props.text1}</PText>
        </View>
      </View>
    </View>
  ),
  info: (props: { text1: ToastTextType }) => (
    <View className="w-full items-center justify-center bg-transparent">
      <View className="w-auto rounded-full border border-platinum bg-white px-3 py-2">
        <View className="flex-row items-center justify-between gap-2">
          <View className="h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-antiFlashWhite">
            <View className="bg-blue-500/30 h-6 w-6 items-center justify-center rounded-full">
              <AntDesign name="infocirlce" size={20} color="#1E88E5" />
            </View>
          </View>
          <PText className="pe-2 text-center">{props.text1}</PText>
        </View>
      </View>
    </View>
  ),
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      retry: 0,
      staleTime: 60 * 1000,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <AppContent />
      <ToastManager
        config={toastConfig}
        topOffset={50}
        style={{ pointerEvents: 'box-none' }}
        useModal={false}
        animationStyle={'fade'}
        duration={3000}
        position={'top'}
      />
    </QueryClientProvider>
  );
}
