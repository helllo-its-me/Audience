import { useState, useEffect, useCallback } from 'react'
import { EDIT_FIELD_AUDIENCE } from '../../../../redux/types'
import { useDispatch, useSelector } from 'react-redux'

const CheckBox = ({ el }) => {
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()
  const newStateAudience = useSelector(
    (state) => state.audience.newStateAudience
  )
  const disabled = useSelector((state) => state.audience.disabled)

  const changeCheckBox = useCallback(
    (val) => {
      dispatch({
        type: EDIT_FIELD_AUDIENCE,
        payload: { ...newStateAudience, uploadTo: val },
      })
    },
    [dispatch, newStateAudience]
  )

  useEffect(() => {
    newStateAudience.uploadTo &&
      setChecked(
        newStateAudience.uploadTo
          .map((el) => el.toLowerCase().split('.').join(''))
          .includes(el.toLowerCase().split('.').join(''))
      )
  }, [el, newStateAudience.uploadTo])

  const changeInput = useCallback(
    (name) => {
      if (checked) {
        setChecked(false)
        changeCheckBox(newStateAudience.uploadTo.filter((el) => el !== name))
      } else {
        setChecked(true)
        changeCheckBox([...newStateAudience.uploadTo, name])
      }
    },
    [changeCheckBox, checked, newStateAudience.uploadTo]
  )

  return (
    <div className='form-check audience-platforms-check'>
      <label className='form-check-label' htmlFor={el}>
        {el}
      </label>
      <input
        className='form-check-input'
        type='checkbox'
        id={el}
        checked={checked}
        onChange={() => changeInput(el.toLowerCase().split('.').join(''))}
        value={checked}
        disabled={disabled}
      />
    </div>
  )
}

export default CheckBox
