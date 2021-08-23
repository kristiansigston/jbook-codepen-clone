import React, { useEffect } from 'react'
import './cell_list.scss'
import { useTypedSelector } from '../../hooks/use_typed_selector'
import CellListItem from '../cell_list_item'
import AddCell from '../add_cell'
import { useActions } from '../../hooks/use_actions'
import { setupBundle } from '../../bundler'

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  )

  const { fetchCells } = useActions()

  const intializeBundler = async () => {
    await setupBundle()
  }

  useEffect(() => {
    intializeBundler()
  }, [])

  useEffect(() => {
    fetchCells()
  }, [])

  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </React.Fragment>
  ))
  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
