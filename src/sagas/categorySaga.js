import { all, put, takeLatest } from '@redux-saga/core/effects'
import * as types from '../actions/types'
import axios from 'axios'

function* getCategories() {
    try {
        const categories = yield axios.get('https://vintnerize-backend-3dbwolay.conholdate.cloud/api/category').then(res => res.data)
        yield put({ type: types.CATEGORIES_RECEIVED, payload: categories })
    } catch (error) {
        yield put({ type: types.CATEGORIES_FAILED, error })
    }
}

export function* categorySaga() {
    yield all([
        yield takeLatest(types.GET_CATEGORIES, getCategories),
    ])
}

