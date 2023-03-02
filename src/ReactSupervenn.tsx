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
  const tooltipRef = React.useRef<HTMLDivElement>(null)
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
  React.useEffect(() => {
    if (!tooltipRef) return
    const listener = (evt: MouseEvent) => {
      if (!tooltipRef.current) return
      const el = document.elementFromPoint(evt.clientX, evt.clientY)
      const tip = el.getAttribute('data-tip')
      if (tip !== null) {
        tooltipRef.current.innerText = tip
        tooltipRef.current.style.left = `${evt.clientX + window.scrollX}px`
        tooltipRef.current.style.top = `${evt.clientY + window.scrollY}px`
        tooltipRef.current.style.opacity = `1.0`
      } else {
        tooltipRef.current.style.opacity = `0.0`
      }
    }
    document.addEventListener('mousemove', listener)
    return () => {
      document.removeEventListener('mousemove', listener)
    }
  }, [tooltipRef])
  return (
    <>
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
                      data-tip={`This region has ${cell} item(s) from ${set_annotations[row]}, click to select.`}
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
          <div>SETS (<span>{sets.length} sets</span>)
          </div>
        </div>
        <div className="react-supervenn-xlabel">
          ITEMS (<span>{n_items} items</span>)
        </div>
        <div className="react-supervenn-yticks">
          {sets.map((_, row) => (
            <div
              key={row}
              className={classNames({
                'react-supervenn-selected': selectedRows[row],
                'react-supervenn-alternate': alternating_background && row % 2 == 0,
              })}
              data-tip={`This row has ${sets[row].length} item(s) from ${set_annotations[row]}, click to select.`}
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
              data-tip={`This column has ${chunk.length} item(s) shared by ${ycounts[col]} set(s), click to select.`}
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
                {chunk.length >= effective_min_width_for_annotation ?
                  chunk.length
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
              data-tip={`This column has ${chunk.length} item(s) shared by ${ycounts[col]} set(s), click to select.`}
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
                  pointerEvents: 'none',
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
              data-tip={`This row has ${sets[row].length} item(s) from ${set_annotations[row]}, click to select.`}
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
                  pointerEvents: 'none',
                  width: as_percent(sets[row].length / n_items),
                }}
              ><span>{sets[row].length}</span></div>
            </div>
          ))}
        </div>
        <div className="react-supervenn-sets" onClick={evt => {
          (evt.currentTarget.children[0] as HTMLTextAreaElement).select()
          navigator.clipboard.writeText(Object.keys(selectedRows).map(s => set_annotations[s]).join('\n'))
        }}>
          <textarea
            rows={3}
            readOnly
            value={Object.keys(selectedRows).map(s => set_annotations[s]).join('\n')}
          />
          <label>{Object.keys(selectedRows).length} set(s), click to copy</label>
        </div>
        <div className="react-supervenn-items" onClick={evt => {
          (evt.currentTarget.children[0] as HTMLTextAreaElement).select()
          navigator.clipboard.writeText(Object.keys(selectedItems).join('\n'))
        }}>
          <textarea
            rows={4}
            readOnly
            value={Object.keys(selectedItems).join('\n')}
          />
          <label>{Object.keys(selectedItems).length} item(s), click to copy</label>
        </div>
      </div>
      <div ref={tooltipRef} className="react-supervenn-tooltip"></div>
    </>
  )
}

export default ReactSupervenn
