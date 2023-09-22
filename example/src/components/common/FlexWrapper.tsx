import React from 'react'
import styles from './flexWrapper.module.css'
import { WrapperProps } from '../../interfaces/graph-interface'

const FlexWrapper:React.FunctionComponent<WrapperProps> = ({rootStyle,children}) => {
  return (
    <div style={rootStyle} className={[styles.wrapper].join(" ")}>
      {
        children
      }
    </div>
  )
}

export default FlexWrapper