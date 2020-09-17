const map = document.querySelector('#map')
const scaleDownBtn = document.querySelector('#scaleDownBtn')
const scaleUpBtn = document.querySelector('#scaleUpBtn')

const items = [
  {
    id: 10,
    top: 0,
    left: 0,
    height: 365,
    width: 163,
    circuit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 362.77 131.61">
                <g><path d="M179.71,59.21h0l-24.37,73.4L515.56,79.67a3,3,0,0,0,2.15-4.45L476.3,2.52a3,3,0,0,0-3.18-1.46L179.71,59.21Z"
                transform="translate(-155.33 -1)"/></g></svg>`,
    path: 'd4155b25cc827ac3b325a9c28e6219d6.png'
  },
  {
    id: 11,
    top: 100,
    left: 100,
    height: 365,
    width: 163,
    circuit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 362.77 131.61">
                <g><path d="M179.71,59.21h0l-24.37,73.4L515.56,79.67a3,3,0,0,0,2.15-4.45L476.3,2.52a3,3,0,0,0-3.18-1.46L179.71,59.21Z"
                transform="translate(-155.33 -1)"/></g></svg>`,
    path: 'd4155b25cc827ac3b325a9c28e6219d6.png'
  },
]

//document.querySelector('#itemShape')
const toHtmlShape = ({ path = '', circuit = '' }) =>
  `<div class="map__paths__item__area" style="background: url(${path});"></div>
  <div class="map__path__item__circuit">${circuit}</div>`


function createItems(items, cb) {
  items.forEach(item => {
    const element = document.createElement('div')
    element.classList.add('map__paths__item')
    element.dataset.itemId = item.id
    element.innerHTML = toHtmlShape(item)
    map.appendChild(element)
  })

  cb(items)
}


const run = new Promise(function (resolve, reject) {
  setTimeout(() => createItems(items, resolve),200)
})

run
  .then(onLoad)

function onLoad(items) {
  const paths = document.querySelectorAll('.map__paths__item')
  const circuits = document.querySelectorAll('.map__path__item__circuit svg path')

  const SCALE_TYPES = {
    UP: 'UP',
    DOWN: 'DOWN',
  }

  const scaleEvent = new CustomEvent('scaleEvent', {
    detail: {
      scaleType: SCALE_TYPES.DOWN
    }
  })


  circuits.forEach(el => el.addEventListener('mouseover', handleCircuitMouseover))
  circuits.forEach(el => el.addEventListener('mouseout', handleCircuitMouseover))

  paths.forEach(el => el.addEventListener('mousedown', handlePathMousedown))
  paths.forEach(el => el.addEventListener('dragstart', handlePathOnDragStart))
  paths.forEach(el => el.addEventListener('scaleEvent', handlePathScale, false))

  function handlePathScale(event) {
    const { target, detail } = event
    const { clientWidth: w, clientHeight: h } = target
    const percent = (value) => value * 0.20

    const mapping = {
      [SCALE_TYPES.UP]: {
        width: w + percent(w),
        height: h + percent(h),
      },
      [SCALE_TYPES.DOWN]: {
        width: w - percent(w),
        height: h - percent(h),
      }
    }

    const { width, height } = mapping[detail.scaleType]

    // todo: Добавить ограничения по минимуму/максмуму в размере
    target.style.width = `${width}px`
    target.style.height = `${height}px`
  }

  scaleUpBtn.addEventListener('click', () => {
    // console.log(scaleEvent.detail.scaleType)
    scaleEvent.detail.scaleType = SCALE_TYPES.UP
    paths.forEach(el => el.dispatchEvent(scaleEvent))
  })

  scaleDownBtn.addEventListener('click', () => {
    // console.log(scaleEvent.detail.scaleType)
    scaleEvent.detail.scaleType = SCALE_TYPES.DOWN
    paths.forEach(el => el.dispatchEvent(scaleEvent))
  })


  function handleCircuitMouseover(event) {
    event.target.closest('div').previousElementSibling.classList.toggle('is_active')
  }

  function handlePathMousedown(event) {
    event.stopPropagation()
    const path = this
    let shiftX = event.clientX - path.getBoundingClientRect().left
    let shiftY = event.clientY - path.getBoundingClientRect().top

    path.style.position = 'absolute'
    path.style.zIndex = 1000
    map.append(path)

    moveAt(event.pageX, event.pageY)

    // переносит мяч на координаты (pageX, pageY),
    // дополнительно учитывая изначальный сдвиг относительно указателя мыши
    function moveAt(pageX, pageY) {
      path.style.left = pageX - shiftX + 'px'
      path.style.top = pageY - shiftY + 'px'
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY)
    }

    // передвигаем мяч при событии mousemove
    document.addEventListener('mousemove', onMouseMove)

    // отпустить мяч, удалить ненужные обработчики
    path.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove)
      path.onmouseup = null
    }
  }

  function handlePathOnDragStart() {
    return false
  }

}

