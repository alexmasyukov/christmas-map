import React, { FC } from 'react'
import { IPersonage } from 'types'
import styles from './personage.module.sass'

export const Personage: FC<IPersonage> = ({
  image,
  options: { width, height, left, top }
}) => {
  return (
    <div
      className={styles.personage}
      style={{
        width: width,
        height: height,
        left: left,
        top: top,
        background: `url(${image})`
      }}
    />
  )
}
