import {takeEvery, takeLatest, all} from 'redux-saga/effects'

import {
  logoutSaga, 
  checkAuthTimeoutSaga, 
  authUserSaga,
  authCheckStateSaga
} from './auth'
import {initIngredients} from './burgerBuilder'
import {purchaseBurger, fetchOrders} from './order'
import * as actionTypes from '../actions/actionTypes'

export function* watchAuth() {
  // load tasks concurrently
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ])
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredients)
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurger)
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrders)
}
