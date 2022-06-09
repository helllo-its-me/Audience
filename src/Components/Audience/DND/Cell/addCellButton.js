import { useSelector, useDispatch } from 'react-redux'
import { ADD_CELL } from '../../../../redux/types'

const AddCellButton = () => {
  const disabled = useSelector((state) => state.audience.disabled)
  const dispatch = useDispatch()

  const addCell = () => {
    dispatch({ type: ADD_CELL })
  }

  return (
    <div className='celldiv cellDivButtonContainer'>
      <div
        className='blockForAddButton'
        style={{
          display: disabled ? 'none' : 'flex',
        }}>
        <button className='btn btnAddUnionBlock' onClick={addCell}>
          + Add union block
        </button>
      </div>
    </div>
  )
}

export default AddCellButton
