import React from 'react'
import ReactDOM from 'react-dom'
import Suspense from './components/Suspense'
import { useAsyncResource } from 'use-async-resource'

import ReactSupervennStyle from './lib/index.module.css'
const ReactSupervenn = React.lazy(() => import('./lib'))

function Component({ getDemo }) {
  const demo = getDemo()
  return (
    <div style={{ display: 'flex', flex: '1 1 auto', overflow: 'hidden' }}>
      <ReactSupervenn style={ReactSupervennStyle} {...demo} />
    </div>
  )
}
function App() {
  const [getDemo] = useAsyncResource(() => import('./demo.json'), []);
  return (
    <Suspense>
      <Component getDemo={getDemo} />
    </Suspense>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)
