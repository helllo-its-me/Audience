import Form from '../Forms/FormAudience/Form'
import DND from './DND/DND'
import { CANCEL_CHANGES } from '../../redux/types'
import { setDisabled } from '../../redux/actions'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAudience, editCurrentAudience } from '../../redux/actions'
import { CustomizedSnackbars } from '../Alert'
import './Audience.css'

function Audience({ match }) {
  const dispatch = useDispatch()
  const [alert, setAlert] = useState(0)
  const currentAudience = useSelector(
    (state) => state.audience.currentStateAudience
  )
  const newStateAudience = useSelector(
    (state) => state.audience.newStateAudience
  )
  const disabled = useSelector((state) => state.audience.disabled)
  const cells = useSelector((state) => state.cells.cells)
  const [filter, setFilter] = useState('')

  //  запрос на сервер для получения аудитории (объект)
  function getAudience() {
    dispatch(fetchAudience(match.params.id))
  }

  useEffect(() => {
    getAudience()
  }, [match.params.id])

  //отправляет изменения на сервер. Срабатывает при нажатии кнопки Save
  async function handleSubmit(e) {
    e.preventDefault()
    const newInner = []
    const innerForSend = []
    Object.values(cells).map((cell) => newInner.push(cell))

    newInner.map((cl) =>
      innerForSend.push({
        data: cl.data.map((el) => ({
          id: el.id,
          type: el.parentCategoryId ? 1 : 0,
        })),

        type: cl.type,
        name: cl.name,
      })
    )

    const newData = newStateAudience
    newData.expression.innerExpressions = [...innerForSend]

    dispatch(editCurrentAudience(currentAudience.id, newData))
    setAlert((prev) => prev + 1)
  }

  //управляет состоянием поля фильтр
  const changeInput = (e) => {
    setFilter(e.target.value)
  }
  // делает страницу аудитории редактируемой
  const editAudience = () => {
    dispatch(setDisabled(false))
  }

  // срабатывает при нажатии на кнопку cancel
  const cancelData = useCallback(() => {
    dispatch({ type: CANCEL_CHANGES })
    dispatch(setDisabled(true))
    getAudience()
  }, [])

  return (
    <div className='container-for-audience'>
      <div className='audience-form-container'>
        <Form handleSubmit={handleSubmit} />
        <div className='audience-buttons-edit-container'>
          {disabled ? (
            <button
              type='button'
              className='btn audience-btn-edit'
              onClick={editAudience}>
              Edit
            </button>
          ) : (
            <div className='audience-buttons-container'>
              <button
                type='submit'
                form='form_audience'
                className='btn audience-btn-save'>
                Save
              </button>
              <button
                type='button'
                className='btn audience-btn-cancel'
                onClick={cancelData}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='filter audience-filter-container'>
        <input
          className='form-control'
          type='text'
          name=''
          id='filter_tree'
          onChange={changeInput}
          placeholder='Search'
          value={filter}
        />
      </div>
      <div className='audience'>
        {newStateAudience && Object.keys(newStateAudience).length ? (
          <DND filter={filter} />
        ) : null}
      </div>
      <CustomizedSnackbars alert={alert} />
    </div>
  )
}

export default Audience
