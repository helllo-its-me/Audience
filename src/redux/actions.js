import {
  FETCH_TREE,
  SHOW_LOADER,
  HIDE_LOADER,
  FETCH_AUDIENCE,
  EDIT_AUDIENCE,
  SET_DISABLED,
} from './types'
import audience from '../dataMock/audience.json'
import tree from '../dataMock/tree.json'

//получает дерево с сервера
export function fetchTree(token) {
  return async (dispatch) => {
    try {
      // const response = await fetch(
      //   process.env.REACT_APP_API_URL + '/api/categories',
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       accept: 'text/plain',
      //     },
      //     method: 'GET',
      //   }
      // )
      // const json = await response.json()
      dispatch({ type: FETCH_TREE, payload: tree })
    } catch (error) {
      console.log(error)
    }
  }
}

// получает конкретную аудиторию по айди
export function fetchAudience(id, token) {
  return async (dispatch) => {
    try {
      dispatch(setDisabled(true))
      // const response = await fetch(
      //   `${process.env.REACT_APP_API_URL}/api/audiences/${id}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       accept: 'text/plain',
      //     },
      //     method: 'GET',
      //   }
      // )
      // const json = await response.json()
      dispatch({ type: FETCH_AUDIENCE, payload: audience })
    } catch (error) {
      console.log(error)
    }
  }
}

// отправляет изменения в аудитории на сервер
export function editCurrentAudience(id, data, token) {
  return async (dispatch) => {
    try {
      // const response = await fetch(
      //   `${process.env.REACT_APP_API_URL}/api/audiences/${id}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       'Content-Type': 'application/json',
      //     },
      //     method: 'PUT',
      //     body: JSON.stringify(data),
      //   }
      // )
      // const json = await response.json()

      dispatch({ type: EDIT_AUDIENCE, payload: data })
      dispatch(setDisabled(true))
    } catch (error) {
      console.log(error)
    }
  }
}

export function showLoader() {
  return {
    type: SHOW_LOADER,
  }
}

export function hideLoader() {
  return { type: HIDE_LOADER }
}

export function setDisabled(isDisabled) {
  return {
    type: SET_DISABLED,
    payload: isDisabled,
  }
}
