import { createReducer, on } from '@ngrx/store';
import { clearEditorStateAction } from './actions/editor.action';
import { EditorState } from './editor-state.interface';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from './actions/createArticle.action';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from './actions/updateArticle.action';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from './actions/getArticle.action';

const initialState: EditorState = {
  isSubmitting: false,
  isLoading: false,
  errors: null,
  article: null,
};

export const editorReducer = createReducer(
  initialState,
  on(
    createArticleAction,
    (state): EditorState => ({
      ...state,
      errors: null,
      isSubmitting: true,
    })
  ),
  on(
    createArticleSuccessAction,
    (state): EditorState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    createArticleFailureAction,
    (state, { errors }): EditorState => ({
      ...state,
      isSubmitting: false,
      errors,
    })
  ),
  on(
    updateArticleAction,
    (state): EditorState => ({
      ...state,
      errors: null,
      isSubmitting: true,
    })
  ),
  on(
    updateArticleSuccessAction,
    (state): EditorState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    updateArticleFailureAction,
    (state, { errors }): EditorState => ({
      ...state,
      isSubmitting: false,
      errors,
    })
  ),
  on(
    getArticleAction,
    (state): EditorState => ({
      ...state,
      article: null,
      errors: null,
      isLoading: true,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, { article }): EditorState => ({
      ...state,
      article,
      isLoading: false,
    })
  ),
  on(
    getArticleFailureAction,
    (state): EditorState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(clearEditorStateAction, (): EditorState => ({ ...initialState }))
);
