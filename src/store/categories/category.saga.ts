import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

//this is our SAGA
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSuccess(categoriesArray)); //we dont call dispatch inside generator, instead we yield PUT
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  ); //take is where we recieve actions, takeLatest - if we recieve multiple actions give me the latest one, and then initialize fetchCategoriesAsync SAGA
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]); //all - run everything inside and only complete when everything is done, its a pause essentially, all code bellow it wont run until everything in this line of code is finished. If we give ALL the array of different functions we are calling and it will wait until all of them complete before completing
}
