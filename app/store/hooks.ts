import { useDispatch, useSelector, useStore, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

// Typed version of `useDispatch`
export const useAppDispatch: () => AppDispatch = useDispatch

// Typed version of `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Typed version of `useStore`
export const useAppStore: () => AppStore = useStore
