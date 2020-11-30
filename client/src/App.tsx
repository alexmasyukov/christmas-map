import React, { FC } from 'react'
import { Map } from './components/Map/Map'
import pathImg from './assets/images/17.png'
import obj17 from './assets/images/object17.png'
import obj8 from './assets/images/object8.png'
import styles from './app.module.sass'
import { Scene } from './components/Scene'
import { IScene } from './types.d'

// additions: [
//   {
//     image: '',
//     options: {
//       top: 670,
//       left: 1200
//     }
//   }
// ]

const scenes: Array<IScene> = [
  {
    id: 10,
    options: {
      top: 1100,
      left: 1200
    },
    personages: [
      {
        image: obj17,
        options: {
          top: 0,
          left: 0,
          width: 319,
          height: 302
        }
      },
      {
        image: obj8,
        options: {
          top: 0,
          left: 400,
          width: 322,
          height: 304
        }
      }
    ],
    base: {
      image: pathImg,
      options: {
        top: 800,
        left: 820
      }
    },
    boundary: {
      svg: pathImg,
      options: {
        top: 0,
        left: 0,
        width: 365,
        height: 163
      }
    }
  }
]

function App() {
  return (
    <div className={styles.container}>
      <Map>
        {scenes.map((scene) => (
          <Scene {...scene} />
        ))}
      </Map>
    </div>
  )
}

export default App
