import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  LayoutChangeEvent,
  Dimensions,
} from 'react-native';
import clsx from 'clsx';
import PText from './text-utils/ptext';
import { responsiveFont } from './responsive-text';
import { Ionicons } from '@expo/vector-icons';

type Option = {
  label: string;
  value: string;
};

type SelectInputProps = {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  error?: string;
  placeholder?: string;
  className?: string;
};

const SelectInput = ({
  label,
  value,
  onValueChange,
  options = [],
  error = '',
  placeholder = 'Select an option',
  className = '',
}: SelectInputProps) => {
  const [open, setOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(Dimensions.get('window').width);
  const fontSize = responsiveFont(16);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || '';

  const handleLayout = (event: LayoutChangeEvent) => {
    const { y, x, height, width } = event.nativeEvent.layout;
    setDropdownTop(y + height);
    setDropdownLeft(x);
    setDropdownWidth(width);
  };

  return (
    <View className={clsx('relative mb-4', className)}>
      {label ? <PText className="mb-1">{label}</PText> : null}

      <TouchableOpacity
        onPress={() => setOpen((prev) => !prev)}
        onLayout={handleLayout}
        activeOpacity={0.9}
        className="w-full flex-row items-center justify-between rounded-md border bg-antiFlashWhite px-3 py-4"
        style={{
          borderColor: error ? '#ef4444' : 'transparent',
        }}>
        <Text
          style={{
            fontSize,
            color: value ? '#000' : '#97a1ac',
          }}>
          {selectedLabel || placeholder}
        </Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color="#333" />
      </TouchableOpacity>

      {error ? <Text className="mt-1 text-red-500">{error}</Text> : null}

      {open && (
        <>
          {/* Outside backdrop layer */}
          <Pressable
            onPress={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
              zIndex: 40,
              backgroundColor: 'transparent',
            }}
          />

          {/* Dropdown menu */}
          <View
            style={{
              position: 'absolute',
              top: dropdownTop + 4,
              left: dropdownLeft,
              width: dropdownWidth,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              zIndex: 50,
              maxHeight: 200,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 5,
            }}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              nestedScrollEnabled
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onValueChange(item.value);
                    setOpen(false);
                  }}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    backgroundColor: item.value === value ? '#f3f4f6' : '#fff',
                  }}>
                  <Text
                    style={{
                      fontSize,
                      color: item.value === value ? '#1f2937' : '#4b5563',
                      fontWeight: item.value === value ? '600' : 'normal',
                    }}>
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default SelectInput;
