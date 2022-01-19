import { all } from 'redux-saga/effects'
import { categorySaga } from './categorySaga'
import { vineSaga } from './vineSaga'

export default function* rootSaga() {
    yield all([
        categorySaga(),
        vineSaga(),
    ])
}