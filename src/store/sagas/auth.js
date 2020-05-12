import {delay} from 'redux-saga/effects'
import {put, call} from 'redux-saga/effects'
import axios from 'axios'

import * as actions from '../actions/index'


export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token')
  yield call([localStorage, 'removeItem'], 'expirationDate')
  yield call([localStorage, 'removeItem'], 'userId')
  // with call is easier to mock up a function for tests
  // localStorage.removeItem('token')
  // localStorage.removeItem('expirationDate')
  // localStorage.removeItem('userId')
  yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000)
  yield put(actions.logout())
}

export function* authUserSaga(action) {
  yield put(actions.authStart())
    const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBg9ku00mqe9luQhJ2B0tD_Kw5irv0NYW0'
    if (!action.isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBg9ku00mqe9luQhJ2B0tD_Kw5irv0NYW0'
    }
    try {
      const response = yield axios.post(url, authData)
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('userId', response.data.localId)
      yield put(actions.authSuccess(response.data.idToken, response.data.localId))
      yield put(actions.checkAuthTimeout(response.data.expiresIn))

    } catch (err) {
      yield put(actions.authFail(err.response.data.error))
    }
}

export function* authCheckStateSaga(action) {
    const token = localStorage.getItem('token')
    if (!token) {
      yield put(actions.logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate >= new Date()) {
        const userId = localStorage.getItem('userId')
        yield put(actions.authSuccess(token, userId))
        yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      } else {
        yield put(actions.logout())
      }
    }
}
