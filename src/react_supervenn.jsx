import ReactDOM from 'react-dom'
import React from 'react'
import Suspense from './components/Suspense'

const ReactSupervennComponent = React.lazy(() => import('./components/ReactSupervenn'))

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
        <ReactSupervennComponent {...props} />
      </div>
    </Suspense>,
    container
  )
}
