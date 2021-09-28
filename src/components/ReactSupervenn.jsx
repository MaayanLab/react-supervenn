import React from 'react'
import classes from './ReactSupervenn.module.css'

function sum(L) {
  let s = 0
  for (const el of L) {
    s += el
  }
  return s
}

export default function ReactSupervenn({ sets, set_annotations, composition_array, chunks }) {
  const col_width = 18
  const row_height = 18
  const ycounts = chunks.map((_, col) => sum(composition_array.map(rows => rows[col])))
  return (
    <div
      className={`${classes.layout} ${classes.expand}`}
    >
      <div className={classes.data}>
        <div className={classes.col}>
          {composition_array.map((cells, row) => (
            <div key={row} className={classes.row}>
              {cells.map((cell, col) => {
                if (cell === 1) {
                  return (
                    <div
                      key={col}
                      style={{
                        width: chunks[col].length * col_width,
                        height: row_height,
                        backgroundColor: 'green',
                        border: '1px solid white',
                      }}>&nbsp;</div>
                  )
                } else {
                  return (
                    <div
                      key={col}
                      style={{
                        width: chunks[col].length * col_width,
                        height: row_height,
                        backgroundColor: 'lightgrey',
                        border: '1px solid white',
                      }}>&nbsp;</div>
                  )
                }
              })}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.ylabel}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div style={{
            transform: 'rotate(-90deg) translateX(-75%)'
          }}>SETS</div>
        </div>
      </div>
      <div className={classes.xlabel}>
        <div className={classes['text-center']}>
          ITEMS
        </div>
      </div>
      <div className={classes.yticks}>
        <div className={classes.col}>
          {sets.map((_, row) => (
            <div
              key={row}
              title={JSON.stringify(sets[row])}
              style={{
                border: '1px solid white',
                height: row_height,
                alignItems: 'center',
                justifyContent: 'center',
              }}><span>{set_annotations[row]}</span></div>
          ))}
        </div>
      </div>
      <div className={classes.xticks}>
        <div className={classes.row}>
          {chunks.map((chunk, col) => (
            <div
              key={col}
              className={classes['text-center']}
              style={{
                width: chunks[col].length * col_width,
                height: row_height,
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid white',
              }}
              title={JSON.stringify(chunk)}><span>{chunks[col].length}</span></div>
          ))}
        </div>
      </div>
      <div className={classes.ycount}>
        <div className={classes.row}>
          {chunks.map((chunk, col) => (
            <div key={col} className={classes.row} style={{
              width: chunks[col].length * col_width,
              height: ycounts[col] * row_height,
              border: '1px solid white',
              backgroundColor: 'grey',
              alignSelf: 'end',
              alignItems: 'center',
              justifyContent: 'center',
            }}><span>{ycounts[col]}</span></div>
          ))}
        </div>
      </div>
      <div className={classes.xcount}>
        <div className={classes.col}>
          {sets.map((_, row) => (
            <div
              key={row}
              className={classes['text-center']}
              title={JSON.stringify(sets[row])}
              style={{
                width: sets[row].length * col_width,
                height: row_height,
                backgroundColor: 'grey',
                border: '1px solid white',
              }}
            >{sets[row].length}</div>
          ))}
        </div>
      </div>
    </div>
  )
}