import React from 'react'
import classNames from 'classnames'
import './ReactSupervenn.css'

const as_percent = (x: number) => `${100*x}%`
const maybe_plural = (singular: string, x: number) => {
  if (x === 1) return `${x} ${singular}`
  else return `${x} ${singular}s`
}
const pad_left_jsx = (x: number, n?: number) => {
  const jsx = []
  let x_str = x.toString()
  if (n !== undefined) {
    for (let i = 0; i < n - x_str.length; i++) {
      jsx.push(<>&nbsp;</>)
    }
    jsx.push(<>{x_str}</>)
  }
  return <span style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}>{jsx}</span>
}
const maybe_plural_jsx = (singular: string, x: number, n: number) => {
  const x_jsx = pad_left_jsx(x, n)
  if (x === 1) return <>{x_jsx} &nbsp;{singular}</>
  else return <>{x_jsx} {singular}s</>
}

/**
 * A helper to optionally allow a state variable to be controlled by a parent component -- the optional state, dispatch should be provided
 */
function useMaybeManagedState<T>(externalState?: T, setExternalState?: React.Dispatch<React.SetStateAction<T>>, defaultState?: T) {
  const [internalState, setInternalState] = React.useState<T>(externalState !== undefined ? externalState : defaultState)
  React.useEffect(() => {
    if (externalState !== undefined) setInternalState(externalState)
  }, [externalState, setExternalState])
  const setState = React.useCallback((action: React.SetStateAction<T>) => {
    if (externalState !== undefined) return setExternalState(action)
    else return setInternalState(action)
  }, [externalState, setExternalState])
  return [internalState, setState] as [T, React.Dispatch<React.SetStateAction<T>>]
}

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
  /**
   * The singular label to use when referring to the sets
   */
  set_label?: string,
  /**
   * The singular label to use when referring to the items
   */
  item_label?: string,
  /**
   * Allow parent to control selection
   */
  selection?: Record<string, boolean>
  /**
   * Allow parent to control selection
   */
  onSelectionChange?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
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
  set_label = 'set',
  item_label = 'item',
  selection: externalSelection,
  onSelectionChange,
}) => {
  const tooltipRef = React.useRef<HTMLDivElement>(null)
  const [selection, setSelection] = useMaybeManagedState(externalSelection, onSelectionChange, {})
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
                      data-tip={`This region has ${maybe_plural(item_label, chunks[col].length)} from ${set_annotations[row]}, click to select.`}
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
          <div>
            {set_label.toUpperCase()}S ({maybe_plural(set_label, sets.length)})
          </div>
        </div>
        <div className="react-supervenn-xlabel">
          {item_label.toUpperCase()}S ({maybe_plural(item_label, n_items)})
        </div>
        <div className="react-supervenn-yticks">
          {sets.map((_, row) => (
            <div
              key={row}
              className={classNames({
                'react-supervenn-selected': selectedRows[row],
                'react-supervenn-alternate': alternating_background && row % 2 == 0,
              })}
              data-tip={`This row has ${maybe_plural(item_label, sets[row].length)} from ${set_annotations[row]}, click to select.`}
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
            >{set_annotations[row]}</div>
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
              data-tip={`This column has ${maybe_plural(item_label, chunk.length)} shared by ${maybe_plural(set_label, ycounts[col])}, click to select.`}
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
              {chunk.length >= effective_min_width_for_annotation ?
                chunk.length
                : null}
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
              data-tip={`This column has ${maybe_plural(item_label, chunk.length)} shared by ${maybe_plural(set_label, ycounts[col])}, click to select.`}
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
                  {chunks[col].length >= effective_min_width_for_annotation ?
                    ycounts[col]
                    : null}
              </div>
            </div>
          ))}
        </div>
        <div className="react-supervenn-xcount">
          {sets.map((_, row) => (
            <div
              key={row}
              className={classNames({ 'react-supervenn-alternate': alternating_background && row % 2 == 0 })}
              data-tip={`This row has ${maybe_plural(item_label, sets[row].length)} from ${set_annotations[row]}, click to select.`}
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
              >{sets[row].length}</div>
            </div>
          ))}
        </div>
        <div
          className="react-supervenn-sets"
          data-tip={`Click to copy ${maybe_plural(set_label, Object.keys(selectedRows).length)} to clipboard`}
          onClick={evt => {
            (evt.currentTarget.children[0] as HTMLTextAreaElement).select()
            navigator.clipboard.writeText(Object.keys(selectedRows).map(s => set_annotations[s]).join('\n'))
          }}
        >
          <textarea
            readOnly
            value={Object.keys(selectedRows).map(s => set_annotations[s]).join('\n')}
          />
          <label>{maybe_plural_jsx(set_label, Object.keys(selectedRows).length, Math.ceil(Math.log10(sets.length)))}, <u>📋</u></label>
        </div>
        <div
          className="react-supervenn-items"
          data-tip={`Click to copy ${maybe_plural(item_label, Object.keys(selectedItems).length)} to clipboard`}
          onClick={evt => {
            (evt.currentTarget.children[0] as HTMLTextAreaElement).select()
            navigator.clipboard.writeText(Object.keys(selectedItems).join('\n'))
          }}
        >
          <textarea
            readOnly
            value={Object.keys(selectedItems).join('\n')}
          />
          <label>{maybe_plural_jsx(item_label, Object.keys(selectedItems).length, Math.ceil(Math.log10(n_items)))}, <u>📋</u></label>
        </div>
      </div>
      <div ref={tooltipRef} className="react-supervenn-tooltip"></div>
    </>
  )
}

export default ReactSupervenn
