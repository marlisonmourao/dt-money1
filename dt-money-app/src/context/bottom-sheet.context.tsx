import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'

import { TouchableWithoutFeedback } from 'react-native'

import { colors } from '@/styles/colors'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { View } from 'react-native'

interface BottomSheetContextType {
  openBottomSheet: (content: React.ReactNode, index: number) => void
  closeBottomSheet: () => void
}

export const BottomsheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType
)

export function BottomSheetProvider({ children }: PropsWithChildren) {
  const [content, setContent] = useState<React.ReactNode | null>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [index, setIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)

  const snapPoints = ['70%', '90%']

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode, index: number) => {
      setIndex(index)
      setIsOpen(true)

      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(index)
      })

      setContent(newContent)
    },
    []
  )

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false)
    setIndex(-1)
    setContent(null)
    bottomSheetRef.current?.close()
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsOpen(false)
      setContent(null)
    }
  }, [])

  return (
    <BottomsheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}

      {isOpen && content && (
        <View className="absolute inset-0 z-[1000] bg-black/50">
          <TouchableWithoutFeedback onPress={closeBottomSheet}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </View>
      )}

      {/* Bottom Sheet */}
      <BottomSheet
        backgroundStyle={{
          backgroundColor: colors['background-secondary'],
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 9,
        }}
        enablePanDownToClose
        index={index}
        onChange={handleSheetChanges}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        style={{ zIndex: 1001 }}
      >
        <BottomSheetScrollView>{content}</BottomSheetScrollView>
      </BottomSheet>
    </BottomsheetContext.Provider>
  )
}

export function useBottomSheetContext() {
  const context = useContext(BottomsheetContext)

  return context
}
