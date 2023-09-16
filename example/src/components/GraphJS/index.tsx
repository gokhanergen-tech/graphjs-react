import React from 'react'
import GraphJSInterface from './GraphJSInterface'
import styles from './graphJS.module.css'

const GraphJS: React.FC<GraphJSInterface> = ({ Chart, Labels, title }) => {

  return <div className={styles.main}>
    {
      title ? <h1>{title}</h1> : <></>
    }
    <div className={styles.chart}>
    {Chart}
    {Labels}
  </div>
  </div>
}

export default React.memo(GraphJS)
