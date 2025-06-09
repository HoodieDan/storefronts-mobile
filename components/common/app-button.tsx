import React from 'react';
import { TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import clsx from 'clsx';
import PText from './text-utils/ptext';

interface CustomButtonProps extends TouchableOpacityProps {
  buttonText?: string;
  isLoading?: boolean;
  className?: string;
  textClass?: string;
}

const Button: React.FC<CustomButtonProps> = ({
  buttonText = 'Submit',
  textClass = 'text-white',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <TouchableOpacity
      className={clsx(
        'w-full items-center justify-center py-3',
        disabled && 'opacity-50',
        className
      )}
      disabled={disabled || isLoading}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <PText className={clsx(textClass)}>{buttonText}</PText>
      )}
    </TouchableOpacity>
  );
};

export default Button;
