import React from 'react'
import GraphJSInterface from './GraphJSInterface'
import styles from './graphJS.module.css'

const GraphJS: React.FC<GraphJSInterface> = ({ Chart, title }) => {

  return <div className={styles.main}>
    {
      title ? <h1>{title}</h1> : <></>
    }
    <div className={styles.chart}>
    {Chart}
  </div>
  </div>
}

export default React.memo(GraphJS)
