import React, { FC, useRef, useEffect, MouseEvent } from 'react'
import { useDragInsideNode } from 'hooks/useDragInsideNode'
import styles from './map.module.sass'
// import { useWindowDimensions } from 'hooks/useWindowDimensions'

export const Map: FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const { handleMouseEvent, handleTouchEvent } = useDragInsideNode(
    mapContainer,
    {
      width: 2321,
      height: 2662
    }
  )

  useEffect(() => {
    console.log('render')
  })

  // const handleClick = (e: MouseEvent<HTMLDivElement>) => {
  //   console.log(e)
  // }

  return (
    <div
      ref={mapContainer}
      className={styles.mapContainter}
      // onClick={handleClick}
    >
      <div
        key={'T7sdfj7fsf&7YYYYYYYYYYYY'}
        className={styles.map}
        style={{
          transform: 'translate3d(-700px, -1000px, 0px)'
        }}
        onMouseMove={handleMouseEvent}
        onMouseDown={handleMouseEvent}
        onMouseUp={handleMouseEvent}
        onMouseLeave={handleMouseEvent}
        onTouchMove={handleTouchEvent}
        onTouchStart={handleTouchEvent}
        onTouchEnd={handleTouchEvent}
      ></div>
    </div>
  )
}
