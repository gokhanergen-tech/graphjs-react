import React from 'react'
import styles from './legend.module.css'
import { LegendItemProps } from '../../interfaces/graph-interface';

const LegendItem = ({
    color, name, size = 10
}: LegendItemProps) => {
    const minSize = 0.6;
    const maxSize = 1;
    const measuredSize = (1 / (size / 10));
    const absoluteSize = measuredSize > maxSize ? maxSize : (measuredSize < minSize ? minSize : measuredSize)

    return (
        <li className={styles.li} key={name}>
            <div>
                <div style={{
                    width: absoluteSize + "rem",
                    height: absoluteSize + "rem",
                    backgroundColor: color,
                    borderRadius:"50%"
                }}></div>
            </div>
            <span style={{
                fontSize: absoluteSize + "rem"
            }} title={name} className={styles.name}>
                {
                    name
                }
            </span>
        </li>
    )
}

export default React.memo(LegendItem);