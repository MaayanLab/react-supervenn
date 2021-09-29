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

export default function ReactSupervenn({
  sets,
  set_annotations,
  chunks,
  composition_array,
  effective_min_width_for_annotation,
  col_widths,
  n_items,
  ycounts,
}) {
  const col_width = 200
  const row_height = 18
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
                      onClick={_ => {
                        setSelection(
                          selection => ({
                            ...selection,
                            [`${row}.${col}`]: !selection[`${row}.${col}`],
                          })
                        )
                      }}
                      style={{
                        width: col_widths[col] * col_width / n_items,
                        height: row_height,
                        backgroundColor: 'green',
                        userSelect: 'none',
                      }}>&nbsp;</div>
                  )
                } else {
                  return (
                    <div
                      key={col}
                      className={style.cell}
                      style={{
                        width: col_widths[col] * col_width / n_items,
                        height: row_height,
                        backgroundColor: 'lightgrey',
                        userSelect: 'none',
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
            userSelect: 'none',
          }}>SETS (<span
            className={style.clickable}
            onClick={_ => {
              navigator.clipboard.writeText(Object.keys(selectedSets).join('\n'))
            }}>{Object.keys(selectedSets).length} sets</span>)
          </div>
        </div>
      </div>
      <div className={style.xlabel}>
        <div style={{ textAlign: 'center', userSelect: 'none' }}>
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
              }}><span style={{userSelect: 'none'}}>{set_annotations[row]}</span></div>
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
                width: col_widths[col] * col_width / n_items,
                height: row_height,
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid white',
              }}
              title={JSON.stringify(chunk)}>
              <span style={{ userSelect: 'none' }}>
                {chunks[col].length >= effective_min_width_for_annotation ?
                  chunks[col].length
                  : null}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={style.ycount}>
        <div 
          className={style.row}
          style={{
            backgroundColor: '#eee',
          }}
        >
          {chunks.map((chunk, col) => (
            <div
              key={col}
              className={style.cell}
              onClick={_ => {
                setSelection(
                  selection => {
                    const _selection = {...selection}
                    for (const row in composition_array) {
                      if (composition_array[row][col]) {
                        _selection[`${row}.${col}`] = !_selection[`${row}.${col}`]
                      }
                    }
                    return _selection
                  }
                )
              }}
              style={{
                display: 'flex',
                width: col_widths[col] * col_width / n_items,
                height: 2 * row_height * ycounts[col] / sets.length,
                backgroundColor: '#aaa',
                alignSelf: 'end',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{userSelect: 'none'}}>
                  {chunks[col].length >= effective_min_width_for_annotation ?
                    ycounts[col]
                    : null}
                </span>
              </div>
          ))}
        </div>
      </div>
      <div className={style.xcount}>
        <div
          className={style.col}
          style={{
            backgroundColor: '#ddd',
            width: col_width,
          }}>
          {sets.map((_, row) => (
            <div
              key={row}
              className={classes(style.cell, style['text-center'])}
              title={JSON.stringify(sets[row])}
              onClick={_ => {
                setSelection(
                  selection => {
                    const _selection = {...selection}
                    for (const col in Object.keys(chunks)) {
                      if (composition_array[row][col]) {
                        _selection[`${row}.${col}`] = !_selection[`${row}.${col}`]
                      }
                    }
                    return _selection
                  }
                )
              }}
              style={{
                width: sets[row].length * col_width / n_items,
                height: row_height,
                backgroundColor: '#aaa',
              }}
            ><span style={{ userSelect: 'none' }}>{sets[row].length}</span></div>
          ))}
        </div>
      </div>
    </div>
  )
}