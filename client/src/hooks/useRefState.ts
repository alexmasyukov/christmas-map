import { useRef } from 'react'

export function useRefState<T>(intitial: T): [{ current: T }, Function] {
  const stateRef = useRef<T>(intitial)

  const setStateRef = (update: T): void => {
    stateRef.current = {
      ...stateRef.current,
      ...update
    }
  }

  return [stateRef, setStateRef]
}
