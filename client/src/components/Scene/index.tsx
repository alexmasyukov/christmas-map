import React, { FC } from 'react'
import { IScene } from 'types.d'
import { Personage } from 'components/Personage'
import { ReactComponent as BoundarySvg } from 'assets/images/circuit17.svg'
import base from 'assets/images/17.png'
import styles from './scene.module.sass'

export const Scene: FC<IScene> = ({
  options: { top, left },
  personages,
  boundary
}) => {
  return (
    <div
      className={styles.scene}
      style={{
        background: '#e5e5', //`url(${backgroundUrl})`,
        top: top,
        left: left
      }}
    >
      {personages.map((personage) => (
        <Personage image={personage.image} options={personage.options} />
      ))}
      <div
        className={styles.boundary}
        style={{
          width: boundary.options.width,
          height: boundary.options.height,
          top: boundary.options.top,
          left: boundary.options.left
        }}
      >
        <BoundarySvg />
      </div>

      <div
        className={styles.base}
        style={{
          width: boundary.options.width,
          height: boundary.options.height,
          top: boundary.options.top,
          left: boundary.options.left,
          background: `url(${base})`
        }}
      ></div>

      {/* // class="map__paths__item__area" */}
      {/* <div class="map__path__item__circuit"></div> */}
      <h1>Надпись вот еще</h1>
      <div>Еще вот div</div>
    </div>
  )
}
