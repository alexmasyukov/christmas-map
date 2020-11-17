import React, {
  useCallback,
  useRef,
  MouseEvent,
  MouseEventHandler
} from 'react'

interface Drag {
  current: {
    isDrag: boolean
    startDragX: number
    startDragY: number
    tx: number
    ty: number
  }
}

interface Size {
  width: number
  height: number
}

export function useDragInsideNode(
  node: React.RefObject<HTMLDivElement>,
  dragClassName: string = 'drag',
  draggableNodeSize: Size
): MouseEventHandler {
  const drag: Drag = useRef({
    isDrag: false,
    startDragX: 0,
    startDragY: 0,
    tx: -700,
    ty: -1000
  })

  return useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (node.current === null) return

    event.stopPropagation()
    const draggableNode = event.target as HTMLDivElement

    if (event.type === 'mousedown') {
      draggableNode.classList.add(dragClassName)

      drag.current = {
        ...drag.current,
        startDragX: event.clientX,
        startDragY: event.clientY,
        isDrag: true
      }
    }

    const indentX = drag.current.startDragX - event.clientX
    const indentY = drag.current.startDragY - event.clientY
    let tx = drag.current.tx - indentX
    let ty = drag.current.ty - indentY

    if (
      (event.type === 'mouseup' || event.type === 'mouseleave') &&
      drag.current.isDrag
    ) {
      draggableNode.classList.remove(dragClassName)

      drag.current = {
        ...drag.current,
        tx,
        ty,
        isDrag: false
      }
    }

    if (event.type === 'mousemove' && drag.current.isDrag) {
      const minX = draggableNodeSize.width - node.current.clientWidth
      const minY = draggableNodeSize.height - node.current.clientHeight

      if (tx > 0) {
        tx = 0
        drag.current.tx = 0
      }

      if (ty > 0) {
        ty = 0
        drag.current.ty = 0
      }

      if (tx <= -minX) {
        tx = -minX
        drag.current.tx = -minX
      }

      if (ty <= -minY) {
        ty = -minY
        drag.current.ty = -minY
      }

      draggableNode.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`
    }

    event.preventDefault()
  }, [])
}
