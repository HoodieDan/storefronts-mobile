import { useState } from 'react';
import { Modal, StyleProp, ViewStyle, TouchableOpacity, View } from 'react-native';
import SortIcon from '../icons/sort-icon';
import SortPopup from './sort-popup';
import clsx from 'clsx';

type SortButtonProps = {
  style?: StyleProp<ViewStyle>;
  className?: string;
};

const SortButton = ({ style, className }: SortButtonProps) => {
  const [sortIsOpen, setSortIsOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setSortIsOpen(true)}
        style={style}
        className={clsx('items-center justify-center rounded-md bg-antiFlashWhite p-0', className)}
        activeOpacity={0.7}>
        <SortIcon />
      </TouchableOpacity>

      <Modal
        visible={sortIsOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setSortIsOpen(false)}>
        <View className="flex-1 items-center justify-center bg-black/40 px-4">
          <SortPopup onClose={() => setSortIsOpen(false)} />
        </View>
      </Modal>
    </>
  );
};

export default SortButton;
