import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
} from 'react-native'

import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useRef, useState } from 'react'

import clsx from 'clsx'
import { ErrorMessage } from './error-message'

interface InputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>
  name: Path<T>
  leftIconName: keyof typeof MaterialIcons.glyphMap
  label?: string
}

export function Input<T extends FieldValues>({
  control,
  name,
  leftIconName,
  label,
  secureTextEntry,
  ...rest
}: InputParams<T>) {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(secureTextEntry)

  const inputRef = useRef<TextInput>(null)

  function checkFocus() {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused())
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="mt-4 w-full">
          {label && (
            <Text
              className={clsx(
                'mt-3 mb-2 text-balance',
                isFocused ? 'text-accent-brand' : 'text-gray-600'
              )}
            >
              {label}
            </Text>
          )}

          <TouchableOpacity className="h-18 flex-row items-center justify-between border-gray-600 border-b px-3 py-3">
            {leftIconName && (
              <MaterialIcons
                className="mr-2"
                color={isFocused ? colors['accent-brand'] : colors.gray[600]}
                name={leftIconName}
                size={24}
              />
            )}

            <TextInput
              className="flex-1 text-base text-gray-500"
              onChangeText={onChange}
              onEndEditing={checkFocus}
              onFocus={checkFocus}
              placeholderTextColor={colors.gray[700]}
              ref={inputRef}
              secureTextEntry={showPassword}
              value={value}
              {...rest}
            />

            {secureTextEntry && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  color={colors.gray[600]}
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </View>
      )}
    />
  )
}
