import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import type { PropsWithChildren } from 'react'
import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'

type ButtonMode = 'fill' | 'outline'

type ButtonProps = TouchableOpacityProps & {
  mode?: ButtonMode
  iconName?: keyof typeof MaterialIcons.glyphMap
  widthFull?: boolean
}

export function Button({
  mode = 'fill',
  iconName,
  children,
  className,
  widthFull = true,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const isFill = mode === 'fill'

  return (
    <TouchableOpacity
      className={clsx(
        'h-button flex-row items-center rounded-xl px-5',
        widthFull && 'w-full',
        iconName ? 'justify-between' : 'justify-center',
        {
          'bg-accent-brand': isFill,
          'border-[1px] border-accent-brand bg-none': !isFill,
        },
        className
      )}
      {...props}
    >
      <Text
        className={clsx('text-base', {
          'text-white': isFill,
          'text-accent-brand': !isFill,
        })}
      >
        {children}
      </Text>

      {iconName && (
        <MaterialIcons
          color={isFill ? colors.white : colors['accent-brand']}
          name={iconName}
          size={24}
        />
      )}
    </TouchableOpacity>
  )
}
