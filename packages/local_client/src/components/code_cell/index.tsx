import './code_cell.scss'
import React from 'react'
import { useEffect } from 'react'
import { Cell } from '../../state'
import { useActions } from '../../hooks/use_actions'
import { useTypedSelector } from '../../hooks/use_typed_selector'
import { useCumulativeCode } from '../../hooks/use_cumulative_code'
import CodeEditor from '../editor'
import Preview from '../preview'

import Resizable from '../resizeable'

const initialCode = `import React from 'react'
          import ReactDOM from 'react-dom'
          const a = 1
          const App = () => {
          return (
            <div>
              <button>help</button>
            </div>
          )
        }
        console.log(123);
        ReactDOM.render(<App />, document.querySelector('#root'));
        `

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector((state) => state.bundles![cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)
  console.log(cumulativeCode)

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode)
      return
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode)
    }, 750)
    return () => {
      clearTimeout(timer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createBundle, cumulativeCode, cell.id])

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max={100}>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell
