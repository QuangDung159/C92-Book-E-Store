import { all } from 'redux-saga/effects';
import exampleSaga from './saga';

export default function* rootSaga() {
  yield all([
    exampleSaga(),
  ]);
}
