import { takeEvery, put } from 'redux-saga/effects';

// Một ví dụ saga đơn giản
function* exampleSaga() {
  yield takeEvery('EXAMPLE_ACTION', function* () {
    yield put({ type: 'EXAMPLE_ACTION_SUCCESS' });
  });
}

export default exampleSaga;
