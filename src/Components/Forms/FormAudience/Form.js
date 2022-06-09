import { useDispatch, useSelector } from 'react-redux'
import { EDIT_FIELD_AUDIENCE } from '../../../redux/types'
import CheckBox from './CheckBox/CheckBox'

import './Form.css'

const Form = ({ handleSubmit }) => {
  const platforms = [
    'VK',
    'Yandex',
    'MyTarget',
    'Facebook',
    'auto.ru',
    'Rambler',
    'Mail',
    'Google',
  ]
  const dispatch = useDispatch()
  const newStateAudience = useSelector(
    (state) => state.audience.newStateAudience
  )
  const disabled = useSelector((state) => state.audience.disabled)
  // управляет состоянием поля name и date
  const changeInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (name === 'activeTo' && value) {
      let newDate = new Date(value)
      let isoDateTime = new Date(
        newDate.getTime() - newDate.getTimezoneOffset() * 60000
      ).toISOString()
      dispatch({
        type: EDIT_FIELD_AUDIENCE,
        payload: { ...newStateAudience, [name]: new Date(isoDateTime) },
      })
    } else {
      dispatch({
        type: EDIT_FIELD_AUDIENCE,
        payload: { ...newStateAudience, [name]: value },
      })
    }
  }

  return (
    <div className='form'>
      <form
        className='row g-3 needs-validation audience-form'
        onSubmit={handleSubmit}
        id='form_audience'>
        <div className='audience-form-field-information'>
          <div className='audience-form-field'>
            <p>ID: </p>
            {newStateAudience.id}
          </div>
          <div className='audience-form-field'>
            <p>Reach: </p>
            {newStateAudience.size &&
              newStateAudience.size.toLocaleString('ru')}
          </div>
        </div>
        <div className='audience-form-field-inputs'>
          <div
            className='audience-form-field-input-block'
            style={{
              marginBottom: '5px',
            }}>
            <label className='form-label' htmlFor='audienceName'>
              Audience name
            </label>
            <div className='audience-form-input'>
              <input
                type='text'
                placeholder='Name'
                className='form-control'
                id='audienceName'
                name='name'
                value={newStateAudience.name ? newStateAudience.name : ''}
                onChange={changeInput}
                readOnly={disabled}
                required
              />
            </div>
          </div>
          <div className='audience-form-field-input-block'>
            <label className='form-label' htmlFor='inputActiveTo'>
              Active To
            </label>
            <div className='audience-form-input'>
              <input
                type='date'
                className='form-control'
                id='inputActiveTo'
                name='activeTo'
                value={
                  newStateAudience.activeTo
                    ? new Date(newStateAudience.activeTo)
                        .toISOString()
                        .split('T')[0]
                    : ''
                }
                readOnly={disabled}
                onChange={changeInput}
                required
              />
            </div>
          </div>
        </div>
        <div className='audience-form-platforms-block'>
          <p>Platforms</p>
          <div className='platforms'>
            {platforms.map((el, ind) => (
              <CheckBox key={ind} el={el} />
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Form
