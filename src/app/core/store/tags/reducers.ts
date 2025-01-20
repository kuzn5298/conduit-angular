import { createReducer, on } from '@ngrx/store';
import {
  getTagsAction,
  getTagsFailureAction,
  getTagsSuccessAction,
} from './actions/getTags.action';
import { TagsState } from './tags-state.interface';
import { clearTagsStateAction } from './actions';

const initialState: TagsState = {
  isLoading: false,
  tags: [],
};

export const tagsReducer = createReducer(
  initialState,
  on(
    getTagsAction,
    (state): TagsState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getTagsSuccessAction,
    (state, { tags }): TagsState => ({
      ...state,
      isLoading: false,
      tags,
    })
  ),
  on(
    getTagsFailureAction,
    (state): TagsState => ({
      ...state,
      isLoading: false,
      tags: [],
    })
  ),
  on(clearTagsStateAction, (): TagsState => ({ ...initialState }))
);
