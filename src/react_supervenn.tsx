import ReactDOM from 'react-dom'
import React from 'react'
import ReactSupervennComponent from './ReactSupervenn'

export function ReactSupervenn(container, props: { height?: number } & React.ComponentProps<typeof ReactSupervennComponent>) {
  const height = props.height !== undefined ? props.height : '500px'
  ReactDOM.render(
    <div style={{
      height,
      display: 'flex',
      flex: '1 1 auto',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <ReactSupervennComponent {...props} />
    </div>,
    container
  )
}
