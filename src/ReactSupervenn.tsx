import React from 'react'
import classNames from 'classnames'
import './ReactSupervenn.css'

const as_percent = (x: number) => `${100*x}%`

/**
 * A react component to render supervenn in HTML
 * 
 */
const ReactSupervenn: React.FC<{
  /**
   * list of sets
   */
  sets: number[][],
  /**
   * list of annotations for the sets
   */
  set_annotations: string[],
  /**
   * list of chunks
   */
  chunks: number[][],
  /**
   * 
   */
  composition_array: number[][],
  /**
   * 
   */
  effective_min_width_for_annotation: number,
  /**
   * 
   */
  col_widths: number[],
  /**
   * 
   */
  n_items: number,
  /**
   * 
   */
  ycounts: number[],
  /**
   * True / False, whether to print annotations vertically
   */
  rotate_col_annotations: boolean,
  /**
   * 
   */
  color_by: 'row' | 'column',
  /**
   * a list of set colors, given as names of matplotlib named colors, or hex codes (e.g. '#1f77b4')
   */
  color_cycle: string[],
  /**
   * True (default) / False - give avery second row a slight grey tint
   */
  alternating_background: boolean,
}> = ({
  sets,
  set_annotations,
  chunks,
  composition_array,
  effective_min_width_for_annotation,
  col_widths,
  n_items,
  ycounts,
  rotate_col_annotations,
  color_by,
  color_cycle,
  alternating_background,
}) => {
  const [selection, setSelection] = React.useState({})
  const { selectedRows, selectedCols, selectedItems } = React.useMemo(() => {
    const selectedRows = {}
    const selectedCols = {}
    const selectedItems = {}
    for (const k in selection) {
      if (!selection[k]) continue
      const [row, col] = k.split('.')
      selectedRows[row] = true
      selectedCols[col] = true
      for (const item of chunks[col]) {
        selectedItems[item] = true
      }
    }
    return { selectedRows, selectedCols, selectedItems }
  }, [selection])
  return (
    <div className="react-supervenn-layout">
      <div className="react-supervenn-data">
        {composition_array.map((cells, row) => (
          <div
            key={row}
            className={classNames({ 'react-supervenn-alternate': alternating_background && row % 2 == 0 })}
          >
            {cells.map((cell, col) => {
              if (cell === 1) {
                return (
                  <div
                    key={col}
                    className={classNames({
                      'react-supervenn-cell': true,
                      'react-supervenn-selected': selection[`${row}.${col}`],
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
                      width: as_percent(col_widths[col] / n_items),
                      backgroundColor: color_by === 'column' ? color_cycle[col % color_cycle.length] : color_cycle[row % color_cycle.length],
                      userSelect: 'none',
                    }}>&nbsp;</div>
                )
              } else {
                return (
                  <div
                    key={col}
                    className="react-supervenn-cell"
                    style={{
                      width: as_percent(col_widths[col] / n_items),
                      userSelect: 'none',
                    }}>&nbsp;</div>
                )
              }
            })}
          </div>
        ))}
      </div>
      <div className="react-supervenn-ylabel">
        <div>SETS (<span>{Object.keys(selectedRows).length} sets</span>)
        </div>
      </div>
      <div className="react-supervenn-xlabel">
        ITEMS (<span>{Object.keys(selectedItems).length} items</span>)
      </div>
      <div className="react-supervenn-yticks">
        {sets.map((_, row) => (
          <div
            key={row}
            className={classNames({
              'react-supervenn-selected': selectedRows[row],
            })}
            onClick={_ => {
              setSelection(
                selection => {
                  const _selection = {...selection}
                  for (const col in Object.keys(chunks)) {
                    if (composition_array[row][col]) {
                      _selection[`${row}.${col}`] = !selectedRows[row]
                    }
                  }
                  return _selection
                }
              )
            }}
          ><span>{set_annotations[row]}</span></div>
        ))}
      </div>
      <div className="react-supervenn-xticks">
        {chunks.map((chunk, col) => (
          <div
            key={col}
            className={classNames({
              'react-supervenn-selected': selectedCols[col],
              'react-supervenn-rotated': rotate_col_annotations,
            })}
            style={{
              width: as_percent(col_widths[col] / n_items),
            }}
            onClick={_ => {
              setSelection(
                selection => {
                  const _selection = {...selection}
                  for (const row in composition_array) {
                    if (composition_array[row][col]) {
                      _selection[`${row}.${col}`] = !selectedCols[col]
                    }
                  }
                  return _selection
                }
              )
            }}
          >
            <span>
              {chunks[col].length >= effective_min_width_for_annotation ?
                chunks[col].length
                : null}
            </span>
          </div>
        ))}
      </div>
      <div className="react-supervenn-ycount">
        {chunks.map((chunk, col) => (
          <div
            key={col}
            style={{
              width: as_percent(col_widths[col] / n_items),
            }}
            onClick={_ => {
              setSelection(
                selection => {
                  const _selection = {...selection}
                  for (const row in composition_array) {
                    if (composition_array[row][col]) {
                      _selection[`${row}.${col}`] = !selectedCols[col]
                    }
                  }
                  return _selection
                }
              )
            }}
          >
            <div
              style={{
                height: as_percent(ycounts[col] / sets.length),
              }}>
                <span>
                  {chunks[col].length >= effective_min_width_for_annotation ?
                    ycounts[col]
                    : null}
                </span>
            </div>
          </div>
        ))}
      </div>
      <div className="react-supervenn-xcount">
        {sets.map((_, row) => (
          <div
            key={row}
            className={classNames({ 'react-supervenn-alternate': alternating_background && row % 2 == 0 })}
            onClick={_ => {
              setSelection(
                selection => {
                  const _selection = {...selection}
                  for (const col in Object.keys(chunks)) {
                    if (composition_array[row][col]) {
                      _selection[`${row}.${col}`] = !selectedRows[row]
                    }
                  }
                  return _selection
                }
              )
            }}
          >
            <div
              style={{
                width: as_percent(sets[row].length / n_items),
              }}
            ><span>{sets[row].length}</span></div>
          </div>
        ))}
      </div>
      <div className="react-supervenn-sets">
        <textarea
          rows={5}
          readOnly
          onSelect={evt => {
            evt.currentTarget.select()
            navigator.clipboard.writeText(Object.keys(selectedRows).map(s => set_annotations[s]).join('\n'))
          }}
          placeholder="Selected sets show up here, click to copy"
          value={Object.keys(selectedRows).map(s => set_annotations[s]).join('\n')}
        />
      </div>
      <div className="react-supervenn-items">
        <textarea
          rows={5}
          readOnly
          onSelect={evt => {
            evt.currentTarget.select()
            navigator.clipboard.writeText(Object.keys(selectedItems).join('\n'))
          }}
          placeholder="Selected items show up here, click to copy"
          value={Object.keys(selectedItems).join('\n')}
        />
      </div>
    </div>
  )
}

export default ReactSupervenn
