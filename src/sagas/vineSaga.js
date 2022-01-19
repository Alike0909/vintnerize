import { all, put, takeLatest } from '@redux-saga/core/effects'
import * as types from '../actions/types'
import axios from 'axios'

function* getVines(action) {
    try {
        const {data} = action

        const {page} = data
        const {search} = data
        const {max_price} = data
        const {min_price} = data
        const {limit} = data
        const {field} = data
        const {rate} = data
        const {region} = data
        const {country} = data
        const {wine_style} = data
        const {winery} = data
        const {grape} = data
        const {food} = data

        const {wine_types} = data

        const vines = yield axios.get(`https://vintnerize-backend-3dbwolay.conholdate.cloud/api/product/all/?page=${page}&search=${search}&max_price=${max_price}&min_price=${min_price}&limit=${limit}&field=${field}${wine_types}${region}${country}${wine_style}${winery}${grape}${food}&order=${rate}`).then(res => res.data)
        yield put({ type: types.VINES_RECEIVED, payload: vines })
    } catch (error) {
        yield put({ type: types.VINES_FAILED, error })
    }
}

function* searchVines(action) {
    try {
        const { data } = action

        const { searchText } = data
        const { type } = data

        const vines = yield axios.get(`https://vintnerize-backend-3dbwolay.conholdate.cloud/api/search?q=${searchText}&type=${type}`).then(res => res.data)
        yield put({ type: types.SEARCH_RECEIVED, payload: vines })
    } catch (error) {
        yield put({ type: types.SEARCH_FAILED, error })
    }
}

function* getDetails(action) {
    try {
        const { data } = action

        const { slug } = data
        const { code } = data

        const vines = yield axios.get(`https://vintnerize-backend-3dbwolay.conholdate.cloud/api/product/wine/${slug}?country_code=${code}`).then(res => res.data)
        yield put({ type: types.DETAILS_RECEIVED, payload: vines })
    } catch (error) {
        yield put({ type: types.DETAILS_FAILED, error })
    }
}

function* getShops(action) {
    try {
        const { data } = action
        const { vintage_id } = data
        console.log(vintage_id)

        const vines = yield axios.get(`https://vintnerize-backend-3dbwolay.conholdate.cloud/api/product/prices?vintage_id=${vintage_id}`).then(res => res.data)
        yield put({ type: types.SHOPS_RECEIVED, payload: vines })
    } catch (error) {
        yield put({ type: types.SHOPS_FAILED, error })
    }
}

export function* vineSaga() {
    yield all([
        yield takeLatest(types.GET_VINES, getVines),
        yield takeLatest(types.SEARCH_VINES, searchVines),
        yield takeLatest(types.GET_DETAILS, getDetails),
        yield takeLatest(types.GET_SHOPS, getShops),
    ])
}

 