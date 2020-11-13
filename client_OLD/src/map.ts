import pathImg from './assets/images/17.png';
import objImg from './assets/images/object17.png';
const map = document.querySelector('#map');
const scaleDownBtn = document.querySelector('#scaleDownBtn');
const scaleUpBtn = document.querySelector('#scaleUpBtn');

const items = [
  {
    id: 10,
    options: [210, 326],
    circuit: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 362.77 131.61">
                <g><path d="M179.71,59.21h0l-24.37,73.4L515.56,79.67a3,3,0,0,0,2.15-4.45L476.3,2.52a3,3,0,0,0-3.18-1.46L179.71,59.21Z"
                transform="translate(-155.33 -1)"/></g></svg>`,
      options: [0, 0, 365, 134],
    },
    path: {
      img: pathImg,
      options: [0, 0, 365, 163],
    },
    objects: [
      {
        itemId: 10,
        options: [20, 350, 309, 309],
        img: objImg,
        animation: {
          repeat: true,
          css: '',
        },
      },
    ],
  },
];

//document.querySelector('#itemShape')
const itemToHtmlShape = ({ path = '', circuit = '' }) =>
  `<div class="map__paths__item__area" style="background: url(${path});"></div>
   <div class="map__path__item__circuit">${circuit}</div>`;

function appendToMap(className, itemId, html = '', style = '') {
  const el = document.createElement('div');

  if (style !== '') {
    el.style.cssText = style;
  }

  el.classList.add(className);
  el.dataset.itemId = itemId;
  el.innerHTML = html;
  map.appendChild(el);
}

function createItems(items, cb) {
  items.forEach((item) => {
    const { objects = [], id, options, path, circuit } = item;

    const optionsToCss = ([top = 0, left = 0, width = 0, height = 0]) => {
      let wh = '';
      if (width > 0 && height > 0) {
        wh = `width:${width}px; height:${height}px;`;
      }
      return `top:${top}px; left:${left}px; ${wh}`;
    };

    const styleArea = `${optionsToCss(path.options)}; background: url(${
      path.img
    });`;
    const styleCircuit = optionsToCss(circuit.options);

    const htmlShape = `
        <div class="map__paths__item__area" style="${styleArea}">
        </div>
        <div class="map__path__item__circuit" style="${styleCircuit}">
            ${circuit.svg}
        </div>`;

    appendToMap('map__paths__item', id, htmlShape, optionsToCss(options));

    objects.forEach((obj) => {
      const { options, img } = obj;
      const style = `${optionsToCss(options)}; background: url(${img});`;

      appendToMap('map__objects__item', id, '', style);
    });
  });

  cb(items);
}

const run = new Promise(function (resolve, reject) {
  setTimeout(() => createItems(items, resolve), 200);
});

run.then(onLoad);

function onLoad(items) {
  const paths = document.querySelectorAll('.map__paths__item');
  const circuitsSvgPaths = document.querySelectorAll(
    '.map__path__item__circuit svg path'
  );
  const circuits = document.querySelectorAll('.map__path__item__circuit');
  const objects = document.querySelectorAll('.map__objects__item');

  const SCALE_TYPES = {
    UP: 'UP',
    DOWN: 'DOWN',
  };

  const scaleEvent = new CustomEvent('scaleEvent', {
    detail: {
      scaleType: SCALE_TYPES.DOWN,
    },
  });

  circuitsSvgPaths.forEach((el) =>
    el.addEventListener('mouseover', handleCircuitMouseover)
  );
  circuitsSvgPaths.forEach((el) =>
    el.addEventListener('mouseout', handleCircuitMouseover)
  );

  paths.forEach((el) =>
    el.addEventListener('scaleEvent', handlePathScale, false)
  );

  circuits.forEach((el) =>
    el.addEventListener('mousedown', handlePathMousedown)
  );
  circuits.forEach((el) =>
    el.addEventListener('dragstart', handlePathOnDragStart)
  );

  function handlePathScale(event) {
    const { target, detail } = event;
    const { clientWidth: w, clientHeight: h } = target;
    const percent = (value) => value * 0.2;

    const mapping = {
      [SCALE_TYPES.UP]: {
        width: w + percent(w),
        height: h + percent(h),
      },
      [SCALE_TYPES.DOWN]: {
        width: w - percent(w),
        height: h - percent(h),
      },
    };

    const { width, height } = mapping[detail.scaleType];

    // todo: Добавить ограничения по минимуму/максмуму в размере
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;
  }

  scaleUpBtn.addEventListener('click', () => {
    scaleEvent.detail.scaleType = SCALE_TYPES.UP;
    paths.forEach((el) => el.dispatchEvent(scaleEvent));
  });

  scaleDownBtn.addEventListener('click', () => {
    scaleEvent.detail.scaleType = SCALE_TYPES.DOWN;
    paths.forEach((el) => el.dispatchEvent(scaleEvent));
  });

  function handleCircuitMouseover(event) {
    event.target
      .closest('div')
      .previousElementSibling.classList.toggle('is_active');
  }

  function handlePathMousedown(event) {
    event.stopPropagation();
    const path = this;
    // console.log(path)
    console.log(event.clientY, path.getBoundingClientRect().top);
    let shiftX = event.clientX - path.getBoundingClientRect().left
    let shiftY = event.clientY - path.getBoundingClientRect().top
    
    path.style.position = 'absolute'
    path.style.zIndex = 1
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
    return false;
  }
}
