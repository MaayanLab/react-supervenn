import React from 'react'
import ReactDOM from 'react-dom'
import Suspense from './components/Suspense'

const ReactSupervenn = React.lazy(() => import('./components/ReactSupervenn'))

function App() {
  return (
    <Suspense>
      <div style={{ display: 'flex', flex: '1 1 auto', overflow: 'hidden' }}>
      <ReactSupervenn
        sets={[
          ['1','2','3','4'],
          ['3','4','5'],
          ['1','6','3','4'],
          ['1'],
        ]}
        set_annotations={[
          'A',
          'B',
          'C',
          'D',
        ]}
        composition_array={[
          [0, 0, 1, 1, 1],
          [0, 1, 1, 0, 0],
          [1, 0, 1, 1, 0],
          [0, 0, 0, 1, 0]
        ]}
        chunks={[
          ['6'],
          ['5'],
          ['3','4'],
          ['1'],
          ['2'],
        ]}
      />
      </div>
    </Suspense>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)
