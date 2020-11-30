import { getCSSTranslate3dValues } from 'utils/helpers'
import React, {
  useCallback,
  MouseEvent,
  TouchEvent,
  MouseEventHandler,
  TouchEventHandler
} from 'react'
import { useRefState } from './useRefState'

interface State {
  isDrag: boolean
  startDragX: number
  startDragY: number
  x: number
  y: number
}
interface Size {
  width: number
  height: number
}

interface Coordinates {
  x: number
  y: number
}

const dragToXY = (
  draggableNode: HTMLDivElement,
  x: string | number,
  y: string | number
): void => {
  draggableNode.style.transform = `translate3d(${x}px, ${y}px, 0px)`
}

const getXYwithIndents = <T extends State>(state: T) => (event: {
  clientX: number
  clientY: number
}): Coordinates => {
  const indentX = state.startDragX - event.clientX
  const indentY = state.startDragY - event.clientY
  let x = state.x - indentX
  let y = state.y - indentY

  return { x, y }
}

const checkBoundaries = (
  containerNode: HTMLDivElement,
  draggableNodeSize: Size
) => (x: number, y: number): Coordinates => {
  const minX = draggableNodeSize.width - containerNode.clientWidth
  const minY = draggableNodeSize.height - containerNode.clientHeight

  if (x > 0) x = 0
  if (x <= -minX) x = -minX
  if (y > 0) y = 0
  if (y <= -minY) y = -minY

  return { x, y }
}

export const useDragInsideNode = (
  containerNode: React.RefObject<HTMLDivElement>,
  draggableNodeSize: Size
): {
  handleMouseEvent: MouseEventHandler
  handleTouchEvent: TouchEventHandler
} => {
  const [stateRef, setRefState] = useRefState<State>({
    isDrag: false,
    startDragX: 0,
    startDragY: 0,
    x: 0,
    y: 0
  })

  const handleMouseEvent = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (containerNode.current === null) return

      event.stopPropagation()
      const draggableNode = event.target as HTMLDivElement

      if (event.type === 'mousedown') {
        draggableNode.classList.add('drag')

        let { x, y } = stateRef.current

        if (stateRef.current.x === 0 && stateRef.current.y === 0) {
          const [cssX, cssY] = getCSSTranslate3dValues(
            draggableNode.style.transform
          )

          x = cssX
          y = cssY
        }

        setRefState({
          isDrag: true,
          startDragX: event.clientX,
          startDragY: event.clientY,
          x,
          y,
          xL: 'sdfsdsf'
        })
      }

      const { x, y } = getXYwithIndents(stateRef.current)(event)

      if (
        (event.type === 'mouseup' || event.type === 'mouseleave') &&
        stateRef.current.isDrag
      ) {
        draggableNode.classList.remove('drag')

        setRefState({
          x,
          y,
          isDrag: false
        })
      }

      if (event.type === 'mousemove' && stateRef.current.isDrag) {
        const dragCoords = checkBoundaries(
          containerNode.current,
          draggableNodeSize
        )(x, y)

        dragToXY(draggableNode, dragCoords.x, dragCoords.y)
      }

      event.preventDefault()
    },
    [containerNode]
  )

  const handleTouchEvent = useCallback(
    (event: TouchEvent) => {
      if (containerNode.current === null) return
      if (!(event.touches && event.touches.length)) return

      const touch = event.touches[0]
      const draggableNode = event.target as HTMLDivElement

      if (event.type === 'touchstart') {
        const cssLastValues = getCSSTranslate3dValues(
          draggableNode.style.transform
        )
        const [x, y] = cssLastValues

        setRefState({
          startDragX: touch.clientX,
          startDragY: touch.clientY,
          x,
          y
        })
      }

      if (event.type === 'touchmove') {
        const { x, y } = getXYwithIndents(stateRef.current)(touch)
        const dragCoords = checkBoundaries(
          containerNode.current,
          draggableNodeSize
        )(x, y)

        dragToXY(draggableNode, dragCoords.x, dragCoords.y)
      }
    },
    [containerNode]
  )

  return { handleMouseEvent, handleTouchEvent }
}
