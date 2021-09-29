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
  const W = (w) => `${100 * w}%`
  const H = (h) => `${100 * h}%`
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
      className={style.layout}
    >
      <div className={style.data}>
        {composition_array.map((cells, row) => (
          <div key={row}>
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
                      width: W(col_widths[col] / n_items),
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
                      width: W(col_widths[col] / n_items),
                      backgroundColor: 'lightgrey',
                      userSelect: 'none',
                    }}>&nbsp;</div>
                )
              }
            })}
          </div>
        ))}
      </div>
      <div className={style.ylabel}>
        <div>SETS (<span
          className={style.clickable}
          onClick={_ => {
            navigator.clipboard.writeText(Object.keys(selectedSets).join('\n'))
          }}>{Object.keys(selectedSets).length} sets</span>)
        </div>
      </div>
      <div className={style.xlabel}>
        ITEMS (<span 
          className={style.clickable}
          onClick={_ =>
            navigator.clipboard.writeText(Object.keys(selectedItems).join('\n'))
          }>{Object.keys(selectedItems).length} items</span>)
      </div>
      <div className={style.yticks}>
        {sets.map((_, row) => (
          <div
            key={row}
            title={JSON.stringify(sets[row])}
          ><span>{set_annotations[row]}</span></div>
        ))}
      </div>
      <div className={style.xticks}>
        {chunks.map((chunk, col) => (
          <div
            key={col}
            style={{
              width: W(col_widths[col] / n_items),
            }}
            title={JSON.stringify(chunk)}>
            <span>
              {chunks[col].length >= effective_min_width_for_annotation ?
                chunks[col].length
                : null}
            </span>
          </div>
        ))}
      </div>
      <div className={style.ycount}>
        {chunks.map((chunk, col) => (
          <div
            key={col}
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
              width: W(col_widths[col] / n_items),
              height: H(ycounts[col] / sets.length),
            }}>
              <span>
                {chunks[col].length >= effective_min_width_for_annotation ?
                  ycounts[col]
                  : null}
              </span>
            </div>
        ))}
      </div>
      <div className={style.xcount}>
        {sets.map((_, row) => (
          <div
            key={row}
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
              width: W(sets[row].length / n_items),
            }}
          ><span>{sets[row].length}</span></div>
        ))}
      </div>
    </div>
  )
}