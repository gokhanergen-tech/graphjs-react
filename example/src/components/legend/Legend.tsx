import React from 'react'
import { LegendProps } from '../../interfaces/graph-interface'

import styles from './legend.module.css'
import LegendItem from './LegendItem'

const Wrapper = ({ children }: { children: any }) => {
  return <ul className={styles.ul}>{children}</ul>
}

const Legend = ({ labels }: LegendProps) => {
  if (!Array.isArray(labels)) {
    throw new Error('labels is not an array!')
  }
  return (
    <Wrapper>
      {labels.map((item) => (
        <LegendItem
          size={labels.length}
          key={item.name}
          name={item.name}
          color={item.color}
        />
      ))}
    </Wrapper>
  )
}

export default React.memo(Legend)
