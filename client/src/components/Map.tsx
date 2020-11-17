import React, { FC, useRef, useEffect } from 'react'
import { useDragInsideNode } from 'hooks/useDragInsideNode'
import styles from './map.module.sass'
// import { useWindowDimensions } from 'hooks/useWindowDimensions'

export const Map: FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const handleMouseEvent = useDragInsideNode(mapContainer, styles.drag, {
    width: 2321,
    height: 2662
  })

  useEffect(() => {
    console.log('render')
  })

  return (
    <div ref={mapContainer} className={styles.mapContainter}>
      <div
        className={styles.map}
        onMouseMove={handleMouseEvent}
        onMouseDown={handleMouseEvent}
        onMouseUp={handleMouseEvent}
        onMouseLeave={handleMouseEvent}
      ></div>
    </div>
  )
}
