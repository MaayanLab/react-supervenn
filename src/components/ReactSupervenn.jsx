import React from 'react'
import style from './ReactSupervenn.module.css'

function classes(...C) {
  if (C.length === 1 && typeof C[0] === 'object') {
    const _C = []
    for (const c in C[0]) {
      if (C[0][c]) {
        _C.push(c)
      }
    }
    return _C.join(' ')
  } else {
    return C.join(' ')
  }
}

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
  const [selection, setSelection] = React.useState({})
  const selectedSets = {}
  const selectedItems = {}
  for (const k in selection) {
    if (!selection[k]) continue
    const [row, col] = k.split('.')
    selectedSets[set_annotations[row]] = true
    for (const item of chunks[col]) {
      selectedItems[item] = true
    }
  }
  return (
    <div
      className={`${style.layout} ${style.expand}`}
    >
      <div className={style.data}>
        <div className={style.col}>
          {composition_array.map((cells, row) => (
            <div key={row} className={classes(style.row)}>
              {cells.map((cell, col) => {
                if (cell === 1) {
                  return (
                    <div
                      key={col}
                      className={classes({
                        [style.cell]: true,
                        [style.selected]: selection[`${row}.${col}`],
                      })}
                      onClick={_ => setSelection(
                        selection => ({
                          ...selection,
                          [`${row}.${col}`]: !selection[`${row}.${col}`],
                        })
                      )}
                      style={{
                        width: chunks[col].length * col_width,
                        height: row_height,
                        backgroundColor: 'green',
                      }}>&nbsp;</div>
                  )
                } else {
                  return (
                    <div
                      key={col}
                      className={style.cell}
                      style={{
                        width: chunks[col].length * col_width,
                        height: row_height,
                        backgroundColor: 'lightgrey',
                      }}>&nbsp;</div>
                  )
                }
              })}
            </div>
          ))}
        </div>
      </div>
      <div className={style.ylabel}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div style={{
            transform: 'rotate(-90deg) translateX(-25%)',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}>SETS (<span
            className={style.clickable}
            onClick={_ =>
              navigator.clipboard.writeText(Object.keys(selectedSets).join('\n'))
            }>{Object.keys(selectedSets).length} sets</span>)
          </div>
        </div>
      </div>
      <div className={style.xlabel}>
        <div className={style['text-center']}>
          ITEMS (<span 
            className={style.clickable}
            onClick={_ =>
              navigator.clipboard.writeText(Object.keys(selectedItems).join('\n'))
            }>{Object.keys(selectedItems).length} items</span>)
        </div>
      </div>
      <div className={style.yticks}>
        <div className={style.col}>
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
      <div className={style.xticks}>
        <div className={style.row}>
          {chunks.map((chunk, col) => (
            <div
              key={col}
              className={style['text-center']}
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
      <div className={style.ycount}>
        <div className={style.row}>
          {chunks.map((chunk, col) => (
            <div key={col} className={style.cell}
              onClick={_ => setSelection(
                selection => {
                  const _selection = {...selection}
                  for (const row in composition_array) {
                    if (composition_array[row][col]) {
                      _selection[`${row}.${col}`] = !_selection[`${row}.${col}`]
                    }
                  }
                  return _selection
                }
              )}
              style={{
                display: 'flex',
                width: chunks[col].length * col_width,
                height: ycounts[col] * row_height,
                backgroundColor: 'grey',
                alignSelf: 'end',
                alignItems: 'center',
                justifyContent: 'center',
              }}><span>{ycounts[col]}</span></div>
          ))}
        </div>
      </div>
      <div className={style.xcount}>
        <div className={style.col}>
          {sets.map((_, row) => (
            <div
              key={row}
              className={classes(style.cell, style['text-center'])}
              title={JSON.stringify(sets[row])}
              onClick={_ => setSelection(
                selection => {
                  const _selection = {...selection}
                  for (const col in Object.keys(chunks)) {
                    if (composition_array[row][col]) {
                      _selection[`${row}.${col}`] = !_selection[`${row}.${col}`]
                    }
                  }
                  return _selection
                }
              )}
              style={{
                width: sets[row].length * col_width,
                height: row_height,
                backgroundColor: 'grey',
              }}
            >{sets[row].length}</div>
          ))}
        </div>
      </div>
    </div>
  )
}