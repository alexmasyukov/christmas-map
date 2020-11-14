import React from 'react'
import styles from './app.module.sass'
import { Map } from './components/Map'

function App() {
  return (
    <div className={styles.container}>
      <Map />
    </div>
  )
}

export default App
