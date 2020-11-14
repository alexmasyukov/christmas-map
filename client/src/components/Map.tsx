import React, { FC, useCallback, useRef, useEffect, MouseEvent } from 'react'

import styles from './map.module.sass'
import { useWindowDimensions } from 'hooks/useWindowDimensions'

interface MapDrag {
  current: {
    isDrag: boolean
    startDragX: number
    startDragY: number
    tx: number
    ty: number
  }
}

interface MapConfig {
  width: number
  height: number
}

const mapConfig: MapConfig = {
  width: 2321,
  height: 2662
}

export const Map: FC = () => {
  const windowDimensions = useWindowDimensions()

  const mapDrag: MapDrag = useRef({
    isDrag: false,
    startDragX: 0,
    startDragY: 0,
    tx: -700,
    ty: -1000
  })

  const handleMouseEvent = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    const map = event.target as HTMLDivElement

    if (event.type === 'mousedown') {
      map.classList.add(styles.mapDrag)

      mapDrag.current = {
        ...mapDrag.current,
        startDragX: event.clientX,
        startDragY: event.clientY,
        isDrag: true
      }
    }

    const indentX = mapDrag.current.startDragX - event.clientX
    const indentY = mapDrag.current.startDragY - event.clientY
    let tx = mapDrag.current.tx - indentX
    let ty = mapDrag.current.ty - indentY

    if (
      (event.type === 'mouseup' || event.type === 'mouseleave') &&
      mapDrag.current.isDrag
    ) {
      map.classList.remove(styles.mapDrag)

      mapDrag.current = {
        ...mapDrag.current,
        tx,
        ty,
        isDrag: false
      }
    }

    if (event.type === 'mousemove' && mapDrag.current.isDrag) {
      const minX = mapConfig.width - windowDimensions.width
      const minY = mapConfig.height - windowDimensions.height

      if (tx > 0) {
        tx = 0
        mapDrag.current.tx = 0
      }

      if (ty > 0) {
        ty = 0
        mapDrag.current.ty = 0
      }

      if (tx <= -minX) {
        tx = -minX
        mapDrag.current.tx = -minX
      }

      if (ty <= -minY) {
        ty = -minY
        mapDrag.current.ty = -minY
      }

      map.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`
    }

    event.preventDefault()

    // console.log(
    //   'MOVING !!! clientX',
    //   event.clientX,
    //   'current.tx',
    //   mapDrag.current.tx,
    //   'tx',
    //   tx
    // )
  }, [])

  useEffect(() => {
    console.log('render', mapDrag.current.isDrag)
  })

  return (
    <div
      className={styles.map}
      // ref={ref}
      onMouseMove={handleMouseEvent}
      onMouseDown={handleMouseEvent}
      onMouseUp={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
    ></div>
  )
}
