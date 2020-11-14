import { useState, useEffect } from 'react'

interface WindowDemensions {
  height: number
  width: number
}

function getWindowDimensions(): WindowDemensions {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

export function useWindowDimensions(): WindowDemensions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDemensions>(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
