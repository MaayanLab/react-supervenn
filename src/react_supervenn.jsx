import ReactDOM from 'react-dom'
import React from 'react'
import Suspense from './components/Suspense'

import ReactSupervennStyle from './lib/index.module.css'
const ReactSupervennComponent = React.lazy(() => import('./lib'))

export function ReactSupervenn(container, { width, height, ...props }) {
  if (width === undefined) width = '100%'
  if (height === undefined) height = '500px'
  ReactDOM.render(
    <Suspense>
      <div style={{
        height,
        display: 'flex',
        flex: '1 1 auto',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <ReactSupervennComponent style={ReactSupervennStyle} {...props} />
      </div>
    </Suspense>,
    container
  )
}
