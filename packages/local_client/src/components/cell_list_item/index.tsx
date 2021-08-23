import './cell-list-item.scss'
import { Cell } from '../../state'
import TextEditor from '../text_editor'
import CodeCell from '../code_cell'
import ActionBar from '../action_bar'

interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element
  if (cell.type === 'code') {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    )
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    )
  }
  return <div className="cell-list-item">{child}</div>
}

export default CellListItem
