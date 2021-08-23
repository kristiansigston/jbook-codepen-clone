import './add-cell.scss'
import { useActions } from '../../hooks/use_actions'

interface AddCellProps {
  previousCellId: string | null
  forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
  const { insertCellAfter } = useActions()
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button
          className="button is-primary is-rounded is-small"
          onClick={() => insertCellAfter(previousCellId, 'code')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Add Code</span>
        </button>
        <button
          className="button is-primary is-rounded is-small"
          onClick={() => insertCellAfter(previousCellId, 'text')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Add Text</span>
        </button>
        <div className="divider"></div>
      </div>
    </div>
  )
}

export default AddCell
