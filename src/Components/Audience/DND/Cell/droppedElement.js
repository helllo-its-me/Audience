import Close from './Close/Close'
import { useSelector, useDispatch } from 'react-redux'
import { DELETE_ITEM_FROM_CELL } from '../../../../redux/types'
import categoryPic from '../../../../Pic/categoryPic.svg'
import segmentPic from '../../../../Pic/segmentPic.svg'

const DroppedElement = ({ id, name, item, cellId }) => {
  const disabled = useSelector((state) => state.audience.disabled)
  const cells = useSelector((state) => state.cells.cells)
  const dispatch = useDispatch()

  //удаляет элемент из ячейки (Cell)
  const closeItm = (delitedName, deletedId, inCellId) => {
    dispatch({
      type: DELETE_ITEM_FROM_CELL,
      payload: {
        ...cells,
        [inCellId]: {
          ...cells[inCellId],
          data: cells[inCellId].data.filter(
            (itm) => !(itm.id === deletedId && itm.name === delitedName)
          ),
        },
      },
    })
  }

  return (
    <div className='indrop'>
      <div className='indropElement'>
        {item.parentCategoryId ? (
          <img src={categoryPic} alt='category' />
        ) : (
          <img src={segmentPic} alt='segment' />
        )}
        {item.name}
      </div>
      <Close closeBtn={() => closeItm(name, id, cellId)} disabled={disabled} />
    </div>
  )
}

export default DroppedElement
