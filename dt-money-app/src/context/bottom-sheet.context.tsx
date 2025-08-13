import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'

import { colors } from '@/styles/colors'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'

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

  const snapPoints = ['70%', '90%']

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode, index: number) => {
      setIndex(index)

      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(index)
      })

      setContent(newContent)
    },
    []
  )

  const closeBottomSheet = useCallback(() => {
    setIndex(-1)
    setContent(null)
    bottomSheetRef.current?.close()
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
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

      <BottomSheet
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
            pressBehavior="none"
          />
        )}
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
