import { useSelector, useDispatch } from 'react-redux'
import {
  DELETE_CELL,
  CHANGE_CELL_NAME,
  DROP_ITEM_IN_CELL,
} from '../../../../redux/types'
import DroppedElement from './droppedElement'
import './cell.css'

const Cell = ({ itm, ind, name, type }) => {
  const disabled = useSelector((state) => state.audience.disabled)
  const cells = useSelector((state) => state.cells.cells)
  const dispatch = useDispatch()

  // срабатывает при нахождении элемента над зоной ячейки (cell)
  function dragOverHandler(e) {
    e.preventDefault()
  }

  // сработает при отпускании элемента
  function dragEndHandler(e) {}

  // покидание зоны ячейки (cell)
  function dragLeaveHandler(e) {}

  // меняет имя у ячейки с элементами
  function changeCellName(e, id) {
    let value = e.target.value
    dispatch({
      type: CHANGE_CELL_NAME,
      payload: {
        ...cells,
        [id]: {
          ...cells[id],
          name: value,
        },
      },
    })
  }

  // удаляет ячейку (cell)
  const deleteCell = (id) => {
    const { [id]: tmp, ...rest } = cells
    dispatch({ type: DELETE_CELL, payload: rest })
  }

  // срабатывает при дропе элемента в ячейку
  const dropItem = (e, id) => {
    e.preventDefault()

    let droppedElement = JSON.parse(e.dataTransfer.getData('data'))
    if (
      cells[id].data.find(
        (elem) =>
          elem.name === droppedElement.name && elem.id === droppedElement.id
      )
    ) {
      console.log('error')
    } else {
      dispatch({
        type: DROP_ITEM_IN_CELL,
        payload: {
          ...cells,
          [id]: { ...cells[id], data: [...cells[id].data, droppedElement] },
        },
      })
    }
  }
  return (
    <div
      id={ind}
      className='celldiv'
      style={
        type === 0
          ? {
              width: 'calc(100% / 3)',
              height: 'fit-content',
              lineHeight: 0,
              textAlign: 'left',
            }
          : {}
      }>
      {type === 0 && (
        <input
          className='inputForNameCell'
          value={name ? name : ''}
          onChange={(e) => changeCellName(e, ind)}
          disabled={disabled}
        />
      )}
      <section
        className='cell'
        style={
          disabled
            ? { pointerEvents: 'none', width: '100%' }
            : { width: '100%' }
        }>
        <div
          className='js-cell'
          onDragEnd={dragEndHandler}
          onDragOver={dragOverHandler}
          onDrop={(e) => dropItem(e, ind)}
          onDragLeave={dragLeaveHandler}>
          {itm &&
            itm.map((item, i) => (
              <DroppedElement
                key={i}
                id={item.id}
                name={item.name}
                item={item}
                cellId={ind}
              />
            ))}
        </div>
        <button
          type='button'
          className='btn-close btn-close-black'
          aria-label='Close'
          onClick={() => deleteCell(ind)}
          style={
            disabled
              ? { display: 'none' }
              : { display: '', width: '10px', height: '10px', padding: '0' }
          }></button>
      </section>
    </div>
  )
}

export default Cell
