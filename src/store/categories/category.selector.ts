import { createSelector } from "reselect";

import { RootState } from "../store";

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer], //output of this are categories, if we had [selectCategoryReducer, selectCurrentUsers] then in line bellow we would have (categoriesSlice, currentUserSlice) => ...
  (categoriesSlice) => categoriesSlice.categories //the only time where this will run is when we get different categoriesSliceObject we get back from selectCategoryReducer is different
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap);
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
