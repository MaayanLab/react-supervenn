import React from 'react'
import ReactDOM from 'react-dom'
import Suspense from './components/Suspense'
import { useAsyncResource } from 'use-async-resource'

const ReactSupervenn = React.lazy(() => import('./components/ReactSupervenn'))

function Component({ getDemo }) {
  const demo = getDemo()
  return (
    <div style={{ display: 'flex', flex: '1 1 auto', overflow: 'hidden' }}>
      <ReactSupervenn {...demo} />
    </div>
  )
}
function App() {
  const [getDemo] = useAsyncResource(() => import('./demo.json').then(mod => ({ ...mod.default })), []);
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
